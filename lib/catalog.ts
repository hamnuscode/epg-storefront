/**
 * Per-page configuration for the seven category pages. The Figma frames for
 * Martial Arts / Baseball / Golf are structurally identical, as are
 * Men / Women / Kids — they differ only in the data below, so they share one
 * dynamic route. Every image is the one the corresponding frame actually
 * uses, taken from the manifest's frame attribution.
 */
import type { Product } from "@/types";
import type { Discipline } from "@/components/sections/DisciplineRail";
import type { Hotspot } from "@/components/sections/PageHero";

const img = (id: string) => `/images/${id}.webp`;

export interface CategoryPage {
  slug: string;
  display?: string;
  title: string;
  tagline: string;
  backdrop: string;
  subject?: string;
  hotspots?: Hotspot[];
  /** Sport pages carry the discipline rail; audience pages do not. */
  disciplines?: Discipline[];
  /** Collection carries the four-tile "Shop by Category" bar instead. */
  categoryBar?: { label: string; images: string[] }[];
  filters: string[];
  categories: string[];
  /** Collection shows a second select scoped to sport. */
  sports?: string[];
  secondaryCta: boolean;
  product: { image: string; name: string; label: string; price: number; compareAt: number; colors: string[] };
  count: number;
}

const MARTIAL_DISCIPLINES: Discipline[] = [
  { label: "MMA", image: img("3cb4e3a8ae87") },
  { label: "Boxing", image: img("8539d7e3f4e8") },
  { label: "Muay Thai", image: img("5909ed35a6c2") },
  { label: "Karate", image: img("3bc1e44b126f") },
];

const DOTS = ["#e8e8e8", "#2f6fd0"];

