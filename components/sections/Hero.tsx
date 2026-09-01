import Image from "next/image";
import { Navbar } from "@/components/layouts/Navbar";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { assets } from "@/lib/assets";
import { hero } from "@/lib/data";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";

/**
 * Figma: "Alt 1" (1440x911) — full-bleed photo, the oversized EPG wordmark
 * bleeding behind it, headline block at 662px wide, and three cards pinned
 * to the bottom edge (Frame 7).
 */
export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-surface md:min-h-[911px]">
      <Image
        src={assets.heroBackdrop}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Scrims: darken the base, then deepen toward the copy side */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-linear-to-r from-surface via-surface/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-surface to-transparent" />

      {/* Oversized wordmark, clipped by the section like the Figma frame */}
      <span
        aria-hidden
        className={cn(
          textStyles.wordmark,
          "pointer-events-none absolute -bottom-[8%] left-1/2 -translate-x-1/2",
          "select-none text-[38vw] text-white/8 md:text-[26rem]"
        )}
      >
        {hero.wordmark}
      </span>

      <Navbar />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1406px] flex-col justify-center px-6 pb-64 pt-32 md:min-h-[911px] md:pb-56">
        <div className="flex max-w-[662px] flex-col gap-4.5">
          <h1 className={cn(textStyles.heroTitle, "text-white")}>{hero.title}</h1>
          <p className={cn(textStyles.bodyBase, "max-w-[401px] text-white/76")}>
            {hero.body}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 px-6 pb-8">
        <div className="mx-auto flex max-w-[1406px] flex-col gap-4 md:flex-row md:justify-center md:gap-6">
          {hero.cards.map((card) => (
            <FeatureCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
