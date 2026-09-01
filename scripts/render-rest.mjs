// Patient renderer for the frames not yet captured. Long backoff, resumes.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
const KEY = "9KBREJwZuEXeUgwvyxXP33";
const token = readFileSync(".env.local", "utf8").match(/FIGMA_TOKEN\s*=\s*(.+)/)[1].trim();
const doc = JSON.parse(readFileSync(".figma/document.json", "utf8"));
const page = doc.document.children[0];
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
mkdirSync(".figma/renders", { recursive: true });

const todo = page.children
  .filter((n) => n.absoluteBoundingBox)
  .map((n) => ({ id: n.id, name: n.name, w: Math.round(n.absoluteBoundingBox.width) }))
  .filter((f) => !existsSync(`.figma/renders/${slug(f.name)}.png`));

console.log(`${todo.length} frames still to render`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const f of todo) {
  const scale = f.w >= 1000 ? 0.5 : 1;
  let url = null;
  for (let a = 0; a < 12 && !url; a++) {
    const res = await fetch(`https://api.figma.com/v1/images/${KEY}?ids=${f.id}&format=png&scale=${scale}`, {
      headers: { "X-Figma-Token": token },
    });
    const body = await res.json();
    if (!body.err && body.images?.[f.id]) { url = body.images[f.id]; break; }
    await sleep(45000);
  }
  if (!url) { console.log(`  gave up: ${f.name}`); continue; }
  const img = await fetch(url);
  writeFileSync(`.figma/renders/${slug(f.name)}.png`, Buffer.from(await img.arrayBuffer()));
  console.log(`  ok ${f.name}`);
  await sleep(8000);
}
console.log("done");
