import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "g8q8x1fc",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});
