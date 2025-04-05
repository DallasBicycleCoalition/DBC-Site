/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type WeekWithoutDriving = {
  _id: string;
  _type: "weekWithoutDriving";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  introBlock?: {
    heading?: string;
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
  };
};

export type PolicyPage = {
  _id: string;
  _type: "policyPage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  introBlock?: {
    heading?: string;
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
  };
  policyRows?: Array<{
    policy?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    summary?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    moreInfo?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    _key: string;
  }>;
  legislativeDemands?: {
    heading?: string;
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
  };
};

export type Layout = {
  _id: string;
  _type: "layout";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  logo?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    altText?: string;
    _type: "image";
  };
  landingPageLink?: string;
  footerBackground?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    altText?: string;
    _type: "image";
  };
};

export type Homepage = {
  _id: string;
  _type: "homepage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  homePageHeroImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    altText?: string;
    _type: "image";
  };
  slug?: Slug;
  content?: string;
  whoWeAre?: {
    heading?: string;
    photo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      altText?: string;
      _type: "image";
    };
    highlightedContent?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
  };
  whatWeDo?: {
    heading?: string;
    whatWeDoPics?: Array<{
      _key: string;
    } & CaptionedImage>;
  };
  bikePlan?: {
    heading?: string;
    highlightedContent?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    photo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      altText?: string;
      _type: "image";
    };
  };
};

export type EmailCityCouncil = {
  _id: string;
  _type: "emailCityCouncil";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  links?: Array<{
    title?: string;
    url?: string;
    _type: "link";
    _key: string;
  }>;
};

export type CaptionedImage = {
  _type: "captionedImage";
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
  altText?: string;
  highlightedCaption?: string;
  caption?: string;
};

export type AboutUs = {
  _id: string;
  _type: "aboutUs";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  vision?: {
    heading?: string;
    highlightedContent?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    photo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      altText?: string;
      _type: "image";
    };
  };
  mission?: {
    heading?: string;
    highlightedContent?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    content?: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }>;
    photo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      altText?: string;
      _type: "image";
    };
  };
  team?: {
    heading?: string;
    members?: Array<{
      name?: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }>;
      _key: string;
    }>;
    photo?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      altText?: string;
      _type: "image";
    };
  };
};

export type Tag = {
  _id: string;
  _type: "tag";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  description?: string;
};

export type Post = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "author";
  };
  publishedAt?: string;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    altText?: string;
    _type: "image";
  };
  excerpt?: string;
  body?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    _key: string;
  } & CaptionedImage>;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type Events = {
  _id: string;
  _type: "events";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  tags?: Array<{
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    _key: string;
    [internalGroqTypeReferenceTo]?: "tag";
  }>;
  date?: RecurringDates;
  allDay?: boolean;
  location?: string;
  excerpt?: string;
  description?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
  photo?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
};

export type Author = {
  _id: string;
  _type: "author";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  bio?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type: "image";
  };
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type RecurringDates = {
  _type: "recurringDates";
  startDate?: string;
  endDate?: string;
  recurs?: boolean;
  rrule?: string;
};

