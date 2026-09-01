"use client";

import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

/**
 * Figma: the listing tile on every category page. The shot fills the upper
 * area with a square "+" affordance at its lower right; beneath sits the blue
 * category tag, the name, a struck-through compare-at price beside the live
 * price, and the available colourways as dots.
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
    <article className={cn("group relative min-w-0 bg-surface-raised", className)}>
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative aspect-[430/340] overflow-hidden">
          <span
            aria-hidden
            className="absolute bottom-4 right-4 z-10 grid size-11 place-items-center bg-white/12 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-surface"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
          </span>
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 430px"
            className="object-contain p-4 transition-transform duration-500 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-col gap-1.5 px-4 pb-5">
          <span className="flex items-center gap-1.5 font-condensed text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-400">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 2l7 4v6c0 4.4-3 8.4-7 10-4-1.6-7-5.6-7-10V6z" />
            </svg>
            {product.categoryLabel ?? "MMA"}
          </span>

          <h3 className="truncate font-sans text-[15px] font-medium tracking-[-0.01em] text-white md:text-[17px]">
            {product.name}
          </h3>

          <p className="flex items-baseline gap-2">
            {product.compareAtPrice && (
              <span className="font-sans text-[14px] tabular-nums text-white/35 line-through">
                ${product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="font-sans text-[15px] font-medium tabular-nums text-white">
              ${product.price.toFixed(2)}
            </span>
          </p>

          {product.colors && (
            <span className="mt-0.5 flex items-center gap-1.5">
              {product.colors.map((c) => (
                <span
                  key={c}
                  className="size-3 rounded-full ring-1 ring-white/25"
                  style={{ background: c }}
                  aria-hidden
                />
              ))}
              <span className="sr-only">{product.colors.length} colourways available</span>
            </span>
          )}
        </div>
      </Link>

    </article>
  );
});
