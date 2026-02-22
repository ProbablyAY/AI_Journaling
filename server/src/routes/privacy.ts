import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../plugins/auth';

export async function privacyRoutes(app: FastifyInstance) {
  app.delete('/me', { preHandler: [requireAuth] }, async (req, reply) => {
    const userId = (req.user as any).sub;
    await prisma.user.delete({ where: { id: userId } });
    reply.clearCookie('token', { path: '/' });
    return { ok: true };
  });
}
