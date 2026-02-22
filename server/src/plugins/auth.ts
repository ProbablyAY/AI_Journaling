import { FastifyReply, FastifyRequest } from 'fastify';

export const requireAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch {
    return reply.code(401).send({ message: 'Unauthorized' });
  }
};
