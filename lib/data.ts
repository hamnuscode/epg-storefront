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
    { title: "For Champions", description: "Competition-grade equipment trusted on the world stage.", image: assets.sportTiles[1].image, href: "/collection" },
    { title: "For Athletes", description: "Built to take a beating, session after session.", image: assets.sportTiles[0].image, href: "/men" },
    { title: "For Leagues", description: "Team kit and bulk manufacturing, fully customisable.", image: assets.sportTiles[2].image, href: "/custom" },
  ],
} as const;

export const categoryFilters = ["Equipment", "Men", "Women", "Kids"] as const;
export const sportFilters = ["Golf", "Baseball", "Boxing", "MMA"] as const;
export const gearFilters = ["Best Seller", "New Arrivals"] as const;
export const forgexTabs = ["Golf", "Baseball", "Boxing", "MMA"] as const;

/** Find Your Gear — Figma shows 13 tiles across a staggered grid. */
export const gearProducts: Product[] = [
  { id: "pro-batting-gloves", name: "Pro Batting Gloves", price: 89.99, image: assets.products[0], category: "baseball" },
  { id: "series-2-gloves", name: "Series 2 Gloves", price: 69.99, image: assets.products[1], category: "baseball" },
  { id: "grip-golf-glove", name: "Grip Golf Glove", price: 49.99, image: assets.products[2], category: "golf" },
  { id: "tour-glove", name: "Tour Glove", price: 59.99, image: assets.products[3], category: "golf" },
  { id: "shin-guards", name: "Shin Guards", price: 89.99, image: assets.products[4], category: "martial-arts" },
  { id: "pro-shin-guard", name: "Pro Shin Guard", price: 79.99, image: assets.products[5], category: "martial-arts" },
  { id: "elite-shin-guard", name: "Elite Shin Guard", price: 94.99, image: assets.products[6], category: "mma" },
  { id: "guard-pro", name: "Guard Pro", price: 84.99, image: assets.products[7], category: "mma" },
  { id: "head-guard-blue", name: "Head Guard", price: 119.99, image: assets.products[8], category: "boxing" },
  { id: "head-guard-pro", name: "Head Guard Pro", price: 129.99, image: assets.products[9], category: "boxing" },
  { id: "head-guard-gold", name: "Head Guard Gold", price: 139.99, image: assets.products[10], category: "martial-arts" },
  { id: "head-guard-elite", name: "Head Guard Elite", price: 124.99, image: assets.products[11], category: "martial-arts" },
];

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
