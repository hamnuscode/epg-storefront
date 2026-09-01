// Full-page screenshot of a local route via headless Chrome.
// Usage: node scripts/shoot.mjs /path 1440 out.png
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const route = process.argv[2] ?? "/";
const width = Number(process.argv[3] ?? 1440);
const height = Number(process.argv[5] ?? 12000);
const out = process.argv[4] ?? `.figma/shots/${route.replace(/\W+/g, "_") || "home"}-${width}.png`;
mkdirSync(".figma/shots", { recursive: true });
execFileSync(CHROME, [
  "--headless", "--disable-gpu", "--hide-scrollbars",
  `--window-size=${width},${height}`,
  "--screenshot=" + out,
  "--virtual-time-budget=12000",
  `--force-device-scale-factor=1`,
  `http://localhost:3000${route}`,
], { stdio: "inherit" });
console.log(out);
