import { authorSchema } from "./documents/authorSchema";
import { eventsSchema } from "./documents/eventsSchema";
import { postSchema } from "./documents/postSchema";

import { aboutUsSchema } from "./singletons/aboutUsPageSchema";
import { captionedImageSchema } from "./singletons/captionedImageSchema";
import { homePageSchema } from "./singletons/homePageSchema";
import { layoutSchema } from "./singletons/layoutSchema";
import { policyPageSchema } from "./singletons/policyPageSchema";
import { weekWithoutDrivingSchema } from "./singletons/weekWithoutDrivingSchema";

const documentSchemas = [authorSchema, eventsSchema, postSchema];

const singletonSchemas = [
  aboutUsSchema,
  captionedImageSchema,
  homePageSchema,
  layoutSchema,
  policyPageSchema,
  weekWithoutDrivingSchema,
];

export const schemaTypes = [...documentSchemas, ...singletonSchemas];
