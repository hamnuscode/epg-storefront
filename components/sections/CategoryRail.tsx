"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { FilterPills } from "@/components/ui/FilterPills";
import { cn } from "@/lib/cn";

export interface Tile {
  readonly image: string;
  readonly label: string;
}

/**
 * Figma: the two "Category" frames (1:2266 / 1:2529) — heading left, filter
 * pills right, then three wide tiles with the label set in condensed caps at
 * the bottom-left, and a five-segment rule beneath the row.
 */
export function CategoryRail({
  title,
  filters,
  tiles,
  headingId,
  href = "/collection",
}: {
  title: string;
  filters: readonly string[];
  tiles: readonly Tile[];
  headingId: string;
  href?: string;
}) {
  const [active, setActive] = useState(filters[0]);
  const [segment, setSegment] = useState(0);

  return (
    <section aria-labelledby={headingId} className="bg-surface py-14 md:py-20">
      <Container className="flex flex-col gap-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id={headingId}
            className="font-sans text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-white"
          >
            {title}
          </h2>
          <FilterPills
            label={`Filter ${title}`}
            options={filters}
            value={active}
            onChange={setActive}
            size="sm"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tiles.map((tile, i) => (
            <Link
              key={tile.label}
              href={href}
              className="group relative aspect-[430/300] overflow-hidden rounded-md bg-surface-raised"
            >
              <Image
                src={tile.image}
                alt=""
                fill
                priority={i === 0}
                sizes="(max-width: 768px) 100vw, 430px"
                className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent" />
              <h3 className="absolute bottom-5 left-5 font-condensed text-lg font-semibold uppercase tracking-[0.14em] text-white">
                {tile.label}
              </h3>
            </Link>
          ))}
        </div>

        {/* Five-segment rule (Figma: Frame 25) */}
        <div className="mx-auto flex items-center gap-3">
          {Array.from({ length: 5 }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSegment(i)}
              aria-label={`Page ${i + 1} of 5`}
              aria-current={i === segment || undefined}
              className={cn(
                "h-px w-9 transition-colors",
                i === segment ? "bg-white" : "bg-white/25 hover:bg-white/50"
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
