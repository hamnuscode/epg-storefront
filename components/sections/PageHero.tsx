import Image from "next/image";
import { Navbar } from "@/components/layouts/Navbar";
import { ButtonLink } from "@/components/ui/Button";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";

/**
 * Figma: "Martial Arts Page Hero" (1440x770) — reused by every category
 * page and the 404 (where it runs full height at 1024px). Oversized display
 * word bleeds behind a darkened photo; title, tagline and CTAs centre on it.
 */
export function PageHero({
  display,
  title,
  tagline,
  image,
  primaryCta = { label: "EXPLORE COLLECTION", href: "#gear" },
  secondaryCta,
  tall = false,
}: {
  display: string;
  title: string;
  tagline: string;
  image: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  tall?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden bg-surface",
        tall ? "min-h-[100svh] md:min-h-[1024px]" : "min-h-[560px] md:min-h-[770px]"
      )}
    >
      <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-surface via-surface/70 to-transparent" />

      {/* The bleeding display word (Figma renders it at 300px) */}
      <span
        aria-hidden
        className={cn(
          textStyles.wordmark,
          "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
          "select-none whitespace-nowrap text-[22vw] text-white/8 md:text-[16rem]"
        )}
      >
        {display}
      </span>

      <Navbar />

      <div className="relative flex flex-col items-center gap-8 px-6 pt-20 text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="font-sans text-[clamp(2.5rem,7vw,4.125rem)] font-semibold leading-[0.9] tracking-[-0.04em] text-white">
            {title}
          </h1>
          <p className={cn(textStyles.bodyBase, "text-white/80")}>{tagline}</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1">
          <ButtonLink
            href={primaryCta.href}
            size="lg"
            
          >
            {primaryCta.label}
          </ButtonLink>
          {secondaryCta && (
            <ButtonLink href={secondaryCta.href} size="lg" variant="outline">
              {secondaryCta.label}
            </ButtonLink>
          )}
        </div>
      </div>
    </section>
  );
}
