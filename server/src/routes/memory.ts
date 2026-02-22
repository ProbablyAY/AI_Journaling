import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../plugins/auth';

export async function memoryRoutes(app: FastifyInstance) {
  app.get('/memory', { preHandler: [requireAuth] }, async (req) => {
    const userId = (req.user as any).sub;
    const memories = await prisma.memoryCandidate.findMany({ where: { userId, approvedAt: { not: null } }, orderBy: { createdAt: 'desc' } });
    return { memories };
  });

  app.post('/memory/:id/approve', { preHandler: [requireAuth] }, async (req, reply) => {
    const userId = (req.user as any).sub;
    const memory = await prisma.memoryCandidate.findUnique({ where: { id: (req.params as any).id } });
    if (!memory || memory.userId !== userId) return reply.code(404).send({ message: 'Not found' });
    await prisma.memoryCandidate.update({ where: { id: memory.id }, data: { approvedAt: new Date(), rejectedAt: null } });
    return { ok: true };
  });

  app.post('/memory/:id/reject', { preHandler: [requireAuth] }, async (req, reply) => {
    const userId = (req.user as any).sub;
    const memory = await prisma.memoryCandidate.findUnique({ where: { id: (req.params as any).id } });
    if (!memory || memory.userId !== userId) return reply.code(404).send({ message: 'Not found' });
    await prisma.memoryCandidate.update({ where: { id: memory.id }, data: { rejectedAt: new Date(), approvedAt: null } });
    return { ok: true };
  });
}