export const categoryPages: CategoryPage[] = [
  {
    slug: "martial-arts",
    display: "Discipline",
    title: "Martial Arts",
    tagline: "Your next round starts here!",
    backdrop: img("0fbc8158251d"),
    subject: img("cb7c051a0793"),
    hotspots: [
      { label: "Karate Gi", top: "34%", left: "14%" },
      { label: "Karate Belt", top: "48%", left: "43%" },
    ],
    disciplines: MARTIAL_DISCIPLINES,
    filters: ["All", "Shorts", "Guards", "BJJ", "Uniforms"],
    categories: ["Select Category", "Head Guards", "Gloves", "Shin Guards", "Uniforms"],
    secondaryCta: true,
    product: { image: img("33935de05351"), name: "Head Guard for Training", label: "MMA", price: 69.99, compareAt: 89.99, colors: DOTS },
    count: 8,
  },
  {
    slug: "baseball",
    display: "Power",
    title: "Baseball",
    tagline: "Your next winning gear awaits!",
    backdrop: img("afe7618bb68f"),
    subject: img("005a67db1b09"),
    hotspots: [
      { label: "Team Jersey", top: "30%", left: "16%" },
      { label: "Batting Glove", top: "46%", left: "46%" },
    ],
    disciplines: MARTIAL_DISCIPLINES,
    filters: ["All", "Gloves", "Bats", "Helmets", "Jerseys"],
    categories: ["Select Category", "Gloves", "Bats", "Helmets", "Cleats"],
    secondaryCta: true,
    product: { image: img("33935de05351"), name: "Head Guard for Training", label: "Baseball", price: 69.99, compareAt: 89.99, colors: DOTS },
    count: 8,
  },
  {
    slug: "golf",
    display: "Precision",
    title: "Golf",
    tagline: "Premium experience starts here!",
    backdrop: img("12860fe2489b"),
    subject: img("2d36f9b91a2e"),
    hotspots: [
      { label: "Golf Polo", top: "32%", left: "18%" },
      { label: "Golf Glove", top: "50%", left: "48%" },
    ],
    disciplines: MARTIAL_DISCIPLINES,
    filters: ["All", "Gloves", "Polos", "Caps", "Bags"],
    categories: ["Select Category", "Gloves", "Apparel", "Accessories"],
    secondaryCta: true,
    product: { image: img("33935de05351"), name: "Head Guard for Training", label: "Golf", price: 69.99, compareAt: 89.99, colors: DOTS },
    count: 8,
  },
  {
    slug: "men",
    display: "Men",
    title: "Men",
    tagline: "Performance-driven style, crafted for men.",
    backdrop: img("12860fe2489b"),
    subject: img("2270a2e8782e"),
    filters: ["All", "Tops", "Bottoms", "Equipment", "Accessories"],
    categories: ["Select Sport", "MMA", "Boxing", "Golf", "Baseball"],
    secondaryCta: false,
    product: { image: img("33935de05351"), name: "Head Guard for Training", label: "Men", price: 69.99, compareAt: 89.99, colors: DOTS },
    count: 6,
  },
  {
    slug: "women",
    display: "Women",
    title: "Women",
    tagline: "Confident, everyday essentials, designed for women.",
    backdrop: img("12860fe2489b"),
    subject: img("7a74f883ba54"),
    filters: ["All", "Tops", "Bottoms", "Equipment", "Accessories"],
    categories: ["Select Sport", "MMA", "Boxing", "Golf", "Baseball"],
    secondaryCta: false,
    product: { image: img("33935de05351"), name: "Head Guard for Training", label: "Women", price: 69.99, compareAt: 89.99, colors: DOTS },
    count: 6,
  },
  {
    slug: "kids",
    display: "Kids",
    title: "Kids",
    tagline: "Durable, playproof comfort, built for kids.",
    backdrop: img("12860fe2489b"),
    subject: img("319085dbdc81"),
    filters: ["All", "Tops", "Bottoms", "Protective"],
    categories: ["Select Sport", "MMA", "Boxing", "Golf", "Baseball"],
    secondaryCta: false,
    product: { image: img("33935de05351"), name: "Head Guard for Training", label: "Kids", price: 69.99, compareAt: 89.99, colors: DOTS },
    count: 6,
  },
  {
    slug: "collection",
    title: "Collection",
    tagline: "Premium, limited-edition designs, curated for everyone.",
    backdrop: img("86f34368631c"),
    hotspots: [
      { label: "Baseball Helmet", top: "12%", left: "32%" },
      { label: "Batting Gloves", top: "14%", left: "54%" },
      { label: "Golf Shirt", top: "29%", left: "80%" },
      { label: "Baseball Jersey", top: "35%", left: "49%" },
      { label: "Golf Cap", top: "42%", left: "70%" },
      { label: "Karate Gi", top: "46%", left: "10%" },
      { label: "Karate Belt", top: "67%", left: "13%" },
      { label: "Shin Guards", top: "71%", left: "73%" },
      { label: "Baseball Bat", top: "86%", left: "19%" },
    ],
    categoryBar: [
      { label: "All", images: [img("2270a2e8782e"), img("7a74f883ba54"), img("319085dbdc81")] },
      { label: "Men", images: [img("2270a2e8782e")] },
      { label: "Women", images: [img("7a74f883ba54")] },
      { label: "Kids", images: [img("319085dbdc81")] },
    ],
    filters: ["All", "Tops", "Bottoms", "Equipment", "Accessories"],
    categories: ["Select Category", "Equipment", "Apparel", "Accessories"],
    sports: ["Select Sport", "MMA", "Boxing", "Golf", "Baseball", "Martial Arts"],
    secondaryCta: true,
    product: { image: img("33935de05351"), name: "Head Guard for Training", label: "MMA", price: 69.99, compareAt: 89.99, colors: DOTS },
    count: 9,
  },
];

export const getCategory = (slug: string) => categoryPages.find((c) => c.slug === slug);

/** The listing grid repeats one product, exactly as the frames do. */
export const productsFor = (page: CategoryPage): Product[] =>
  Array.from({ length: page.count }, (_, i) => ({
    id: `${page.slug}-${i + 1}`,
    name: page.product.name,
    price: page.product.price,
    compareAtPrice: page.product.compareAt,
    image: page.product.image,
    category: "martial-arts" as const,
    categoryLabel: page.product.label,
    colors: page.product.colors,
  }));

export const allProducts: Product[] = categoryPages.flatMap(productsFor);
/** Figma "Product Page" shows one styled item; detail pages use its shot. */
export const PRODUCT_DETAIL_IMAGE = img("88cc857747c4");

export const getProduct = (id: string) => {
  const found = allProducts.find((p) => p.id === id) ?? allProducts[0];
  return { ...found, name: "Muay Thai Shorts", price: 59.99, compareAtPrice: 89.99, image: PRODUCT_DETAIL_IMAGE };
};
