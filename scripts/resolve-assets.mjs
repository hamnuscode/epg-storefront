// Resolves, for each node that paints an image, the fill Figma actually
// renders — the last fill with visible !== false. Earlier passes took the
// largest or first ref and so sometimes picked a hidden variant.
import { readFileSync, writeFileSync } from "node:fs";
const doc = JSON.parse(readFileSync(".figma/document.json", "utf8"));
const man = JSON.parse(readFileSync("public/images/manifest.json", "utf8"));
const page = doc.document.children[0];

const visibleRef = (n) => {
  const imgs = (n.fills ?? []).filter((f) => f.type === "IMAGE" && f.imageRef);
  const shown = imgs.filter((f) => f.visible !== false);
  return (shown.length ? shown[shown.length - 1] : imgs[imgs.length - 1])?.imageRef ?? null;
};

const out = {};
for (const frame of page.children) {
  const rows = [];
  const walk = (n) => {
    if ((n.fills ?? []).some((f) => f.type === "IMAGE")) {
      const ref = visibleRef(n);
      const b = n.absoluteBoundingBox;
      if (ref) rows.push({ node: n.name, ref, file: man[ref]?.file ?? null,
        w: b ? Math.round(b.width) : 0, h: b ? Math.round(b.height) : 0,
        hidden: (n.fills ?? []).filter((f) => f.type === "IMAGE").length - 1 });
    }
    for (const c of n.children ?? []) walk(c);
  };
  walk(frame);
  out[frame.name] = rows;
}
writeFileSync(".figma/visible-assets.json", JSON.stringify(out, null, 2));

const q = process.argv[2];
if (q) {
  for (const r of out[q] ?? []) {
    console.log(`  ${String(r.w).padStart(5)}x${String(r.h).padEnd(5)} ${(r.file ?? "?").replace("/images/", "").padEnd(20)} ${r.node}${r.hidden ? `  (+${r.hidden} hidden)` : ""}`);
  }
} else {
  console.log(`resolved ${Object.keys(out).length} frames -> .figma/visible-assets.json`);
}
