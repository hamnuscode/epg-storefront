// For a node, dump each descendant image fill with its position, size and
// the nearest text — so assets can be mapped to sections by fact, not guess.
import { readFileSync } from "node:fs";
const doc = JSON.parse(readFileSync(".figma/document.json", "utf8"));
const man = JSON.parse(readFileSync("public/images/manifest.json", "utf8"));
const target = process.argv[2];

let root = null;
const find = (n) => { if ((n.id === target || n.name === target) && !root) root = n; for (const c of n.children ?? []) find(c); };
find(doc.document);
if (!root) { console.error("not found"); process.exit(1); }

const rb = root.absoluteBoundingBox;
const rows = [];
const walk = (n, trail) => {
  const b = n.absoluteBoundingBox;
  for (const f of n.fills ?? []) {
    if (f.type === "IMAGE" && f.imageRef && b) {
      rows.push({
        y: Math.round(b.y - (rb?.y ?? 0)),
        x: Math.round(b.x - (rb?.x ?? 0)),
        w: Math.round(b.width), h: Math.round(b.height),
        file: man[f.imageRef]?.file ?? "(not downloaded)",
        path: trail.slice(-2).join("/") + "/" + n.name,
      });
    }
  }
  for (const c of n.children ?? []) walk(c, [...trail, n.name]);
};
walk(root, []);
rows.sort((a, b) => a.y - b.y || a.x - b.x);
console.log(`${root.name} — ${rows.length} image placements (y ordered)\n`);
for (const r of rows) {
  console.log(`  y${String(r.y).padStart(5)} x${String(r.x).padStart(5)}  ${String(r.w).padStart(4)}x${String(r.h).padEnd(4)}  ${r.file.replace("/images/","").padEnd(22)} ${r.path}`);
}
