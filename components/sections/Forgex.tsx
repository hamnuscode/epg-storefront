"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FilterPills } from "@/components/ui/FilterPills";
import { ButtonLink } from "@/components/ui/Button";
import { assets } from "@/lib/assets";
import { forgexTabs } from "@/lib/data";
import { cn } from "@/lib/cn";

/** Piping colours read off the render's first swatch row. */
const PIPING = ["#101010", "#ffffff", "#f2621f", "#f5a623", "#8cd211", "conic"];

/**
 * Figma: "Forgex" (1440x986) — the white band. "EASTERN" is set enormous in
 * near-white behind the jersey, which floats on concentric rings. The
 * configurator panel sits right; headline and CTA lower left.
 */
export function Forgex() {
  const [tab, setTab] = useState<string>(forgexTabs[1]);
  const [piping, setPiping] = useState(0);
  const [flex, setFlex] = useState(0);

  return (
    <section aria-labelledby="forgex" className="relative overflow-hidden bg-surface-light py-16 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="forgex" className="font-sans text-[clamp(1.4rem,2.4vw,1.9rem)] font-semibold tracking-[-0.03em] text-surface">
            The Forgex Custom Experience
          </h2>
          <FilterPills
            label="Choose a sport"
            options={forgexTabs}
            value={tab}
            onChange={setTab}
            size="sm"
            tone="light"
          />
        </div>
      </div>

      {/* Ghost display word */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-[38%] w-full select-none text-center font-display text-[19vw] leading-none tracking-[-0.03em] text-surface/5"
      >
        EASTERN
      </span>

      <div className="relative mx-auto mt-10 grid max-w-[1440px] items-center gap-10 px-6 md:px-12 lg:grid-cols-[1fr_360px]">
        {/* Jersey on concentric rings */}
        <div className="relative flex items-end justify-center">
          <div aria-hidden className="absolute bottom-2 flex items-center justify-center">
            {[280, 210, 150].map((d) => (
              <span key={d} className="absolute rounded-[50%] border border-surface/8" style={{ width: d * 1.9, height: d * 0.42 }} />
            ))}
          </div>
          <Image
            src={assets.forgexJersey}
            alt="Customisable EPG jersey, front and back"
            width={637}
            height={643}
            loading="lazy"
            sizes="(max-width: 1024px) 90vw, 560px"
            className="relative h-auto w-full max-w-[560px] object-contain"
          />
        </div>

        {/* Configurator panel */}
        <div className="w-full rounded-[22px] border border-surface/8 bg-white p-4 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
          <Row label="Hand Front" />

          <SwatchRow
            label="Pipping"
            count={PIPING.length}
            active={piping}
            onPick={setPiping}
            render={(i) => (
              <span
                className="size-full rounded-full"
                style={
                  PIPING[i] === "conic"
                    ? { background: "conic-gradient(from 0deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }
                    : { background: PIPING[i], boxShadow: PIPING[i] === "#ffffff" ? "inset 0 0 0 1px rgba(0,0,0,.15)" : undefined }
                }
              />
            )}
          />

          <SwatchRow
            label="Middle Flex"
            count={assets.forgexSwatches.length}
            active={flex}
            onPick={setFlex}
            render={(i) => (
              <Image src={assets.forgexSwatches[i]} alt="" fill sizes="34px" className="rounded-full object-cover" />
            )}
          />

          <div className="flex items-center justify-between py-3">
            <span className="font-sans text-xs text-surface/70">Logo Upload</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="text-surface/50">
              <path d="M12 16V4m0 0L8 8m4-4l4 4M4 18v2h16v-2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-[1440px] flex-col gap-5 px-6 md:px-12">
        <h3 className="max-w-[420px] font-sans text-[clamp(1.6rem,3vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-surface">
          50+ Customizable Products. Try now!
        </h3>
        <ButtonLink href="/custom" variant="dark" size="md" className="w-fit">
          Explore More
        </ButtonLink>
        <p className="font-sans text-xs text-surface/55">
          <Link href="/custom" className="font-medium text-danger hover:underline">Click here</Link>
          {" "}to view more customizable features.
        </p>
      </div>
    </section>
  );
}

function Row({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-surface/8 py-3">
      <span className="font-sans text-xs text-surface/70">{label}</span>
    </div>
  );
}

function SwatchRow({
  label, count, active, onPick, render,
}: {
  label: string;
  count: number;
  active: number;
  onPick: (i: number) => void;
  render: (i: number) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5 border-b border-surface/8 py-3">
      <div className="flex items-center justify-between">
        <span className="font-sans text-xs text-surface/70">{label}</span>
        <button type="button" aria-label={`More ${label} options`} className="text-surface/40 hover:text-surface">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onPick(i)}
            aria-label={`${label} option ${i + 1}`}
            aria-pressed={i === active}
            className={cn(
              "relative size-[34px] overflow-hidden rounded-full transition-shadow",
              i === active ? "ring-2 ring-surface ring-offset-2" : "hover:ring-1 hover:ring-surface/25"
            )}
          >
            {render(i)}
          </button>
        ))}
      </div>
    </div>
  );
}
