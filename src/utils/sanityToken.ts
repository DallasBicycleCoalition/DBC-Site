import { env } from 'cloudflare:workers';

const workerEnv = env as Record<string, string | undefined>;

export function getSanityReadToken() {
  return (
    workerEnv.SANITY_API_READ_TOKEN ??
    workerEnv.SANITY_API_TOKEN ??
    import.meta.env.SANITY_API_READ_TOKEN ??
    import.meta.env.SANITY_API_TOKEN
  );
}
