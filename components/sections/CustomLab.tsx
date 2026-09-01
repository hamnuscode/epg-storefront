"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

const PIPING = ["#101010", "#ffffff", "#f2621f", "#f5a623", "#8cd211", "conic"];
const FEATURES = ["Real-time 3D Preview", "Instant Rendering", "Production Ready"] as const;

/**
 * Figma: "Wireframe - 23" on Custom (1440x875) — THE CUSTOM LAB. Copy and
 * feature list at the left, the jersey with its configurator at the right.
 */
export function CustomLab({ jersey, swatches }: { jersey: string; swatches: readonly string[] }) {
  const [piping, setPiping] = useState(0);
  const [flex, setFlex] = useState(0);

  return (
    <section aria-labelledby="custom-lab" className="bg-surface py-25">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <h2 id="custom-lab" className="font-condensed text-[28px] font-semibold uppercase leading-none tracking-[0.1em] text-white">
          The Custom Lab
        </h2>

        <div className="mt-16 flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-[73px]">
          <div className="flex max-w-[560px] flex-col gap-6">
            <h3 className="font-sans text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
              Design in Real Time.
            </h3>
            <p className="font-sans text-[clamp(1rem,1.8vw,1.75rem)] leading-[1.4] text-white/65">
              Every change updates instantly. Experiment freely before production begins.
            </p>
            <ul className="mt-2 flex flex-col gap-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-3 font-sans text-[15px] text-white/80">
                  <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-brand-500/25 text-brand-400">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full flex-col items-center gap-8 sm:flex-row lg:w-auto">
            <Image
              src={jersey}
              alt="Customisable EPG kit"
              width={247}
              height={467}
              loading="lazy"
              sizes="247px"
              className="h-auto w-[210px] object-contain md:w-[247px]"
            />

            <div className="w-full max-w-[300px] rounded-[18px] border border-line bg-surface-raised p-4">
              <Row label="Hand Front" />
              <SwatchRow label="Pipping" count={PIPING.length} active={piping} onPick={setPiping}
                render={(i) => (
                  <span className="size-full rounded-full" style={
                    PIPING[i] === "conic"
                      ? { background: "conic-gradient(from 0deg,#f00,#ff0,#0f0,#0ff,#00f,#f0f,#f00)" }
                      : { background: PIPING[i], boxShadow: PIPING[i] === "#ffffff" ? "inset 0 0 0 1px rgba(255,255,255,.35)" : undefined }} />
                )} />
              <SwatchRow label="Middle Flex" count={swatches.length} active={flex} onPick={setFlex}
                render={(i) => <Image src={swatches[i]} alt="" fill sizes="30px" className="rounded-full object-cover" />} />
              <Row label="Text & Personalization" />
              <Row label="Player Name" />
              <Row label="Number" />
              <div className="flex items-center justify-between pt-3">
                <span className="font-sans text-[13px] text-white/70">Logo Upload</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className="text-white/50">
                  <path d="M12 16V4m0 0L8 8m4-4l4 4M4 18v2h16v-2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-line py-3">
      <span className="font-sans text-[13px] text-white/70">{label}</span>
      <span aria-hidden className="text-white/35">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" strokeLinecap="round" /></svg>
      </span>
    </div>
  );
}

function SwatchRow({ label, count, active, onPick, render }: {
  label: string; count: number; active: number; onPick: (i: number) => void; render: (i: number) => React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5 border-b border-line py-3">
      <span className="font-sans text-[13px] text-white/70">{label}</span>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" onClick={() => onPick(i)} aria-label={`${label} option ${i + 1}`} aria-pressed={i === active}
            className={cn("relative size-[30px] overflow-hidden rounded-full transition-shadow",
              i === active ? "ring-2 ring-white ring-offset-2 ring-offset-surface-raised" : "hover:ring-1 hover:ring-white/35")}>
            {render(i)}
          </button>
        ))}
      </div>
    </div>
  );
}
