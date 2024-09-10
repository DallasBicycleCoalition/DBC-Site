import { defineType } from "sanity";

export const policyPageSchema = defineType({
  name: "policyPage",
  title: "Policy Page",
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
    {
      name: "policyRows",
      title: "Policy Rows",
      type: "array",
      of: [
        {
          type: "object",
          title: "Policy Table Row",
          fields: [
            {
              name: "policy",
              title: "Policy",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "summary",
              title: "Summary",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "moreInfo",
              title: "More Info",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
  ],
});
