"use client";

import { useRef } from "react";
import Link from "next/link";

const ITEMS = Array.from({ length: 6 }, (_, i) => ({
  id: `rel-${i + 1}`,
  title: "UFC UNRIVALED",
  subtitle: "Men's Black Hoodie",
  price: 69.99,
}));

/**
 * Figma: the "You may also like" rail beneath the product detail — heading
 * left, paired scroll arrows right, then a row of cards whose title sits in
 * condensed caps above a muted subtitle, price ranged right.
 */
export function RelatedProducts() {
  const track = useRef<HTMLDivElement>(null);
  const nudge = (dir: 1 | -1) =>
    track.current?.scrollBy({ left: dir * 260, behavior: "smooth" });

  return (
    <section aria-labelledby="related" className="bg-surface pb-20 pt-8">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="flex items-center justify-between">
          <h2 id="related" className="font-sans text-[clamp(1.2rem,2.2vw,1.6rem)] font-semibold tracking-[-0.03em] text-white">
            You may also like
          </h2>
          <div className="flex items-center gap-4">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => nudge(d as 1 | -1)}
                aria-label={d === -1 ? "Previous products" : "Next products"}
                className="text-white/60 transition-colors hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
                  <path d={d === -1 ? "M19 12H5m0 0l6-6m-6 6l6 6" : "M5 12h14m0 0l-6-6m6 6l-6 6"} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div ref={track} className="no-scrollbar mt-6 flex gap-5 overflow-x-auto scroll-smooth">
          {ITEMS.map((item) => (
            <Link key={item.id} href="/collection" className="group w-[240px] shrink-0">
              <span className="block aspect-[240/168] bg-surface-muted transition-opacity group-hover:opacity-85" aria-hidden />
              <span className="mt-3 flex items-baseline justify-between gap-3">
                <span className="flex flex-col gap-0.5">
                  <span className="font-condensed text-sm font-semibold uppercase tracking-[0.08em] text-white">
                    {item.title}
                  </span>
                  <span className="font-sans text-[11px] text-white/45">{item.subtitle}</span>
                </span>
                <span className="font-sans text-xs tabular-nums text-white">${item.price.toFixed(2)}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
