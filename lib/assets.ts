/**
 * Asset map — real imagery exported from the Figma file via the images API
 * and converted to WebP (67MB PNG -> 5MB). Keys are semantic; values point at
 * public/images. Regenerate the source files with:
 *   node scripts/figma-assets.mjs "Home"
 */
export const assets = {
  logo: "/images/5dbe10cbda6c.webp",
  heroBackdrop: "/images/7f229d688962.webp",
  heroSlides: [
    "/images/7f229d688962.webp",
    "/images/b6926a60c114.webp",
    "/images/9fbd54aeb041.webp",
    "/images/f77537047a09.webp",
    "/images/03d6510061dd.webp"
  ],
  heroCards: [
    "/images/498302a449ea.webp",
    "/images/2c431db972fe.webp",
    "/images/7f9a6bfed5f3.webp"
  ],
  categoryTiles: [
    "/images/8afd431b4ccd.webp",
    "/images/79511992c4d9.webp",
    "/images/e1587462abb1.webp",
    "/images/6636700b7766.webp",
    "/images/879715922b7b.webp",
    "/images/8e5a091813ea.webp",
    "/images/b88f617adbf8.webp",
    "/images/c8cac2c36586.webp"
  ],
  sportTiles: [
    "/images/8e5a091813ea.webp",
    "/images/b88f617adbf8.webp",
    "/images/c8cac2c36586.webp",
    "/images/88dc9d54783b.webp"
  ],
  products: [
    "/images/8433e4fe10b7.webp",
    "/images/80551ee36a83.webp",
    "/images/fb7e8da83dc3.webp",
    "/images/7bc9c009c308.webp",
    "/images/488a25dcf457.webp",
    "/images/40ecefb7f55b.webp",
    "/images/0a3481eba5fc.webp",
    "/images/c186be806309.webp",
    "/images/a1531c0a75ec.webp",
    "/images/eb7f7495b72e.webp",
    "/images/52dc8accd641.webp",
    "/images/ca92b659d6da.webp"
  ],
  avatars: [
    "/images/9d19d1ee633f.webp",
    "/images/39927cec13fa.webp",
    "/images/d8fa2ba672eb.webp",
    "/images/ee8c738314e9.webp",
    "/images/c574a60d3b2e.webp",
    "/images/b9b8250ad1f0.webp"
  ],
  customiser: "/images/e6a90fc684c1.webp",
  testimonialBanner: "/images/fd6255619183.webp",
} as const;
