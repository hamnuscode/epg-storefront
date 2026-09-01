// Downloads image fills referenced by a given top-level frame.
// Usage: node scripts/figma-assets.mjs "Home"
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
const FILE_KEY = "9KBREJwZuEXeUgwvyxXP33";
const token = readFileSync(".env.local","utf8").match(/FIGMA_TOKEN\s*=\s*(.+)/)[1].trim();
const frameName = process.argv[2] ?? "Home";

const doc = JSON.parse(readFileSync(".figma/document.json","utf8"));
let frame=null; const find=n=>{ if(n.name===frameName&&!frame) frame=n; for(const c of n.children??[]) find(c); };
find(doc.document);
if(!frame){ console.error("frame not found"); process.exit(1); }

// Collect distinct imageRefs used inside this frame.
const refs = new Map();
const walk = n => {
  for (const f of n.fills ?? []) {
    if (f.type === "IMAGE" && f.imageRef) {
      const b = n.absoluteBoundingBox;
      const area = b ? b.width * b.height : 0;
      const prev = refs.get(f.imageRef);
      if (!prev || area > prev.area) refs.set(f.imageRef, { area, name: n.name });
    }
  }
  for (const c of n.children ?? []) walk(c);
};
walk(frame);
console.log(`${refs.size} distinct images referenced by "${frameName}"`);

const res = await fetch(`https://api.figma.com/v1/files/${FILE_KEY}/images`, {
  headers: { "X-Figma-Token": token },
});
const { meta } = await res.json();
const urls = meta?.images ?? {};

mkdirSync("public/images", { recursive: true });
let ok = 0, miss = 0;
const manifest = {};
for (const [ref, info] of refs) {
  const url = urls[ref];
  if (!url) { miss++; continue; }
  const slug = ref.slice(0, 12);
  const out = `public/images/${slug}.png`;
  if (!existsSync(out)) {
    const r = await fetch(url);
    if (!r.ok) { miss++; continue; }
    writeFileSync(out, Buffer.from(await r.arrayBuffer()));
  }
  manifest[ref] = { file: `/images/${slug}.png`, node: info.name, area: Math.round(info.area) };
  ok++;
  if (ok % 20 === 0) console.log(`  ${ok}/${refs.size}...`);
}
writeFileSync("public/images/manifest.json", JSON.stringify(manifest, null, 2));
console.log(`downloaded ${ok}, missing ${miss} -> public/images/`);
