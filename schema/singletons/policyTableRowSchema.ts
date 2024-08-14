import { defineType } from "sanity";

export const policyTableRowSchema = defineType({
  name: "policyTableRow",
  title: "Policy Table Row",
  type: "object",
  fields: [
    {
      name: "bill",
      title: "Bill",
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
      name: "info",
      title: "Info",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "position",
      title: "Position",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "showSupport",
      title: "Show Support",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});
