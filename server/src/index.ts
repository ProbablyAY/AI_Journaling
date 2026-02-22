import 'dotenv/config';
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import { authRoutes } from './routes/auth';
import { sessionRoutes } from './routes/sessions';
import { memoryRoutes } from './routes/memory';
import { privacyRoutes } from './routes/privacy';

const app = Fastify({ logger: true });

app.register(cors, { origin: process.env.CORS_ORIGIN || 'http://localhost:3000', credentials: true });
app.register(cookie);
app.register(jwt, { secret: process.env.JWT_SECRET || 'dev-secret', cookie: { cookieName: 'token', signed: false } });

app.decorate('authenticate', async function(request: any, reply: any) { await request.jwtVerify(); });

app.register(authRoutes);
app.register(sessionRoutes);
app.register(memoryRoutes);
app.register(privacyRoutes);

app.listen({ port: 4000, host: '0.0.0.0' }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
