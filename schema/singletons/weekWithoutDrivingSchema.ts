import { defineType } from "sanity";

export const weekWithoutDrivingSchema = defineType({
  name: "weekWithoutDriving",
  title: "Week Without Driving",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "introBlock",
      title: "Intro Block",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
  ],
});
