import { FastifyInstance } from 'fastify';
import { SessionStatus, Speaker } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../plugins/auth';
import { processSessionQueue } from '../lib/queue';

const utteranceSchema = z.object({ items: z.array(z.object({ speaker: z.enum(['user', 'ai']), startMs: z.number().optional(), endMs: z.number().optional(), text: z.string().min(1) })) });

const ensureOwnSession = async (sessionId: string, userId: string) => {
  const session = await prisma.journalSession.findUnique({ where: { id: sessionId } });
  if (!session || session.userId !== userId) throw new Error('not_found');
  return session;
};

export async function sessionRoutes(app: FastifyInstance) {
  app.post('/sessions', { preHandler: [requireAuth] }, async (req) => {
    const userId = (req.user as any).sub;
    const session = await prisma.journalSession.create({ data: { userId, status: SessionStatus.live } });
    return { session };
  });

  app.post('/sessions/:id/realtime-token', { preHandler: [requireAuth] }, async (req, reply) => {
    const userId = (req.user as any).sub;
    const { id } = req.params as { id: string };
    try { await ensureOwnSession(id, userId); } catch { return reply.code(404).send({ message: 'Not found' }); }

    const model = process.env.OPENAI_REALTIME_MODEL || 'gpt-4o-realtime-preview';
    const start = Date.now();
    try {
      const openAiResponse = await fetch('https://api.openai.com/v1/realtime/sessions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          voice: 'alloy',
          instructions: 'Friendly, curious, warm journaling companion. One question at a time. Avoid coaching/therapy language. concise responses.',
          modalities: ['audio', 'text'],
          input_audio_transcription: { model: 'gpt-4o-mini-transcribe' },
        }),
      });
      const data = await openAiResponse.json();
      await prisma.aiRequestLog.create({ data: { sessionId: id, kind: 'realtime', model, status: 'ok', latencyMs: Date.now() - start } });
      return data;
    } catch (error: any) {
      await prisma.aiRequestLog.create({ data: { sessionId: id, kind: 'realtime', model, status: 'error', error: String(error), latencyMs: Date.now() - start } });
      return reply.code(500).send({ message: 'Failed to create realtime token' });
    }
  });

  app.post('/sessions/:id/utterances/batch', { preHandler: [requireAuth] }, async (req, reply) => {
    const userId = (req.user as any).sub;
    const { id } = req.params as { id: string };
    const body = utteranceSchema.parse(req.body);
    try { await ensureOwnSession(id, userId); } catch { return reply.code(404).send({ message: 'Not found' }); }
    await prisma.utterance.createMany({ data: body.items.map((item) => ({ sessionId: id, speaker: item.speaker === 'user' ? Speaker.user : Speaker.ai, startMs: item.startMs, endMs: item.endMs, text: item.text })) });
    return { ok: true };
  });

  app.post('/sessions/:id/end', { preHandler: [requireAuth] }, async (req, reply) => {
    const userId = (req.user as any).sub;
    const { id } = req.params as { id: string };
    const session = await ensureOwnSession(id, userId).catch(() => null);
    if (!session) return reply.code(404).send({ message: 'Not found' });
    const endedAt = new Date();
    await prisma.journalSession.update({ where: { id }, data: { endedAt, status: 'processing', durationSeconds: Math.floor((endedAt.getTime() - session.startedAt.getTime()) / 1000) } });
    await processSessionQueue.add('process_session', { sessionId: id });
    return { ok: true };
  });

  app.get('/sessions', { preHandler: [requireAuth] }, async (req) => {
    const userId = (req.user as any).sub;
    const sessions = await prisma.journalSession.findMany({ where: { userId }, orderBy: { startedAt: 'desc' } });
    return { sessions };
  });

  app.get('/sessions/:id', { preHandler: [requireAuth] }, async (req, reply) => {
    const userId = (req.user as any).sub;
    const { id } = req.params as { id: string };
    const session = await prisma.journalSession.findUnique({ where: { id }, include: { utterances: true, artifact: true, memoryCandidates: true } });
    if (!session || session.userId !== userId) return reply.code(404).send({ message: 'Not found' });
    return { session };
  });
}
