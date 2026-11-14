import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://briantruong.page',
  output: 'static',
  legacy: {
    collections: true,
  },
});
