// Pulls the raw Figma document + style inventory for the EPG (Devs) file.
// Usage: FIGMA_TOKEN=... node scripts/figma-extract.mjs   (or put it in .env.local)
import { writeFileSync, readFileSync, existsSync } from "node:fs";

const FILE_KEY = "9KBREJwZuEXeUgwvyxXP33";

function loadToken() {
  if (process.env.FIGMA_TOKEN) return process.env.FIGMA_TOKEN.trim();
  if (existsSync(".env.local")) {
    const m = readFileSync(".env.local", "utf8").match(/^FIGMA_TOKEN\s*=\s*(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return null;
}

const token = loadToken();
if (!token) {
  console.error("No FIGMA_TOKEN found. Add it to .env.local as: FIGMA_TOKEN=figd_...");
  process.exit(1);
}

const api = async (path) => {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) {
    console.error(`GET ${path} -> ${res.status} ${res.statusText}`);
    console.error(await res.text().catch(() => ""));
    process.exit(1);
  }
  return res.json();
};

const rgba = (c) => {
  if (!c) return null;
  const to = (v) => Math.round(v * 255);
  const hex = "#" + [c.r, c.g, c.b].map((v) => to(v).toString(16).padStart(2, "0")).join("");
  return c.a !== undefined && c.a < 1 ? `${hex} @ ${c.a.toFixed(2)}` : hex;
};

console.log("Fetching document...");
const file = await api(`/files/${FILE_KEY}`);
writeFileSync(".figma/document.json", JSON.stringify(file, null, 2));

// Walk the tree collecting frames, colors and text specs.
const frames = [], colors = new Map(), texts = new Map(), radii = new Set();
const walk = (node, page, depth = 0) => {
  if (node.type === "FRAME" && depth <= 2 && node.absoluteBoundingBox) {
    const b = node.absoluteBoundingBox;
    frames.push({ page, name: node.name, id: node.id, w: Math.round(b.width), h: Math.round(b.height) });
  }
  for (const f of node.fills ?? []) {
    if (f.type === "SOLID" && f.visible !== false) {
      const k = rgba({ ...f.color, a: f.opacity ?? f.color.a });
      if (k) colors.set(k, (colors.get(k) ?? 0) + 1);
    }
  }
  if (node.cornerRadius) radii.add(node.cornerRadius);
  if (node.type === "TEXT" && node.style) {
    const s = node.style;
    const k = `${s.fontFamily} ${s.fontWeight} ${s.fontSize}px/${(s.lineHeightPx ?? 0).toFixed(1)} ls:${(s.letterSpacing ?? 0).toFixed(2)}`;
    texts.set(k, (texts.get(k) ?? 0) + 1);
  }
  for (const c of node.children ?? []) walk(c, page, depth + 1);
};
for (const page of file.document.children ?? []) walk(page, page.name, 0);

const sort = (m) => [...m.entries()].sort((a, b) => b[1] - a[1]);

console.log(`\n=== FILE: ${file.name} (last modified ${file.lastModified}) ===`);
console.log(`\n=== PAGES (${file.document.children.length}) ===`);
for (const p of file.document.children) console.log(`  ${p.name}  [${p.children?.length ?? 0} top-level nodes]`);
console.log(`\n=== TOP-LEVEL FRAMES (${frames.length}) ===`);
for (const f of frames) console.log(`  ${String(f.w).padStart(5)}x${String(f.h).padEnd(5)}  ${f.page} / ${f.name}   (${f.id})`);
console.log(`\n=== COLORS (${colors.size}, by usage) ===`);
for (const [c, n] of sort(colors)) console.log(`  ${String(n).padStart(4)}x  ${c}`);
console.log(`\n=== TEXT STYLES (${texts.size}, by usage) ===`);
for (const [t, n] of sort(texts)) console.log(`  ${String(n).padStart(4)}x  ${t}`);
console.log(`\n=== CORNER RADII ===\n  ${[...radii].sort((a, b) => a - b).join(", ") || "none"}`);

const named = Object.entries(file.styles ?? {});
console.log(`\n=== NAMED STYLES (${named.length}) ===`);
for (const [, s] of named) console.log(`  [${s.styleType}] ${s.name}${s.description ? " - " + s.description : ""}`);
console.log(`\nRaw document written to .figma/document.json`);
