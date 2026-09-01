import { Hero } from "@/components/sections/Hero";
import { CategoryRail } from "@/components/sections/CategoryRail";
import { OnOffPitch } from "@/components/sections/OnOffPitch";
import { Customiser } from "@/components/sections/Customiser";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Testimonial } from "@/components/sections/Testimonial";
import { Assurances } from "@/components/sections/Assurances";
import { Footer } from "@/components/layouts/Footer";
import { categoryFilters, categoryTiles, sportFilters, sportTiles } from "@/lib/data";

/**
 * Home — Figma frame "Home" (1440x9308) and "Home - Mob" (390x7532).
 * Section order follows the frame exactly:
 *   Alt 1 → Category → off on → Banner Comp → Category →
 *   Featured Products → Testimonial → Frame 427321613 → Footer
 */
export default function HomePage() {
  return (
    <>
      <main id="main">
        <Hero />

        <CategoryRail
          headingId="shop-by-category"
          title="Shop by Category"
          filters={categoryFilters}
          tiles={categoryTiles}
        />

        <OnOffPitch />
        <Customiser />

        <CategoryRail
          headingId="our-sports"
          title="Our Sports"
          filters={sportFilters}
          tiles={sportTiles}
        />

        <FeaturedProducts />
        <Testimonial />
        <Assurances />
      </main>
      <Footer />
    </>
  );
}
