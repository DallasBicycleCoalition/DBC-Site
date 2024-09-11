import { defineType } from "sanity";

export const aboutUsSchema = defineType({
  name: "aboutUs",
  title: "About Us",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "vision",
      title: "Vision",
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
    {
      name: "mission",
      title: "Mission",
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
    {
      name: "team",
      title: "Team",
      type: "array",
      of: [
        {
          type: "object",
          title: "Team Member",
          fields: [
            {
              name: "name",
              title: "Name",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
  ],
});
