import type { APIRoute } from 'astro';
import { cookieName, verifyToken } from '../../lib/eventAuth';
import { addRsvp } from '../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const slug = String(form.get('slug') ?? '');
  if (!slug) return new Response('Bad request', { status: 400 });

  // Must have unlocked this event first.
  if (!verifyToken(slug, cookies.get(cookieName(slug))?.value)) {
    return redirect(`/events/${slug}?error=1`, 303);
  }

  const name = String(form.get('name') ?? '').trim().slice(0, 80);
  const bringing = String(form.get('bringing') ?? '').trim().slice(0, 120);
  const note = String(form.get('note') ?? '').trim().slice(0, 200);
  if (!name) return redirect(`/events/${slug}`, 303);

  try {
    await addRsvp({ eventSlug: slug, name, bringing, note: note || undefined });
  } catch {
    return redirect(`/events/${slug}?rsvp=err`, 303);
  }

  return redirect(`/events/${slug}?rsvp=ok`, 303);
};
