/**
 * Spacing + layout tokens. The Figma file is built on a 4px grid with
 * 100px / 200px vertical section padding and a 1406px inner content width
 * inside the 1440px artboard.
 */
/** Tailwind's 4px base means the Figma section padding maps directly:
 *  py-25 = 100px, pt-50 = 200px, gap-4.5 = 18px, px-4.5 = 18px. */
export const spacing = {
  px: 1, 0.5: 2, 1: 4, 2: 8, 2.5: 10, 3: 12, 3.5: 14, 4: 16,
  4.5: 18, 5: 20, 6: 24, 8: 32, 11: 44, 16: 64, 25: 100, 50: 200,
} as const;

export const radius = {
  xs: 4, sm: 8, md: 12, lg: 16, xl: 24, full: 9999,
} as const;

/** Artboard widths the design was drawn at. */
export const breakpoints = {
  mobile: 390,   // Figma mobile artboard
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  desktop: 1440, // Figma desktop artboard
} as const;

/** Recurring component dimensions lifted straight from the file. */
export const sizes = {
  navbarHeight: 60,
  navbarHeightMobile: 62,
  carouselCard: 428,   // Category / Our Sports cards
  gridCard: 338,       // Featured Products grid
  heroCard: { w: 448, h: 125 }, // hero bottom stat cards
  carouselGap: 24,
  gridGap: 20,
} as const;
