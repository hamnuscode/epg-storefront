/**
 * Route configuration for the eight category pages. The Figma file draws
 * these as separate frames, but Martial Arts / Baseball / Golf share one
 * shell (4002px) and Men / Women / Kids share another (3066px) — so they
 * are one dynamic segment here, differing only in the data below.
 */
import { assets } from "./assets";
import type { Product } from "@/types";
import { gearProducts } from "./data";

export interface CategoryPage {
  slug: string;
  /** Oversized display word bleeding behind the hero (Stack Sans Notch -> Anton). */
  display: string;
  title: string;
  tagline: string;
  /** Sub-filters shown above the grid (Figma: Wireframe - 20 chip row). */
  filters: string[];
  /** Sport pages get a second CTA; audience pages do not. */
  secondaryCta: boolean;
  heroImage: string;
  products: Product[];
}

const pool = gearProducts;
const slice = (n: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => {
    const base = pool[(i + offset) % pool.length];
    return { ...base, id: `${base.id}-${i + offset}` };
  });

export const categoryPages: CategoryPage[] = [
  {
    slug: "martial-arts",
    display: "discipline",
    title: "Martial Arts",
    tagline: "Your next round starts here!",
    filters: ["All", "Shorts", "Guards", "BJJ", "Karate", "Taekwondo", "Uniforms"],
    secondaryCta: true,
    heroImage: assets.categoryHeroes["martial-arts"],
    products: slice(8),
  },
  {
    slug: "baseball",
    display: "Power",
    title: "Baseball",
    tagline: "Your next winning gear awaits!",
    filters: ["All", "Gloves", "Bats", "Helmets", "Jerseys", "Cleats"],
    secondaryCta: true,
    heroImage: assets.categoryHeroes["baseball"],
    products: slice(8, 2),
  },
  {
    slug: "golf",
    display: "PRECISION",
    title: "Golf",
    tagline: "Premium experience starts here!",
    filters: ["All", "Gloves", "Polos", "Caps", "Bags", "Accessories"],
    secondaryCta: true,
    heroImage: assets.categoryHeroes["golf"],
    products: slice(8, 4),
  },
  {
    slug: "men",
    display: "MEN",
    title: "Men",
    tagline: "Performance-driven style, crafted for men.",
    filters: ["All", "Tops", "Bottoms", "Outerwear", "Footwear"],
    secondaryCta: false,
    heroImage: assets.categoryHeroes["men"],
    products: slice(8, 1),
  },
  {
    slug: "women",
    display: "women",
    title: "Women",
    tagline: "Confident, everyday essentials, designed for women.",
    filters: ["All", "Tops", "Bottoms", "Outerwear", "Footwear"],
    secondaryCta: false,
    heroImage: assets.categoryHeroes["women"],
    products: slice(8, 3),
  },
  {
    slug: "kids",
    display: "kids",
    title: "Kids",
    tagline: "Durable, playproof comfort, built for kids.",
    filters: ["All", "Tops", "Bottoms", "Protective", "Footwear"],
    secondaryCta: false,
    heroImage: assets.categoryHeroes["kids"],
    products: slice(8, 5),
  },
  {
    slug: "collection",
    display: "Collection",
    title: "Collection",
    tagline: "Premium, limited-edition designs, curated for everyone.",
    filters: ["All", "Equipment", "Apparel", "Accessories", "Limited"],
    secondaryCta: true,
    heroImage: assets.categoryHeroes["collection"],
    products: slice(12),
  },
];

export const getCategory = (slug: string) =>
  categoryPages.find((c) => c.slug === slug);

/** Flat product lookup for the product detail route. */
export const allProducts: Product[] = [
  ...gearProducts,
  ...categoryPages.flatMap((c) => c.products),
];

export const getProduct = (id: string) =>
  allProducts.find((p) => p.id === id) ?? gearProducts[0];
