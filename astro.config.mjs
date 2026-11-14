import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  site: 'https://briantruong.page',
  output: 'hybrid',
  adapter: vercel(),
});
