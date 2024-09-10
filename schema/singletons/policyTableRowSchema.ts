import { defineType } from "sanity";

export const policyTableRowSchema = defineType({
  name: "policyTableRow",
  title: "Policy Table Row",
  type: "object",
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
});
