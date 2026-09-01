import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";

/**
 * Figma: the "off on" instance (1440x733). Two athletes face each other
 * across a darkened cage. The headline splits into OFF PITCH / ON PITCH with
 * a handwritten "Real" struck across the join, and each half carries its own
 * body copy and bracketed link.
 */
export function OnOffPitch() {
  return (
    <section aria-labelledby="on-off" className="relative overflow-hidden bg-surface">
      <div className="relative mx-auto h-[520px] max-w-[1440px] md:h-[733px]">
        <Image src={assets.pitchBackdrop} alt="" fill loading="lazy" sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />

        {/* Facing athletes */}
        <div className="absolute bottom-0 left-0 h-[70%] w-[58%] md:h-[100%] md:w-[44%]">
          <Image src={assets.offPitch} alt="" fill loading="lazy" sizes="36vw" className="object-contain object-left-bottom" />
        </div>
        <div className="absolute bottom-0 right-0 h-[70%] w-[58%] md:h-[100%] md:w-[44%]">
          <Image src={assets.onPitch} alt="" fill loading="lazy" sizes="36vw" className="object-contain object-right-bottom" />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-surface to-transparent" />

        {/* Split headline + the two halves of copy */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6">
          <h2 id="on-off" className="relative flex items-start gap-8 md:gap-16">
            <span className="font-sans text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-white">
              OFF<br />PITCH
            </span>
            <span className="font-sans text-[clamp(2rem,6vw,4.5rem)] font-semibold leading-[0.92] tracking-[-0.03em] text-white">
              ON<br />PITCH
            </span>
            {/* Handwritten flourish struck across the join */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-6 top-1 select-none font-script text-[clamp(1.5rem,3.5vw,2.5rem)] leading-none text-brand-400 md:-left-10"
            >
              Real
            </span>
          </h2>

          <div className="grid max-w-[680px] gap-10 text-center sm:grid-cols-2">
            <div className="flex flex-col gap-3">
              <p className="font-sans text-[11px] leading-[1.6] text-white/65">
                From digital mesh to master design. 360&deg; customization engineered for high-performance sports apparel.
              </p>
              <Link href="/custom" className="font-condensed text-[10px] uppercase tracking-[0.18em] text-brand-400 hover:text-white">
                [ View 3D Configurator ]
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-[11px] leading-[1.6] text-white/65">
                Tested by athletes, proven by pros. Build for the pitch. Engineered for players who play for the world.
              </p>
              <Link href="/collection" className="font-condensed text-[10px] uppercase tracking-[0.18em] text-brand-400 hover:text-white">
                [ Real World Action ]
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
