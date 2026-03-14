import { getSanityEntries, getSanityCategories } from "@/sanity/lib/queries";
import VideoGrid from "@/components/VideoGrid";
import Link from "next/link";

export default async function Home() {
  const [entries, categories] = await Promise.all([
    getSanityEntries(),
    getSanityCategories(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-5 py-12 md:py-20">
      <header className="mb-12">
        <Link href="/">
          <h1 className="text-lg font-semibold tracking-tight">spool.film</h1>
        </Link>
        <p className="text-muted text-sm mt-1.5 max-w-md">
          The best product launch videos and films, curated for inspiration.
        </p>
      </header>

      <VideoGrid entries={entries} categories={categories} />

      <footer className="mt-20 pt-8 border-t border-border">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Spool.film — Curated with care.
        </p>
      </footer>
    </main>
  );
}
