import { defineType } from "sanity";

export const eventsSchema = defineType({
  name: "events",
  title: "Events",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: 'date',
      title: 'Date',
      type: 'recurringDates',
    },
    {
      name: "location",
      title: "Location",
      type: "string",
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
