import { FastifyInstance } from 'fastify';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { requireAuth } from '../plugins/auth';

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function authRoutes(app: FastifyInstance) {
  app.post('/auth/signup', async (req, reply) => {
    const body = schema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: body.email } });
    if (existing) return reply.code(409).send({ message: 'Email already exists' });
    const user = await prisma.user.create({ data: { email: body.email, passwordHash: await bcrypt.hash(body.password, 10) } });
    const token = app.jwt.sign({ sub: user.id, email: user.email });
    reply.setCookie('token', token, { httpOnly: true, sameSite: 'lax', path: '/' });
    return { user: { id: user.id, email: user.email } };
  });

  app.post('/auth/login', async (req, reply) => {
    const body = schema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user || !(await bcrypt.compare(body.password, user.passwordHash))) return reply.code(401).send({ message: 'Invalid credentials' });
    const token = app.jwt.sign({ sub: user.id, email: user.email });
    reply.setCookie('token', token, { httpOnly: true, sameSite: 'lax', path: '/' });
    return { user: { id: user.id, email: user.email } };
  });

  app.post('/auth/logout', async (_req, reply) => {
    reply.clearCookie('token', { path: '/' });
    return { ok: true };
  });

  app.get('/me', { preHandler: [requireAuth] }, async (req) => {
    return { user: req.user };
  });
}
