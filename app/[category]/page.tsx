import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { ProductListing } from "@/components/sections/ProductListing";
import { Footer } from "@/components/layouts/Footer";
import { categoryPages, getCategory } from "@/lib/catalog";

/** Statically render all seven category pages at build time. */
export function generateStaticParams() {
  return categoryPages.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const page = getCategory(category);
  if (!page) return {};
  return {
    title: `${page.title} — EPG`,
    description: page.tagline,
  };
}

/**
 * Figma: "Martial Arts" / "Baseball" / "Golf" (4002px) and
 * "Men" / "Women" / "Kids" / "Collection" (3066–3381px). Structurally
 * identical, so they share this route.
 */
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const page = getCategory(category);
  if (!page) notFound();

  return (
    <>
      <main id="main">
        <PageHero
          display={page.display}
          title={page.title}
          tagline={page.tagline}
          image={page.heroImage}
          secondaryCta={
            page.secondaryCta ? { label: "CUSTOM GEAR", href: "/custom" } : undefined
          }
        />
        <ProductListing products={page.products} filters={page.filters} />
      </main>
      <Footer />
    </>
  );
}
