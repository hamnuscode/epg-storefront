"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export interface CategoryBarTile {
  readonly label: string;
  readonly images: readonly string[];
}

/**
 * Figma: the "Category Bar" instance on Collection (1440x315). A
 * "Shop by Category" heading over four 341x148 tiles — All / Men / Women /
 * Kids — each labelled at the left with apparel cut-outs bled to the right.
 */
export function CategoryBar({ tiles }: { tiles: readonly CategoryBarTile[] }) {
  const [active, setActive] = useState(0);

  return (
    <section aria-labelledby="shop-by-category" className="bg-surface py-11">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2
          id="shop-by-category"
          className="font-condensed text-[28px] font-semibold uppercase leading-none tracking-[0.1em] text-white"
        >
          Shop by Category
        </h2>

        <div className="mt-11 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {tiles.map((tile, i) => (
            <button
              key={tile.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={cn(
                "group relative flex h-[118px] items-center overflow-hidden bg-navy-800 text-left transition-colors md:h-[148px]",
                i === active && "ring-1 ring-brand-400"
              )}
            >
              <span className="z-10 pl-5 font-sans text-lg font-medium text-white md:text-2xl">
                {tile.label}
              </span>
              <span className="absolute inset-y-0 right-0 flex w-[68%] items-end justify-end gap-1.5 pr-2">
                {tile.images.map((src) => (
                  <span key={src} className="relative h-[96%] flex-1">
                    <Image
                      src={src}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(max-width: 768px) 30vw, 140px"
                      className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                    />
                  </span>
                ))}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
