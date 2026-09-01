import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/PageHero";
import { Testimonial } from "@/components/sections/Testimonial";
import { Assurances } from "@/components/sections/Assurances";
import { Footer } from "@/components/layouts/Footer";
import { Container } from "@/components/ui/Container";
import { assets } from "@/lib/assets";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "About Us — EPG",
  description:
    "Eastern Pro Gear designs and manufactures premium sports equipment trusted by brands, teams, retailers and athletes worldwide.",
};

const STATS = [
  { value: "400+", label: "Countries served" },
  { value: "25yrs", label: "Manufacturing" },
  { value: "1M+", label: "Units shipped" },
  { value: "100%", label: "In-house QC" },
];

/** Figma: "About Us" (1440x5105). */
export default function AboutPage() {
  return (
    <>
      <main id="main">
        <PageHero
          display="EPG"
          title="About Us"
          tagline="Built for athletes, by athletes."
          image={assets.heroSlides[0]}
          primaryCta={{ label: "OUR STORY", href: "#story" }}
        />

        <section id="story" aria-labelledby="story-h" className="bg-surface py-25">
          <Container className="flex flex-col gap-16 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-6">
              <h2 id="story-h" className={cn(textStyles.sectionTitle, "text-white")}>
                Engineered for champions
              </h2>
              <p className={cn(textStyles.bodyBase, "text-white/70")}>
                Eastern Pro Gear designs and manufactures premium sports equipment,
                apparel, and accessories trusted by brands, teams, retailers, and
                athletes worldwide.
              </p>
              <p className={cn(textStyles.bodySmall, "text-white/55")}>
                Every product is tested by athletes and proven by pros. We control
                the line end to end, from raw material through to the pressure test
                that clears each batch for shipping.
              </p>
            </div>
            <div className="relative aspect-4/3 w-full flex-1 overflow-hidden rounded-lg">
              <Image
                src={assets.heroSlides[2]}
                alt="EPG manufacturing floor"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            </div>
          </Container>
        </section>

        <section aria-label="By the numbers" className="bg-surface pb-25">
          <Container>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-line md:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-2 bg-surface-raised p-8">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-sans text-5xl font-semibold tabular-nums tracking-[-0.03em] text-white">
                    {s.value}
                  </dd>
                  <p className="font-condensed text-base uppercase tracking-[0.14em] text-white/50">
                    {s.label}
                  </p>
                </div>
              ))}
            </dl>
          </Container>
        </section>

        <Testimonial />
        <Assurances />
      </main>
      <Footer />
    </>
  );
}
