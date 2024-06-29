import { defineType } from "sanity";

export const homePage = defineType({
  name: "homepage",
  title: "HomePage",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "homePageHeroImage",
      title: "Homepage Hero",
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
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "content",
      title: "Content",
      type: "string",
    },
    {
      name: "whoWeAre",
      title: "Who We Are",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "photo",
          title: "Who We Are photo",
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
        {
          name: "content",
          title: "Content",
          type: "array",
          of: [{ type: "block" }],
        },
      ],
    },
    {
      name: "whatWeDo",
      title: "What We Do",
      type: "object",
      fields: [
        {
          name: "heading",
          title: "Heading",
          type: "string",
        },
        {
          name: "whatWeDoPics",
          title: "What We Do Pics",
          type: "array",
          of: [{ type: "captionedImage" }],
        },
      ],
    },
    {
      name: "bikePlan",
      title: "Bike Plan",
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
