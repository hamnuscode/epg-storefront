import type { Metadata } from "next";
import { Navbar } from "@/components/layouts/Navbar";
import { Footer } from "@/components/layouts/Footer";
import { CheckoutForm } from "@/components/sections/CheckoutForm";

export const metadata: Metadata = { title: "Checkout — EPG" };

/** Figma: "Checkout" (1440x2486) — two 720px columns, form left, summary right. */
export default function CheckoutPage() {
  return (
    <>
      <div className="relative h-[62px] bg-surface md:h-[60px]">
        <Navbar />
      </div>
      <main id="main">
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
