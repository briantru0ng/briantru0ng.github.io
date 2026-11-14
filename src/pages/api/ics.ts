import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { cookieName, verifyToken } from '../../lib/eventAuth';
import { buildICS } from '../../lib/ics';

export const prerender = false;

export const GET: APIRoute = async ({ url, cookies }) => {
  const slug = url.searchParams.get('slug') ?? '';
  if (!slug) return new Response('Bad request', { status: 400 });

  // The .ics contains the private details, so gate it like the page.
  if (!verifyToken(slug, cookies.get(cookieName(slug))?.value)) {
    return new Response('Unauthorized', { status: 401 });
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
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug}.ics"`,
    },
  });
};
