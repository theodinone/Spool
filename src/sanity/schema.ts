import { type SchemaTypeDefinition } from "sanity";
import { videoEntry } from "./schemas/videoEntry";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [videoEntry],
};
