// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import { readFileSync, writeFileSync } from 'node:fs';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
} = loadEnv(import.meta.env.MODE, process.cwd(), '');

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import cloudflare from '@astrojs/cloudflare';

// Sanity's browser Studio uses styled-components, but its browser-oriented bundle should not
// be loaded while workerd renders SSR. Stub it only in the `ssr` environment.
const styledComponentsStub = fileURLToPath(new URL('./src/stubs/styled-components.js', import.meta.url));

// @astrojs/cloudflare v13 auto-adds a SESSION KV binding to the generated wrangler.json
// even when sessions are not used. Without an `id`, wrangler deploy throws
// "SESSION bindings must have an 'id' field". Strip it post-build.
const stripUnusedCloudflareBindings = {
  name: 'strip-unused-cloudflare-bindings',
  hooks: {
    'astro:build:done': ({ logger }) => {
      const wranglerPath = new URL('./dist/server/wrangler.json', import.meta.url);
      try {
        const config = JSON.parse(readFileSync(wranglerPath, 'utf-8'));
        const strip = arr => (arr || []).filter(kv => kv.id !== undefined || kv.binding !== 'SESSION');
        config.kv_namespaces = strip(config.kv_namespaces);
        if (config.previews?.kv_namespaces) config.previews.kv_namespaces = strip(config.previews.kv_namespaces);
        writeFileSync(wranglerPath, JSON.stringify(config));
        logger.info('Stripped unused SESSION KV binding from wrangler.json');
      } catch {
        // wrangler.json may not exist in non-server builds; ignore
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  // Hybrid+adapter is required to support embedded Sanity Studio
  output: 'static',
  redirects: {
    '/week-without-driving': 'https://dallasweekwithoutdriving.org/',
  },
  adapter: cloudflare({
    // 'passthrough' avoids requiring a Cloudflare Images binding (IMAGES) in the dashboard.
    // This site does not use Cloudflare's image transformation service.
    imageService: 'passthrough',
  }),
  integrations: [
    stripUnusedCloudflareBindings,
    sanity({
      projectId,
      dataset,
      studioBasePath: '/admin',
      studioRouterHistory: 'browser',
      useCdn: false, // `false` if you want to ensure fresh data
      apiVersion: '2024-06-25', // Set to date of setup to use the latest API version
      stega: {
        studioUrl: '/admin',
      },
    }),
    react(), // Required for Sanity Studio
  ],
  vite: {
    optimizeDeps: {
      include: [
        'react/compiler-runtime',
        'lodash/isObject.js',
        'lodash/groupBy.js',
        'lodash/keyBy.js',
        'lodash/partition.js',
        'lodash/sortedIndex.js',
      ],
    },
    resolve: {
      // React 19: use the edge build of react-dom/server, not the browser build that
      // workerd's resolve conditions ("browser") would otherwise pick. Required in dev AND
      // build, because with @astrojs/cloudflare v13 the dev server also renders SSR in
      // workerd — and the browser build leaves React's hook dispatcher null there, which
      // breaks server-rendered React components like @portabletext/react's <PortableText>.
      alias: {
        'react-dom/server': 'react-dom/server.edge',
      },
    },
    // Stub styled-components only in the workerd `ssr` environment (see note above).
    environments: {
      ssr: {
        resolve: {
          alias: {
            'styled-components': styledComponentsStub,
          },
        },
      },
    },
  },
});
