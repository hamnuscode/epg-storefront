"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/ui/Container";
import { FilterPills } from "@/components/ui/FilterPills";
import { ProductCard } from "@/components/shared/ProductCard";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

const SORTS = ["Featured", "Price: low to high", "Price: high to low"] as const;

/**
 * Figma: "Wireframe - 20" (1440x2183) and "Wireframe - 21" (1440x1562) —
 * the same listing block at two grid heights. "choose your gear" heading,
 * a chip row of sub-filters, a sort control, then the product grid.
 */
export function ProductListing({
  products,
  filters,
}: {
  products: Product[];
  filters: string[];
}) {
  const [filter, setFilter] = useState(filters[0]);
  const [sort, setSort] = useState<string>(SORTS[0]);

  const shown = useMemo(() => {
    const list = [...products];
    if (sort === "Price: low to high") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: high to low") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);

  return (
    <section id="gear" aria-labelledby="choose-gear" className="bg-surface pb-25 pt-14">
      <Container className="flex flex-col gap-11">
        <h2
          id="choose-gear"
          className="font-condensed text-3xl font-semibold uppercase tracking-[0.1em] text-white"
        >
          choose your gear
        </h2>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <FilterPills
            label="Filter by product type"
            options={filters}
            value={filter}
            onChange={setFilter}
            className="flex-wrap"
          />

          <label className="flex items-center gap-3">
            <span className="font-condensed text-base uppercase tracking-[0.14em] text-white/50">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className={cn(
                "h-10 rounded-xl border border-line bg-surface-raised px-3",
                "font-sans text-base text-white outline-none",
                "focus-visible:border-brand-400"
              )}
            >
              {SORTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {shown.map((p, i) => (
            <ProductCard key={p.id} product={p} priority={i < 4} />
          ))}
        </div>
      </Container>
    </section>
  );
}
