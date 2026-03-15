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
            <span className="inline-flex items-center gap-1 text-xs text-muted whitespace-nowrap mt-0.5 px-2.5 py-0.5 rounded-full border border-border bg-background">
              {CATEGORY_ICONS[entry.category]}
              {entry.category}
            </span>
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

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Fintech: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4.75 7.75C4.75 6.64543 5.64543 5.75 6.75 5.75H17.25C18.3546 5.75 19.25 6.64543 19.25 7.75V16.25C19.25 17.3546 18.3546 18.25 17.25 18.25H6.75C5.64543 18.25 4.75 17.3546 4.75 16.25V7.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 10.25H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M7.75 14.25H10.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M15.75 14.25H16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  AI: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11.625 12L10.5 9.75L9.375 12M11.625 12L12.75 14.25M11.625 12H9.375M8.25 14.25L9.375 12M15.25 14.25V9.75M7.75 19.25H16.25C17.9069 19.25 19.25 17.9069 19.25 16.25V7.75C19.25 6.09315 17.9069 4.75 16.25 4.75H7.75C6.09315 4.75 4.75 6.09315 4.75 7.75V16.25C4.75 17.9069 6.09315 19.25 7.75 19.25Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  ),
  Crypto: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 8.25V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M16.5 13C16.5 13.2761 16.2761 13.5 16 13.5C15.7239 13.5 15.5 13.2761 15.5 13C15.5 12.7239 15.7239 12.5 16 12.5C16.2761 12.5 16.5 12.7239 16.5 13Z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.25 8.25H6.5C5.5335 8.25 4.75 7.4665 4.75 6.5C4.75 5.5335 5.5335 4.75 6.5 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V8.25ZM17.25 8.25H19.25"/></svg>
  ),
  Social: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.78168 19.25H13.2183C13.7828 19.25 14.227 18.7817 14.1145 18.2285C13.804 16.7012 12.7897 14 9.5 14C6.21031 14 5.19605 16.7012 4.88549 18.2285C4.773 18.7817 5.21718 19.25 5.78168 19.25Z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 14C17.8288 14 18.6802 16.1479 19.0239 17.696C19.2095 18.532 18.5333 19.25 17.6769 19.25H16.75"/><circle cx="9.5" cy="7.5" r="2.75" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.75 10.25C16.2688 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2688 4.75 14.75 4.75"/></svg>
  ),
  CPG: (
    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V8.18322C19.2502 7.89772 19.1891 7.61553 19.071 7.35561L18.5332 6.17239C18.2086 5.45841 17.4967 5 16.7124 5H7.28807C6.50378 5 5.79188 5.45841 5.46734 6.1724L4.92951 7.35561C4.81137 7.61553 4.75024 7.89772 4.75024 8.18322V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.5 7.75C9.5 8.99264 8.5 10.25 7 10.25C5.5 10.25 4.75 8.99264 4.75 7.75"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.25 7.75C19.25 8.99264 18.5 10.25 17 10.25C15.5 10.25 14.5 8.99264 14.5 7.75"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.5 7.75C14.5 8.99264 13.5 10.25 12 10.25C10.5 10.25 9.5 8.99264 9.5 7.75"/><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"/></svg>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 min-h-[50vh]">
        {filtered.map((entry) => (
          <VideoCard key={entry.id} entry={entry} />
        ))}
      </div>
    </>
  );
}
