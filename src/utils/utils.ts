import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Fetch data from Sanity with an optional perspective.
 * Defaults to "published" in production and "raw" in development.
 */
export async function fetchSanityData<T>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  const isDev = import.meta.env.MODE === "development";

  return sanityClient.fetch(query, params, {
    perspective: isDev ? "drafts" : "published",
  });
}
