import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { assets } from "@/lib/assets";

/**
 * Figma: "Banner Comp" (1440x685) — the team-kit band. Navy and gold jerseys
 * run edge to edge; the caption strip sits along the bottom with the
 * personalisation CTA at its right.
 */
export function TeamKit() {
  return (
    <section aria-label="Custom team kit" className="bg-surface">
      <div className="relative mx-auto max-w-[1440px] overflow-hidden">
        <div className="grid grid-cols-3">
          {[assets.jerseyBack, assets.jerseyBanner, assets.jerseyName].map((src) => (
            <div key={src} className="relative aspect-[3/4] md:aspect-[480/685]">
              <Image src={src} alt="" fill loading="lazy" sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-linear-to-t from-black/85 to-transparent px-6 py-5 md:px-10">
          <p className="flex items-center gap-3 font-condensed text-xs uppercase tracking-[0.24em] text-white/80 md:text-sm">
            <span>Your Gear</span>
            <span aria-hidden className="text-accent">&bull;</span>
            <span>Your Design</span>
          </p>
          <div className="flex items-center gap-5">
            <span className="hidden font-sans text-xs text-white/70 sm:block">
              Personalize Your Team Gear
            </span>
            <ButtonLink href="/custom" variant="outline" size="sm">Discover</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
