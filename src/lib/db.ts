import { MongoClient, ObjectId, type Db } from 'mongodb';
import { readEnv } from './eventAuth';

/**
 * MongoDB access for event RSVPs.
 *
 * The client is cached across serverless invocations so warm functions reuse a
 * single connection instead of exhausting the Atlas connection limit.
 * Connection string comes from the MONGODB_URI env var (set in Vercel).
 */

let clientPromise: Promise<MongoClient> | undefined;

function getClient(): Promise<MongoClient> {
  const uri = readEnv('MONGODB_URI');
  if (!uri) throw new Error('MONGODB_URI is not set');
  if (!clientPromise) {
    clientPromise = new MongoClient(uri).connect();
  }
  return clientPromise;
}

async function getDb(): Promise<Db> {
  return (await getClient()).db('events');
}

/** Stored RSVP document shape (Mongo adds its own `_id`). */
interface RsvpDoc {
  eventSlug: string;
  name: string;
  bringing: string;
  note?: string;
  createdAt: Date;
}

/** RSVP as returned to callers: stored fields plus the stringified `_id`. */
export interface Rsvp extends RsvpDoc {
  id: string;
}

/** Fields required to create a new RSVP. */
export type NewRsvp = Omit<RsvpDoc, 'createdAt'>;

/** All RSVPs for an event, oldest first. */
export async function getRsvps(eventSlug: string): Promise<Rsvp[]> {
  const db = await getDb();
  const docs = await db
    .collection<RsvpDoc>('rsvps')
    .find({ eventSlug })
    .sort({ createdAt: 1 })
    .toArray();
  return docs.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }));
}

/** Record one RSVP. */
export async function addRsvp(entry: NewRsvp): Promise<void> {
  const db = await getDb();
  await db.collection<RsvpDoc>('rsvps').insertOne({ ...entry, createdAt: new Date() });
}

/** Delete one RSVP by id, scoped to its event. Returns true if a doc was removed. */
export async function deleteRsvp(eventSlug: string, id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) return false;
  const db = await getDb();
  const res = await db
    .collection<RsvpDoc>('rsvps')
    .deleteOne({ _id: new ObjectId(id), eventSlug });
  return res.deletedCount === 1;
}
