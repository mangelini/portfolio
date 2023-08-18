import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "portfolio",
  title: "deeppink-badger",
  projectId: "us47tn43",
  dataset: "production",
  basePath: "/studio",
  plugins: [deskTool(), codeInput()],
  schema: { types: schemaTypes },
});
