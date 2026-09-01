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
    <section aria-labelledby="disciplines" className="bg-surface pb-10 pt-12">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2 id="disciplines" className="font-condensed text-[22px] font-semibold uppercase leading-none tracking-[0.16em] text-white">
          {heading}
        </h2>
      </div>

      <div className="mx-auto mt-5 grid max-w-[1440px] grid-cols-2 gap-px bg-line px-6 md:grid-cols-4 md:px-12">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "group relative flex h-[92px] min-w-0 items-center overflow-hidden bg-navy-800 text-left transition-colors md:h-[112px]",
              i === active && "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-brand-400"
            )}
          >
            <span className="z-10 pl-5 font-condensed text-xs font-semibold uppercase tracking-[0.16em] text-white md:text-sm">
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
