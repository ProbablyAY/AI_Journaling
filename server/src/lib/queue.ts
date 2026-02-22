import { Queue } from 'bullmq';
import { redis } from './redis';

export const processSessionQueue = new Queue('process_session', { connection: redis });
