"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { Entry } from "@/data/entries";

function VideoCard({ entry }: { entry: Entry }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    // Loop first 10 seconds
    timeoutRef.current = setInterval(() => {
      if (video.currentTime >= 10) {
        video.currentTime = 0;
      }
    }, 100);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return (
    <Link
      href={`/v/${entry.slug}`}
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-border mb-3">
        <video
          ref={videoRef}
          src="/placeholder.mp4"
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
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
  );
}

const CATEGORIES = ["Fintech", "AI", "Crypto", "Social", "CPG"];

export default function VideoGrid({
  entries,
}: {
  entries: Entry[];
  categories?: string[];
}) {
  const [active, setActive] = useState<string | null>(null);

  const filtered = active
    ? entries.filter((e) => e.category === active)
    : entries;

  return (
    <>
      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          onClick={() => setActive(null)}
          className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
            active === null
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(active === cat ? null : cat)}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
              active === cat
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {filtered.map((entry) => (
          <VideoCard key={entry.id} entry={entry} />
        ))}
      </div>
    </>
  );
}
