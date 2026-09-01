"use client";

import { useMemo, useState } from "react";
import { GearToolbar } from "@/components/ui/GearToolbar";
import { ProductCard } from "@/components/shared/ProductCard";
import type { Product } from "@/types";

/**
 * Figma: "Wireframe - 20" / "Wireframe - 21" — the listing block.
 * "CHOOSE YOUR GEAR" heading, the toolbar row, then a three-column grid
 * whose tiles sit flush against a hairline gutter.
 */
export function ProductListing({
  products, filters, categories, heading = "Choose Your Gear",
}: {
  products: Product[];
  filters: string[];
  categories: string[];
  heading?: string;
}) {
  const [filter, setFilter] = useState(filters[0]);
  const [category, setCategory] = useState(categories[0]);
  const [query, setQuery] = useState("");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? products.filter((p) => p.name.toLowerCase().includes(q)) : products;
  }, [products, query]);

  return (
    <section id="gear" aria-labelledby="choose-gear" className="bg-surface pb-20 pt-6">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 md:px-12">
        <h2 id="choose-gear" className="font-condensed text-sm font-semibold uppercase tracking-[0.2em] text-white">
          {heading}
        </h2>

        <GearToolbar
          filters={filters} filter={filter} onFilter={setFilter}
          categories={categories} category={category} onCategory={setCategory}
          query={query} onQuery={setQuery}
        />

        {shown.length === 0 ? (
          <p role="status" className="py-16 text-center font-sans text-sm text-white/50">
            No products match &ldquo;{query}&rdquo;. Try a different search.
          </p>
        ) : (
          <div className="mt-2 grid grid-cols-2 gap-px bg-line md:grid-cols-3">
            {shown.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
