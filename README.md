# EPG — Eastern Pro Gear

Next.js implementation of the Figma file **EPG (Devs)** (`9KBREJwZuEXeUgwvyxXP33`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## Stack

| | |
|---|---|
| Framework | Next.js 16.3.4, App Router |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS v4 (CSS-first `@theme`) |
| Images | `next/image`, WebP sources |
| Fonts | `next/font/google`, self-hosted at build |

## What is built

Design tokens, the shared component library, and the **Home** page (desktop
1440 + mobile 390). The remaining 12 desktop screens and 13 mobile screens
from the Figma file are not implemented yet — see *Not yet built* below.

```
app/
  layout.tsx          root layout, font wiring, skip-link
  page.tsx            Home — section order mirrors the Figma frame
  globals.css         design tokens (@theme) + base styles
components/
  ui/                 Button, Container, SectionHeading, FilterPills,
                      Ticker, Carousel
  shared/             ProductCard, CategoryCard, FeatureCard
  layouts/            Navbar, MobileSidebar, Footer
  sections/           Hero, CategoryRail, OnOffPitch, Customiser,
                      FeaturedProducts, Testimonial, Assurances
lib/
  colors.ts           colour tokens + brand gradients
  typography.ts       type ramp, named text styles, raw→normalized map
  spacing.ts          spacing, radii, breakpoints, component dimensions
  assets.ts           semantic map over the exported Figma imagery
  data.ts             Home page content (the CMS seam)
  cn.ts               clsx + tailwind-merge helper
types/index.ts        Product, CategoryTile, Testimonial, NavLink, …
scripts/
  figma-extract.mjs   pull the document + print a token inventory
  figma-assets.mjs    download image fills for a named frame
```

## Two deliberate deviations from the Figma file

**1. Three fonts were substituted.** SF Pro, SF Compact and Stack Sans Notch
cannot be legally served on the web — SF is an Apple system font and Stack
Sans Notch is commercial. Replacements:

| Figma | Shipped | Notes |
|---|---|---|
| SF Pro (400/510/590/650/860) | Inter (400/500/600/700/800) | nav, body, prices, hero |
| SF Compact (457/556/656) | Inter (400/500/600) | prices |
| Stack Sans Notch (400/600) | Anton (400) | "EPG", "on pitch / OFF pitch" |
| Cal Sans (400) | Gothic A1 (600) | ticker, eyebrow labels |
| Inter, Barlow Condensed, Gothic A1, Reenie Beanie | unchanged | on Google Fonts |

To restore the originals, drop licensed `.woff2` files into `public/fonts`
and swap the `next/font/google` calls in `app/layout.tsx` for
`next/font/local`. Nothing else needs to change — everything reads the
`--font-*` CSS variables.

**2. Tokens were normalized, not copied literally.** The source file
contains 73 fills, 196 text styles and 26 corner radii. Many are artifacts
rather than decisions: twelve visually identical dark greys, and fractional
font sizes such as `11.751412391662598px` produced by frames being scaled
inside Figma. Those cluster in five specific screens (Checkout-Mob is 75%
fractional) rather than spreading evenly, which is what identifies them as
accidental.

They are snapped to a real ramp. `lib/typography.ts` exports `sizeMap` as
the full audit trail of every original → normalized decision.

## Design tokens

Defined once in `app/globals.css` under `@theme`, mirrored as typed exports
in `lib/`. Tailwind generates utilities from them (`bg-surface`,
`text-accent`, `border-line`, `font-display`).

**Surfaces** `#0c0c0c` base · `#191919` raised · `#232323` overlay ·
`#323232` muted · `#ffffff` light band

**Brand** `#579ada` → `#468dd2` → `#2e79be` (the "Rami blue grad" style)

**Accent** `#b8ff00`

**Semantic** `#de2e41` danger · `#2cff4c` success · `#ffc100` warning

**Type ramp** 10 · 12 · 14 · 16 · 18 · 20 · 24 · 28 · 32 · 40 · 48 · 64 · 76

**Radii** 4 · 8 · 12 · 16 · 24 · full

Spacing uses Tailwind's 4px base, so the Figma values map directly:
`py-25` = 100px, `pt-50` = 200px, `gap-4.5` = 18px.

## Assets

64 image fills were exported from the Figma API and converted to WebP,
taking the payload from **67MB to 5MB**. `lib/assets.ts` maps them to
semantic keys so components never reference a hash directly.

Re-export at any time:

```bash
node scripts/figma-assets.mjs "Home"     # or any top-level frame name
```

Requires `FIGMA_TOKEN` in `.env.local` (gitignored).

## Accessibility

Semantic landmarks throughout, a skip link, visible `:focus-visible` rings,
`aria-*` on every icon-only control, arrow-key navigation on the filter
tablist, and focus trap plus focus restore on the mobile drawer. Motion
respects `prefers-reduced-motion`.

## Not yet built

12 desktop screens and 13 mobile screens remain: Product Page, Checkout,
Martial Arts / Baseball / Golf (one shared template), Men / Women / Kids /
Collection (a second shared template), Custom, About Us, 404.

The template analysis is worth acting on — those 13 desktop screens collapse
to **6 routes**, two of them dynamic segments, because Martial Arts /
Baseball / Golf are structurally identical at 4002px, as are Men / Women /
Kids at 3066px.
