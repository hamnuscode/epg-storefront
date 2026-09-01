"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  // "Rami blue grad" fill
  primary:
    "bg-linear-135 from-brand-400 via-brand-500 to-brand-600 text-white hover:brightness-110 active:brightness-95",
  // Pill treatment from the Category filter row (#292929 @ r24)
  secondary:
    "bg-line text-white hover:bg-surface-muted active:bg-line",
  ghost:
    "bg-transparent text-white/50 hover:text-white hover:bg-white/5 active:bg-white/10",
  accent:
    "bg-accent text-surface hover:brightness-105 active:brightness-95",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-base",
  md: "h-10 px-4.5 text-xl", // 40px tall, 18px inline — the Figma pill
  lg: "h-14 px-8 text-xl",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-sans font-semibold " +
  "tracking-[-0.03em] whitespace-nowrap transition-all duration-200 " +
  "[transition-timing-function:var(--ease-out-soft)] " +
  "disabled:pointer-events-none disabled:opacity-40";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  /** Renders a spinner and blocks interaction. */
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {loading && (
        <span
          aria-hidden
          className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";

export interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

/** Same visual treatment, rendered as an anchor for real navigation. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => (
    <a ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  )
);
ButtonLink.displayName = "ButtonLink";
