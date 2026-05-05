import type { ClientPerspective } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "sanity:client";
import { getSanityReadToken } from "./sanityToken";

const builder = createImageUrlBuilder(sanityClient);
const defaultFallbackImage = "/DallasBicycleCoalition_Badge_only.png";

type LocalImageUrlBuilder = {
  width: (width: number) => LocalImageUrlBuilder;
  height: (height: number) => LocalImageUrlBuilder;
  fit: (fit: string) => LocalImageUrlBuilder;
  url: () => string;
};

function localImageUrl(source: string): LocalImageUrlBuilder {
  const params = new URLSearchParams();

  return {
    width(width: number) {
      params.set("w", width.toString());
      return this;
    },
    height(height: number) {
      params.set("h", height.toString());
      return this;
    },
    fit(fit: string) {
      params.set("fit", fit);
      return this;
    },
    url() {
      return addImageParams(source, params);
    },
  };
}

export function urlFor(source: SanityImageSource | string) {
  if (typeof source === "string") {
    return localImageUrl(source);
  }

  return builder.image(source);
}

type PublicSanityImageAsset = {
  _id: string;
  url: string;
};

type ResolveImageOptions = {
  width: number;
  height: number;
  fixtureSeed: string;
  fallbackImagePath?: string;
};

const publicAssetCache = new Map<string, Promise<PublicSanityImageAsset[]>>();

function shouldUseFixtureImages() {
  return import.meta.env.PUBLIC_USE_LOCAL_SANITY_FIXTURES === "true";
}

function getConfiguredSanityPerspective(): ClientPerspective {
  const configuredPerspective = import.meta.env.SANITY_CONTENT_PERSPECTIVE;

  if (configuredPerspective) {
    return configuredPerspective as ClientPerspective;
  }

  if (
    import.meta.env.MODE === "development" ||
    import.meta.env.CF_PAGES_BRANCH === "staging"
  ) {
    return "drafts";
  }

  return "published";
}

function shouldRequireReadToken(perspective: ClientPerspective) {
  return import.meta.env.MODE !== "development" && perspective !== "published";
}

function addImageParams(source: string, params: URLSearchParams) {
  if (!params.size) {
    return source;
  }

  const isAbsoluteUrl = /^https?:\/\//.test(source);
  const url = new URL(source, "https://local.invalid");

  params.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  if (isAbsoluteUrl) {
    return url.toString();
  }

  return `${url.pathname}${url.search}${url.hash}`;
}

function hashSeed(seed: string) {
  return Array.from(seed).reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0
  );
}

async function fetchPublicSanityImageAssets(width: number, height: number) {
  const cacheKey = `${width}x${height}`;
  const cachedAssets = publicAssetCache.get(cacheKey);

  if (cachedAssets) {
    return cachedAssets;
  }

  const assetFetch = sanityClient.fetch<PublicSanityImageAsset[]>(
    `*[
      _type == "sanity.imageAsset" &&
      metadata.dimensions.width >= $width &&
      metadata.dimensions.height >= $height
    ] | order(_createdAt desc)[0...50]{
      _id,
      url
    }`,
    { width, height }
  );

  publicAssetCache.set(cacheKey, assetFetch);
  return assetFetch;
}

async function getFixtureImageUrl(options: ResolveImageOptions) {
  const fallbackImage = options.fallbackImagePath || defaultFallbackImage;

  try {
    const assets = await fetchPublicSanityImageAssets(
      options.width,
      options.height
    );

    if (!assets.length) {
      return fallbackImage;
    }

    const selectedAsset = assets[hashSeed(options.fixtureSeed) % assets.length];

    return urlFor(selectedAsset.url)
      .width(options.width)
      .height(options.height)
      .fit("crop")
      .url();
  } catch {
    return fallbackImage;
  }
}

export async function resolveImageUrl(
  source: SanityImageSource | string | null | undefined,
  options: ResolveImageOptions
) {
  if (source) {
    return urlFor(source)
      .width(options.width)
      .height(options.height)
      .fit("crop")
      .url();
  }

  return shouldUseFixtureImages()
    ? getFixtureImageUrl(options)
    : options.fallbackImagePath || defaultFallbackImage;
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
 * Defaults to "published" in production and "drafts" in development/staging.
 */
export async function fetchSanityData<T>(
  query: string,
  params: Record<string, any> = {}
): Promise<T> {
  const perspective = getConfiguredSanityPerspective();
  const token = getSanityReadToken();

  if (shouldRequireReadToken(perspective) && !token) {
    throw new Error(
      '`SANITY_API_READ_TOKEN` or `SANITY_API_TOKEN` is required when Sanity content perspective is not "published".'
    );
  }

  return sanityClient.fetch(query, params, {
    perspective,
    ...(token ? { token } : {}),
  });
}
