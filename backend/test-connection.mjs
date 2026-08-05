// Quick health check: `npm run test:db` (from the backend/ folder).
import { ping, getDb, closeDb } from './db.js';

const t0 = Date.now();
try {
  await ping();
  const db = await getDb();
  const cols = await db.listCollections().toArray();
  console.log('✅ Connected to MongoDB Atlas in', Date.now() - t0, 'ms');
  console.log('   Database:', db.databaseName);
  console.log('   Collections:', cols.length ? cols.map(c => c.name).join(', ') : '(none yet)');
} catch (err) {
  console.error('❌ Connection failed:', err.message);
  console.error('   Checklist: (1) username/password in backend/.env correct?');
  console.error('              (2) your current IP added in Atlas -> Network Access?');
  process.exitCode = 1;
} finally {
  await closeDb();
}
