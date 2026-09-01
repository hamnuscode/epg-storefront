"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * EPG buttons are skewed parallelograms — the design slants the left and
 * right edges rather than rounding them. The skew is applied to a pseudo
 * background layer so the label itself stays upright and legible.
 */
type Variant = "solid" | "outline" | "dark" | "gold";
type Size = "sm" | "md" | "lg";

const shape =
  "relative inline-flex items-center justify-center isolate " +
  "before:absolute before:inset-0 before:-z-10 before:-skew-x-12 before:transition-colors " +
  "before:[transition-timing-function:var(--ease-out-soft)]";

const variants: Record<Variant, string> = {
  // White fill, dark label — the primary CTA on photography
  solid: "text-surface before:bg-white hover:before:bg-white/85",
  // Hairline outline on dark — "VIEW COLLECTION", "CUSTOM GEAR"
  outline:
    "text-white before:border before:border-white/70 hover:text-surface hover:before:bg-white",
  // Black fill on the light Forgex band — "EXPLORE MORE"
  dark: "text-white before:bg-surface hover:before:bg-surface/85",
  gold: "text-surface before:bg-accent hover:before:bg-accent/85",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-6 text-[11px]",
  md: "h-11 px-8 text-xs",
  lg: "h-12 px-10 text-sm",
};

const label = "font-condensed font-semibold uppercase tracking-[0.16em] whitespace-nowrap";

const base = (v: Variant, s: Size, c?: string) =>
  cn(shape, label, variants[v], sizes[s], "disabled:pointer-events-none disabled:opacity-40", c);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "solid", size = "md", loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={base(variant, size, className)}
      {...props}
    >
      {loading && (
        <span aria-hidden className="mr-2 size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";

/** Same shape as an internal link. */
export function ButtonLink({
  href, variant = "solid", size = "md", className, children, ...props
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  return (
    <Link href={href} className={base(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
