import Image from "next/image";
import { assets } from "@/lib/assets";
import { testimonial } from "@/lib/data";

/**
 * Figma: "Testimonial" — white band. Stacked avatars and a five-star rule
 * above a centred pull quote, attribution beneath in two weights.
 */
export function Testimonial() {
  const faces = assets.testimonialAvatars;
  return (
    <section aria-labelledby="testimonial" className="bg-surface-light pb-14 pt-6">
      <div className="mx-auto flex max-w-[820px] flex-col items-center gap-5 px-6 text-center">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2">
            {faces.map((src) => (
              <span key={src} className="relative size-6 overflow-hidden rounded-full ring-2 ring-white">
                <Image src={src} alt="" fill sizes="24px" className="object-cover" />
              </span>
            ))}
          </div>
          <div className="flex flex-col items-start">
            <span className="flex gap-px" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }, (_, i) => (
                <svg key={i} width="9" height="9" viewBox="0 0 20 20" aria-hidden className="fill-surface">
                  <path d="M10 1.5l2.47 5.24 5.53.78-4 4.05.95 5.68L10 14.6l-4.95 2.65.95-5.68-4-4.05 5.53-.78z" />
                </svg>
              ))}
            </span>
            <span className="font-sans text-[8px] text-surface/45">Trusted by clients worldwide</span>
          </div>
        </div>

        <blockquote
          id="testimonial"
          className="max-w-[620px] font-sans text-[clamp(1.05rem,2vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.025em] text-surface"
        >
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        <p className="font-sans text-xs text-surface/45">
          <span className="font-semibold text-surface">- David C.,</span> Club Director, Elite United FC
        </p>
      </div>
    </section>
  );
}
