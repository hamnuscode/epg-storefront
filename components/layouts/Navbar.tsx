"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { assets } from "@/lib/assets";
import { textStyles } from "@/lib/typography";
import type { NavLink } from "@/types";
import { MobileSidebar } from "./MobileSidebar";

export const NAV_LINKS: NavLink[] = [
  {
    label: "Sports",
    href: "/sports",
    children: [
      { label: "Martial Arts", href: "/martial-arts" },
      { label: "Baseball", href: "/baseball" },
      { label: "Golf", href: "/golf" },
    ],
  },
  { label: "Men", href: "/men" },
  { label: "Women", href: "/women" },
  { label: "Kids", href: "/kids" },
  { label: "Collection", href: "/collection" },
  { label: "Custom", href: "/custom" },
];

/**
 * Figma: "Navbar" 1440x60, 24px gutters, space-between, transparent over
 * the hero. Mobile artboard is 62px tall and swaps the link row for a
 * hamburger that opens the "Sidebar - Mob" drawer.
 */
export function Navbar({ className }: { className?: string }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  /**
   * The dropdown is click-driven: it stays open until the trigger is clicked
   * again, an item is chosen, Escape is pressed, or the pointer clicks away.
   * Deliberately no hover open/close — a menu that closes on mouseleave is
   * near-impossible to travel into.
   */
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        navRef.current?.querySelector<HTMLElement>(`[data-menu-trigger="${openMenu}"]`)?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [openMenu]);

  return (
    <>
      <header
        className={cn(
          "absolute inset-x-0 top-0 z-50 h-[62px] md:h-[60px]",
          className
        )}
      >
        <nav
          ref={navRef}
          aria-label="Main"
          className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6"
        >
          {/* Mobile: hamburger sits left of the centred logo */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            className="text-white md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <Link href="/" aria-label="EPG — Eastern Pro Gear, home" className="md:mr-auto">
            <Image
              src={assets.logo}
              alt="EPG"
              width={78}
              height={48}
              priority
              className="h-6 w-auto object-contain md:h-9"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li
                  key={link.label}
                  className="relative"
                >
                  {link.children ? (
                    <>
                      <button
                        type="button"
                        data-menu-trigger={link.label}
                        aria-expanded={openMenu === link.label}
                        aria-haspopup="true"
                        aria-controls={`menu-${link.label}`}
                        onClick={() =>
                          setOpenMenu(openMenu === link.label ? null : link.label)
                        }
                        className={cn(
                          textStyles.nav,
                          "flex items-center gap-1 text-white transition-opacity hover:opacity-70"
                        )}
                      >
                        {link.label}
                        <svg
                          width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden
                          className={cn(
                            "transition-transform duration-200",
                            openMenu === link.label && "rotate-180"
                          )}
                        >
                          <path d="M6 15l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      {openMenu === link.label && (
                        <ul
                          id={`menu-${link.label}`}
                          className="absolute left-0 top-full z-50 mt-3 min-w-48 rounded-lg border border-line bg-surface-overlay p-2 shadow-2xl"
                        >
                          {link.children.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={() => setOpenMenu(null)}
                                className="block rounded-sm px-3 py-2 font-sans text-base text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={cn(textStyles.nav, "text-white transition-opacity hover:opacity-70")}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4.5">
              <Link href="/checkout" aria-label="Shopping cart" className="text-white transition-opacity hover:opacity-70">
                <CartIcon />
              </Link>
              <Link href="/account" aria-label="Account" className="text-white transition-opacity hover:opacity-70">
                <UserIcon />
              </Link>
            </div>
          </div>

          <Link href="/checkout" aria-label="Shopping cart" className="text-white md:hidden">
            <CartIcon />
          </Link>
        </nav>
      </header>

      <MobileSidebar open={drawerOpen} onClose={() => setDrawerOpen(false)} links={NAV_LINKS} />
    </>
  );
}

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 4h2l2.4 11.2a2 2 0 002 1.6h7.5a2 2 0 002-1.55L20.5 8H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1.4" fill="currentColor" />
      <circle cx="17" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="8" r="3.6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4.5 20a7.5 7.5 0 0115 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
