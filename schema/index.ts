import { authorSchema } from "./documents/authorSchema";
import { captionedImageSchema } from "./singletons/captionedImageSchema";
import { homePageSchema } from "./singletons/homePageSchema";
import { layoutSchema } from "./singletons/layoutSchema";
import { policyPageSchema } from "./singletons/policyPageSchema";
import { postSchema } from "./documents/postSchema";
import { weekWithoutDrivingSchema } from "./singletons/weekWithoutDrivingSchema";

export const schemaTypes = [
  authorSchema,
  captionedImageSchema,
  homePageSchema,
  layoutSchema,
  policyPageSchema,
  postSchema,
  weekWithoutDrivingSchema,
];
