// Downloads every image fill in the file (not just one frame's), records which
// frames each one appears in, and converts to WebP.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import sharp from "sharp";
const KEY = "9KBREJwZuEXeUgwvyxXP33";
const token = readFileSync(".env.local", "utf8").match(/FIGMA_TOKEN\s*=\s*(.+)/)[1].trim();
const doc = JSON.parse(readFileSync(".figma/document.json", "utf8"));
const page = doc.document.children[0];

// ref -> { frames:Set, node, area }
const refs = new Map();
for (const frame of page.children) {
  const walk = (n) => {
    const b = n.absoluteBoundingBox;
    for (const f of n.fills ?? []) {
      if (f.type === "IMAGE" && f.imageRef) {
        const area = b ? b.width * b.height : 0;
        const cur = refs.get(f.imageRef) ?? { frames: new Set(), node: n.name, area: 0 };
        cur.frames.add(frame.name);
        if (area > cur.area) { cur.area = area; cur.node = n.name; }
        refs.set(f.imageRef, cur);
      }
    }
    for (const c of n.children ?? []) walk(c);
  };
  walk(frame);
}
console.log(`${refs.size} distinct images across ${page.children.length} frames`);

const res = await fetch(`https://api.figma.com/v1/files/${KEY}/images`, { headers: { "X-Figma-Token": token } });
const { meta } = await res.json();
const urls = meta?.images ?? {};

mkdirSync("public/images", { recursive: true });
const manifest = existsSync("public/images/manifest.json")
  ? JSON.parse(readFileSync("public/images/manifest.json", "utf8")) : {};

let added = 0, kept = 0, failed = 0;
for (const [ref, info] of refs) {
  const slug = ref.slice(0, 12);
  const webp = `public/images/${slug}.webp`;
  const entry = { file: `/images/${slug}.webp`, node: info.node, area: Math.round(info.area), frames: [...info.frames] };
  if (existsSync(webp)) { manifest[ref] = entry; kept++; continue; }
  const url = urls[ref];
  if (!url) { failed++; continue; }
  const r = await fetch(url);
  if (!r.ok) { failed++; continue; }
  const buf = Buffer.from(await r.arrayBuffer());
  await sharp(buf).webp({ quality: 82 }).toFile(webp);
  manifest[ref] = entry;
  added++;
  if (added % 15 === 0) console.log(`  +${added}...`);
}
writeFileSync("public/images/manifest.json", JSON.stringify(manifest, null, 2));
console.log(`added ${added}, already had ${kept}, failed ${failed}`);
