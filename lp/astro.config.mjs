// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: confirmar domínio final antes do deploy (Task 10)
const SITE = 'https://transformacaoeequilibrio.com.br';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
});
