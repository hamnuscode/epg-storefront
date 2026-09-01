import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import { cn } from "@/lib/cn";
import { textStyles } from "@/lib/typography";
import type { Product } from "@/types";

/**
 * Featured Products grid tile (Figma: Component 2/3/4 at 338x338) and the
 * larger carousel card (428x428). Image scales on hover; the whole tile is
 * one link so the hit target matches the visual card.
 */
export const ProductCard = memo(function ProductCard({
  product,
  size = "grid",
  priority = false,
  className,
}: {
  product: Product;
  size?: "grid" | "carousel";
  priority?: boolean;
  className?: string;
}) {
  const dim = size === "carousel" ? 428 : 338;

  return (
    <article
      className={cn(
        "group relative shrink-0 snap-start overflow-hidden rounded-lg bg-surface-raised",
        size === "carousel" ? "w-[428px] max-w-[85vw]" : "w-full",
        className
      )}
    >
      <Link href={`/product/${product.id}`} className="block focus:outline-none">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            width={dim}
            height={dim}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={size === "carousel" ? "428px" : "(max-width: 768px) 50vw, 338px"}
            className="size-full object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wider text-surface">
              {product.badge}
            </span>
          )}
          {/* Bottom scrim keeps the title legible over light product shots */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/80 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
            <h3 className={cn(textStyles.productTitle, "text-white")}>
              {product.name}
            </h3>
            <div className="flex flex-col items-end">
              {product.compareAtPrice && (
                <span className="font-sans text-sm text-white/50 line-through">
                  ${product.compareAtPrice.toFixed(2)}
                </span>
              )}
              <span className={cn(textStyles.price, "text-white")}>
                ${product.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
});
