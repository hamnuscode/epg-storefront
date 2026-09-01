import Image from "next/image";
import { Navbar } from "@/components/layouts/Navbar";
import { ButtonLink } from "@/components/ui/Button";
import { HotspotTag } from "@/components/ui/HotspotTag";
import { cn } from "@/lib/cn";

export interface Hotspot { label: string; top: string; left: string }

/**
 * Figma: "Martial Arts Page Hero" (1440x770), reused by every category page,
 * Custom, About and the 404.
 *
 * Three variations the frames actually use:
 *  - `display` — the oversized ghost word. Martial Arts / Baseball / Golf /
 *    Custom / About / 404 have one; Collection deliberately does not.
 *  - `subject` — a cut-out athlete. Collection has none, showing the
 *    photography uncropped instead.
 *  - `hotspots` — pills pinned onto the photography, independent of whether
 *    there is a subject. Collection pins nine straight onto the backdrop.
 */
export function PageHero({
  display, title, tagline, subject, backdrop, hotspots = [],
  primaryCta = { label: "Explore Collection", href: "#gear" },
  secondaryCta, aside, tall = false,
}: {
  display?: string;
  title: string;
  tagline: string;
  subject?: string;
  backdrop: string;
  hotspots?: Hotspot[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** About sets its lead paragraph beside the title inside the hero row. */
  aside?: string;
  tall?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative isolate flex flex-col justify-end overflow-hidden bg-navy-800",
        tall ? "min-h-[100svh] md:min-h-[1024px]" : "min-h-[560px] md:min-h-[770px]"
      )}
    >
      {/* Photography at full strength — only a bottom vignette for the title
          and a light top scrim so the navbar stays legible. */}
      <Image src={backdrop} alt="" fill priority sizes="100vw" className="-z-30 object-cover" />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-20 h-32 bg-linear-to-b from-black/55 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-20 h-[52%] bg-linear-to-t from-surface via-surface/70 to-transparent" />

      {display && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[24%] -z-10 w-full -translate-x-1/2 select-none text-center font-display text-[24vw] uppercase leading-none tracking-[-0.02em] text-white/8 md:top-[14%] md:text-[19vw]"
        >
          {display}
        </span>
      )}

      <Navbar />

      {subject && (
        <div className="pointer-events-none absolute bottom-0 right-[-6%] -z-10 h-[74%] w-[112%] md:inset-x-0 md:right-0 md:top-[6%] md:h-[78%] md:w-auto">
          <Image src={subject} alt="" fill priority sizes="100vw" className="object-contain object-bottom md:object-center" />
        </div>
      )}

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

        {aside && (
          <p className="max-w-[430px] font-sans text-[13px] leading-[1.75] text-white/60">{aside}</p>
        )}
      </div>
    </section>
  );
}
