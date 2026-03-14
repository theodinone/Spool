import { getSanityEntries, getSanityCategories } from "@/sanity/lib/queries";
import VideoGrid from "@/components/VideoGrid";
import SubscribeForm from "@/components/SubscribeForm";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const [entries, categories] = await Promise.all([
    getSanityEntries(),
    getSanityCategories(),
  ]);

  return (
    <main className="max-w-6xl mx-auto px-5 py-12 md:py-20">
      <header className="mb-12 flex items-start justify-between">
        <div>
          <Link href="/">
            <Image src="/logo.svg" alt="Spool.film" width={160} height={35} priority />
          </Link>
          <p className="text-muted text-sm mt-1.5 max-w-md">
            A living archive of product films and visual experiments that set the bar.
          </p>
        </div>
        <Link
          href="/submit"
          className="text-sm font-medium px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Submit
        </Link>
      </header>

      <VideoGrid entries={entries} categories={categories} />

      <section className="mt-20 pt-12 border-t border-border">
        <SubscribeForm />
      </section>

      <footer className="mt-12 pt-8 border-t border-border flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Spool.film — Curated with care.
        </p>
        <div className="max-w-xs">
          <SubscribeForm compact />
        </div>
      </footer>
    </main>
  );
}
