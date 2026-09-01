import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Ticker } from "@/components/ui/Ticker";
import { textStyles } from "@/lib/typography";
import { cn } from "@/lib/cn";

/** Figma: "Ticker 1" strip content. */
export const TICKER_ITEMS = [
  "BUILT FOR ATHLETES BY ATHLETES",
  "PERSONALISE YOUR POWER",
  "OWN THE FIELD",
] as const;

const COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Martial Arts", href: "/martial-arts" },
      { label: "Baseball", href: "/baseball" },
      { label: "Golf", href: "/golf" },
      { label: "Collection", href: "/collection" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Custom Gear", href: "/custom" },
      { label: "Wholesale", href: "/wholesale" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Shipping", href: "/shipping" },
      { label: "Returns", href: "/returns" },
      { label: "Size Guide", href: "/size-guide" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

/**
 * Figma: "Footer" 1440x734 — gradient plates, the ticker strip, then the
 * link grid and legal row (Wireframe - 11).
 */
export function Footer() {
  return (
    <footer className="bg-surface">
      <Ticker items={TICKER_ITEMS} />

      <Container className="py-25">
        <div className="flex flex-col gap-16 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className={cn(textStyles.wordmark, "text-5xl text-white md:text-7xl")}>
              EPG
            </p>
            <p className={cn(textStyles.bodySmall, "mt-6 text-white/60")}>
              Eastern Pro Gear designs and manufactures premium sports equipment,
              apparel, and accessories trusted by brands, teams, retailers, and
              athletes worldwide.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-4">
                <h3 className="font-condensed text-base font-semibold uppercase tracking-[0.18em] text-white">
                  {col.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="font-sans text-base text-white/60 transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-sm text-white/40">
            &copy; {new Date().getFullYear()} Eastern Pro Gear. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="font-sans text-sm text-white/40 hover:text-white">Privacy</Link>
            <Link href="/terms" className="font-sans text-sm text-white/40 hover:text-white">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
