import type { APIRoute } from 'astro';
import { checkPassword, signToken, cookieName } from '../../lib/eventAuth';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const form = await request.formData();
  const slug = String(form.get('slug') ?? '');
  const password = String(form.get('password') ?? '');
  if (!slug) return new Response('Bad request', { status: 400 });

  if (checkPassword(slug, password)) {
    cookies.set(cookieName(slug), signToken(slug), {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return redirect(`/events/${slug}`, 303);
  }

  return redirect(`/events/${slug}?error=1`, 303);
};
