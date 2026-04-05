import { defineType } from "sanity";

export const membershipPageSchema = defineType({
  name: "membershipPage",
  title: "Membership Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "headerImage",
      title: "Header Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "altText",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the header image",
        },
      ],
      description: "Header image displayed at the top of the membership page.",
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
    {
      name: "statA",
      title: "Stat A",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "current",
          title: "Current",
          type: "number",
        },
        {
          name: "max",
          title: "Max",
          type: "number",
        },
      ],
      description: "First stat with a title, current value, and max value.",
    },
    {
      name: "statB",
      title: "Stat B",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "current",
          title: "Current",
          type: "number",
        },
        {
          name: "max",
          title: "Max",
          type: "number",
        },
      ],
      description: "Second stat with a title, current value, and max value.",
    },
  ],
});
