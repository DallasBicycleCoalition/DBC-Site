import { defineType } from "sanity";

/* Intended for a basic image with alt text and a caption */
export const captionedImageSchema = defineType({
  name: "captionedImage",
  title: "Captioned Image",
  type: "object",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "altText",
      title: "Alt Text",
      type: "string",
    },
    {
      name: "highlightedCaption",
      title: "Highlighted Caption",
      type: "string",
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
});
