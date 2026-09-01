"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { textStyles } from "@/lib/typography";
import type { NavLink } from "@/types";

/**
 * Figma: "Sidebar - Mob" (390x844) / "Sidebar" (285x844).
 * Slides in from the right over a scrim. Traps focus and restores it on
 * close so keyboard users are not dropped back at the top of the document.
 */
export function MobileSidebar({
  open,
  onClose,
  links,
}: {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab") return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the panel once it is mounted.
    requestAnimationFrame(() => panelRef.current?.querySelector<HTMLElement>("button")?.focus());

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      restoreTo.current?.focus();
    };
  }, [open, onClose]);

  return (
    <>
      <div
        onClick={onClose}
        aria-hidden
        className={cn(
          "fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={cn(
          "fixed inset-y-0 right-0 z-70 flex w-[285px] flex-col bg-surface-overlay",
          "transition-transform duration-300 [transition-timing-function:var(--ease-out-soft)] md:hidden",
          open ? "translate-x-0" : "pointer-events-none translate-x-full"
        )}
      >
        <div className="flex h-[62px] items-center justify-end px-6">
          <button type="button" onClick={onClose} aria-label="Close menu" className="text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <div key={link.label} className="flex flex-col">
              <Link
                href={link.href}
                onClick={onClose}
                className={cn(textStyles.nav, "py-3 text-white transition-opacity hover:opacity-70")}
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="flex flex-col border-l border-line pl-4">
                  {link.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="py-2 font-sans text-base text-white/60 transition-colors hover:text-white"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-3 border-t border-line p-6">
          <Link href="/account" onClick={onClose} className="font-sans text-base text-white/70 hover:text-white">
            Account
          </Link>
          <Link href="/checkout" onClick={onClose} className="font-sans text-base text-white/70 hover:text-white">
            Cart
          </Link>
        </div>
      </div>
    </>
  );
}
