import { defineType } from "sanity";

export const advocacyPageSchema = defineType({
  name: "advocacyPage",
  title: "Advocacy Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "introText",
      title: "Intro Text",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "linkButton1",
      title: "Link button 1",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "url",
          title: "URL",
          type: "url",
        },
      ],
    },
    {
      name: "linkButton2",
      title: "Link button 2",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "url",
          title: "URL",
          type: "url",
        },
      ],
    },
    {
      name: "letter",
      title: "Letter",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            {
              name: "altText",
              title: "Alternative Text",
              type: "string",
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
});
