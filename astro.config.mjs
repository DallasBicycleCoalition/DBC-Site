// Loading environment variables from .env files
// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
const {
  PUBLIC_SANITY_STUDIO_PROJECT_ID,
  PUBLIC_SANITY_STUDIO_DATASET,
  PUBLIC_SANITY_PROJECT_ID,
  PUBLIC_SANITY_DATASET,
  SANITY_API_TOKEN
} = loadEnv(import.meta.env.MODE, process.cwd(), "");

// Different environments use different variables
const projectId = PUBLIC_SANITY_STUDIO_PROJECT_ID || PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_STUDIO_DATASET || PUBLIC_SANITY_DATASET;

// Change this depending on your hosting provider (Vercel, Netlify etc)
// https://docs.astro.build/en/guides/server-side-rendering/#adding-an-adapter
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // Hybrid+adapter is required to support embedded Sanity Studio
  output: "static",
  adapter: cloudflare(),
  integrations: [
    sanity({
      projectId,
      dataset,
      studioBasePath: "/admin",
      useCdn: false, // `false` if you want to ensure fresh data
      apiVersion: "2024-06-25", // Set to date of setup to use the latest API version
      token: SANITY_API_TOKEN,
    }),
    react(), // Required for Sanity Studio
  ],
});
