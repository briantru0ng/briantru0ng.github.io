import { MongoClient, type Db } from 'mongodb';

/**
 * MongoDB access for event RSVPs.
 *
 * The client is cached across serverless invocations so warm functions reuse a
 * single connection instead of exhausting the Atlas connection limit.
 * Connection string comes from the MONGODB_URI env var (set in Vercel).
 */

let clientPromise: Promise<MongoClient> | undefined;

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

async function getDb(): Promise<Db> {
  return (await getClient()).db('events');
}

export interface Rsvp {
  eventSlug: string;
  name: string;
  bringing: string;
  note?: string;
  createdAt: Date;
}

/** All RSVPs for an event, oldest first. */
export async function getRsvps(eventSlug: string): Promise<Rsvp[]> {
  const db = await getDb();
  return db
    .collection<Rsvp>('rsvps')
    .find({ eventSlug })
    .sort({ createdAt: 1 })
    .toArray();
}

/** Record one RSVP. */
export async function addRsvp(entry: Omit<Rsvp, 'createdAt'>): Promise<void> {
  const db = await getDb();
  await db.collection<Rsvp>('rsvps').insertOne({ ...entry, createdAt: new Date() });
}
