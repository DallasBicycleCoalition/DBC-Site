import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { recurringDates } from "sanity-plugin-recurring-dates";
import { structureTool } from "sanity/structure";
import { openPostPreviewAction } from "./lib/actions/openPostPreview";
import { resolve } from "./lib/presentation/resolve";
import { schemaTypes } from "./schema/index";

const projectId = "wfdg37xd";
const dataset = "production";
const isSchemaExtract =
  typeof process !== "undefined" &&
  process.env?.SANITY_SCHEMA_EXTRACT === "true";
const presentationPlugin = isSchemaExtract
  ? null
  : presentationTool({
      title: "Preview",
      resolve,
      previewUrl: {
        initial: ({ origin }: { origin: string }) => origin,
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
      allowOrigins: ["http://localhost:*"],
    });

export default defineConfig({
  name: "dallas-bicycle-coalition",
  title: "Dallas Bicycle Coalition",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            ...S.documentTypeListItems().sort((a, b) =>
              (a.getTitle() ?? "").localeCompare(b.getTitle() ?? "")
            ),
          ]),
    }),
    ...(presentationPlugin ? [presentationPlugin] : []),
    visionTool(),
    recurringDates(),
  ],
  document: {
    actions: (prev, context) => {
      if (context.schemaType !== "post") {
        return prev;
      }

      const [primaryAction, ...restActions] = prev;
      return primaryAction
        ? [primaryAction, openPostPreviewAction, ...restActions]
        : [openPostPreviewAction];
    },
  },
  schema: { types: schemaTypes },
});
