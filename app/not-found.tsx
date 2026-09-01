import { PageHero } from "@/components/sections/PageHero";
import { Footer } from "@/components/layouts/Footer";
import { assets } from "@/lib/assets";

/** Figma: "404" (1440x1758) — the category hero at full height. */
export default function NotFound() {
  return (
    <>
      <main id="main">
        <PageHero
          tall
          display="404"
          title="Oops, I think we&rsquo;re lost"
          tagline="Let&rsquo;s get you back somewhere familiar..."
          image={assets.categoryHeroes["404"]}
          primaryCta={{ label: "BACK TO HOME", href: "/" }}
        />
      </main>
      <Footer />
    </>
  );
}
