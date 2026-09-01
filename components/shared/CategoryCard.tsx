import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { textStyles } from "@/lib/typography";
import type { CategoryTile } from "@/types";

/**
 * Shop by Category / Our Sports tile (Figma: Card 2–6, 428x428).
 * Label sits bottom-left over a gradient scrim.
 */
export function CategoryCard({
  tile,
  className,
  priority,
}: {
  tile: CategoryTile;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={tile.href}
      className={cn(
        "group relative aspect-square w-[428px] max-w-[85vw] shrink-0 snap-start",
        "overflow-hidden rounded-lg bg-surface-raised",
        className
      )}
    >
      <Image
        src={tile.image}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 85vw, 428px"
        className="object-cover transition-transform duration-700 [transition-timing-function:var(--ease-out-soft)] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-6">
        <h3 className={cn(textStyles.productTitle, "text-white")}>{tile.label}</h3>
        <span
          aria-hidden
          className="grid size-10 place-items-center rounded-full border border-white/30 text-white transition-colors group-hover:border-white group-hover:bg-white group-hover:text-surface"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden>
            <path d="M5 15L15 5M15 5H7M15 5v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
