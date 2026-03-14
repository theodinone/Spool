import { type SchemaTypeDefinition } from "sanity";
import { videoEntry } from "./schemas/videoEntry";
import { subscriber } from "./schemas/subscriber";
import { submission } from "./schemas/submission";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [videoEntry, subscriber, submission],
};
