import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";
import { testimonial } from "@/lib/data";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";

/**
 * Figma: "Testimonial" (1440x1079) — one of the two light bands on the page
 * (#ffffff ground), heading block over a full-width photo banner.
 */
export function Testimonial() {
  return (
    <section aria-labelledby="testimonial" className="bg-surface-light pt-25">
      <Container className="flex flex-col items-center gap-8 pb-16 text-center">
        <h2 id="testimonial" className={cn(textStyles.sectionTitle, "text-surface")}>
          {testimonial.quote}
        </h2>
        <figure className="flex flex-col items-center gap-4">
          <blockquote className={cn(textStyles.bodyBase, "max-w-2xl text-surface/70")}>
            &ldquo;The kit has held up through two full seasons of daily use.
            Nothing else we have tried comes close on durability.&rdquo;
          </blockquote>
          <figcaption className="flex items-center gap-3">
            {testimonial.avatar && (
              <Image
                src={testimonial.avatar}
                alt=""
                width={44}
                height={44}
                loading="lazy"
                className="size-11 rounded-full object-cover"
              />
            )}
            <span className="font-sans text-base text-surface/60">
              {testimonial.author}
            </span>
          </figcaption>
        </figure>
      </Container>

      <div className="relative h-[420px] w-full md:h-[687px]">
        <Image
          src={assets.testimonialBanner}
          alt=""
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </section>
  );
}
