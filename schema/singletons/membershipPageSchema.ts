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
      name: "heroMedia",
      title: "Hero Media",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "altText",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for the hero media",
        },
      ],
      description: "Image shown at the top of the membership page.",
    },
    {
      name: "heroHeadlineAccent",
      title: "Hero Headline Accent",
      type: "string",
      description: "The red highlighted line in the main headline.",
    },
    {
      name: "heroHeadline",
      title: "Hero Headline",
      type: "string",
      description: "The darker second line in the main headline.",
    },
    {
      name: "heroBody",
      title: "Hero Body",
      type: "array",
      of: [{ type: "block" }],
      description: "Optional supporting copy shown below the headline.",
    },
    {
      name: "membershipTiers",
      title: "Membership Tiers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "priceLabel",
              title: "Price Label",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            },
            {
              name: "benefits",
              title: "Benefits",
              type: "array",
              of: [{ type: "string" }],
            },
            {
              name: "embedCode",
              title: "Embed Code",
              type: "text",
              rows: 6,
              description:
                "Optional HTML embed snippet for this membership tier.",
            },
            {
              name: "buttonLabel",
              title: "Fallback Button Label",
              type: "string",
              initialValue: "Join the Coalition",
              description:
                "Used when no embed code is provided for the tier yet.",
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "priceLabel",
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
      description: "Up to three membership cards shown below the hero section.",
    },
    {
      name: "thermometer",
      title: "Thermometer",
      type: "object",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
        },
        {
          name: "currentAmount",
          title: "Current Amount",
          type: "number",
        },
        {
          name: "goalAmount",
          title: "Goal Amount",
          type: "number",
        },
        {
          name: "progressLabel",
          title: "Progress Label",
          type: "string",
          description: "Optional short label shown above the amount totals.",
        },
        {
          name: "supportingText",
          title: "Supporting Text",
          type: "array",
          of: [{ type: "block" }],
          description:
            "Optional text shown beneath the thermometer and progress totals.",
        },
      ],
      description: "Campaign progress bar shown below the membership tiers.",
    },
    {
      name: "faqHeading",
      title: "FAQ Heading",
      type: "string",
      initialValue: "Frequently Asked Questions",
    },
    {
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              title: "Question",
              type: "string",
            },
            {
              name: "answer",
              title: "Answer",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
          preview: {
            select: {
              title: "question",
            },
          },
        },
      ],
    },
  ],
});
