// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import vercel from "@astrojs/vercel"
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

import { hastExternalLinks } from '@plugins/markdown/hast-external-links.ts';

// https://astro.build/config
export default defineConfig( {
  site: "https://works.c12z.io",
  output: 'static',
  markdown: {
    processor: satteri( { hastPlugins: [ hastExternalLinks ] } ),
  },
  integrations: [ mdx(), sitemap() ],
  adapter: vercel( {
    webAnalytics: {
      enabled: true,
    },
  } ),
} );