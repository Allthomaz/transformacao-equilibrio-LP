// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Usar o domínio provisório da Vercel até o domínio próprio apontar para este projeto.
const SITE = 'https://transformacao-equilibrio-lp.vercel.app';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
});
