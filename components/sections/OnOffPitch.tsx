import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { onOffPitch } from "@/lib/data";

/**
 * Figma: the "off on" instance (1440x733). Two athletes face each other
 * across a dark arena; the split headline sits centred between them.
 */
export function OnOffPitch() {
  return (
    <section aria-labelledby="on-off" className="relative overflow-hidden bg-surface">
      <div className="relative mx-auto h-[560px] max-w-[1440px] md:h-[733px]">
        <Image
          src={assets.pitchBackdrop}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover opacity-70"
        />

        {/* Facing athletes */}
        <div className="absolute bottom-0 left-0 h-[62%] w-[52%] md:h-[80%] md:w-[42%]">
          <Image src={assets.offPitch} alt="" fill loading="lazy" sizes="42vw" className="object-contain object-left-bottom" />
        </div>
        <div className="absolute bottom-0 right-0 h-[62%] w-[52%] md:h-[80%] md:w-[42%]">
          <Image src={assets.onPitch} alt="" fill loading="lazy" sizes="42vw" className="object-contain object-right-bottom" />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-surface via-transparent to-surface/60" />

        {/* Split headline */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h2 id="on-off" className="flex items-baseline gap-3 font-display text-[clamp(2.5rem,7vw,5rem)] uppercase leading-[0.9] tracking-[-0.02em]">
            <span className="text-white/45">{onOffPitch.off}</span>
            <span className="text-white">{onOffPitch.word}</span>
          </h2>
          <p className="max-w-md font-sans text-sm leading-[1.6] text-white/60">
            {onOffPitch.bodyLeft}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/collection" className="font-condensed text-sm uppercase tracking-[0.18em] text-white underline-offset-4 hover:underline">
              {onOffPitch.ctaLeft}
            </Link>
            <Link href="/custom" className="font-condensed text-sm uppercase tracking-[0.18em] text-white underline-offset-4 hover:underline">
              {onOffPitch.ctaRight}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
