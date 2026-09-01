// Side-by-side: Figma render (left) vs local screenshot (right), sliced.
// Usage: node scripts/diff.mjs about-us /tmp/ab.png [sliceIndex]
import sharp from "sharp";
const name = process.argv[2];
const shot = process.argv[3];
const slice = process.argv[4] ? Number(process.argv[4]) : null;
const W = 470, S = 1100;

const norm = async (f) => {
  const b = await sharp(f).resize({ width: W }).toBuffer();
  return { b, h: (await sharp(b).metadata()).height };
};
const A = await norm(`.figma/renders/${name}.png`);
const B = await norm(shot);

const cut = async ({ b, h }) => {
  if (slice === null) return { input: b, h };
  const top = Math.min(slice * S, Math.max(0, h - 1));
  const height = Math.min(S, Math.max(1, h - top));
  return { input: await sharp(b).extract({ left: 0, top, width: W, height }).toBuffer(), h: height };
};
const a = await cut(A), b2 = await cut(B);
const H = Math.max(a.h, b2.h);
await sharp({ create: { width: W * 2 + 18, height: H, channels: 3, background: { r: 55, g: 55, b: 60 } } })
  .composite([{ input: a.input, left: 0, top: 0 }, { input: b2.input, left: W + 18, top: 0 }])
  .jpeg({ quality: 86 })
  .toFile(`/tmp/d-${name}${slice ?? ""}.jpg`);
console.log(`/tmp/d-${name}${slice ?? ""}.jpg   figma ${A.h}px | build ${B.h}px`);
