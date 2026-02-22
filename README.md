# AI Journaling MVP

## Run locally
1. Start infra:
   ```bash
   cd infra && docker-compose up -d
   ```
2. Configure env files:
   - copy `server/.env.example` to `server/.env`
   - copy `worker/.env.example` to `worker/.env`
   - copy `frontend/.env.example` to `frontend/.env`
3. Run Prisma migration + generate:
   ```bash
   cd server
   npm install
   npx prisma migrate dev --name init
   npx prisma generate
   ```
4. Start server:
   ```bash
   cd server
   npm run dev
   ```
5. Start worker:
   ```bash
   cd worker
   npm install
   npm run dev
   ```
6. Start frontend:
   ```bash
   cd frontend
   yarn start
   ```

## Notes
- Audio is never persisted.
- Only transcript utterances + generated artifacts are stored.
- Memory is proposed as candidates and only retained long-term after explicit approval.
