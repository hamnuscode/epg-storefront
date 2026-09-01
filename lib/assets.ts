/**
 * Asset map — verified against the Figma layout tree by node position, then
 * confirmed visually. Each key names the slot it fills in the design, so a
 * wrong image is a wrong key rather than a silent mismatch.
 * Regenerate sources: node scripts/figma-assets.mjs "Home"
 */
export const assets = {
  /** Navbar wordmark (Figma: image 11, 78x48). */
  logo: "/images/5dbe10cbda6c.webp",

  /** Hero: boxer wrapping hands, blue hoodie (Figma: Alt 1 / image 55). */
  heroBoxer: "/images/7f229d688962.webp",

  /** Shop by Category — the three tiles, in design order. */
  categoryTiles: [
    { image: "/images/469a0f939a35.webp", label: "MOUTH GUARD" },
    { image: "/images/cb376d135e1e.webp", label: "GOLF POLO SHIRT" },
    { image: "/images/40ecefb7f55b.webp", label: "RED BOXING GLOVES" },
  ],

  /** OFF PITCH / ON PITCH — two athletes facing off over a dark arena. */
  offPitch: "/images/0f79b854f8de.webp",
  onPitch: "/images/1bcda0d00fa1.webp",
  pitchBackdrop: "/images/1be4944c0d03.webp",

  /** Team-kit band (Figma: Banner Comp). */
  jerseyBanner: "/images/e6a90fc684c1.webp",
  jerseyBack: "/images/bb567a422619.webp",
  jerseyName: "/images/bd78f38bcf08.webp",

  /** Our Sports — gym-shot discipline tiles. */
  sportTiles: [
    { image: "/images/79511992c4d9.webp", label: "MARTIAL ARTS" },
    { image: "/images/8afd431b4ccd.webp", label: "BOXING" },
    { image: "/images/6636700b7766.webp", label: "BASEBALL" },
  ],

  /** Find Your Gear — the white-on-dark product shots. */
  products: [
    "/images/f55819bbf346.webp", "/images/ea4477056470.webp", "/images/d8fa2ba672eb.webp", "/images/fb7e8da83dc3.webp",
    "/images/c7682fc3e5b6.webp", "/images/00bea685790f.webp", "/images/b6926a60c114.webp", "/images/80d0756b635c.webp",
    "/images/876166789aa3.webp", "/images/78c8fef2b389.webp", "/images/52dc8accd641.webp", "/images/b9b8250ad1f0.webp",
  ],

  /** Forgex customiser: the jersey and its swatch patterns. */
  forgexJersey: "/images/e2d93c599ccf.webp",
  forgexSwatches: ["/images/c574a60d3b2e.webp", "/images/9d19d1ee633f.webp", "/images/39927cec13fa.webp", "/images/d8fa2ba672eb.webp", "/images/b9b8250ad1f0.webp", "/images/ee8c738314e9.webp"],

  /** Collection banner above the assurance band. */
  collectionBanner: "/images/fd6255619183.webp",

  /** Testimonial avatar. */
  avatar: "/images/88dc9d54783b.webp",

  /** Category page heroes, by slug. */
  categoryHeroes: {
    "martial-arts": "/images/79511992c4d9.webp",
    baseball: "/images/6636700b7766.webp",
    golf: "/images/319435dd3327.webp",
    men: "/images/1e0bc846bde3.webp",
    women: "/images/9077efeaad61.webp",
    kids: "/images/b88f617adbf8.webp",
    collection: "/images/fd6255619183.webp",
    custom: "/images/e2d93c599ccf.webp",
    about: "/images/8afd431b4ccd.webp",
    "404": "/images/1be4944c0d03.webp",
  },
} as const;
