import { authorSchema } from "./singletons/authorSchema";
import { postSchema } from "./singletons/blogPostSchema";
import { captionedImageSchema } from "./singletons/captionedImageSchema";
import { homePageSchema } from "./singletons/homePageSchema";
import { layoutSchema } from "./singletons/layoutSchema";

export const schemaTypes = [captionedImageSchema, homePageSchema, layoutSchema, postSchema, authorSchema];
