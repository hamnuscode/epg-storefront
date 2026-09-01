import type { Metadata, Viewport } from "next";
import { Inter, Barlow_Condensed, Anton, Reenie_Beanie, Gothic_A1 } from "next/font/google";
import "./globals.css";

/* SF Pro / SF Compact substitute — carries nav, body, prices and headlines. */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

/* Product names and category chips. */
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

/* Stack Sans Notch substitute — the giant "EPG" / "on pitch" display type. */
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

/* The handwritten "Ready" accent in the customiser banner. */
const reenie = Reenie_Beanie({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-reenie",
  display: "swap",
});

/* Cal Sans substitute — footer ticker and eyebrow labels. */
const gothic = Gothic_A1({
  subsets: ["latin"],
  weight: ["600", "900"],
  variable: "--font-gothic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EPG — Eastern Pro Gear",
  description:
    "Eastern Pro Gear designs and manufactures premium sports equipment, apparel, and accessories trusted by brands, teams, retailers, and athletes worldwide.",
  openGraph: {
    title: "EPG — Eastern Pro Gear",
    description: "Engineered for champions. Manufactured for the world.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${barlow.variable} ${anton.variable} ${reenie.variable} ${gothic.variable}`}
    >
      <body className="min-h-screen bg-surface text-white antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-100 focus:rounded-sm focus:bg-white focus:px-4 focus:py-2 focus:text-surface"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
