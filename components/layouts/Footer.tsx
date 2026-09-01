import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Ticker } from "@/components/ui/Ticker";
import { footer, TICKER_ITEMS } from "@/lib/data";

/**
 * Figma: "Footer" (1440x734) — the blue ticker strip, then the brand block
 * with its email capture on the left and the Categories / Sports / Contact
 * columns on the right, closed by a rule, copyright and social row.
 */
export function Footer() {
  return (
    <footer className="bg-surface">
      <Ticker items={TICKER_ITEMS} />

      <Container className="flex flex-col gap-16 py-16 md:py-20">
        <div className="flex flex-col gap-14 lg:flex-row lg:justify-between">
          {/* Brand + subscribe */}
          <div className="flex max-w-[561px] flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="font-sans text-[clamp(1.75rem,3.4vw,3rem)] font-semibold leading-none tracking-[-0.035em] text-white">
                {footer.brand}
              </p>
              <p className="font-condensed text-base uppercase tracking-[0.18em] text-white/50">
                {footer.tagline}
              </p>
            </div>

            <form className="flex w-full max-w-[440px] items-center gap-2">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Email address"
                className="h-12 flex-1 rounded-xl border border-line bg-surface-raised px-4 font-sans text-sm text-white outline-none transition-colors placeholder:text-white/35 focus-visible:border-brand-400"
              />
              <button
                type="submit"
                className="h-12 shrink-0 rounded-xl bg-white px-6 font-condensed text-xs uppercase tracking-[0.18em] text-surface transition-opacity hover:opacity-85"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-4">
                <h2 className="font-sans text-sm font-semibold text-white">{col.heading}</h2>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="font-sans text-sm text-white/50 transition-colors hover:text-white">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div className="flex flex-col gap-4">
              <h2 className="font-sans text-sm font-semibold text-white">{footer.contact.heading}</h2>
              <p className="whitespace-pre-line font-sans text-sm leading-[1.6] text-white/50">
                {footer.contact.hours}
              </p>
              <a href={`tel:${footer.contact.phone.replace(/[^+\d]/g, "")}`} className="font-sans text-sm text-white/50 hover:text-white">
                {footer.contact.phone}
              </a>
              <a href={`mailto:${footer.contact.email}`} className="font-sans text-sm text-white/50 hover:text-white">
                {footer.contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-sans text-sm text-white/40">{footer.copyright}</p>
          <div className="flex items-center gap-5">
            <span className="font-sans text-sm text-white/40">Follow</span>
            {[
              { label: "Instagram", d: "M12 7.6a4.4 4.4 0 100 8.8 4.4 4.4 0 000-8.8zm0 7.2a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6z M17 6.2a1 1 0 100 2 1 1 0 000-2z M4.5 12c0-2.7 0-4 .8-4.9.8-.8 2.2-.8 4.9-.8h3.6c2.7 0 4 0 4.9.8.8.9.8 2.2.8 4.9v0c0 2.7 0 4-.8 4.9-.9.8-2.2.8-4.9.8h-3.6c-2.7 0-4.1 0-4.9-.8-.8-.9-.8-2.2-.8-4.9z" },
              { label: "X", d: "M5 5l14 14M19 5L5 19" },
            ].map((s) => (
              <a key={s.label} href="#" aria-label={s.label} className="text-white/50 transition-colors hover:text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
