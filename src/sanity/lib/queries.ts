import { client } from "../client";
import type { Entry } from "@/data/entries";

const ENTRIES_QUERY = `*[_type == "videoEntry"] | order(launchDate desc) {
  "id": _id,
  "slug": slug.current,
  title,
  description,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  thumbnailUrl,
  "thumbnailImageUrl": thumbnailImage.asset->url,
  category,
  launchDate,
  "appIconUrl": appIcon.asset->url
}`;

const ENTRY_QUERY = `*[_type == "videoEntry" && slug.current == $slug][0] {
  "id": _id,
  "slug": slug.current,
  title,
  description,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  thumbnailUrl,
  "thumbnailImageUrl": thumbnailImage.asset->url,
  category,
  launchDate,
  "appIconUrl": appIcon.asset->url
}`;

const SLUGS_QUERY = `*[_type == "videoEntry"]{ "slug": slug.current }`;

export async function getSanityEntries(): Promise<Entry[]> {
  try {
    const results = await client.fetch(ENTRIES_QUERY, {}, { next: { revalidate: 60 } });
    if (results && results.length > 0) return results;
  } catch (e) {
    console.warn("Sanity fetch failed, falling back to JSON", e);
  }
  // Fallback to JSON
  const { entries } = await import("@/data/entries");
  return entries;
}

export async function getSanityEntry(slug: string): Promise<Entry | undefined> {
  try {
    const result = await client.fetch(ENTRY_QUERY, { slug }, { next: { revalidate: 60 } });
    if (result) return result;
  } catch (e) {
    console.warn("Sanity fetch failed, falling back to JSON", e);
  }
  const { getEntry } = await import("@/data/entries");
  return getEntry(slug);
}

export async function getSanitySlugs(): Promise<{ slug: string }[]> {
  try {
    const results = await client.fetch(SLUGS_QUERY, {}, { next: { revalidate: 60 } });
    if (results && results.length > 0) return results;
  } catch (e) {
    console.warn("Sanity slugs fetch failed, falling back to JSON", e);
  }
  const { entries } = await import("@/data/entries");
  return entries.map((e) => ({ slug: e.slug }));
}

export async function getSanityCategories(): Promise<string[]> {
  const entries = await getSanityEntries();
  return Array.from(new Set(entries.map((e) => e.category))).sort();
}
