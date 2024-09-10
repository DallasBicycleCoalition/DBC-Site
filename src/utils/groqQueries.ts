import groq from "groq";
import { sanityClient } from "sanity:client";
import type {
  HomePageResult,
  LayoutResult,
  PolicyPageResult,
  PostsResult,
  WeekWithoutDrivingPageResult,
} from "../../sanity.types";

export async function getPosts(
  start: number = 0,
  limit: number = 10,
): Promise<PostsResult[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) [${start}...${start + limit}]`,
  );
}

export async function getPost(slug: string): Promise<PostsResult> {
  const posts = groq`
      *[_type == "post" && slug.current == $slug][0]{
        ...,
        author->{
          name
        }
      }`;

  const results = await sanityClient.fetch(posts, { slug });

  return results;
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

export async function getPolicyPage(): Promise<PolicyPageResult> {
  const policyPage = groq`
    *[_type == "policyPage"]{
      _id,
      _createdAt,
      title,
      "introBlock": {
        "heading": introBlock.heading,
        "content": introBlock.content
      },
      "policyRows": policyRows[] {
        "policy": policy,
        "summary": summary,
        "moreInfo": moreInfo,
      },
      "legislativeDemands": {
        "heading": legislativeDemands.heading,
        "content": legislativeDemands.content
      },
    }[0]`;

  const results = await sanityClient.fetch(policyPage);

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

export async function getWeekWithoutDrivingPage(): Promise<WeekWithoutDrivingPageResult> {
  const weekWithoutDrivingPage = groq`
    *[_type == "weekWithoutDriving"]{
      _id,
      _createdAt,
      title,
      "introBlock": {
        "heading": introBlock.heading,
        "content": introBlock.content
      }
    }[0]`;

  const results = await sanityClient.fetch(weekWithoutDrivingPage);

  return results;
}
