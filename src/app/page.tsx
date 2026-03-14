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
    <main>
      {/* Top nav */}
      <nav className="max-w-6xl mx-auto px-5 py-5 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-tight">
          Spool.film
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/submit" className="text-sm text-muted hover:text-foreground transition-colors">
            Submit video
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-20 md:py-32 px-5">
        <Image
          src="/logo.svg"
          alt="Spool.film"
          width={200}
          height={44}
          priority
          className="mx-auto mb-6"
        />
        <p className="text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
          A living archive of product films and visual experiments that set the bar.
        </p>
        <div className="max-w-sm mx-auto mb-4">
          <SubscribeForm compact />
        </div>
        <p className="text-sm text-muted">
          Or follow on{" "}
          <a
            href="https://x.com/SpoolFilm"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground hover:opacity-70 transition-opacity"
          >
            x.com
          </a>
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-5 pb-20">
        <VideoGrid entries={entries} categories={categories} />
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-5 py-8 border-t border-border flex items-center justify-between gap-4 flex-wrap">
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} Spool.film
        </p>
        <a
          href="https://x.com/SpoolFilm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted hover:text-foreground transition-colors"
        >
          @SpoolFilm
        </a>
      </footer>
    </main>
  );
}
