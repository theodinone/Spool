"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { Entry } from "@/data/entries";
import { CATEGORY_ICONS, CategoryPill } from "@/components/CategoryIcons";

function VideoCard({ entry }: { entry: Entry }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const videoSrc = entry.videoFileUrl || "/placeholder.mp4";

  // Auto-play and loop first 10 seconds
  const startLoop = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play().catch(() => {});
    timeoutRef.current = setInterval(() => {
      if (video.currentTime >= 10) {
        video.currentTime = 0;
      }
    }, 100);
  }, []);

  // Start looping when video element mounts
  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el) {
      el.addEventListener("loadeddata", () => {
        el.currentTime = 0;
        el.play().catch(() => {});
        timeoutRef.current = setInterval(() => {
          if (el.currentTime >= 10) {
            el.currentTime = 0;
          }
        }, 100);
      }, { once: true });
    }
  }, []);

  return (
    <Link
      href={`/v/${entry.slug}`}
      className="group block"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-border mb-3">
        <video
          ref={setVideoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          controlsList="nodownload"
          onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
      </div>
      <div className="flex items-start gap-3">
        {entry.appIconUrl && (
          <img
            src={entry.appIconUrl}
            alt={`${entry.title} icon`}
            className="w-9 h-9 rounded-lg flex-shrink-0 mt-0.5"
          />
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors leading-tight">
              {entry.title}
            </h2>
            <CategoryPill category={entry.category} />
          </div>
          {entry.description && (
            <p className="text-xs text-muted mt-0.5 line-clamp-1">
              {entry.description}
            </p>
          )}
        </div>
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
            className={`px-4 py-1.5 rounded-full text-sm transition-colors inline-flex items-center gap-1.5 ${
              active === cat
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground"
            }`}
          >
            {CATEGORY_ICONS[cat]}
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 min-h-[50vh]">
        {filtered.map((entry) => (
          <VideoCard key={entry.id} entry={entry} />
        ))}
      </div>
    </>
  );
}
