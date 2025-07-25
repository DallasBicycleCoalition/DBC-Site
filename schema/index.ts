import { authorSchema } from "./documents/authorSchema";
import { eventsSchema } from "./documents/eventSchema";
import { postSchema } from "./documents/postSchema";
import { socialRideEventSchema } from "./documents/socialRideEventSchema";
import { tagSchema } from "./documents/tag";

import { aboutUsSchema } from "./singletons/aboutUsPageSchema";
import { advocacyPageSchema } from "./singletons/advocacyPageSchema";
import { calendarPageSchema } from "./singletons/calendarPageSchema";
import { captionedImageSchema } from "./singletons/captionedImageSchema";
import { cityCouncilQuestionnaireSchema } from "./singletons/cityCouncilQuestionnaireSchema";
import { donatePageSchema } from "./singletons/donatePageSchema";
import { emailCityCouncilSchema } from "./singletons/emailCityCouncilSchema";
import { homePageSchema } from "./singletons/homePageSchema";
import { layoutSchema } from "./singletons/layoutSchema";
import { membershipPageSchema } from "./singletons/membershipPageSchema";
import { policyPageSchema } from "./singletons/policyPageSchema";
import { socialRidesPageSchema } from "./singletons/socialRidesPageSchema";
import { weekWithoutDrivingSchema } from "./singletons/weekWithoutDrivingSchema";

const documentSchemas = [
  authorSchema,
  eventsSchema,
  postSchema,
  socialRideEventSchema,
  tagSchema,
];

const singletonSchemas = [
  aboutUsSchema,
  advocacyPageSchema,
  captionedImageSchema,
  cityCouncilQuestionnaireSchema,
  donatePageSchema,
  emailCityCouncilSchema,
  homePageSchema,
  layoutSchema,
  membershipPageSchema,
  policyPageSchema,
  socialRidesPageSchema,
  weekWithoutDrivingSchema,
  calendarPageSchema,
];

export const schemaTypes = [...documentSchemas, ...singletonSchemas];
