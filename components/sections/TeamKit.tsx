import Image from "next/image";
import { assets } from "@/lib/assets";

/**
 * Figma: "Banner Comp" (1440x685) — the team-kit band. Three navy jersey
 * shots run edge to edge, the middle one carrying the personalised back.
 */
export function TeamKit() {
  return (
    <section aria-label="Custom team kit" className="bg-surface">
      <div className="relative mx-auto grid max-w-[1440px] grid-cols-3">
        {[assets.jerseyBanner, assets.jerseyBack, assets.jerseyName].map((src, i) => (
          <div key={src} className="relative aspect-3/4 md:aspect-4/5">
            <Image
              src={src}
              alt=""
              fill
              loading="lazy"
              sizes="33vw"
              className="object-cover"
            />
            {i !== 2 && <div className="absolute inset-y-0 right-0 w-px bg-surface/60" />}
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-surface to-transparent" />
      </div>
    </section>
  );
}
