import blockContent from "./blockContent";
import post from "./post";
import { layoutSchema } from "./singletons/layoutSchema";
import { homePage } from "./singletons/homePage-schema";
import { captionedImage } from "./captionedImage";

export const schemaTypes = [post, blockContent, layoutSchema, homePage, captionedImage];
