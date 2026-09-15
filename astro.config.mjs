// @ts-check
import { defineConfig, envField } from 'astro/config';

import mdx from '@astrojs/mdx';
import vercel from "@astrojs/vercel"
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';

import { hastExternalLinks } from '@plugins/markdown/hast-external-links.ts';

// https://astro.build/config
export default defineConfig( {
  site: "https://works.c12z.io",
  output: 'static',
  env: {
    schema: {
      CLOUDFLARE_TURNSTILE_PUBLIC_KEY: envField.string( {
        context: 'client',
        access: 'public',
      } ),
      CLOUDFLARE_TURNSTILE_SECRET_KEY: envField.string( {
        context: 'server',
        access: 'secret',
      } ),
    }
  },
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