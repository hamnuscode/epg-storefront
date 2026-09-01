import Image from "next/image";
import Link from "next/link";
import { assets } from "@/lib/assets";
import { collectionBanner } from "@/lib/data";

/**
 * Figma: the banner beneath the testimonial — product shelving shot with the
 * EPG lockup and strapline ranged left, CTA beneath.
 */
export function CollectionBanner() {
  return (
    <section aria-label="Collection" className="bg-surface">
      <div className="relative mx-auto h-[380px] max-w-[1440px] overflow-hidden md:h-[520px]">
        <Image
          src={assets.collectionBanner}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-surface/90 via-surface/40 to-transparent" />

        <div className="absolute inset-y-0 left-0 flex max-w-[640px] flex-col justify-center gap-6 px-6 md:px-16">
          <div className="flex items-center gap-4">
            <span className="font-display text-3xl uppercase tracking-[-0.02em] text-white md:text-5xl">
              {collectionBanner.lockup}
            </span>
            <span aria-hidden className="h-8 w-px bg-white/30" />
            <span className="font-condensed text-sm uppercase leading-[1.3] tracking-[0.18em] text-white/70 md:text-base">
              {collectionBanner.line}
            </span>
          </div>
          <Link
            href="/collection"
            className="inline-flex h-11 w-fit items-center rounded-xl border border-white/40 px-6 font-condensed text-sm uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-surface"
          >
            {collectionBanner.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
