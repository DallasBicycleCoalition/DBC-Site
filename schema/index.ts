import { authorSchema } from "./documents/authorSchema";
import { eventsSchema } from "./documents/eventSchema";
import { postSchema } from "./documents/postSchema";
import { tagSchema } from "./documents/tag";

import { aboutUsSchema } from "./singletons/aboutUsPageSchema";
import { captionedImageSchema } from "./singletons/captionedImageSchema";
import { emailCityCouncilSchema } from "./singletons/emailCityCouncilSchema";
import { homePageSchema } from "./singletons/homePageSchema";
import { layoutSchema } from "./singletons/layoutSchema";
import { policyPageSchema } from "./singletons/policyPageSchema";
import { weekWithoutDrivingSchema } from "./singletons/weekWithoutDrivingSchema";

const documentSchemas = [authorSchema, eventsSchema, postSchema, tagSchema];

const singletonSchemas = [
  aboutUsSchema,
  captionedImageSchema,
  emailCityCouncilSchema,
  homePageSchema,
  layoutSchema,
  policyPageSchema,
  weekWithoutDrivingSchema,
];

export const schemaTypes = [...documentSchemas, ...singletonSchemas];
