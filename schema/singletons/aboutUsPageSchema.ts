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
          name: "highlightedContent",
          title: "Highlighted Content",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "photo",
          title: "Vision Photo",
          type: "image",
          fields: [
            {
              name: "altText",
              type: "string",
              title: "Alternative text",
            },
          ],
          options: {
            hotspot: true,
          },
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
          name: "highlightedContent",
          title: "Highlighted Content",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        },
        {
          name: "photo",
          title: "Mission Photo",
          type: "image",
          fields: [
            {
              name: "altText",
              type: "string",
              title: "Alternative text",
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "team",
      title: "Team",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "members",
          title: "Members",
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
        {
          name: "photo",
          title: "Team Photo",
          type: "image",
          fields: [
            {
              name: "altText",
              type: "string",
              title: "Alternative text",
            },
          ],
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: "howToHelp",
      title: "How to help",
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
