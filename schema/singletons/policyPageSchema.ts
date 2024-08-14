import { defineType } from "sanity";

export const policyPageSchema = defineType({
  name: "policyPage",
  title: "Policy Page",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "policyRows",
      title: "Policy Rows",
      type: "array",
      of: [{ type: "policyTableRow" }],
    },
  ],
});
