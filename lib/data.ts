/**
 * Home page content, transcribed from the Figma frame so copy matches the
 * design exactly. In production this is the seam a CMS or commerce API
 * would replace — every consumer reads through these typed exports.
 */
import { assets } from "./assets";
import type { CategoryTile, Product, Testimonial } from "@/types";

export const hero = {
  wordmark: "EPG",
  title: "Engineered For Champions. Manufactured For The World.",
  body:
    "Eastern Pro Gear designs and manufactures premium sports equipment, apparel, and accessories trusted by brands, teams, retailers, and athletes worldwide.",
  cards: [
    {
      title: "For Champions",
      description: "Competition-grade equipment trusted on the world stage.",
      image: assets.heroCards[0],
      href: "/collection",
    },
    {
      title: "For Athletes",
      description: "Built to take a beating, session after session.",
      image: assets.heroCards[1],
      href: "/men",
    },
    {
      title: "For Leagues",
      description: "Team kit and bulk manufacturing, fully customisable.",
      image: assets.heroCards[2],
      href: "/custom",
    },
  ],
} as const;

export const categoryFilters = ["Equipment", "Men", "Women", "Kids"] as const;
export const sportFilters = ["Golf", "Baseball", "Boxing", "MMA"] as const;

export const categoryTiles: CategoryTile[] = [
  { id: "gloves", label: "Golf Gloves", image: assets.categoryTiles[0], href: "/golf" },
  { id: "mouth-guard", label: "Mouth Guard", image: assets.categoryTiles[1], href: "/martial-arts" },
  { id: "polo", label: "Golf Polo Shirt", image: assets.categoryTiles[2], href: "/golf" },
  { id: "boxing-gloves", label: "Red Boxing Gloves", image: assets.categoryTiles[3], href: "/martial-arts" },
  { id: "head-guard", label: "Head Guard", image: assets.categoryTiles[4], href: "/martial-arts" },
];

export const sportTiles: CategoryTile[] = [
  { id: "boxing", label: "Boxing", image: assets.sportTiles[0], href: "/martial-arts" },
  { id: "martial-arts", label: "Martial Arts", image: assets.sportTiles[1], href: "/martial-arts" },
  { id: "mma", label: "MMA", image: assets.sportTiles[2], href: "/martial-arts" },
  { id: "baseball", label: "Baseball", image: assets.sportTiles[3], href: "/baseball" },
];

export const featuredProducts: Product[] = [
  { id: "shin-guards", name: "Shin Guards", price: 69.99, image: assets.products[0], category: "martial-arts", badge: "Best Seller" },
  { id: "boxing-gloves-red", name: "Red Boxing Gloves", price: 89.99, image: assets.products[1], category: "boxing" },
  { id: "golf-polo", name: "Golf Polo Shirt", price: 69.99, image: assets.products[2], category: "golf", badge: "New Arrivals" },
  { id: "head-guard", name: "Head Guard", price: 89.99, image: assets.products[3], category: "martial-arts" },
  { id: "mouth-guard", name: "Mouth Guard", price: 69.99, image: assets.products[4], category: "mma" },
  { id: "golf-gloves", name: "Golf Gloves", price: 89.99, image: assets.products[5], category: "golf" },
  { id: "baseball-mitt", name: "Baseball Mitt", price: 89.99, image: assets.products[6], category: "baseball" },
  { id: "training-pads", name: "Training Pads", price: 69.99, image: assets.products[7], category: "boxing" },
];

export const onOffPitch = {
  on: "on pitch",
  off: "OFF pitch",
  eyebrow: "[ REAL WORLD ACTION ]",
  body:
    "Tested by athletes, proven by pros. Build for the pitch. Engineered for players who play for the world.",
} as const;

export const customiser = {
  eyebrow: "[ view 3D CONFIGURATOR ]",
  script: "Ready",
  titleLeft: "your gear",
  titleRight: "Your Design",
  heading: "Personalize Your Team Gear",
  body:
    "From digital mesh to master design. 360° customization engineered for high-performance sports apparel.",
  note: "Click here to view more customizable features.",
  cta: "DISCOVER",
  views: ["Front", "BAck"],
} as const;

export const testimonial: Testimonial = {
  id: "david-c",
  quote: "Gear That Performs",
  author: "- David C., Club Director, Elite United FC",
  avatar: assets.avatars[0],
};

export const assurances = [
  { title: "Worldwide delivery", body: "Delivering over 400+ Countries around the world." },
  { title: "Secure payments", body: "All payments are made through a secure server." },
  { title: "Here to help", body: "A question? A problem? We are here for you and offer several ways to contact us." },
] as const;
