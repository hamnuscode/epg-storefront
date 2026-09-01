import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { assets } from "@/lib/assets";

/**
 * Figma: the banner beneath the testimonial — kit laid out on concrete steps,
 * with the EPG lockup and strapline ranged left and the CTA beneath it.
 */
export function CollectionBanner() {
  return (
    <section aria-label="Collection" className="bg-surface">
      <div className="relative mx-auto h-[340px] max-w-[1440px] overflow-hidden md:h-[460px]">
        <Image
          src={assets.collectionBanner}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-y-0 left-0 flex flex-col justify-center gap-7 px-6 md:px-14">
          <div className="flex items-center gap-4">
            <span className="font-sans text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl">EPG</span>
            <span aria-hidden className="h-7 w-px bg-white/35" />
            <Image src={assets.logo} alt="" width={44} height={16} className="h-4 w-auto object-contain" />
          </div>
          <p className="max-w-[280px] font-condensed text-sm uppercase leading-[1.45] tracking-[0.12em] md:text-base">
            <span className="font-semibold text-white">Athlete-trusted</span>{" "}
            <span className="text-white/55">sports gear designed to help you</span>{" "}
            <span className="font-semibold text-white">dominate.</span>
          </p>
          <ButtonLink href="/collection" variant="outline" size="sm" className="w-fit">
            View Collection
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
