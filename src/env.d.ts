/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "sanity:client" {
  export const sanityClient: import("@sanity/client").SanityClient;
}

declare module "sanity:studio" {
  export const config: import("sanity").Config;
}
