"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { assets } from "@/lib/assets";
import { customiser } from "@/lib/data";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";

/**
 * Figma: "Banner Comp" (1440x685) — the 3D configurator teaser. The
 * Front / BAck labels are a real toggle here; the design shows both states.
 */
export function Customiser() {
  const [view, setView] = useState<string>(customiser.views[0]);

  return (
    <section aria-labelledby="customiser" className="relative overflow-hidden bg-surface">
      <div className="absolute inset-0">
        <Image
          src={assets.customiser}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container className="relative flex flex-col items-center gap-8 py-25 text-center">
        <p className={cn(textStyles.ticker, "text-accent")}>{customiser.eyebrow}</p>

        <div className="flex flex-col items-center">
          <span className="font-script text-5xl text-white md:text-7xl">
            {customiser.script}
          </span>
          <h2 id="customiser" className={cn(textStyles.sectionTitle, "text-white")}>
            {customiser.heading}
          </h2>
        </div>

        <p className={cn(textStyles.bodyBase, "max-w-2xl text-white/76")}>
          {customiser.body}
        </p>

        {/* Front / Back view switch */}
        <div role="group" aria-label="Product view" className="flex items-center gap-6">
          {customiser.views.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              aria-pressed={view === v}
              className={cn(
                "font-condensed text-2xl font-medium capitalize transition-colors",
                view === v ? "text-white" : "text-white/40 hover:text-white/70"
              )}
            >
              {v}
            </button>
          ))}
        </div>

        <ButtonLink href="/custom" size="lg">{customiser.cta}</ButtonLink>
        <p className="font-sans text-sm text-white/50">{customiser.note}</p>
      </Container>
    </section>
  );
}
