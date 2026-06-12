function getRuntimeEnv(locals?: unknown) {
  if (!locals || typeof locals !== 'object' || !('runtime' in locals)) {
    return undefined;
  }

  // In Astro v6 + @astrojs/cloudflare v13, runtime.env was removed and the
  // getter throws. Catch it and fall through to import.meta.env below.
  try {
    const { runtime } = locals as {
      runtime?: {
        env?: Record<string, string | undefined>;
      };
    };
    return runtime?.env;
  } catch {
    return undefined;
  }
}

export function getSanityReadToken(locals?: unknown) {
  const runtimeEnv = getRuntimeEnv(locals);

  return (
    runtimeEnv?.SANITY_API_READ_TOKEN ??
    runtimeEnv?.SANITY_API_TOKEN ??
    import.meta.env.SANITY_API_READ_TOKEN ??
    import.meta.env.SANITY_API_TOKEN
  );
}
