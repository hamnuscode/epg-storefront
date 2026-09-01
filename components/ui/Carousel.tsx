"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Horizontal scroller used by "Shop by Category" and "Our Sports".
 * The Figma design shows a 5-segment progress rule beneath the track
 * (Frame 25: five 40px lines, 16px gap) — that is driven here by real
 * scroll position rather than being decorative.
 */
export function Carousel({
  children,
  segments = 5,
  ariaLabel,
  className,
}: {
  children: ReactNode;
  segments?: number;
  ariaLabel: string;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const ratio = max > 0 ? el.scrollLeft / max : 0;
    setActive(Math.min(segments - 1, Math.round(ratio * (segments - 1))));
  }, [segments]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const jump = (index: number) => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    el.scrollTo({ left: (index / (segments - 1)) * max, behavior: "smooth" });
  };

  return (
    <div className={cn("flex flex-col gap-16", className)}>
      <div
        ref={trackRef}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth"
      >
        {children}
      </div>

      <div className="mx-auto flex items-center gap-4">
        {Array.from({ length: segments }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => jump(i)}
            aria-label={`Go to position ${i + 1} of ${segments}`}
            aria-current={i === active || undefined}
            className={cn(
              "h-0.5 w-10 rounded-full transition-colors duration-300",
              i === active ? "bg-white" : "bg-white/25 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </div>
  );
}