export type AllSanitySchemaTypes = SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityFileAsset | Geopoint | WeekWithoutDriving | PolicyPage | Layout | Homepage | EmailCityCouncil | CaptionedImage | AboutUs | Tag | Post | Slug | Events | Author | SanityImageCrop | SanityImageHotspot | SanityImageAsset | SanityAssetSourceData | SanityImageMetadata | RecurringDates;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/utils/groqQueries.ts
// Variable: posts
// Query: *[_type == "post" && defined(slug.current)] | order(_createdAt desc) [$start...$end]
export type PostsResult = Array<{
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "author";
  };
  publishedAt?: string;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    altText?: string;
    _type: "image";
  };
  excerpt?: string;
  body?: Array<{
    _key: string;
  } & CaptionedImage | {
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
}>;
// Variable: post
// Query: *[_type == "post" && slug.current == $slug][0]{ ..., author->{ name } }
export type PostResult = {
  _id: string;
  _type: "post";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  author: {
    name: string | null;
  } | null;
  publishedAt?: string;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    altText?: string;
    _type: "image";
  };
  excerpt?: string;
  body?: Array<{
    _key: string;
  } & CaptionedImage | {
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }>;
} | null;
// Variable: homePage
// Query: *[_type == "homepage"]{      _id, _createdAt, title, "slug": slug.current, content,      "homePageHeroImage": { "asset": homePageHeroImage.asset->url, "altText": homePageHeroImage.altText },      "whoWeAre": {        "heading": whoWeAre.heading,        "photo": { "asset": whoWeAre.photo.asset->url, "altText": whoWeAre.photo.altText },        "highlightedContent": whoWeAre.highlightedContent,        "content": whoWeAre.content      },      "whatWeDo": {        "heading": whatWeDo.heading,        "whatWeDoPics": whatWeDo.whatWeDoPics[] { "image": image.asset->url, "altText": altText, "highlightedCaption": highlightedCaption, "caption": caption }      },      "bikePlan": {        "heading": bikePlan.heading,        "highlightedContent": bikePlan.highlightedContent,        "content": bikePlan.content,        "photo": { "asset": bikePlan.photo.asset->url, "altText": bikePlan.photo.altText }      },      "dallasBikeRide": {        "heading": dallasBikeRide.heading,        "photo": { "asset": dallasBikeRide.photo.asset->url, "altText": dallasBikeRide.photo.altText },        "content": dallasBikeRide.content      }    }[0]
export type HomePageResult = {
  _id: string;
  _createdAt: string;
  title: string | null;
  slug: string | null;
  content: string | null;
  homePageHeroImage: {
    asset: string | null;
    altText: string | null;
  };
  whoWeAre: {
    heading: string | null;
    photo: {
      asset: string | null;
      altText: string | null;
    };
    highlightedContent: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
  };
  whatWeDo: {
    heading: string | null;
    whatWeDoPics: Array<{
      image: string | null;
      altText: string | null;
      highlightedCaption: string | null;
      caption: string | null;
    }> | null;
  };
  bikePlan: {
    heading: string | null;
    highlightedContent: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    photo: {
      asset: string | null;
      altText: string | null;
    };
  };
  dallasBikeRide: {
    heading: null;
    photo: {
      asset: null;
      altText: null;
    };
    content: null;
  };
} | null;
// Variable: policyPage
// Query: *[_type == "policyPage"]{      _id, _createdAt, title,      "introBlock": { "heading": introBlock.heading, "content": introBlock.content },      "policyRows": policyRows[] { "policy": policy, "summary": summary, "moreInfo": moreInfo },      "legislativeDemands": { "heading": legislativeDemands.heading, "content": legislativeDemands.content }    }[0]
export type PolicyPageResult = {
  _id: string;
  _createdAt: string;
  title: string | null;
  introBlock: {
    heading: string | null;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
  };
  policyRows: Array<{
    policy: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    summary: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    moreInfo: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
  }> | null;
  legislativeDemands: {
    heading: string | null;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
  };
} | null;
// Variable: layout
// Query: *[_type == "layout"][0]{      _id, _createdAt,      "logo": { "asset": logo.asset->url, "altText": logo.altText },      "landingPageLink": landingPageLink,      "footerBackground": { "asset": footerBackground.asset->url, "altText": footerBackground.altText },    }
export type LayoutResult = {
  _id: string;
  _createdAt: string;
  logo: {
    asset: string | null;
    altText: string | null;
  };
  landingPageLink: string | null;
  footerBackground: {
    asset: string | null;
    altText: string | null;
  };
} | null;
// Variable: aboutUsPage
// Query: *[_type == "aboutUs"]{      _id, _createdAt, title,      "mission": { "heading": mission.heading, "content": mission.content, "highlightedContent": mission.highlightedContent, "photo": { "asset": mission.photo.asset->url, "altText": mission.photo.altText } },      "vision": { "heading": vision.heading, "content": vision.content, "highlightedContent": vision.highlightedContent, "photo": { "asset": vision.photo.asset->url, "altText": vision.photo.altText } },      "team": { "heading": team.heading, "members": team.members[]{ "name": name }, "photo": { "asset": team.photo.asset->url, "altText": team.photo.altText } },    }[0]
export type AboutUsPageResult = {
  _id: string;
  _createdAt: string;
  title: string | null;
  mission: {
    heading: string | null;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    highlightedContent: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    photo: {
      asset: string | null;
      altText: string | null;
    };
  };
  vision: {
    heading: string | null;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    highlightedContent: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
    photo: {
      asset: string | null;
      altText: string | null;
    };
  };
  team: {
    heading: string | null;
    members: Array<{
      name: Array<{
        children?: Array<{
          marks?: Array<string>;
          text?: string;
          _type: "span";
          _key: string;
        }>;
        style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
        listItem?: "bullet" | "number";
        markDefs?: Array<{
          href?: string;
          _type: "link";
          _key: string;
        }>;
        level?: number;
        _type: "block";
        _key: string;
      }> | null;
    }> | null;
    photo: {
      asset: string | null;
      altText: string | null;
    };
  };
} | null;
// Variable: eventsPage
// Query: *[_type == "events"]{      _id, _createdAt, title,      "tags": tags[]->{ "id": _id, name, description },      date, allDay, location, excerpt, description,      photo { asset -> { _id, url } }    }
export type EventsPageResult = Array<{
  _id: string;
  _createdAt: string;
  title: string | null;
  tags: Array<{
    id: string;
    name: string | null;
    description: string | null;
  }> | null;
  date: RecurringDates | null;
  allDay: boolean | null;
  location: string | null;
  excerpt: string | null;
  description: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
    listItem?: "bullet" | "number";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  }> | null;
  photo: {
    asset: {
      _id: string;
      url: string | null;
    } | null;
  } | null;
}>;
// Variable: tags
// Query: *[_type == "tag"]{ "id": _id, name, description }
export type TagsResult = Array<{
  id: string;
  name: string | null;
  description: string | null;
}>;
// Variable: weekWithoutDrivingPage
// Query: *[_type == "weekWithoutDriving"]{      _id, _createdAt, title,      "introBlock": { "heading": introBlock.heading, "content": introBlock.content }    }[0]
export type WeekWithoutDrivingPageResult = {
  _id: string;
  _createdAt: string;
  title: string | null;
  introBlock: {
    heading: string | null;
    content: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "normal";
      listItem?: "bullet" | "number";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    }> | null;
  };
} | null;
// Variable: emailCityCouncil
// Query: *[_type == "emailCityCouncil"]{      _id, _createdAt, title,      "links": links[]{ "title": title, "url": url }    }[0]
export type EmailCityCouncilResult = {
  _id: string;
  _createdAt: string;
  title: string | null;
  links: Array<{
    title: string | null;
    url: string | null;
  }> | null;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "\n    *[_type == \"post\" && defined(slug.current)] | order(_createdAt desc) [$start...$end]\n  ": PostsResult;
    "\n    *[_type == \"post\" && slug.current == $slug][0]{ ..., author->{ name } }\n  ": PostResult;
    "\n    *[_type == \"homepage\"]{\n      _id, _createdAt, title, \"slug\": slug.current, content,\n      \"homePageHeroImage\": { \"asset\": homePageHeroImage.asset->url, \"altText\": homePageHeroImage.altText },\n      \"whoWeAre\": {\n        \"heading\": whoWeAre.heading,\n        \"photo\": { \"asset\": whoWeAre.photo.asset->url, \"altText\": whoWeAre.photo.altText },\n        \"highlightedContent\": whoWeAre.highlightedContent,\n        \"content\": whoWeAre.content\n      },\n      \"whatWeDo\": {\n        \"heading\": whatWeDo.heading,\n        \"whatWeDoPics\": whatWeDo.whatWeDoPics[] { \"image\": image.asset->url, \"altText\": altText, \"highlightedCaption\": highlightedCaption, \"caption\": caption }\n      },\n      \"bikePlan\": {\n        \"heading\": bikePlan.heading,\n        \"highlightedContent\": bikePlan.highlightedContent,\n        \"content\": bikePlan.content,\n        \"photo\": { \"asset\": bikePlan.photo.asset->url, \"altText\": bikePlan.photo.altText }\n      },\n      \"dallasBikeRide\": {\n        \"heading\": dallasBikeRide.heading,\n        \"photo\": { \"asset\": dallasBikeRide.photo.asset->url, \"altText\": dallasBikeRide.photo.altText },\n        \"content\": dallasBikeRide.content\n      }\n    }[0]\n  ": HomePageResult;
    "\n    *[_type == \"policyPage\"]{\n      _id, _createdAt, title,\n      \"introBlock\": { \"heading\": introBlock.heading, \"content\": introBlock.content },\n      \"policyRows\": policyRows[] { \"policy\": policy, \"summary\": summary, \"moreInfo\": moreInfo },\n      \"legislativeDemands\": { \"heading\": legislativeDemands.heading, \"content\": legislativeDemands.content }\n    }[0]\n  ": PolicyPageResult;
    "\n    *[_type == \"layout\"][0]{\n      _id, _createdAt,\n      \"logo\": { \"asset\": logo.asset->url, \"altText\": logo.altText },\n      \"landingPageLink\": landingPageLink,\n      \"footerBackground\": { \"asset\": footerBackground.asset->url, \"altText\": footerBackground.altText },\n\n    }\n  ": LayoutResult;
    "\n    *[_type == \"aboutUs\"]{\n      _id, _createdAt, title,\n      \"mission\": { \"heading\": mission.heading, \"content\": mission.content, \"highlightedContent\": mission.highlightedContent, \"photo\": { \"asset\": mission.photo.asset->url, \"altText\": mission.photo.altText } },\n      \"vision\": { \"heading\": vision.heading, \"content\": vision.content, \"highlightedContent\": vision.highlightedContent, \"photo\": { \"asset\": vision.photo.asset->url, \"altText\": vision.photo.altText } },\n      \"team\": { \"heading\": team.heading, \"members\": team.members[]{ \"name\": name }, \"photo\": { \"asset\": team.photo.asset->url, \"altText\": team.photo.altText } },\n    }[0]\n  ": AboutUsPageResult;
    "\n    *[_type == \"events\"]{\n      _id, _createdAt, title,\n      \"tags\": tags[]->{ \"id\": _id, name, description },\n      date, allDay, location, excerpt, description,\n      photo { asset -> { _id, url } }\n    }\n  ": EventsPageResult;
    "\n    *[_type == \"tag\"]{ \"id\": _id, name, description }\n  ": TagsResult;
    "\n    *[_type == \"weekWithoutDriving\"]{\n      _id, _createdAt, title,\n      \"introBlock\": { \"heading\": introBlock.heading, \"content\": introBlock.content }\n    }[0]\n  ": WeekWithoutDrivingPageResult;
    "\n    *[_type == \"emailCityCouncil\"]{\n      _id, _createdAt, title,\n      \"links\": links[]{ \"title\": title, \"url\": url }\n    }[0]\n  ": EmailCityCouncilResult;
  }
}
