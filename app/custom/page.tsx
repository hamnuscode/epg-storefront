import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Customiser } from "@/components/sections/Customiser";
import { ProductListing } from "@/components/sections/ProductListing";
import { Footer } from "@/components/layouts/Footer";
import { assets } from "@/lib/assets";
import { featuredProducts } from "@/lib/data";
import { Container } from "@/components/ui/Container";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Custom Gear — EPG",
  description: "Design in real time. 360° customization for high-performance sports apparel.",
};

const STEPS = [
  { title: "Pick your base", body: "Start from any silhouette in the catalogue." },
  { title: "Apply your design", body: "Colourways, panels, badges and typography." },
  { title: "Approve the mesh", body: "Rotate a live 3D preview before anything is cut." },
  { title: "We manufacture", body: "Produced in-house with a traceable batch record." },
];

/** Figma: "Custom" (1440x5931) — hero, configurator, process, catalogue. */
export default function CustomPage() {
  return (
    <>
      <main id="main">
        <PageHero
          display="Design in Real Time."
          title="Custom Gear"
          tagline="From digital mesh to master design."
          image={assets.customiser}
          primaryCta={{ label: "START DESIGNING", href: "#configurator" }}
        />

        <div id="configurator">
          <Customiser />
        </div>

        <section aria-labelledby="process" className="bg-surface py-25">
          <Container className="flex flex-col gap-16">
            <h2 id="process" className={cn(textStyles.sectionTitle, "text-white")}>
              How it works
            </h2>
            {/* A real sequence, so the steps are numbered */}
            <ol className="grid gap-11 md:grid-cols-4">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex flex-col gap-4 border-t border-line pt-8">
                  <span className="font-condensed text-base uppercase tracking-[0.18em] text-brand-400">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-condensed text-2xl font-semibold uppercase tracking-[0.1em] text-white">
                    {step.title}
                  </h3>
                  <p className={cn(textStyles.bodySmall, "text-white/60")}>{step.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        <ProductListing
          products={featuredProducts}
          filters={["All", "Apparel", "Equipment", "Team Kit"]}
        />
      </main>
      <Footer />
    </>
  );
}
