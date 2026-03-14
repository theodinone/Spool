"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Entry } from "@/data/entries";

export default function VideoGrid({
  entries,
  categories,
}: {
  entries: Entry[];
  categories: string[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? entries.filter((e) => e.category === active)
    : entries;

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
            active === null
              ? "bg-white text-black"
              : "bg-border text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              active === cat
                ? "bg-white text-black"
                : "bg-border text-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((entry) => (
          <Link
            key={entry.id}
            href={`/v/${entry.slug}`}
            className="group block"
          >
            <div className="relative aspect-video rounded-lg overflow-hidden bg-border mb-3">
              <Image
                src={entry.thumbnailUrl}
                alt={entry.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-tight">
                {entry.title}
              </h2>
              <span className="text-xs text-muted whitespace-nowrap mt-0.5">
                {entry.category}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
