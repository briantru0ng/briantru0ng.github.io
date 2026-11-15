import crypto from 'node:crypto';

/**
 * Event access control for password-gated event pages.
 *
 * Passwords are NEVER stored in the repo (it is public). Each event's password
 * lives in a Vercel env var named EVENT_PW_<NORMALIZED_SLUG>, e.g. the slug
 * "friendsgiving2026" -> env var EVENT_PW_FRIENDSGIVING2026.
 *
 * On a correct password we set an httpOnly cookie whose value is an HMAC of the
 * slug keyed by AUTH_SECRET. Only the server can produce that HMAC, so a valid
 * cookie proves the visitor unlocked the event.
 */

const normalize = (slug: string) => slug.toUpperCase().replace(/[^A-Z0-9]/g, '_');

/**
 * Read an env var that works in both environments. Vercel populates
 * `process.env` at runtime; `astro dev` (Vite) loads `.env` into
 * `import.meta.env` on the server but NOT into `process.env`. Check
 * `process.env` first (production) then fall back to `import.meta.env` (dev).
 */
export const readEnv = (key: string): string | undefined =>
  process.env[key] ?? (import.meta.env as Record<string, string | undefined>)[key];

/** Env var name that holds the password for a given event slug. */
export const pwEnvName = (slug: string) => `EVENT_PW_${normalize(slug)}`;

/** The configured password for a slug, or undefined if none is set. */
export const getEventPassword = (slug: string): string | undefined =>
  readEnv(pwEnvName(slug));

/** Cookie name that holds the unlock token for a given slug. */
export const cookieName = (slug: string) =>
  `ev_${slug.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;

const authSecret = (): string => readEnv('AUTH_SECRET') ?? '';

/** HMAC unlock token for a slug. */
export function signToken(slug: string): string {
  return crypto.createHmac('sha256', authSecret()).update(slug).digest('hex');
}

/** Constant-time check that a cookie token is valid for a slug. */
export function verifyToken(slug: string, token: string | undefined): boolean {
  if (!token || !authSecret()) return false;
  const expected = signToken(slug);
  if (token.length !== expected.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(token, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

/** Constant-time password comparison against the event's configured password. */
export function checkPassword(slug: string, submitted: string): boolean {
  const expected = getEventPassword(slug);
  if (!expected) return false;
  const a = Buffer.from(submitted);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}
