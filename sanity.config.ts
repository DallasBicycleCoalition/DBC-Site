import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const projectId = "wfdg37xd";
const dataset = "production";

export default defineConfig({
  name: "project-name",
  title: "Project Name",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
});
