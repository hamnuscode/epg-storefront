"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

export interface Discipline {
  readonly label: string;
  readonly image: string;
}

/**
 * Figma: "Shop by Discipline" — four wide tiles, label ranged left and the
 * athlete bled to the right of each. The active tile carries a blue rule down
 * its leading edge. Desktop is 1x4; mobile reflows to 2x2.
 */
export function DisciplineRail({
  heading = "Shop by Discipline",
  items,
}: {
  heading?: string;
  items: readonly Discipline[];
}) {
  const [active, setActive] = useState(1);

  return (
    <section aria-labelledby="disciplines" className="bg-surface px-0 pb-[45px] pt-[45px]">
      <div className="mx-auto max-w-[1440px] px-6">
        <h2 id="disciplines" className="font-condensed text-[22px] font-semibold uppercase leading-none tracking-[0.16em] text-white">
          {heading}
        </h2>
      </div>

      <div className="mx-auto mt-[43px] grid max-w-[1440px] grid-cols-2 gap-2.5 px-6 md:grid-cols-4 md:px-6">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "group relative flex h-[120px] min-w-0 items-center overflow-hidden bg-navy-800 px-[18px] text-left transition-colors md:h-[148px]",
              i === active && "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-brand-400"
            )}
          >
            <span className="z-10 font-condensed text-sm font-semibold uppercase tracking-[0.16em] text-white md:text-lg">
              {item.label}
            </span>
            <span className="absolute inset-y-0 right-0 w-[62%]">
              <Image
                src={item.image}
                alt=""
                fill
                loading="lazy"
                sizes="(max-width: 768px) 45vw, 200px"
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
