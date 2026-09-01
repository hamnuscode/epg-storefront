import type { Metadata } from "next";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { ProductDetail } from "@/components/sections/ProductDetail";
import { RelatedProducts } from "@/components/sections/RelatedProducts";
import { allProducts, getProduct } from "@/lib/catalog";

export function generateStaticParams() {
  return allProducts.slice(0, 20).map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return { title: `${product.name} — EPG`, description: `${product.name}, $${product.price}` };
}

/** Figma: "Product Page" (1440x2841) — gallery + info, then detail band. */
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);

  return (
    <>
      <div className="relative h-[62px] bg-surface md:h-[60px]">
        <Navbar />
      </div>
      <main id="main">
        <ProductDetail product={product} />
        <RelatedProducts />
        
      </main>
      <Footer />
    </>
  );
}
