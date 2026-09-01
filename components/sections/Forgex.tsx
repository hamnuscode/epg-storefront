"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { FilterPills } from "@/components/ui/FilterPills";
import { assets } from "@/lib/assets";
import { forgex, forgexTabs } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * Figma: "Forgex" (1440x986) — the one white band on the page. "EASTERN"
 * is set at 365px in the display face behind the product, which sits over a
 * stack of soft ellipses. Swatch panel right, headline and CTA lower left.
 */
export function Forgex() {
  const [tab, setTab] = useState<string>(forgexTabs[1]);
  const [swatch, setSwatch] = useState(0);

  return (
    <section aria-labelledby="forgex" className="overflow-hidden bg-surface-light py-25">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="forgex" className="font-sans text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-[-0.03em] text-surface">
            {forgex.heading}
          </h2>
          <FilterPills
            label="Choose a sport"
            options={forgexTabs}
            value={tab}
            onChange={setTab}
            size="sm"
            className="[&_button]:text-surface/45 [&_button[aria-selected=true]]:bg-[#ebebeb] [&_button[aria-selected=true]]:text-surface"
          />
        </div>

        <div className="relative">
          {/* Oversized display word behind the product */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none font-display text-[22vw] leading-none tracking-[-0.04em] text-surface/6 md:text-[16rem]"
          >
            {forgex.display}
          </span>

          <div className="relative flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center">
            {/* Product on its ellipse stack */}
            <div className="relative flex w-full max-w-[520px] items-center justify-center">
              <div aria-hidden className="absolute inset-x-0 bottom-8 mx-auto h-24 w-[70%] rounded-[50%] bg-surface/5 blur-2xl" />
              <Image
                src={assets.forgexJersey}
                alt="Customisable EPG jersey"
                width={637}
                height={643}
                loading="lazy"
                sizes="(max-width: 1024px) 90vw, 520px"
                className="relative h-auto w-full object-contain"
              />
            </div>

            {/* Swatch panel */}
            <div className="w-full max-w-[359px] rounded-[26px] border border-black/5 bg-[#f5f5f5]/70 p-5 backdrop-blur-sm">
              <ul className="flex flex-col gap-4">
                {forgex.options.map((opt) => (
                  <li key={opt} className="flex items-center justify-between gap-4">
                    <span className="font-sans text-sm font-medium text-surface/70">{opt}</span>
                    <span aria-hidden className="h-px flex-1 bg-surface/10" />
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <span className="font-condensed text-xs uppercase tracking-[0.18em] text-surface/40">
                  Pattern
                </span>
                <div className="flex flex-wrap gap-2">
                  {assets.forgexSwatches.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setSwatch(i)}
                      aria-label={`Pattern ${i + 1}`}
                      aria-pressed={i === swatch}
                      className={cn(
                        "relative size-11 overflow-hidden rounded-full border-2 transition-colors",
                        i === swatch ? "border-surface" : "border-transparent hover:border-surface/30"
                      )}
                    >
                      <Image src={src} alt="" fill sizes="44px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-6 font-sans text-xs leading-[1.5] text-surface/50">
                {forgex.note}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-5 lg:max-w-[470px]">
          <h3 className="font-sans text-[clamp(1.75rem,3.4vw,3rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-surface">
            {forgex.title}
          </h3>
          <Link
            href="/custom"
            className="inline-flex h-12 items-center rounded-xl bg-surface px-8 font-condensed text-sm uppercase tracking-[0.18em] text-white transition-opacity hover:opacity-85"
          >
            {forgex.cta}
          </Link>
        </div>
      </Container>
    </section>
  );
}
