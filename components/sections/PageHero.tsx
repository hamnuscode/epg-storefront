import Image from "next/image";
import { Navbar } from "@/components/layouts/Navbar";
import { ButtonLink } from "@/components/ui/Button";
import { HotspotTag } from "@/components/ui/HotspotTag";
import { cn } from "@/lib/cn";

export interface Hotspot { label: string; top: string; left: string }

/**
 * Figma: "Martial Arts Page Hero" (1440x770) and its siblings. The stack the
 * frames actually use, bottom to top:
 *   1. a linear gradient ground, #495264 -> #0b1f38
 *   2. `wash` — a photograph at 10% opacity, used as texture, not subject
 *   3. `photo` — a full-opacity photograph (Collection only)
 *   4. the oversized ghost word
 *   5. `subject` — a cut-out athlete or apparel row
 *   6. a bottom scrim: transparent at 35% to black/70% at 82%
 *   7. hotspot pills, then the title block
 */
export function PageHero({
  display, title, tagline, subject, flipSubject, wash, photo, hotspots = [],
  primaryCta = { label: "Explore Collection", href: "#gear" },
  secondaryCta, aside, tall = false,
}: {
  display?: string;
  title: string;
  tagline: string;
  subject?: string;
  /** Martial Arts mirrors its athlete in the frame. */
  flipSubject?: boolean;
  /** Texture photograph, painted at 10% as the frames do. */
  wash?: string;
  /** Full-strength photograph. Only Collection uses one. */
  photo?: string;
  hotspots?: Hotspot[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  aside?: string;
  tall?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden",
        tall ? "min-h-[100svh] md:min-h-[1024px]" : "min-h-[560px] md:min-h-[770px]"
      )}
      style={{ background: "linear-gradient(180deg,#495264 0%,#0b1f38 100%)" }}
    >
      {photo && <Image src={photo} alt="" fill priority sizes="100vw" className="-z-30 object-cover" />}
      {wash && (
        <Image src={wash} alt="" fill priority sizes="100vw" className="-z-30 object-cover opacity-10" />
      )}

      {display && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[24%] -z-20 w-full -translate-x-1/2 select-none text-center font-display text-[24vw] uppercase leading-none tracking-[-0.02em] text-white/10 md:top-[14%] md:text-[19vw]"
        >
          {display}
        </span>
      )}

      <Navbar />

      {subject && (
        <div className="pointer-events-none absolute bottom-0 right-[-6%] -z-10 h-[74%] w-[112%] md:inset-x-0 md:right-0 md:top-[4%] md:h-[86%] md:w-auto">
          <Image src={subject} alt="" fill priority sizes="100vw" className={cn("object-contain object-bottom md:object-center", flipSubject && "scale-x-[-1]")} />
        </div>
      )}

      {/* Bottom scrim — the frame's Rectangle 36 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-[5] h-[67%]"
        style={{ background: "linear-gradient(180deg,rgba(0,0,0,0) 35%,rgba(0,0,0,0.7) 82%,rgba(0,0,0,0.72) 100%)" }}
      />

      {hotspots.length > 0 && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          {hotspots.map((h) => (
            <HotspotTag key={h.label} label={h.label} style={{ top: h.top, left: h.left }} />
          ))}
        </div>
      )}

      <div
        className={cn(
          "relative z-20 flex flex-col items-start gap-5 px-6 pb-16 pt-24 text-left md:pb-20 md:pt-0",
          aside
            ? "mx-auto w-full max-w-[1360px] md:flex-row md:items-end md:justify-between md:gap-12 md:px-10"
            : "md:items-center md:text-center"
        )}
      >
        <div className={cn("flex flex-col items-start gap-2", !aside && "md:items-center")}>
          <h1 className="font-sans text-[clamp(2rem,4.8vw,3.1rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
            {title}
          </h1>
          <p className="font-sans text-[14px] text-white/80">{tagline}</p>

          <div className={cn("mt-3 flex flex-col items-start gap-2 sm:flex-row sm:items-center", !aside && "md:justify-center")}>
            <ButtonLink href={primaryCta.href} variant="solid" size="md">{primaryCta.label}</ButtonLink>
            {secondaryCta && (
              <ButtonLink href={secondaryCta.href} variant="outline" size="md">{secondaryCta.label}</ButtonLink>
            )}
          </div>
        </div>

        {aside && <p className="max-w-[430px] font-sans text-[13px] leading-[1.75] text-white/60">{aside}</p>}
      </div>
    </section>
  );
}
