"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import type { Entry } from "@/data/entries";

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

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Fintech: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
  ),
  AI: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M8 16s1.5 2 4 2 4-2 4-2"/></svg>
  ),
  Crypto: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/></svg>
  ),
  Social: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.78168 19.25H13.2183C13.7828 19.25 14.227 18.7817 14.1145 18.2285C13.804 16.7012 12.7897 14 9.5 14C6.21031 14 5.19605 16.7012 4.88549 18.2285C4.773 18.7817 5.21718 19.25 5.78168 19.25Z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 14C17.8288 14 18.6802 16.1479 19.0239 17.696C19.2095 18.532 18.5333 19.25 17.6769 19.25H16.75"/><circle cx="9.5" cy="7.5" r="2.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.75 10.25C16.2688 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2688 4.75 14.75 4.75"/></svg>
  ),
  CPG: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
  ),
};

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {filtered.map((entry) => (
          <VideoCard key={entry.id} entry={entry} />
        ))}
      </div>
    </>
  );
}
