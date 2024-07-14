import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET;

const builder = imageUrlBuilder({
  projectId: projectId,
  dataset: dataset,
});

export function urlFor(source: SanityImageSource): string {
  let url = "";
  if (typeof source === "string") {
    url = builder.image(source).url();
  } else if ("asset" in source) {
    if ("_ref" in source.asset) {
      url = builder.image(source.asset._ref).url();
    } else if ("url" in source.asset) {
      url = source.asset.url;
    }
  } else if (
    "image" in source &&
    "asset" in source.image &&
    "_ref" in source.image.asset
  ) {
    url = builder.image(source.image.asset._ref).url();
  } else {
    url = "https://picsum.photos/500/500";
  }

  console.log("Image URL:", url);
  return url;
}
