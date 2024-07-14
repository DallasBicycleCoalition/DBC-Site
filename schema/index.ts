import { authorSchema } from "./singletons/authorSchema";
import { captionedImageSchema } from "./singletons/captionedImageSchema";
import { homePageSchema } from "./singletons/homePageSchema";
import { layoutSchema } from "./singletons/layoutSchema";
import { postSchema } from "./singletons/postSchema";

export const schemaTypes = [
  authorSchema,
  captionedImageSchema,
  homePageSchema,
  layoutSchema,
  postSchema,
];
