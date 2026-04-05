import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { sanityClient } from "sanity:client";

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

/**
 * Extract all unique tags from an array of events.
 * Each tag should have at least an id and name.
 */
export function getUniqueTagsFromEvents<
  T extends {
    tags?: Array<{
      id: string;
      name?: string;
      description?: string | null;
    }> | null;
  },
>(events: T[]) {
  const tagMap = new Map<
    string,
    { id: string; name: string | null; description: string | null }
  >();
  events.forEach((event) => {
    const tags = event.tags;
    tags?.forEach((tag) => {
      if (tag && tag.id && !tagMap.has(tag.id)) {
        tagMap.set(tag.id, {
          id: tag.id,
          name: tag.name ?? null,
          description: tag.description ?? null,
        });
      }
    });
  });
  return Array.from(tagMap.values());
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
