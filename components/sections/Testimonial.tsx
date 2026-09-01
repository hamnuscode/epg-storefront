import { Container } from "@/components/ui/Container";
import { testimonial } from "@/lib/data";

/** Figma: "Testimonial" (1440x1079) — white band, star rating, pull quote. */
export function Testimonial() {
  return (
    <section aria-labelledby="testimonial" className="bg-surface-light pb-20 pt-4">
      <Container className="flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-1" role="img" aria-label={`${testimonial.rating} out of 5 stars`}>
          {Array.from({ length: 5 }, (_, i) => (
            <svg key={i} width="16" height="16" viewBox="0 0 20 20" aria-hidden
              className={i < testimonial.rating ? "fill-warning" : "fill-surface/15"}>
              <path d="M10 1.5l2.47 5.24 5.53.78-4 4.05.95 5.68L10 14.6l-4.95 2.65.95-5.68-4-4.05 5.53-.78z" />
            </svg>
          ))}
        </div>
        <blockquote className="max-w-[640px] font-sans text-lg font-medium leading-[1.5] tracking-[-0.02em] text-surface md:text-xl">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
        <cite className="font-sans text-sm not-italic text-surface/50">{testimonial.author}</cite>
      </Container>
    </section>
  );
}
