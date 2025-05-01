import { defineType } from "sanity";

export const socialRideEventSchema = defineType({
  name: "socialRideEvent",
  title: "Social Ride Event",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Social Ride Title",
      type: "string",
    },
    {
      name: "tags",
      title: "Social Ride Tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "tag" }] }],
    },
    {
      name: "date",
      title: "Social Ride Date",
      type: "recurringDates",
      validation: (Rule) => Rule.required().error("Date is required"),
    },
    {
      name: "allDay",
      title: "All Day: Ignore above times and present as all day",
      type: "boolean",
    },
    {
      name: "location",
      title: "Social Ride Location",
      type: "string",
    },
    {
      name: "excerpt",
      title: "Social Ride Excerpt",
      type: "text",
    },
    {
      name: "description",
      title: "Social Ride Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "photo",
      title: "Social Ride Photo",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
