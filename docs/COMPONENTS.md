# Component reference

Every component is typed, and each one notes the Figma node it implements.
Props marked **required** have no default.

## ui/

### `Button` / `ButtonLink`

```tsx
<Button variant="primary" size="lg" loading={saving}>Add to cart</Button>
<ButtonLink href="/collection" variant="secondary">VIEW COLLECTION</ButtonLink>
```

| Prop | Type | Default |
|---|---|---|
| `variant` | `primary \| secondary \| ghost \| accent` | `primary` |
| `size` | `sm \| md \| lg` | `md` |
| `loading` | `boolean` | `false` |

`primary` uses the brand gradient. `secondary` is the `#292929` pill from the
Category filter row. Both forward refs; `loading` sets `aria-busy` and blocks
pointer events. `ButtonLink` renders an `<a>` so navigation stays real.

### `Container`
The 1406px inner width from the artboard with 24px gutters. Accepts `as` to
change the element (`as="section"`).

### `SectionHeading`
Heading plus optional trailing `action` node — the row used by "Shop by
Category", "Our Sports" and "Featured Products". Pass `id` and point the
section's `aria-labelledby` at it.

### `FilterPills`
*Figma: Frame 20.* Controlled. 40px tall, 18px inline padding, r24, selected
pill fills `#292929`.

```tsx
<FilterPills label="Filter categories" options={categoryFilters}
             value={active} onChange={setActive} />
```

Rendered as a `role="tablist"`; Left/Right arrows move selection and focus,
so it is operable without a mouse.

### `Ticker`
*Figma: "Ticker 1", 50px.* Items render three times so a `-33.333%` translate
loops seamlessly. Decorative, so it is `aria-hidden`; the animation stops
under `prefers-reduced-motion`.

### `Carousel`
*Figma: the rail plus the 5-segment rule beneath it (Frame 25).* Native
snap scrolling. The segment indicator is driven by real scroll position and
each segment is a button that scrolls to its offset — it is a control, not
decoration. `segments` defaults to 5, matching the design.

## shared/

### `ProductCard`
*Figma: Component 2/3/4 (338px grid) and the 428px carousel card.*
`size="grid" | "carousel"`. Whole tile is one link. Image scales on hover;
a bottom scrim keeps the title legible over light product shots. Memoized —
it renders 8+ times per page. Pass `priority` for above-the-fold tiles.

### `CategoryCard`
*Figma: Card 2–6, 428x428.* Label bottom-left over a gradient scrim, with an
arrow affordance that inverts on hover.

### `FeatureCard`
*Figma: Frame 8/11/12, 448x125.* The hero's bottom cards — `#363636` at 42%
with a backdrop blur, 145x97 thumbnail, arrow that lifts on hover.

## layouts/

### `Navbar`
*Figma: "Navbar" 1440x60 / mobile 62.* Absolutely positioned over the hero.
Desktop shows the link row with a hover/click dropdown under **Sports**;
below `md` it collapses to a hamburger driving `MobileSidebar`. Escape closes
the dropdown. Links are exported as `NAV_LINKS` for reuse.

### `MobileSidebar`
*Figma: "Sidebar - Mob" 390x844 / "Sidebar" 285x844.* Right-hand drawer over
a scrim. Traps Tab focus, closes on Escape, locks body scroll, and restores
focus to the trigger on close.

### `Footer`
*Figma: "Footer" 1440x734.* Ticker strip, wordmark and description, three
link columns, legal row. `TICKER_ITEMS` is exported.

## sections/

Each maps 1:1 to a Figma frame inside "Home" and takes no props except
`CategoryRail`, which is reused twice:

| Component | Figma frame |
|---|---|
| `Hero` | Alt 1 (1440x911) |
| `CategoryRail` | Category (1:2266 and 1:2529) |
| `OnOffPitch` | off on (1440x733) |
| `Customiser` | Banner Comp (1440x685) |
| `FeaturedProducts` | Featured Products (1440x1700) |
| `Testimonial` | Testimonial (1440x1079) |
| `Assurances` | Frame 427321613 (1440x599) |

`CategoryRail` takes `title`, `filters`, `tiles`, `headingId` — the two
instances differ only in data.

## Client vs server

Server components by default. These are `"use client"` because they hold
state or listen for events: `Button`, `FilterPills`, `Carousel`, `Navbar`,
`MobileSidebar`, `CategoryRail`, `Customiser`.

## Content

All Home copy lives in `lib/data.ts`, transcribed from the Figma frame. That
is the seam to replace with a CMS or commerce API — swap the module and every
consumer keeps working, since components read typed props rather than
reaching for content themselves.
