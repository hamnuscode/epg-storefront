"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { FilterPills } from "@/components/ui/FilterPills";
import { gearFilters, gearProducts } from "@/lib/data";
import type { Product } from "@/types";

/**
 * Figma: "Featured Products" (1440x1700) — "Find Your Gear". Product shots
 * float on near-black tiles; the name sits small beneath with the price set
 * in the brand blue.
 */
export function FindYourGear({
  heading = "Find Your Gear",
  products = gearProducts,
}: {
  heading?: string;
  products?: Product[];
}) {
  const [filter, setFilter] = useState<string>(gearFilters[0]);

  return (
    <section aria-labelledby="find-gear" className="bg-surface py-14 md:py-20">
      <Container className="flex flex-col gap-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="find-gear"
            className="font-sans text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-white"
          >
            {heading}
          </h2>
          <FilterPills
            label="Filter products"
            options={gearFilters}
            value={filter}
            onChange={setFilter}
            size="sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group flex flex-col gap-3 rounded-md bg-[#141414] p-4 transition-colors hover:bg-[#1b1b1b]"
            >
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority={i < 4}
                  loading={i < 4 ? undefined : "lazy"}
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 300px"
                  className="object-contain transition-transform duration-500 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-105"
                />
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="truncate font-sans text-xs font-medium text-white/70">
                  {product.name}
                </h3>
                <span className="shrink-0 font-sans text-xs font-semibold tabular-nums text-brand-400">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
