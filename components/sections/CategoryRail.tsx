"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FilterPills } from "@/components/ui/FilterPills";
import { cn } from "@/lib/cn";

export interface Tile {
  readonly image: string;
  readonly label: string;
}

/**
 * Figma: the two "Category" frames. Heading left, pills right, then a rail
 * that bleeds past both gutters so neighbouring tiles are half-visible.
 * Beneath it sits a five-dash rule whose active dash is gold.
 *
 * `tone="card"` gives the blue-slate ground used by Shop by Category;
 * "photo" is the full-bleed photography used by Our Sports.
 */
export function CategoryRail({
  title, filters, tiles, headingId, href = "/collection", tone = "photo",
}: {
  title: string;
  filters: readonly string[];
  tiles: readonly Tile[];
  headingId: string;
  href?: string;
  tone?: "card" | "photo";
}) {
  const [active, setActive] = useState(filters[1] ?? filters[0]);
  const [dash, setDash] = useState(0);
  const track = useRef<HTMLDivElement>(null);

  const onScroll = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setDash(max > 0 ? Math.min(4, Math.round((el.scrollLeft / max) * 4)) : 0);
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const jump = (i: number) => {
    const el = track.current;
    if (!el) return;
    el.scrollTo({ left: (i / 4) * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
  };

  return (
    <section aria-labelledby={headingId} className="bg-surface py-12 md:py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 md:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id={headingId} className="font-sans text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.03em] text-white">
            {title}
          </h2>
          <FilterPills label={`Filter ${title}`} options={filters} value={active} onChange={setActive} size="sm" />
        </div>
      </div>

      {/* Bleeding rail: first tile aligns to the gutter, neighbours peek */}
      <div
        ref={track}
        role="region"
        aria-label={`${title} carousel`}
        tabIndex={0}
        className="no-scrollbar mt-6 flex snap-x gap-4 overflow-x-auto scroll-smooth px-6 md:px-10"
      >
        {tiles.map((tile, i) => (
          <Link
            key={tile.label + i}
            href={href}
            className={cn(
              "group relative aspect-[380/300] w-[74vw] shrink-0 snap-start overflow-hidden sm:w-[42vw] lg:w-[380px]",
              tone === "card" ? "bg-navy-card [background-image:radial-gradient(circle,rgba(255,255,255,.16)_1px,transparent_1px)] [background-size:34px_34px]" : "bg-surface-raised"
            )}
          >
            <Image
              src={tile.image}
              alt=""
              fill
              priority={i < 2}
              sizes="(max-width: 640px) 68vw, 404px"
              className={cn(
                "transition-transform duration-700 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-105",
                tone === "card" ? "object-contain p-12" : "object-cover"
              )}
            />
            {tone === "photo" && (
              <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/5 to-transparent" />
            )}
            <div className={cn("absolute inset-x-0 bottom-0 px-5 py-4", tone === "card" && "border-t border-white/15")}>
              <h3 className="font-condensed text-sm font-semibold uppercase tracking-[0.2em] text-white">
                {tile.label}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Five-dash rule, active dash gold */}
      <div className="mt-7 flex items-center justify-center gap-2.5">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => jump(i)}
            aria-label={`Go to position ${i + 1} of 5`}
            aria-current={i === dash || undefined}
            className={cn("h-0.5 w-8 transition-colors", i === dash ? "bg-accent" : "bg-white/20 hover:bg-white/45")}
          />
        ))}
      </div>
    </section>
  );
}
