import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schema } from "./src/sanity/schema";

export default defineConfig({
  name: "spool-film",
  title: "Spool.film",
  projectId: "g8q8x1fc",
  dataset: "production",
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema,
  cors: {
    allowOrigins: ["http://localhost:3000", "https://spool.film"],
    allowCredentials: true,
  },
});
