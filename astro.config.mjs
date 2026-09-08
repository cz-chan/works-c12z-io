// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import vercel from "@astrojs/vercel"
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig( {
  site: "https://works.c12z.io",
  output: 'static',
  integrations: [ mdx(), sitemap() ],
  adapter: vercel( {
    webAnalytics: {
      enabled: true,
    },
  } ),
} );