import Image from "next/image";
import { Navbar } from "@/components/layouts/Navbar";
import { ButtonLink } from "@/components/ui/Button";
import { HotspotTag } from "@/components/ui/HotspotTag";
import { cn } from "@/lib/cn";

export interface Hotspot { label: string; top: string; left: string }

/**
 * Figma: "Martial Arts Page Hero" (1440x770), reused by every category page
 * and the 404. The discipline word is set enormous in navy behind a cut-out
 * athlete; title, tagline and two skewed CTAs centre over it, with hotspot
 * pills annotating the kit.
 */
export function PageHero({
  display, title, tagline, subject, backdrop, hotspots = [],
  primaryCta = { label: "Explore Collection", href: "#gear" },
  secondaryCta, tall = false,
}: {
  display: string;
  title: string;
  tagline: string;
  subject?: string;
  backdrop: string;
  hotspots?: Hotspot[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tall?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex flex-col overflow-hidden bg-navy-800 justify-start md:justify-end",
        tall ? "min-h-[100svh] md:min-h-[1024px]" : "min-h-[560px] md:min-h-[770px]"
      )}
    >
      <Image src={backdrop} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-45" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-b from-navy-900/85 via-navy-800/60 to-surface" />

      {/* Discipline word behind the subject */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[26%] -z-10 w-full -translate-x-1/2 select-none text-center font-display text-[24vw] uppercase leading-none tracking-[-0.02em] text-white/6 md:top-[16%] md:text-[19vw] md:text-white/8"
      >
        {display}
      </span>

      <Navbar />

      {/* Cut-out athlete */}
      {subject && (
        <div className="absolute -z-10 bottom-0 right-[-6%] h-[74%] w-[112%] md:inset-x-0 md:right-0 md:bottom-auto md:top-[6%] md:h-[78%] md:w-auto">
          <Image src={subject} alt="" fill priority sizes="100vw" className="object-contain object-bottom md:object-center" />
          {hotspots.map((h) => (
            <HotspotTag key={h.label} label={h.label} style={{ top: h.top, left: h.left }} />
          ))}
        </div>
      )}

      {/* Scrim so the title holds over the subject */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[46%] bg-linear-to-t from-surface/90 via-surface/40 to-transparent md:from-surface md:via-surface/80" />

      <div className="relative flex flex-col items-start gap-4 px-6 pb-14 pt-24 text-left md:items-center md:pb-16 md:pt-0 md:text-center">
        <div className="flex flex-col items-start gap-1.5 md:items-center">
          <h1 className="font-sans text-[clamp(2rem,4.8vw,2.9rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white">
            {title}
          </h1>
          <p className="font-sans text-xs text-white/75">{tagline}</p>
        </div>

        <div className="flex flex-col items-start gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center">
          <ButtonLink href={primaryCta.href} variant="solid" size="sm">{primaryCta.label}</ButtonLink>
          {secondaryCta && (
            <ButtonLink href={secondaryCta.href} variant="outline" size="sm">{secondaryCta.label}</ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
