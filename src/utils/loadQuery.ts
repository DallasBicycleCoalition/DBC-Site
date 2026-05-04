import type { ClientPerspective, QueryParams } from "@sanity/client";
import { sanityClient } from "sanity:client";

function parsePerspective(raw: string | undefined): ClientPerspective | undefined {
  if (!raw) {
    return undefined;
  }

  const decoded = decodeURIComponent(raw);

  if (decoded.startsWith("[")) {
    try {
      return JSON.parse(decoded) as ClientPerspective;
    } catch {
      return undefined;
    }
  }

  return decoded as ClientPerspective;
}

export async function loadQuery<QueryResponse>({
  query,
  params,
  perspectiveCookie,
  token,
}: {
  query: string;
  params?: QueryParams;
  perspectiveCookie?: string;
  token?: string;
}) {
  const draftMode = Boolean(perspectiveCookie);

  if (draftMode && !token) {
    throw new Error(
      "The `SANITY_API_READ_TOKEN` environment variable is required during Visual Editing."
    );
  }

  const perspective: ClientPerspective = draftMode
    ? (parsePerspective(perspectiveCookie) ?? "drafts")
    : "published";

  const { result, resultSourceMap } = await sanityClient.fetch<QueryResponse>(
    query,
    params ?? {},
    {
      filterResponse: false,
      perspective,
      resultSourceMap: draftMode ? "withKeyArraySelector" : false,
      stega: draftMode,
      ...(draftMode ? { token } : {}),
    }
  );

  return {
    data: result,
    sourceMap: resultSourceMap,
    perspective,
  };
}
