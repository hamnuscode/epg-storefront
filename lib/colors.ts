/**
 * Colour tokens extracted from Figma "EPG (Devs)".
 * The source file used 73 distinct fills, many of them indistinguishable
 * greys produced by duplicated layers. They are collapsed here into a
 * four-step surface scale plus brand, accent and semantic ramps.
 * Keep this in sync with the `@theme` block in app/globals.css.
 */
export const colors = {
  surface: {
    DEFAULT: "#0c0c0c",
    raised: "#141414",
    overlay: "#232323",
    muted: "#323232",
    light: "#ffffff",
    lightAlt: "#ebebeb",
  },
  /** Hero, navbar and footer ground. Sampled from the Figma render. */
  navy: {
    900: "#102038",
    800: "#1b2a40",
    700: "#253651",
    600: "#33405a",
    card: "#304858",
  },
  brand: {
    400: "#579ada",
    500: "#468dd2",
    600: "#2e79be",
  },
  /** Gold. "Champions.", card arrows, active carousel dash, jersey trim. */
  accent: "#ffd850",
  accentDim: "#b89a2e",
  line: { DEFAULT: "#292929", strong: "#3e3e3e", light: "#d1d1d1" },
  semantic: {
    danger: "#de2e41",
    dangerDark: "#bb2333",
    success: "#2cff4c",
    warning: "#ffc100",
  },
} as const;

/** The "Rami blue grad" named fill style, as a CSS gradient. */
export const brandGradient =
  "linear-gradient(135deg, #579ada 0%, #468dd2 52%, #2e79be 100%)";

/** "Rami grad invert" — used on the footer plates and ticker. */
export const brandGradientInvert =
  "linear-gradient(135deg, #2e79be 0%, #468dd2 48%, #579ada 100%)";

/** Text-on-dark opacity steps the design uses repeatedly. */
export const textAlpha = {
  primary: "rgba(255,255,255,1)",
  secondary: "rgba(255,255,255,0.76)",
  tertiary: "rgba(255,255,255,0.60)",
  muted: "rgba(255,255,255,0.50)",
  faint: "rgba(255,255,255,0.40)",
} as const;
