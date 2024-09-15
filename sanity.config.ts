import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schema/index";

const projectId = "wfdg37xd";
const dataset = "production";

export default defineConfig({
  name: "dallas-bicycle-coalition",
  title: "Dallas Bicycle Coalition",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
