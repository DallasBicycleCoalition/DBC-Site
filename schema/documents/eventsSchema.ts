// eventsSchema.ts
import { defineType } from "sanity";
import { eventCategories } from "../../src/types/constants";

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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: eventCategories,
      },
    },
    {
      name: "date",
      title: "Date",
      type: "recurringDates",
    },
    {
      name: "allDay",
      title: "All Day: Ignore above times and present as all day",
      type: "boolean",
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
