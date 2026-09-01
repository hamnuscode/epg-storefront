import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shared/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { featuredProducts } from "@/lib/data";

/**
 * Figma: "Featured Products" (1440x1700) — 100px top / 200px bottom padding,
 * a four-column grid of 338px tiles with a 20px gutter (Frame 427321834).
 */
export function FeaturedProducts({ heading = "Featured Products" }: { heading?: string } = {}) {
  return (
    <section aria-labelledby="featured" className="bg-surface pb-50 pt-25">
      <Container className="flex flex-col gap-25">
        <SectionHeading
          id="featured"
          title={heading}
          action={<ButtonLink href="/collection" variant="secondary">VIEW COLLECTION</ButtonLink>}
        />
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      </Container>
    </section>
  );
}
