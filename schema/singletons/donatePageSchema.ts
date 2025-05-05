import { defineType } from "sanity";

export const donatePageSchema = defineType({
  name: "donatePage",
  title: "Donate Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "infoText",
      title: "Info Text",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "embedLink",
      title: "Embed Link",
      type: "url",
      description: "Provide a URL for an embeddable donation form or widget.",
    },
  ],
});
