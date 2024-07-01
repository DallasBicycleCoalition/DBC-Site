import type { PortableTextBlock } from "@portabletext/types";
import type { ImageAsset, Slug } from "@sanity/types";
import groq from "groq";
import { sanityClient } from "sanity:client";
import type { HomePageResult, LayoutResult } from "../../sanity.types";

export async function getPosts(): Promise<Post[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`,
  );
}

export async function getPost(slug: string): Promise<Post> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]`,
    {
      slug,
    },
  );
}

export interface Post {
  _type: "post";
  _createdAt: string;
  title?: string;
  slug: Slug;
  excerpt?: string;
  mainImage?: ImageAsset;
  body: PortableTextBlock[];
}

export async function getHomePage(): Promise<HomePageResult> {
  const homePage = groq`
    *[_type == "homepage"]{
      _id,
      _createdAt,
      title,
      "slug": slug.current,
      content,
      "homePageHeroImage": {
        "asset": homePageHeroImage.asset->url,
        "altText": homePageHeroImage.altText
      },
      "whoWeAre": {
        "heading": whoWeAre.heading,
        "photo": {
          "asset": whoWeAre.photo.asset->url,
          "altText": whoWeAre.photo.altText
        },
        "content" : whoWeAre.content
      },
      "whatWeDo": {
        "heading": whatWeDo.heading,
        "whatWeDoPics": whatWeDo.whatWeDoPics[] {
          "image": image.asset->url,
          "altText": altText,
          "caption": caption
        }
      },
      "bikePlan": {
        "heading": bikePlan.heading,
        "content": bikePlan.content
      }
    }[0]`;

  const results = await sanityClient.fetch(homePage);

  return results;
}

export async function getLayout(): Promise<LayoutResult> {
  const layout = groq`
    *[_type == "layout"][0]{
      _id,
      _createdAt,
      "logo": {
        "asset": logo.asset->url,
        "altText": logo.altText
      },
      "landingPageLink": landingPageLink
    }`;

  const results = await sanityClient.fetch(layout);

  return results;
}
