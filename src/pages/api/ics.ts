import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { cookieName, verifyToken } from '../../lib/eventAuth';
import { buildICS } from '../../lib/ics';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const slug = url.searchParams.get('slug') ?? '';
  if (!slug) return new Response('Bad request', { status: 400 });

  // The .ics contains the private details, so gate it like the page. If the
  // unlock cookie is missing/stale, send them to the lock screen to re-enter
  // the password instead of showing a bare "Unauthorized".
  if (!verifyToken(slug, cookies.get(cookieName(slug))?.value)) {
    return redirect(`/events/${slug}?error=1`, 303);
  }

  const events = await getCollection('events');
  const entry = events.find((e) => e.slug === slug);
  if (!entry) return new Response('Not found', { status: 404 });

  const { title, date, endDate, location, address, description } = entry.data;
  const ics = buildICS({
    uid: `${slug}@briantruong.page`,
    title,
    start: date,
    end: endDate,
    location: [location, address].filter(Boolean).join(', ') || undefined,
    description,
  });

  return new Response(ics, {
    headers: {
      // `inline` (not `attachment`) is deliberate: iOS Safari only opens the
      // Calendar "Add Event" sheet for a text/calendar response served inline.
      // With `attachment` it silently downloads the .ics to Files and leaves
      // the user on the page (looks like nothing happened). Desktop/Android
      // browsers have no calendar viewer, so they still download it regardless.
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `inline; filename="${slug}.ics"`,
    },
  });
};
