import Link from "next/link";
import { Ticker } from "@/components/ui/Ticker";
import { Button } from "@/components/ui/Button";
import { footer, TICKER_ITEMS } from "@/lib/data";

/**
 * Figma: "Footer" (1440x734). Near-black ground with skewed dark-blue
 * gradient bands sweeping across it. The brand lockup sits top-left with
 * "GEAR THAT PERFORMS" beneath it; the three link columns are top-aligned to
 * the right. The email capture is its own band lower down — a long underline
 * rule with the skewed SUBSCRIBE button beside it — then a hairline and the
 * copyright / social row.
 */
export function Footer() {
  return (
    <footer className="bg-surface">
      <Ticker items={TICKER_ITEMS} />

      <div className="relative isolate overflow-hidden bg-surface">
        {/* Skewed gradient bands. Two clusters, as drawn: one behind the
            columns, one lower-left behind the email row. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute left-[20%] top-0 h-[190px] w-[30%] -skew-x-[26deg] bg-linear-to-r from-[#132741]/55 to-transparent" />
          <span className="absolute left-[42%] top-0 h-[190px] w-[26%] -skew-x-[26deg] bg-linear-to-r from-[#101f36]/45 to-transparent" />
          <span className="absolute left-[64%] top-0 h-[190px] w-[30%] -skew-x-[26deg] bg-linear-to-r from-[#132741]/38 to-transparent" />
          <span className="absolute -left-[6%] top-[250px] h-[120px] w-[36%] -skew-x-[26deg] bg-linear-to-r from-transparent via-[#101f36]/40 to-transparent" />
          <span className="absolute left-[26%] top-[250px] h-[120px] w-[40%] -skew-x-[26deg] bg-linear-to-r from-[#132741]/32 to-transparent" />
          <span className="absolute left-[62%] top-[250px] h-[120px] w-[34%] -skew-x-[26deg] bg-linear-to-r from-[#101f36]/28 to-transparent" />
        </div>

        <div className="mx-auto max-w-[1440px] px-6 pb-8 pt-16 md:px-14">
          {/* Brand + columns */}
          <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-10">
              <p className="font-sans text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-none tracking-[-0.03em] text-white">
                {footer.brand}
              </p>
              <p className="font-condensed text-[15px] font-semibold uppercase leading-[1.55] tracking-[0.2em] text-white/85">
                Gear That<br />Performs
              </p>
            </div>

            <div className="grid gap-10 sm:grid-cols-3 lg:w-[58%] lg:grid-cols-[96px_128px_minmax(250px,1fr)] lg:gap-7">
              {footer.columns.map((col) => (
                <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-4">
                  <h2 className="font-wide text-[15px] font-semibold uppercase tracking-[0.18em] text-white">
                    {col.heading}
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="font-sans text-[15px] text-white/60 transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}

              <div className="flex flex-col gap-3">
                <h2 className="font-wide text-[15px] font-semibold uppercase tracking-[0.18em] text-white">
                  {footer.contact.heading}
                </h2>
                <p className="whitespace-pre-line font-sans text-[15px] leading-[1.6] text-white/60">
                  {footer.contact.hours}
                </p>
                <a href={`tel:${footer.contact.phone.replace(/[^+\d]/g, "")}`} className="font-sans text-[15px] text-white/60 hover:text-white">
                  {footer.contact.phone}
                </a>
                <a href={`mailto:${footer.contact.email}`} className="font-sans text-[15px] text-white/60 hover:text-white">
                  {footer.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Email capture band */}
          <form className="mt-20 flex max-w-[560px] items-end gap-8">
            <div className="flex-1">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="EMAIL ADDRESS"
                className="w-full border-b border-white/45 bg-transparent pb-2.5 font-wide text-[15px] font-semibold uppercase tracking-[0.18em] text-white outline-none transition-colors placeholder:text-white/85 focus-visible:border-white"
              />
            </div>
            <Button type="submit" variant="outline" size="sm" className="shrink-0">
              Subscribe
            </Button>
          </form>

          {/* Legal row */}
          <div className="mt-16 flex flex-col gap-4 border-t border-white/15 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-sans text-[15px] text-white/65">{footer.copyright}</p>
            <div className="flex items-center gap-3.5">
              <span className="font-sans text-[15px] text-white/65">Follow</span>
              {[
                { label: "Instagram", d: "M7.8 3.6h8.4a4.2 4.2 0 0 1 4.2 4.2v8.4a4.2 4.2 0 0 1-4.2 4.2H7.8a4.2 4.2 0 0 1-4.2-4.2V7.8a4.2 4.2 0 0 1 4.2-4.2Z M12 8.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z M17 6.9h.01" },
                { label: "Facebook", d: "M13.6 21v-8h2.6l.4-3h-3V8.2c0-.9.3-1.4 1.5-1.4H16.7V4.1A20 20 0 0 0 14.4 4c-2.3 0-3.8 1.4-3.8 3.9V10H8v3h2.6v8h3Z" },
                { label: "YouTube", d: "M3.6 8.4a3 3 0 0 1 3-3h10.8a3 3 0 0 1 3 3v7.2a3 3 0 0 1-3 3H6.6a3 3 0 0 1-3-3V8.4Z M10.6 9.6 15 12l-4.4 2.4V9.6Z" },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="text-white/60 transition-colors hover:text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
