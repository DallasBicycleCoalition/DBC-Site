import { authorSchema } from "./documents/authorSchema";
import { postSchema } from "./documents/postSchema";

import { aboutUsSchema } from "./singletons/aboutUsPageSchema";
import { captionedImageSchema } from "./singletons/captionedImageSchema";
import { homePageSchema } from "./singletons/homePageSchema";
import { layoutSchema } from "./singletons/layoutSchema";
import { policyPageSchema } from "./singletons/policyPageSchema";
import { weekWithoutDrivingSchema } from "./singletons/weekWithoutDrivingSchema";

export const schemaTypes = [
  aboutUsSchema,
  authorSchema,
  captionedImageSchema,
  homePageSchema,
  layoutSchema,
  policyPageSchema,
  postSchema,
  weekWithoutDrivingSchema,
];
