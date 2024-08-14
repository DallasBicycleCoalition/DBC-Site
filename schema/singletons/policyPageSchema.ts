import { defineType } from "sanity";

export const policyPageSchema = defineType({
  name: "policyPage",
  title: "Policy Page",
  type: "document",
  fields: [
    {
      name: "policyRows",
      title: "Policy Rows",
      type: "array",
      of: [{ type: "policyTableRow" }],
    },
  ],
});
