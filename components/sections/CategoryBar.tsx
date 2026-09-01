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
  const [active, setActive] = useState(1); // the frame shows Men selected

  return (
    <section aria-labelledby="shop-by-category" className="bg-surface py-11">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2
          id="shop-by-category"
          className="font-condensed text-[22px] font-semibold uppercase leading-none tracking-[0.16em] text-white"
        >
          Shop by Category
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-1 md:grid-cols-4">
          {tiles.map((tile, i) => (
            <button
              key={tile.label}
              type="button"
              onClick={() => setActive(i)}
              aria-pressed={i === active}
              className={cn(
                "group relative flex h-[104px] items-center overflow-hidden text-left transition-colors md:h-[118px]",
                "bg-linear-to-r from-[#182842] to-[#22375c]",
                i === active && "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-brand-400"
              )}
            >
              <span className="z-10 pl-6 font-condensed text-lg font-semibold uppercase tracking-[0.14em] text-white md:text-[22px]">
                {tile.label}
              </span>
              <span className="absolute inset-y-0 right-0 flex w-[64%] items-end justify-end gap-1 pr-3">
                {tile.images.map((src) => (
                  <span key={src} className="relative h-full flex-1">
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
