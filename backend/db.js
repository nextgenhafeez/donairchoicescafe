// ------------------------------------------------------------------
// Reusable, stable MongoDB connection (singleton + pooling).
// Import getDb() anywhere; the client connects once and is reused,
// which is what keeps the connection "stable" across many requests.
// ------------------------------------------------------------------
import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri || uri.includes('<DB_USERNAME>') || uri.includes('<DB_PASSWORD>')) {
  throw new Error(
    'MONGODB_URI is missing or still contains a placeholder. ' +
    'Edit backend/.env and set your real Atlas username/password.'
  );
}

// One shared client for the whole process (connection pooling built in).
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  maxPoolSize: 10,            // reuse up to 10 sockets
  minPoolSize: 0,
  serverSelectionTimeoutMS: 8000,
  socketTimeoutMS: 45000,
  retryWrites: true,
});

let connected = false;

/** Connect once and return the Db handle. Safe to call repeatedly. */
export async function getDb() {
  if (!connected) {
    await client.connect();
    connected = true;
  }
  return client.db(process.env.DB_NAME || 'donair_choices');
}

/** Ping the deployment — returns true if the connection is healthy. */
export async function ping() {
  const db = await getDb();
  await db.command({ ping: 1 });
  return true;
}

/** Close the pool (call on graceful shutdown). */
export async function closeDb() {
  if (connected) { await client.close(); connected = false; }
}

// Close cleanly when the process is asked to stop.
for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, async () => { await closeDb(); process.exit(0); });
}
