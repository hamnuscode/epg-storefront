import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CustomLab } from "@/components/sections/CustomLab";
import { CustomJourney } from "@/components/sections/CustomJourney";
import { ProductListing } from "@/components/sections/ProductListing";
import { Footer } from "@/components/layouts/Footer";
import { getCategory, productsFor } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Custom Gear — EPG",
  description:
    "From logos and colors to premium materials and player names, create professional equipment that is entirely yours.",
};

const JERSEY = "/images/174d273f1340.webp";
const SWATCHES = [
  "/images/c574a60d3b2e.webp", "/images/9d19d1ee633f.webp",
  "/images/39927cec13fa.webp", "/images/d8fa2ba672eb.webp",
];

/** Figma: "Custom" (1440x5931). */
export default function CustomPage() {
  const listing = getCategory("collection")!;

  return (
    <>
      <main id="main">
        <PageHero
          display="Custom"
          title="Your Gear. Your Vision."
          tagline="From logos and colors to premium materials and player names, create professional equipment that is entirely yours."
          wash="/images/12860fe2489b.webp"
          photo="/images/1b5afe39fcb5.webp"
          primaryCta={{ label: "Start Designing", href: "#custom-lab" }}
        />

        <CustomLab jersey={JERSEY} swatches={SWATCHES} />
        <CustomJourney />

        <ProductListing
          heading="Choose Your Custom Gear"
          products={productsFor(listing)}
          filters={["All", "Tops", "Bottoms", "Equipment", "Accessories"]}
          categories={["Select Category", "Equipment", "Apparel", "Accessories"]}
        />
      </main>
      <Footer />
    </>
  );
}
