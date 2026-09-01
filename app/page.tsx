import { Hero } from "@/components/sections/Hero";
import { CategoryRail } from "@/components/sections/CategoryRail";
import { OnOffPitch } from "@/components/sections/OnOffPitch";
import { TeamKit } from "@/components/sections/TeamKit";
import { FindYourGear } from "@/components/sections/FindYourGear";
import { Forgex } from "@/components/sections/Forgex";
import { Testimonial } from "@/components/sections/Testimonial";
import { CollectionBanner } from "@/components/sections/CollectionBanner";
import { Assurances } from "@/components/sections/Assurances";
import { Footer } from "@/components/layouts/Footer";
import { assets } from "@/lib/assets";
import { categoryFilters, sportFilters } from "@/lib/data";

/**
 * Home — Figma frame "Home" (1440x9308). Section order follows the frame:
 *   Alt 1 → Category → off on → Banner Comp → Category → Featured Products
 *   → Forgex → Testimonial → Frame 427321613 → Footer
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
          tiles={assets.categoryTiles}
        />

        <OnOffPitch />
        <TeamKit />

        <CategoryRail
          headingId="our-sports"
          title="Our Sports"
          filters={sportFilters}
          tiles={assets.sportTiles}
        />

        <FindYourGear />
        <Forgex />
        <Testimonial />
        <CollectionBanner />
        <Assurances />
      </main>
      <Footer />
    </>
  );
}
