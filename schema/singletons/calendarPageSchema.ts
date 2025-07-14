import { defineType } from "sanity";

export const calendarPageSchema = defineType({
  name: "calendarPage",
  title: "Calendar Page",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "infoText",
      title: "Info Text",
      type: "array",
      of: [{ type: "block" }],
      description: "Text to display above the calendar.",
    },
  ],
});
