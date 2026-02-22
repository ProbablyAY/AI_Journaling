import 'dotenv/config';
import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import { PrismaClient, SessionStatus } from '@prisma/client';
import { z } from 'zod';

const redis = new IORedis(process.env.REDIS_URL || 'redis://localhost:6379');
const prisma = new PrismaClient();

const outputSchema = z.object({
  title: z.string(),
  curated_entry_md: z.string(),
  summary_bullets: z.array(z.string()),
  themes: z.array(z.string()),
  emotional_timeline: z.array(z.object({ t: z.enum(['start', 'mid', 'end']), label: z.string(), evidence: z.string() })),
  key_moments: z.array(z.object({ timestamp_ms: z.number(), moment: z.string(), why_it_matters: z.string() })),
  followup_questions: z.array(z.string()),
  memory_candidates: z.array(z.object({ category: z.enum(['preference', 'goal', 'relationship', 'project', 'value', 'other']), text: z.string(), confidence: z.number() })),
});

const callCurator = async (transcript: string, fixJson?: string) => {
  const model = process.env.OPENAI_CURATOR_MODEL || 'gpt-4.1-mini';
  const prompt = fixJson
    ? `Fix this JSON to satisfy schema and output strict JSON only: ${fixJson}`
    : `You curate transcripts into strict JSON only. Transcript:\n${transcript}`;

  const start = Date.now();
  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model, input: prompt, text: { format: { type: 'json_object' } } }),
    });
    const data: any = await response.json();
    const text = data.output_text || data.output?.[0]?.content?.[0]?.text || '{}';
    return { text, latencyMs: Date.now() - start, model, ok: true };
  } catch (error: any) {
    return { text: '{}', latencyMs: Date.now() - start, model, ok: false, error: String(error) };
  }
};

new Worker('process_session', async (job) => {
  const { sessionId } = job.data as { sessionId: string };
  const session = await prisma.journalSession.findUnique({ where: { id: sessionId }, include: { utterances: true } });
  if (!session || session.utterances.length === 0) {
    if (session) await prisma.journalSession.update({ where: { id: session.id }, data: { status: SessionStatus.failed } });
    return;
  }

  const transcript = session.utterances
    .map((u) => `[${u.startMs ?? 0}-${u.endMs ?? 0}] ${u.speaker.toUpperCase()}: ${u.text}`)
    .join('\n');

  const first = await callCurator(transcript);
  await prisma.aiRequestLog.create({ data: { sessionId, kind: 'curate', model: first.model, latencyMs: first.latencyMs, status: first.ok ? 'ok' : 'error', error: first.error } });

  let parsed: any;
  try {
    parsed = outputSchema.parse(JSON.parse(first.text));
  } catch {
    const retry = await callCurator(transcript, first.text);
    try { parsed = outputSchema.parse(JSON.parse(retry.text)); } catch {
      await prisma.journalSession.update({ where: { id: sessionId }, data: { status: SessionStatus.failed } });
      return;
    }
  }

  await prisma.$transaction([
    prisma.journalSession.update({ where: { id: sessionId }, data: { status: SessionStatus.ready, title: parsed.title } }),
    prisma.artifact.upsert({
      where: { sessionId },
      create: {
        sessionId,
        curatedEntryMd: parsed.curated_entry_md,
        summaryBulletsJson: parsed.summary_bullets,
        themesJson: parsed.themes,
        emotionalTimelineJson: parsed.emotional_timeline,
        keyMomentsJson: parsed.key_moments,
        followupQuestionsJson: parsed.followup_questions,
      },
      update: {
        curatedEntryMd: parsed.curated_entry_md,
        summaryBulletsJson: parsed.summary_bullets,
        themesJson: parsed.themes,
        emotionalTimelineJson: parsed.emotional_timeline,
        keyMomentsJson: parsed.key_moments,
        followupQuestionsJson: parsed.followup_questions,
      },
    }),
    prisma.memoryCandidate.createMany({ data: parsed.memory_candidates.map((m: any) => ({ userId: session.userId, sessionId, category: m.category, text: m.text, confidence: m.confidence })) }),
  ]);
}, { connection: redis });
