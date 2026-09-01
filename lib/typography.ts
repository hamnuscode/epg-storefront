/**
 * Typography tokens for EPG.
 *
 * SUBSTITUTIONS — the Figma file specifies fonts that cannot be served on the
 * web. These are the approved replacements:
 *   SF Pro      -> Inter          (weights 510/590/650/860 -> 500/600/700/800)
 *   SF Compact  -> Inter          (457/556/656 -> 400/500/600)
 *   Stack Sans  -> Anton          (display-only, weights 400/600 -> 400)
 *   Cal Sans    -> Gothic A1     (already present in the design, same
 *                                  geometric character at ticker sizes)
 * Google-hosted originals kept as-is: Inter, Barlow Condensed, Gothic A1,
 * Reenie Beanie.
 *
 * NORMALIZATION — the source file contained 196 text styles, many with
 * fractional sizes (e.g. 11.751412391662598px) caused by frames being scaled
 * in Figma rather than by deliberate design. Those are snapped to the ramp
 * below; `sizeMap` records the original->normalized decisions.
 */

export const fontSize = {
  "2xs": 10, xs: 12, sm: 14, base: 16, lg: 18, xl: 20,
  "2xl": 24, "3xl": 28, "4xl": 32, "5xl": 40, "6xl": 48,
  "7xl": 64, "8xl": 76,
} as const;

/** Raw Figma size -> normalized token. Audit trail for the snapping pass. */
export const sizeMap: Record<string, number> = {
  "7.545554161071777": 8,
  "8.881132125854492": 10,
  "9.013864517211914": 10,
  "10.282485961914062": 10,
  "10.816637992858887": 12,
  "11.25": 12,
  "11.751412391662598": 12,
  "12.219016075134277": 12,
  "12.244898796081543": 12,
  "13.220338821411133": 14,
  "14.662819862365723": 14,
  "14.689265251159668": 14,
  "14.857142448425293": 16,
  "15.203390121459961": 16,
  "15.402542114257812": 16,
  "15.781379699707031": 16,
  "17.627119064331055": 18,
  "18.03586196899414": 18,
  "18.16288185119629": 18,
  "19.328365325927734": 20,
  "19.478290557861328": 20,
  "20.29034423828125": 20,
  "20.564971923828125": 20,
  "21.680557250976562": 20,
  "21.795459747314453": 24,
  "22.549760818481445": 24,
  "23.26530647277832": 24,
  "24.5198917388916": 24,
  "25.428035736083984": 26,
  "28.169885635375977": 28,
  "50.6779670715332": 48,
  "64.9276351928711": 64,
};

/** Named text styles, keyed by role. Mirrors the six Figma named styles
 *  plus the recurring unnamed combinations found across the Home frame. */
export const textStyles = {
  /** Giant wordmark ("EPG", 723px in Figma) — fluid so it never overflows. */
  wordmark: "font-display uppercase leading-[0.78] tracking-[-0.03em]",
  /** "on pitch" / "OFF pitch" split headline, 76px. */
  displayLg: "font-display uppercase text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.88] tracking-[-0.02em]",
  /** Hero headline, SF Pro 590 @ 65px -> Inter 600 @ 64px. */
  heroTitle: "font-sans font-semibold text-[clamp(2.25rem,5vw,4rem)] leading-[0.92] tracking-[-0.03em]",
  /** Section heading, "Shop by Category" / "Our Sports" / "Find Your Gear". */
  sectionTitle: "font-sans font-semibold text-[clamp(2rem,4vw,3rem)] leading-[0.9] tracking-[-0.04em]",
  /** Product name, Barlow Condensed 600 @ 28px. */
  productTitle: "font-condensed font-semibold text-3xl uppercase leading-[1.2] tracking-[0.08em]",
  /** Price, SF Compact 556 @ 26px -> Inter 500. */
  price: "font-sans font-medium text-2xl leading-[1.19] tracking-[-0.03em]",
  /** Nav links and buttons, SF Pro 590 @ 20px. */
  nav: "font-sans text-[15px] font-medium uppercase leading-none tracking-[0.06em]",
  /** Body Base (named style), Inter 400 @ 20px. */
  bodyBase: "font-sans text-xl leading-[1.21] tracking-[-0.04em]",
  /** Body Small (named style), Inter 400 @ 16px. */
  bodySmall: "font-sans text-base leading-[1.21] tracking-[-0.04em]",
  /** Ticker + eyebrow, Cal Sans 400 @ 20px with wide tracking. */
  ticker: "font-wide uppercase text-xl leading-[1.3] tracking-[0.18em]",
} as const;

export type TextStyle = keyof typeof textStyles;
