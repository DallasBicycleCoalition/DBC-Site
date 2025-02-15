import groq from "groq";
import { sanityClient } from "sanity:client";
import type {
  AboutUsPageResult,
  EmailCityCouncilResult,
  EventsPageResult,
  HomePageResult,
  LayoutResult,
  PolicyPageResult,
  PostsResult,
  TagsResult,
  WeekWithoutDrivingPageResult,
} from "../../sanity.types";

export async function getPosts(
  start: number = 0,
  limit: number = 10
): Promise<PostsResult[]> {
  return await sanityClient.fetch(
    groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) [${start}...${start + limit}]`
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
      },
      "dallasBikeRide": {
        "heading": dallasBikeRide.heading,
        "photo": {
          "asset": dallasBikeRide.photo.asset->url,
          "altText": dallasBikeRide.photo.altText
        },
        "content" : dallasBikeRide.content
      },
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

export async function getAboutUsPage(): Promise<AboutUsPageResult> {
  const aboutUsPage = groq`
    *[_type == "aboutUs"]{
      _id,
      _createdAt,
      title,
      "mission": {
        "heading": mission.heading,
        "content": mission.content
      },
      "vision": {
        "heading": vision.heading,
        "content": vision.content
      },
      "team": {
        "heading": team.heading,
        "members": team.members[]{
          "name": name
        }
      },
      "howToHelp": {
        "heading": howToHelp.heading,
        "content": howToHelp.content
      },
    }[0]`;

  const results = await sanityClient.fetch(aboutUsPage);

  return results;
}

export async function getEventsPage(): Promise<EventsPageResult> {
  const eventsPage = groq`
    *[_type == "events"]{
      _id,
      _createdAt,
      title,
      "tags": tags[]->{ "id": _id, name, description },
      date,
      allDay,
      location,
      excerpt,
      description,
      photo {
        asset -> {
          _id,
          url
        }
      }
    }
  `;

  const results = await sanityClient.fetch(eventsPage);

  return results;
}

export async function getTags(): Promise<TagsResult> {
  const tags = groq`
    *[_type == "tag"]{
      "id": _id,
      name,
      description
    }
  `;

  const results = await sanityClient.fetch(tags);

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

export async function getEmailCityCouncil(): Promise<EmailCityCouncilResult> {
  const emailCityCouncil = groq`
    *[_type == "emailCityCouncil"]{
      _id,
      _createdAt,
      title,
      "links": links[]{
        "title": title,
        "url": url
      }
    }[0]`;

  const results = await sanityClient.fetch(emailCityCouncil);

  return results;
}
