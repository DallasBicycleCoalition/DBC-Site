type RuntimeLocals = {
  runtime?: {
    env?: Record<string, string | undefined>;
  };
};

export function getSanityReadToken(locals?: RuntimeLocals) {
  return (
    locals?.runtime?.env?.SANITY_API_READ_TOKEN ??
    locals?.runtime?.env?.SANITY_API_TOKEN ??
    import.meta.env.SANITY_API_READ_TOKEN ??
    import.meta.env.SANITY_API_TOKEN
  );
}
