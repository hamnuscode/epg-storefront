import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/sections/PageHero";
import { DisciplineRail } from "@/components/sections/DisciplineRail";
import { CategoryBar } from "@/components/sections/CategoryBar";
import { ProductListing } from "@/components/sections/ProductListing";
import { Footer } from "@/components/layouts/Footer";
import { categoryPages, getCategory, productsFor } from "@/lib/catalog";

export function generateStaticParams() {
  return categoryPages.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const page = getCategory(category);
  return page ? { title: `${page.title} — EPG`, description: page.tagline } : {};
}

/**
 * Figma: "Martial Arts" / "Baseball" / "Golf" (4002px) and
 * "Men" / "Women" / "Kids" / "Collection" (3066–3381px).
 */
export default async function CategoryPage({
  params,
}: { params: Promise<{ category: string }> }) {
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
          wash={page.wash}
          photo={page.photo}
          subject={page.subject}
          flipSubject={page.flipSubject}
          hotspots={page.hotspots}
          secondaryCta={page.secondaryCta ? { label: "Custom Gear", href: "/custom" } : undefined}
        />

        {page.disciplines && <DisciplineRail items={page.disciplines} />}
        {page.categoryBar && <CategoryBar tiles={page.categoryBar} />}

        <ProductListing
          products={productsFor(page)}
          filters={page.filters}
          categories={page.categories}
          sports={page.sports}
        />
      </main>
      <Footer />
    </>
  );
}
