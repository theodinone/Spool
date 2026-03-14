import data from "./entries.json";

export interface Entry {
  id: number;
  slug: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  launchDate: string;
}

export const entries: Entry[] = data as Entry[];

export function getEntry(slug: string): Entry | undefined {
  return entries.find((e) => e.slug === slug);
}

export function getCategories(): string[] {
  return Array.from(new Set(entries.map((e) => e.category))).sort();
}
