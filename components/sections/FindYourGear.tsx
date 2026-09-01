"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FilterPills } from "@/components/ui/FilterPills";
import { gearFilters, gearProducts } from "@/lib/data";
import type { Product } from "@/types";
import { cn } from "@/lib/cn";

/**
 * Figma: "Featured Products" — "Find Your Gear". A staggered four-column
 * grid: each column is offset vertically so the tiles interlock. Cards carry
 * a hairline border, the shot on near-black, then the name and a blue price
 * on one line at the foot.
 */
export function FindYourGear({
  heading = "Find Your Gear",
  products = gearProducts,
}: {
  heading?: string;
  products?: Product[];
}) {
  const [filter, setFilter] = useState<string>(gearFilters[0]);

  // Column offsets reproduce the interlocking rhythm of the frame.
  const offsets = ["md:mt-0", "md:mt-14", "md:mt-4", "md:mt-20"];
  const columns: Product[][] = [[], [], [], []];
  products.forEach((p, i) => columns[i % 4].push(p));

  return (
    <section aria-labelledby="find-gear" className="bg-surface py-12 md:py-16">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-6 md:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="find-gear" className="font-sans text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.03em] text-white">
            {heading}
          </h2>
          <FilterPills label="Filter products" options={gearFilters} value={filter} onChange={setFilter} size="sm" />
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {columns.map((col, ci) => (
            <div key={ci} className={cn("flex flex-col gap-4", offsets[ci])}>
              {col.map((product, i) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group flex flex-col border border-line bg-surface-raised transition-colors hover:border-line-strong"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      priority={ci < 2 && i === 0}
                      loading={ci < 2 && i === 0 ? undefined : "lazy"}
                      sizes="(max-width: 1024px) 45vw, 300px"
                      className="object-contain p-6 transition-transform duration-500 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-baseline justify-end gap-2 px-4 pb-3">
                    <h3 className="truncate font-sans text-[11px] text-white/80">{product.name}</h3>
                    <span className="shrink-0 font-sans text-[11px] font-medium tabular-nums text-brand-400">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
