// Renders Figma frames to PNG so the design can be inspected directly.
// Usage: node scripts/figma-render.mjs --all | node scripts/figma-render.mjs 1:3370
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
const KEY = "9KBREJwZuEXeUgwvyxXP33";
const token = readFileSync(".env.local", "utf8").match(/FIGMA_TOKEN\s*=\s*(.+)/)[1].trim();
const doc = JSON.parse(readFileSync(".figma/document.json", "utf8"));
const page = doc.document.children[0];

const frames = page.children
  .filter((n) => n.absoluteBoundingBox)
  .map((n) => ({ id: n.id, name: n.name, w: Math.round(n.absoluteBoundingBox.width) }));

const arg = process.argv[2];
const wanted = arg === "--all" || !arg ? frames : frames.filter((f) => f.id === arg || f.name === arg);
if (!wanted.length) { console.error("no matching frame"); process.exit(1); }

mkdirSync(".figma/renders", { recursive: true });
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// Mobile renders at 1x (390 wide); desktop at 0.5 to stay under size limits.
for (const group of [wanted.filter((f) => f.w >= 1000), wanted.filter((f) => f.w < 1000)]) {
  if (!group.length) continue;
  const scale = group[0].w >= 1000 ? 0.5 : 1;
  for (let i = 0; i < group.length; i += 5) {
    const batch = group.slice(i, i + 5);
    const ids = batch.map((f) => f.id).join(",");
    let images = null;
    for (let attempt = 0; attempt < 6; attempt++) {
      const res = await fetch(`https://api.figma.com/v1/images/${KEY}?ids=${ids}&format=png&scale=${scale}`, {
        headers: { "X-Figma-Token": token },
      });
      const body = await res.json();
      if (!body.err) { images = body.images; break; }
      const wait = 20000 * (attempt + 1);
      console.log(`  ${body.err} — retrying in ${wait / 1000}s`);
      await new Promise((r) => setTimeout(r, wait));
    }
    if (!images) { console.error("  gave up on batch"); continue; }
    for (const f of batch) {
      const out = `.figma/renders/${slug(f.name)}.png`;
      if (existsSync(out)) { console.log(`  skip  ${f.name}`); continue; }
      const url = images[f.id];
      if (!url) { console.log(`  NULL  ${f.name}`); continue; }
      const img = await fetch(url);
      writeFileSync(out, Buffer.from(await img.arrayBuffer()));
      console.log(`  ok    ${f.name} -> ${out}`);
    }
  }
}
console.log("renders in .figma/renders/");
