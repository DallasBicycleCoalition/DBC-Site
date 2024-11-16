import { defineType } from "sanity";

export const emailCityCouncilSchema = defineType({
  name: "emailCityCouncil",
  title: "Email City Council",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "link",
          title: "Link",
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
      ],
    },
  ],
});
