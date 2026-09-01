import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layouts/Navbar";
import { assets } from "@/lib/assets";
import { hero } from "@/lib/data";

/**
 * Figma: "Alt 1" (1440x911). Deep-navy ground, the EPG wordmark set enormous
 * in a lighter navy behind the subject, headline ranged left with
 * "Champions." in gold, and three translucent cards straddling the lower edge.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-800">
      {/* Navy field with a soft vertical lift, matching the render */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-linear-to-b from-navy-900 via-navy-700 to-navy-800" />

      <Navbar />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-1 flex-col px-6 pt-[60px] md:px-12">
        {/* Wordmark behind the subject */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-2 -z-10 w-full -translate-x-1/2 select-none text-center font-display text-[38vw] leading-[0.78] tracking-[-0.03em] text-white/10 md:left-[54%] md:top-0 md:w-auto md:text-[26rem]"
        >
          {hero.wordmark}
        </span>

        <div className="relative grid min-h-[560px] items-center gap-8 pb-28 md:min-h-[700px] md:grid-cols-[minmax(0,430px)_1fr] md:pb-0">
          {/* Copy */}
          <div className="flex flex-col gap-5">
            <h1 className="font-sans text-[clamp(2.1rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
              Engineered<br />
              For <span className="text-accent">Champions.</span><br />
              Manufactured<br />
              For The World.
            </h1>
            <p className="max-w-[350px] font-sans text-[12px] leading-[1.65] text-white/60">
              {hero.body}
            </p>
          </div>

          {/* Subject — bleeds to the section's lower edge */}
          <div className="relative -mb-28 h-[380px] md:absolute md:inset-y-0 md:right-0 md:-mb-0 md:h-full md:w-[66%]">
            <Image
              src={assets.heroBoxer}
              alt="EPG athlete wrapping his hands"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="scale-[1.18] object-contain object-bottom [transform-origin:bottom_center]"
            />
          </div>
        </div>
      </div>

      {/* Cards straddling the lower edge */}
      <div className="relative z-20 mx-auto w-full max-w-[1440px] shrink-0 px-6 pb-8 md:px-12">
        <div className="grid gap-4 md:grid-cols-3">
          {hero.cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex items-start gap-3 bg-[#1c2436]/80 p-3 backdrop-blur-md transition-colors hover:bg-[#1c2436]"
            >
              <Image
                src={card.image}
                alt=""
                width={145}
                height={97}
                sizes="145px"
                className="h-[52px] w-[78px] shrink-0 object-cover"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <h2 className="font-sans text-[13px] font-semibold tracking-[-0.01em] text-white">
                  {card.title}
                </h2>
                <p className="line-clamp-3 font-sans text-[10px] leading-[1.45] text-white/45">
                  {card.description}
                </p>
              </div>
              <span
                aria-hidden
                className="ml-auto shrink-0 self-start text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 20 20" fill="none" aria-hidden>
                  <path d="M5 15L15 5M15 5H7M15 5v8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
