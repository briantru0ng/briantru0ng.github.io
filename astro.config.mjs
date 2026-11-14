import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://briantruong.page',
  output: 'static',
  adapter: vercel(),
  legacy: {
    collections: true,
  },
});
