import { PageHero } from "@/components/sections/PageHero";
import { Footer } from "@/components/layouts/Footer";

/**
 * Figma: "404" (1440x1758) — the category hero run at full height, with the
 * error code set as the oversized display word.
 */
export default function NotFound() {
  return (
    <>
      <main id="main">
        <PageHero
          tall
          display="404"
          title="Oops, I think we&rsquo;re lost"
          tagline="Let&rsquo;s get you back somewhere familiar..."
          backdrop="/images/12860fe2489b.webp"
          primaryCta={{ label: "Back to Home", href: "/" }}
        />
      </main>
      <Footer />
    </>
  );
}
