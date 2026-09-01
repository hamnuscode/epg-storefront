/**
 * Home page content, transcribed from the Figma frame. This is the CMS seam.
 */
import { assets } from "./assets";
import type { Product } from "@/types";

export const hero = {
  wordmark: "EPG",
  titleLead: "Engineered For ",
  titleAccent: "Champions.",
  titleRest: " Manufactured For The World.",
  body:
    "Eastern Pro Gear designs and manufactures premium sports equipment, apparel, and accessories trusted by brands, teams, retailers, and athletes worldwide.",
  cards: [
    { title: "For Champions", description: "Designs and manufactures premium sports equipment, apparel, and accessories", image: "/images/498302a449ea.webp", href: "/collection" },
    { title: "For Athletes", description: "Designs and manufactures premium sports equipment, apparel, and accessories", image: "/images/2c431db972fe.webp", href: "/men" },
    { title: "For Leagues", description: "Designs and manufactures premium sports equipment, apparel, and accessories", image: "/images/dc5a37a2d841.webp", href: "/custom" },
  ],
} as const;

export const categoryFilters = ["Equipment", "Men", "Women", "Kids"] as const;
export const sportFilters = ["Golf", "Baseball", "Boxing", "MMA"] as const;
export const gearFilters = ["Best Seller", "New Arrivals"] as const;
export const forgexTabs = ["Golf", "Baseball", "Boxing", "MMA"] as const;

/** Find Your Gear — Figma shows 13 tiles across a staggered grid. */
export const gearProducts: Product[] = assets.products.map((image, i) => ({
  id: `shin-guards-${i + 1}`,
  name: "Shin Gaurds",
  price: 69.99,
  image,
  category: "martial-arts" as const,
}));

export const featuredProducts = gearProducts;

export const onOffPitch = {
  off: "OFF",
  on: "ON",
  word: "PITCH",
  bodyLeft: "Your fight club, tempo, hard-hitting. EPG's core mission engineered for everyday movement.",
  bodyRight: "Built for the pitch. Engineered for players who play for the world.",
  ctaLeft: "SHOP OFF-PITCH GEAR",
  ctaRight: "SHOP ON-PITCH GEAR",
} as const;

export const forgex = {
  heading: "The Forgex Custom Experience",
  display: "EASTERN",
  title: "50+ Customizable Products. Try now!",
  cta: "EXPLORE MORE",
  note: "Click here to view more customizable features.",
  options: ["Hand Front", "Pipping", "Middle Flex", "Logo Upload"],
} as const;

export const testimonial = {
  quote:
    "The design process was seamless and the quality blew our players away. They are officially our go-to for custom apparel and gear.",
  author: "— David C., Club Director, Elite United FC",
  rating: 5,
} as const;

export const collectionBanner = {
  lockup: "EPG",
  line: "BUILT FOR ATHLETES BY ATHLETES",
  cta: "VIEW COLLECTION",
} as const;

export const assurances = [
  { title: "Delivering Worldwide", body: "Delivering over 400+ Countries around the world.", icon: "truck" },
  { title: "Secure Payment", body: "All payments are made through a secure server.", icon: "card" },
  { title: "Customer Service", body: "A question? A problem? We are here for you and offer several ways to contact us.", icon: "support" },
] as const;

export const footer = {
  brand: "Eastern Pro Gear",
  tagline: "Gear That Performs",
  columns: [
    { heading: "Categories", links: [ { label: "Men", href: "/men" }, { label: "Women", href: "/women" }, { label: "Kids", href: "/kids" } ] },
    { heading: "Sports", links: [ { label: "Golf", href: "/golf" }, { label: "MMA", href: "/martial-arts" }, { label: "Boxing", href: "/martial-arts" }, { label: "Baseball", href: "/baseball" }, { label: "Martial Arts", href: "/martial-arts" } ] },
  ],
  contact: {
    heading: "Contact us",
    hours: "6am to 7pm PST Monday - Friday\n6am to 3pm PST Saturday - Sunday",
    phone: "+1 (888) 200-5032",
    email: "hello@easternprogear.com",
  },
  copyright: "Copyright © 2026 - easternprogear.com",
} as const;

export const TICKER_ITEMS = [
  "BUILT FOR ATHLETES BY ATHLETES",
  "PERSONALISE YOUR POWER",
  "OWN THE FIELD",
] as const;
