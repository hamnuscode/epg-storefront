import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layouts/Navbar";
import { assets } from "@/lib/assets";
import { hero } from "@/lib/data";
import { cn } from "@/lib/cn";

/**
 * Figma: "Alt 1" (1440x911). Boxer photographed right of centre against a
 * near-black ground, the EPG wordmark set enormous behind him, headline and
 * body ranged left, three linked cards overlapping the bottom edge.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <Navbar />

      <div className="relative mx-auto min-h-[760px] max-w-[1440px] px-6 pt-[60px] md:min-h-[911px]">
        {/* Wordmark sits behind the subject */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-24 select-none font-display text-[34vw] leading-[0.72] tracking-[-0.04em] text-white/6 md:right-16 md:text-[22rem]"
        >
          {hero.wordmark}
        </span>

        {/* Subject */}
        <div className="absolute bottom-[150px] right-0 h-[62%] w-[74%] md:bottom-[125px] md:h-[78%] md:w-[52%]">
          <Image
            src={assets.heroBoxer}
            alt="EPG athlete wrapping his hands"
            fill
            priority
            sizes="(max-width: 768px) 74vw, 52vw"
            className="object-contain object-bottom"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-surface to-transparent" />

        {/* Copy */}
        <div className="relative flex min-h-[560px] max-w-[620px] flex-col justify-center gap-5 pb-56 md:min-h-[720px]">
          <h1 className="font-sans text-[clamp(2.25rem,4.6vw,4.0625rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-white">
            {hero.titleLead}
            <span className="text-brand-400">{hero.titleAccent}</span>
            {hero.titleRest}
          </h1>
          <p className="max-w-[420px] font-sans text-base leading-[1.55] text-white/60">
            {hero.body}
          </p>
        </div>
      </div>

      {/* Cards overlapping the hero's lower edge */}
      <div className="relative z-10 mx-auto -mt-32 max-w-[1406px] px-6 pb-14 md:-mt-[105px]">
        <div className="grid gap-3 md:grid-cols-3">
          {hero.cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className={cn(
                "group flex items-center gap-3 rounded-md p-3.5",
                "bg-[#363636]/40 backdrop-blur-md transition-colors hover:bg-[#363636]/60"
              )}
            >
              <Image
                src={card.image}
                alt=""
                width={145}
                height={97}
                sizes="145px"
                className="h-[74px] w-[110px] shrink-0 rounded-sm object-cover"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="font-sans text-base font-semibold tracking-[-0.02em] text-white">
                  {card.title}
                </h2>
                <p className="line-clamp-2 font-sans text-xs leading-[1.4] text-white/50">
                  {card.description}
                </p>
              </div>
              <span
                aria-hidden
                className="ml-auto shrink-0 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M5 15L15 5M15 5H7M15 5v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
