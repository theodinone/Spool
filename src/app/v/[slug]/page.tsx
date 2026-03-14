import { getSanityEntry, getSanitySlugs } from "@/sanity/lib/queries";
import VideoEmbed from "@/components/VideoEmbed";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = await getSanitySlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = await getSanityEntry(slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — Spool.film`,
    description: entry.description,
    openGraph: {
      title: `${entry.title} — Spool.film`,
      description: entry.description,
      images: [{ url: entry.thumbnailUrl }],
    },
  };
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = await getSanityEntry(slug);
  if (!entry) notFound();

  const date = new Date(entry.launchDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="max-w-4xl mx-auto px-5 py-12 md:py-20">
      <Link
        href="/"
        className="text-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1.5 mb-10"
      >
        ← Back
      </Link>

      <VideoEmbed url={entry.videoUrl} />

      <div className="mt-8 space-y-4">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <h1 className="text-2xl font-semibold tracking-tight">
            {entry.title}
          </h1>
          <span className="px-3 py-1 rounded-full bg-border text-xs text-muted">
            {entry.category}
          </span>
        </div>

        <p className="text-muted text-sm leading-relaxed max-w-2xl">
          {entry.description}
        </p>

        <p className="text-xs text-muted/60">{date}</p>
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <Link
          href="/"
          className="text-sm text-muted hover:text-foreground transition-colors"
        >
          ← Browse all videos
        </Link>
      </div>
    </main>
  );
}
