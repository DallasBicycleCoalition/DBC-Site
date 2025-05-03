import { defineType } from "sanity";

export const socialRidesPageSchema = defineType({
  name: "socialRidesPage",
  title: "Social Rides Page",
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
      description: "Text to display above the social rides calendar.",
    },
  ],
});
