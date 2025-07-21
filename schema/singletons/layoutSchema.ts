import { defineType } from "sanity";

export const layoutSchema = defineType({
  name: "layout",
  title: "Layout",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "altText",
          type: "string",
          title: "Alternative text",
        },
      ],
    },
    {
      name: "landingPageLink",
      title: "Landing Page Link",
      type: "url",
    },
    {
      name: "callToActionButton",
      title: "Call to Action Button",
      type: "object",
      fields: [
        {
          name: "text",
          type: "text",
          title: "Text",
        },
        {
          name: "url",
          type: "url",
          title: "URL",
        },
      ],
    },
    {
      name: "footerBackground",
      title: "Footer Background",
      type: "image",
      fields: [
        {
          name: "altText",
          type: "string",
          title: "Alternative text",
        },
      ],
    },
  ],
});
