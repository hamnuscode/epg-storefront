"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { assets } from "@/lib/assets";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

/**
 * Figma: "Frame 427321703" (1320x1323) — a 720px gallery beside a 529px
 * info column, then the description band with the #282828 spec panel.
 */
export function ProductDetail({ product }: { product: Product }) {
  const gallery = [product.image, ...assets.products.slice(0, 3)];
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<string>("M");
  const [qty, setQty] = useState(1);

  return (
    <section className="bg-surface pb-12 pt-25">
      <Container className="flex flex-col gap-18">
        <div className="flex flex-col gap-16 lg:flex-row">
          {/* Gallery */}
          <div className="flex flex-1 flex-col-reverse gap-6 sm:flex-row">
            <div className="flex gap-3 sm:flex-col">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === active || undefined}
                  className={cn(
                    "relative size-20 shrink-0 overflow-hidden rounded-sm border transition-colors",
                    i === active ? "border-white" : "border-line hover:border-line-strong"
                  )}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className="relative aspect-square flex-1 overflow-hidden rounded-lg bg-surface-raised">
              <Image
                src={gallery[active]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 620px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Info column */}
          <div className="flex w-full flex-col gap-6 lg:w-[529px]">
            <div className="flex flex-col gap-3">
              <h1 className={cn(textStyles.productTitle, "text-4xl text-white")}>
                {product.name}
              </h1>
              <p className="font-sans text-4xl font-medium tracking-[-0.03em] text-white">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className={cn(textStyles.bodySmall, "text-white/60")}>
              Competition-grade construction, tested by athletes and proven by
              pros. Engineered for players who play for the world.
            </p>

            <fieldset className="flex flex-col gap-3 border-0 p-0">
              <legend className="font-condensed text-base uppercase tracking-[0.14em] text-white/50">
                Size
              </legend>
              <div className="flex flex-wrap gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={cn(
                      "h-11 min-w-14 rounded-sm border px-3 font-sans text-base font-medium transition-colors",
                      size === s
                        ? "border-white bg-white text-surface"
                        : "border-line text-white/70 hover:border-line-strong hover:text-white"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 rounded-xl border border-line">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="size-11 text-xl text-white/70 hover:text-white"
                >
                  &minus;
                </button>
                <span aria-live="polite" className="mono w-8 text-center font-sans text-base text-white">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="size-11 text-xl text-white/70 hover:text-white"
                >
                  +
                </button>
              </div>
              <Button size="lg" className="flex-1">ADD TO CART</Button>
            </div>

            <ul className="flex flex-col gap-2 border-t border-line pt-6">
              <li className="font-sans text-sm text-white/50">Free delivery over $150</li>
              <li className="font-sans text-sm text-white/50">30-day returns</li>
              <li className="font-sans text-sm text-white/50">Ships to 400+ countries</li>
            </ul>
          </div>
        </div>

        {/* Description band — Figma: Frame 427321702 */}
        <div className="flex flex-col gap-18 lg:flex-row lg:justify-between">
          <div className="flex max-w-[647px] flex-col gap-6">
            <h2 className="font-condensed text-3xl font-semibold uppercase tracking-[0.1em] text-white">
              Details
            </h2>
            <p className={cn(textStyles.bodySmall, "text-white/60")}>
              Built from reinforced multi-layer construction with a moisture-wicking
              inner lining. Every unit is pressure-tested before it leaves the floor,
              and each batch carries a traceable manufacturing record.
            </p>
          </div>
          <dl className="grid w-full max-w-[596px] grid-cols-2 gap-px overflow-hidden rounded-lg bg-line">
            {[
              ["Material", "Multi-layer composite"],
              ["Weight", "420g"],
              ["Certification", "Competition grade"],
              ["Origin", "Sialkot, Pakistan"],
            ].map(([k, v]) => (
              <div key={k} className="flex flex-col gap-1 bg-[#282828] p-5">
                <dt className="font-condensed text-sm uppercase tracking-[0.14em] text-white/40">{k}</dt>
                <dd className="font-sans text-base text-white">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
