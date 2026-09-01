"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Carousel } from "@/components/ui/Carousel";
import { FilterPills } from "@/components/ui/FilterPills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoryCard } from "@/components/shared/CategoryCard";
import type { CategoryTile } from "@/types";

/**
 * The repeated "Shop by Category" / "Our Sports" band
 * (Figma: Category 1:2266 and 1:2529 — identical structure, different data).
 * 200px top / 100px bottom padding, heading row, then a snapping rail.
 */
export function CategoryRail({
  title,
  filters,
  tiles,
  headingId,
}: {
  title: string;
  filters: readonly string[];
  tiles: CategoryTile[];
  headingId: string;
}) {
  const [active, setActive] = useState(filters[0]);

  return (
    <section aria-labelledby={headingId} className="bg-surface py-25 md:pb-25 md:pt-50">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          id={headingId}
          title={title}
          action={
            <FilterPills
              label={`Filter ${title}`}
              options={filters}
              value={active}
              onChange={setActive}
            />
          }
        />
        <Carousel ariaLabel={`${title} products`} segments={5}>
          {tiles.map((tile, i) => (
            <CategoryCard key={tile.id} tile={tile} priority={i === 0} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
