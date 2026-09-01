"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

const SIZES = ["S", "M", "L", "XL"] as const;
const COLORS = [
  { name: "Charcoal Gray", hex: "#8b8b8b" },
  { name: "Slate", hex: "#5f6266" },
  { name: "Graphite", hex: "#4a4d51" },
  { name: "Ash", hex: "#6e7276" },
  { name: "Steel", hex: "#7d8186" },
];
const TABS = ["Details", "Material", "Size & Fit", "Shipping & Return"] as const;

const TRUST = [
  { title: "Free Shipping", body: "On orders over $99", icon: "M3 7h11v9H3zM14 10h4l3 3v3h-7z" },
  { title: "Easy Returns", body: "30-day return policy", icon: "M4 12a8 8 0 1 1 2.3 5.6M4 12V7m0 5h5" },
  { title: "Secure Payment", body: "100% secure checkout", icon: "M6 10V8a6 6 0 1 1 12 0v2M5 10h14v10H5z" },
];

/**
 * Figma: "Product Page" (1440x2841). Vertical thumbnail column beside the
 * main shot; the buy column carries the arrival badge, rating, price with its
 * discount pill, colour and size pickers, a full-width Add To Cart and three
 * trust markers. A tab strip and copy block sit beneath.
 */
export function ProductDetail({ product }: { product: Product }) {
  const gallery = [product.image, product.image, product.image, product.image];
  const [shot, setShot] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState<string>("M");
  const [tab, setTab] = useState<string>(TABS[0]);

  const compare = product.compareAtPrice ?? 89.99;
  const off = Math.round((1 - product.price / compare) * 100);

  return (
    <section className="bg-surface pb-16 pt-10">
      <div className="mx-auto max-w-[1320px] px-6 md:px-12">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-1 gap-4">
            <div className="flex shrink-0 flex-col gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-current={i === shot || undefined}
                  className={cn(
                    "relative h-[74px] w-[68px] overflow-hidden transition-opacity",
                    i === shot ? "opacity-100 ring-1 ring-white/60" : "opacity-55 hover:opacity-85"
                  )}
                >
                  <Image src={src} alt="" fill sizes="68px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className="relative aspect-[430/470] flex-1 overflow-hidden bg-surface-raised">
              <Image
                src={gallery[shot]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Buy column */}
          <div className="flex w-full flex-col gap-5 lg:w-[430px]">
            <span className="w-fit bg-surface-overlay px-3 py-1.5 font-sans text-[11px] font-medium text-white">
              New Arrival
            </span>

            <h1 className="font-sans text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-white">
              {product.name}
            </h1>

            <div className="flex items-center gap-2">
              <span className="flex gap-0.5" role="img" aria-label="Rated 4.8 out of 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <svg key={i} width="13" height="13" viewBox="0 0 20 20" aria-hidden className="fill-white">
                    <path d="M10 1.5l2.47 5.24 5.53.78-4 4.05.95 5.68L10 14.6l-4.95 2.65.95-5.68-4-4.05 5.53-.78z" />
                  </svg>
                ))}
              </span>
              <span className="font-sans text-xs text-white/60">4.8 (128 reviews)</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-sans text-2xl font-semibold tabular-nums text-white">
                ${product.price.toFixed(2)}
              </span>
              <span className="font-sans text-sm tabular-nums text-white/40 line-through">
                ${compare.toFixed(2)}
              </span>
              <span className="bg-surface-muted px-2 py-1 font-sans text-[11px] font-semibold text-white">
                {off}% OFF
              </span>
            </div>

            <p className="max-w-[330px] font-sans text-xs leading-[1.7] text-white/60">
              Premium {product.name} that help you perform in style.
            </p>

            <hr className="border-line" />

            <fieldset className="flex flex-col gap-3 border-0 p-0">
              <legend className="font-sans text-xs text-white/60">
                Color: <span className="text-white">{COLORS[color].name}</span>
              </legend>
              <div className="flex gap-2.5">
                {COLORS.map((c, i) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(i)}
                    aria-label={c.name}
                    aria-pressed={i === color}
                    style={{ background: c.hex }}
                    className={cn(
                      "size-8 rounded-full transition-shadow",
                      i === color ? "ring-2 ring-white ring-offset-2 ring-offset-surface" : "hover:ring-1 hover:ring-white/40"
                    )}
                  />
                ))}
              </div>
            </fieldset>

            <fieldset className="flex flex-col gap-3 border-0 p-0">
              <legend className="font-sans text-xs text-white/60">
                Size: <span className="text-white">{size}</span>
              </legend>
              <div className="flex gap-2">
                {SIZES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    aria-pressed={size === s}
                    className={cn(
                      "h-9 w-12 border font-sans text-xs font-medium transition-colors",
                      size === s ? "border-white bg-white text-surface" : "border-line text-white/70 hover:border-white/50"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <Button size="lg" className="mt-1 w-full">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden className="mr-2">
                <path d="M3 5h2l2.2 10.2a1.8 1.8 0 0 0 1.8 1.4h7.4a1.8 1.8 0 0 0 1.8-1.4L20 8H6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Add To Cart
            </Button>

            <ul className="mt-2 grid grid-cols-3 gap-3">
              {TRUST.map((t) => (
                <li key={t.title} className="flex items-start gap-2">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden className="mt-0.5 shrink-0 text-white/70">
                    <path d={t.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="flex flex-col">
                    <span className="font-sans text-[11px] font-semibold text-white">{t.title}</span>
                    <span className="font-sans text-[9px] leading-tight text-white/45">{t.body}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tabs + copy */}
        <div className="mt-16 flex flex-col gap-8 lg:flex-row lg:gap-16">
          <div className="flex flex-1 flex-col gap-6">
            <div role="tablist" aria-label="Product information" className="flex flex-wrap gap-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  role="tab"
                  type="button"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "h-8 rounded-full px-4 font-sans text-xs transition-colors",
                    tab === t ? "bg-surface-overlay text-white" : "text-white/45 hover:text-white/75"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="max-w-[420px] font-sans text-xs leading-[1.85] text-white/60">
              Premium {product.name} that help you perform in style. Premium {product.name} that
              help you perform in style. Premium {product.name} that help you perform in style.
            </p>
          </div>
          <div className="aspect-[596/346] w-full bg-[#282828] lg:w-[596px]" aria-hidden />
        </div>
      </div>
    </section>
  );
}
