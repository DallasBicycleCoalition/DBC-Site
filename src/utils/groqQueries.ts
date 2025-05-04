import groq from "groq";
import type {
  AboutUsPageResult,
  AdvocacyPageResult,
  CityCouncilQuestionnaireResult,
  EmailCityCouncilResult,
  EventsPageResult,
  HomePageResult,
  LayoutResult,
  PolicyPageResult,
  PostResult,
  PostsResult,
  SocialRideEventsPageResult,
  SocialRidesPageResult,
  TagsResult,
  WeekWithoutDrivingPageResult,
} from "../../sanity.types";
import { fetchSanityData } from "./utils";

export async function getPosts(
  start: number = 0,
  limit: number = 10
): Promise<PostsResult[]> {
  const posts = groq`
    *[_type == "post" && defined(slug.current)] | order(_createdAt desc) [$start...$end]
  `;

  return fetchSanityData(posts, { start, end: start + limit });
}

export async function getPost(slug: string): Promise<PostResult> {
  const post = groq`
    *[_type == "post" && slug.current == $slug][0]{ ..., author->{ name } }
  `;

  return fetchSanityData(post, { slug });
}

export async function getHomePage(): Promise<HomePageResult> {
  const homePage = groq`
    *[_type == "homepage"]{
      _id, _createdAt, title, "slug": slug.current, content,
      "homePageHeroImage": { "asset": homePageHeroImage.asset->url, "altText": homePageHeroImage.altText },
      "whoWeAre": {
        "heading": whoWeAre.heading,
        "photo": { "asset": whoWeAre.photo.asset->url, "altText": whoWeAre.photo.altText },
        "highlightedContent": whoWeAre.highlightedContent,
        "content": whoWeAre.content
      },
      "whatWeDo": {
        "heading": whatWeDo.heading,
        "whatWeDoPics": whatWeDo.whatWeDoPics[] { "image": image.asset->url, "altText": altText, "highlightedCaption": highlightedCaption, "caption": caption }
      },
      "bikePlan": {
        "heading": bikePlan.heading,
        "highlightedContent": bikePlan.highlightedContent,
        "content": bikePlan.content,
        "photo": { "asset": bikePlan.photo.asset->url, "altText": bikePlan.photo.altText }
      },
      "dallasBikeRide": {
        "heading": dallasBikeRide.heading,
        "photo": { "asset": dallasBikeRide.photo.asset->url, "altText": dallasBikeRide.photo.altText },
        "content": dallasBikeRide.content
      }
    }[0]
  `;

  return fetchSanityData(homePage);
}

export async function getPolicyPage(): Promise<PolicyPageResult> {
  const policyPage = groq`
    *[_type == "policyPage"]{
      _id, _createdAt, title,
      "introBlock": { "heading": introBlock.heading, "content": introBlock.content },
      "policyRows": policyRows[] { "policy": policy, "summary": summary, "moreInfo": moreInfo },
      "legislativeDemands": { "heading": legislativeDemands.heading, "content": legislativeDemands.content }
    }[0]
  `;

  return fetchSanityData(policyPage);
}

export async function getLayout(): Promise<LayoutResult> {
  const layout = groq`
    *[_type == "layout"][0]{
      _id, _createdAt,
      "logo": { "asset": logo.asset->url, "altText": logo.altText },
      "landingPageLink": landingPageLink,
      "footerBackground": { "asset": footerBackground.asset->url, "altText": footerBackground.altText },

    }
  `;

  return fetchSanityData(layout);
}

export async function getAboutUsPage(): Promise<AboutUsPageResult> {
  const aboutUsPage = groq`
    *[_type == "aboutUs"]{
      _id, _createdAt, title,
      "mission": { "heading": mission.heading, "content": mission.content, "highlightedContent": mission.highlightedContent, "photo": { "asset": mission.photo.asset->url, "altText": mission.photo.altText } },
      "vision": { "heading": vision.heading, "content": vision.content, "highlightedContent": vision.highlightedContent, "photo": { "asset": vision.photo.asset->url, "altText": vision.photo.altText } },
      "team": { "heading": team.heading, "members": team.members[]{ "name": name }, "photo": { "asset": team.photo.asset->url, "altText": team.photo.altText } },
    }[0]
  `;

  return fetchSanityData(aboutUsPage);
}

export async function getEventsPage(): Promise<EventsPageResult> {
  const eventsPage = groq`
    *[_type == "events"]{
      _id, _createdAt, title,
      "tags": tags[]->{ "id": _id, name, description },
      date, allDay, location, excerpt, description,
      photo { asset -> { _id, url } }
    }
  `;

  return fetchSanityData(eventsPage);
}

// Duplicate for social ride events
export async function getSocialRideEventsPage(): Promise<SocialRideEventsPageResult> {
  const socialRideEventsPage = groq`
    *[_type == "socialRideEvent"]{
      _id, _createdAt, title,
      "tags": tags[]->{ "id": _id, name, description },
      date, allDay, location, excerpt, description,
      photo { asset -> { _id, url } }
    }
  `;

  return fetchSanityData(socialRideEventsPage);
}

export async function getTags(): Promise<TagsResult> {
  const tags = groq`
    *[_type == "tag"]{ "id": _id, name, description }
  `;

  return fetchSanityData(tags);
}

export async function getWeekWithoutDrivingPage(): Promise<WeekWithoutDrivingPageResult> {
  const weekWithoutDrivingPage = groq`
    *[_type == "weekWithoutDriving"]{
      _id, _createdAt, title,
      "introBlock": { "heading": introBlock.heading, "content": introBlock.content }
    }[0]
  `;

  return fetchSanityData(weekWithoutDrivingPage);
}

export async function getEmailCityCouncil(): Promise<EmailCityCouncilResult> {
  const emailCityCouncil = groq`
    *[_type == "emailCityCouncil"]{
      _id, _createdAt, title,
      "links": links[]{ "title": title, "url": url }
    }[0]
  `;

  return fetchSanityData(emailCityCouncil);
}

export async function getCityCouncilQuestionnaire(): Promise<CityCouncilQuestionnaireResult> {
  const cityCouncilQuestionnaire = groq`
    *[_type == "cityCouncilQuestionnaire"]{
      _id, _createdAt, title,
      "mainImage": { "asset": mainImage.asset->url, "altText": mainImage.altText },
      body
    }[0]
  `;

  return fetchSanityData(cityCouncilQuestionnaire);
}

export async function getAdvocacyPage(): Promise<AdvocacyPageResult> {
  const advocacyPage = groq`
    *[_type == "advocacyPage"]{
      _id, _createdAt,
      title,
      "introText": introText,
      "linkButton1": { "title": linkButton1.title, "url": linkButton1.url },
      "linkButton2": { "title": linkButton2.title, "url": linkButton2.url },
      "letter": letter,
      "images": images[]{"image": asset->url,"altText": altText}
    }[0]
  `;

  return fetchSanityData(advocacyPage);
}

export async function getSocialRidesPage(): Promise<SocialRidesPageResult> {
  const socialRidesPage = groq`
    *[_type == "socialRidesPage"][0]{
      infoText
    }
  `;
  return fetchSanityData(socialRidesPage);
}
