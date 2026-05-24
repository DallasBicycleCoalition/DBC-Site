function getRuntimeEnv(locals?: unknown) {
  if (!locals || typeof locals !== 'object' || !('runtime' in locals)) {
    return undefined;
  }

  const { runtime } = locals as {
    runtime?: {
      env?: Record<string, string | undefined>;
    };
  };

  return runtime?.env;
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
