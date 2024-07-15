import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import type { ImageUrlBuilder } from "sanity";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

const builder = imageUrlBuilder({
  projectId: projectId,
  dataset: dataset,
});

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  if (typeof source === "string") {
    return builder.image(source);
  } else if ("asset" in source) {
    if ("_ref" in source.asset) {
      return builder.image(source.asset._ref);
    } else if ("url" in source.asset) {
      return source.asset.url;
    }
  } else if (
    "image" in source &&
    "asset" in source.image &&
    "_ref" in source.image.asset
  ) {
    return builder.image(source.image.asset._ref);
  }
  return builder.image("");
}
