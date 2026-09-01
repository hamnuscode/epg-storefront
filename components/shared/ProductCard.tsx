"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

/**
 * Figma: "p1" on Wireframe-20 — 480x621, three flush across the 1440
 * artboard. The image area is the upper 428px with the product at 315x336
 * and a 65px quick-add pinned to its lower-right corner; the lower 193px
 * carries the category tag (24px), name (27px), price row and colourways.
 */
export const ProductCard = memo(function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  return (
    <article className={cn("group relative flex aspect-[480/621] min-w-0 flex-col bg-surface-raised", className)}>
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        {/* 428 of 621 */}
        <div className="relative w-full shrink-0 basis-[68.9%] overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 480px"
            className="object-contain p-[9%] transition-transform duration-500 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-105"
          />
          <span
            aria-hidden
            className="absolute bottom-0 right-0 grid aspect-square w-[13.5%] place-items-center bg-white/12 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-surface"
          >
            <svg width="46%" height="46%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        {/* 193 of 621 */}
        <div className="flex min-w-0 flex-1 flex-col justify-center gap-[3.5%] px-[4.2%] py-[6%]">
          <span className="flex items-center gap-2 font-condensed text-[clamp(0.8rem,1.35vw,1.2rem)] font-semibold uppercase tracking-[0.14em] text-brand-400">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden className="shrink-0">
              <path d="M12 2l7 4v6c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6z" />
            </svg>
            {product.categoryLabel ?? "MMA"}
          </span>

          <h3 className="font-sans text-[clamp(0.95rem,1.55vw,1.4rem)] font-medium leading-[1.25] tracking-[-0.015em] text-white">
            {product.name}
          </h3>

          <p className="flex items-baseline gap-2.5">
            {product.compareAtPrice && (
              <span className="font-sans text-[clamp(0.8rem,1.25vw,1.1rem)] tabular-nums text-white/35 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="font-sans text-[clamp(0.9rem,1.45vw,1.3rem)] font-medium tabular-nums text-white">
              ${product.price.toFixed(2)}
            </span>
          </p>

          {product.colors && (
            <span className="mt-[2%] flex items-center gap-2">
              {product.colors.map((c) => (
                <span key={c} className="size-3.5 rounded-full ring-1 ring-white/25" style={{ background: c }} aria-hidden />
              ))}
              <span className="sr-only">{product.colors.length} colourways available</span>
            </span>
          )}
        </div>
      </Link>
    </article>
  );
});
