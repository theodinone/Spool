"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [stage, setStage] = useState<"enter" | "exit">("enter");
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      // New page — fade out, then swap content, then fade in
      setStage("exit");
      const timer = setTimeout(() => {
        prevPathname.current = pathname;
        setDisplayChildren(children);
        setStage("enter");
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // Same path but children updated (e.g. initial load)
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div
      style={{
        transition: "opacity 0.2s ease, transform 0.25s ease",
        opacity: stage === "enter" ? 1 : 0,
        transform: stage === "enter" ? "translateY(0)" : "translateY(12px)",
      }}
    >
      {displayChildren}
    </div>
  );
}
