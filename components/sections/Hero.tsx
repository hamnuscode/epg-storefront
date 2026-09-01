import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layouts/Navbar";
import { assets } from "@/lib/assets";
import { hero } from "@/lib/data";

/**
 * Figma: "Alt 1" (1440x911). The EPG wordmark is set at ~724px so it spans
 * almost the full artboard behind a cut-out athlete; the headline is ranged
 * left with "Champions." in gold, and three translucent cards sit along the
 * lower edge, each with its arrow at the bottom-right.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-800">
      <div aria-hidden className="absolute inset-0 -z-30 bg-linear-to-b from-[#22335a] via-[#1b2a48] to-[#131d33]" />

      {/* Wordmark — near full-bleed, sitting behind the subject */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[7%] -z-20 -translate-x-1/2 select-none whitespace-nowrap font-display uppercase leading-[0.72] tracking-[0.01em] text-white/12"
        style={{ fontSize: "min(56vw, 50rem)" }}
      >
        {hero.wordmark}
      </span>

      <Navbar />

      {/* Subject */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[86%] md:left-[12%] md:right-[2%] md:h-[99%]">
        <Image
          src={assets.heroBoxer}
          alt="EPG athlete wrapping his hands"
          fill
          priority
          sizes="100vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* Copy */}
      <div className="relative flex flex-1 items-center px-6 pt-[70px] md:px-10">
        <div className="flex max-w-[430px] flex-col gap-6">
          <h1 className="font-sans text-[clamp(2.1rem,4vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.035em] text-white">
            Engineered<br />
            For <span className="text-accent">Champions.</span><br />
            Manufactured<br />
            For The World.
          </h1>
          <p className="max-w-[400px] font-sans text-[clamp(0.8rem,1.1vw,1rem)] leading-[1.75] text-white/70">
            {hero.body}
          </p>
        </div>
      </div>

      {/* Cards along the lower edge */}
      <div className="relative z-20 mx-auto w-full max-w-[1406px] shrink-0 px-4 pb-5 md:px-4">
        <div className="grid gap-5 md:grid-cols-3">
          {hero.cards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group relative flex items-start gap-4 border border-white/10 bg-[#0d1524]/75 p-3.5 backdrop-blur-md transition-colors hover:bg-[#0d1524]/90"
            >
              <Image
                src={card.image}
                alt=""
                width={158}
                height={91}
                sizes="158px"
                className="h-[72px] w-[126px] shrink-0 object-cover md:h-[91px] md:w-[158px]"
              />
              <div className="flex min-w-0 flex-col gap-1.5 pr-6">
                <h2 className="font-sans text-[15px] font-semibold tracking-[-0.01em] text-white">
                  {card.title}
                </h2>
                <p className="font-sans text-[11.5px] leading-[1.5] text-white/55">
                  {card.description}
                </p>
              </div>
              <span
                aria-hidden
                className="absolute bottom-3 right-3.5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden>
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
