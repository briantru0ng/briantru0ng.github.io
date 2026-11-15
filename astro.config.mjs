import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://briantruong.page',
  output: 'static',
  adapter: vercel(),
  // Astro's checkOrigin rejects our same-site form POSTs behind Vercel's proxy
  // (origin/proto mismatch). SameSite=Lax cookies already block cross-site authed
  // POSTs, so disabling this is safe for the event unlock/RSVP forms.
  security: {
    checkOrigin: false,
  },
  legacy: {
    collections: true,
  },
});
