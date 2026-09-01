import Link from "next/link";
import { Ticker } from "@/components/ui/Ticker";
import { Button } from "@/components/ui/Button";
import { footer, TICKER_ITEMS } from "@/lib/data";

/**
 * Figma: "Footer" (1440x734). Deep-navy ground with skewed gradient panels
 * sweeping across it, the brand lockup and email capture ranged left, the
 * Categories / Sports / Contact columns right, and a hairline rule above the
 * copyright row.
 */
export function Footer() {
  return (
    <footer className="bg-surface">
      <Ticker items={TICKER_ITEMS} />

      <div className="relative isolate overflow-hidden bg-navy-900">
        {/* Angled gradient panels — decorative, matching the render */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -left-24 top-16 h-28 w-[46%] -skew-x-[28deg] bg-linear-to-r from-brand-600/45 to-transparent" />
          <span className="absolute left-[18%] top-36 h-24 w-[52%] -skew-x-[28deg] bg-linear-to-r from-brand-500/25 to-transparent" />
          <span className="absolute -left-10 bottom-24 h-24 w-[38%] -skew-x-[28deg] bg-linear-to-r from-brand-600/30 to-transparent" />
          <span className="absolute right-[-8%] top-8 h-40 w-[34%] -skew-x-[28deg] bg-linear-to-l from-brand-600/30 to-transparent" />
        </div>

        <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-12 md:py-16">
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            {/* Brand + subscribe */}
            <div className="flex max-w-[420px] flex-col gap-10">
              <p className="font-sans text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-none tracking-[-0.035em] text-white">
                {footer.brand}
              </p>
              <p className="font-condensed text-[11px] uppercase leading-[1.5] tracking-[0.22em] text-white/55">
                Gear That<br />Performs
              </p>
            </div>

            {/* Columns */}
            <div className="grid gap-10 sm:grid-cols-3">
              {footer.columns.map((col) => (
                <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-4">
                  <h2 className="font-condensed text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                    {col.heading}
                  </h2>
                  <ul className="flex flex-col gap-2.5">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="font-sans text-xs text-white/55 transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              <div className="flex flex-col gap-3">
                <h2 className="font-condensed text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  {footer.contact.heading}
                </h2>
                <p className="whitespace-pre-line font-sans text-xs leading-[1.7] text-white/55">
                  {footer.contact.hours}
                </p>
                <a href={`tel:${footer.contact.phone.replace(/[^+\d]/g, "")}`} className="font-sans text-xs text-white/55 hover:text-white">
                  {footer.contact.phone}
                </a>
                <a href={`mailto:${footer.contact.email}`} className="font-sans text-xs text-white/55 hover:text-white">
                  {footer.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Underline email capture */}
          <form className="mt-14 flex max-w-[420px] items-end gap-4">
            <div className="flex-1">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full border-b border-white/35 bg-transparent pb-2 font-condensed text-[11px] uppercase tracking-[0.2em] text-white outline-none transition-colors placeholder:text-white/45 focus-visible:border-white"
              />
            </div>
            <Button type="submit" variant="outline" size="sm">Subscribe</Button>
          </form>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-[11px] text-white/45">{footer.copyright}</p>
            <div className="flex items-center gap-4">
              <span className="font-sans text-[11px] text-white/45">Follow</span>
              {[
                { label: "Instagram", d: "M7.5 3.5h9a4 4 0 014 4v9a4 4 0 01-4 4h-9a4 4 0 01-4-4v-9a4 4 0 014-4z M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7z M17 6.6v.01" },
                { label: "Facebook", d: "M14 8.5h2V5.6h-2.2c-2 0-3.3 1.3-3.3 3.4V11H8.5v3H10.5v6h3v-6h2.2l.4-3h-2.6V9.4c0-.6.2-.9.9-.9z" },
                { label: "YouTube", d: "M3.5 8.5a3 3 0 013-3h11a3 3 0 013 3v7a3 3 0 01-3 3h-11a3 3 0 01-3-3z M10.5 9.8l4.2 2.2-4.2 2.2z" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="text-white/50 transition-colors hover:text-white">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d={s.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
