type RuntimeLocals = {
  runtime?: {
    env?: Record<string, string | undefined>;
  };
};

function normalizeToken(token: string | undefined) {
  const trimmedToken = token?.trim();

  if (!trimmedToken) {
    return undefined;
  }

  const quote = trimmedToken[0];
  const hasMatchingQuotes =
    (quote === '"' || quote === "'") && trimmedToken.endsWith(quote);

  return hasMatchingQuotes ? trimmedToken.slice(1, -1).trim() : trimmedToken;
}

export function getSanityReadToken(locals?: RuntimeLocals) {
  return normalizeToken(
    locals?.runtime?.env?.SANITY_API_READ_TOKEN ??
      locals?.runtime?.env?.SANITY_API_TOKEN ??
      import.meta.env.SANITY_API_READ_TOKEN ??
      import.meta.env.SANITY_API_TOKEN
  );
}
