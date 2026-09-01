/** Shared domain + UI types for the EPG storefront. */

export interface Product {
  id: string;
  name: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  category: SportCategory;
  rating?: number;
  badge?: string;
}

export type SportCategory =
  | "martial-arts" | "baseball" | "golf" | "boxing" | "mma";

export type AudienceCategory = "men" | "women" | "kids";

export interface CategoryTile {
  id: string;
  label: string;
  image: string;
  href: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  image: string;
  href?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
}

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}
