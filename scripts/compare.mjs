// Side-by-side sheet: Figma render (left) vs local screenshot (right).
// Usage: node scripts/compare.mjs home [sliceIndex]
import sharp from "sharp";
const name = process.argv[2] ?? "home";
const slice = process.argv[3] ? Number(process.argv[3]) : null;
const fig = `.figma/renders/${name}.png`;
const shot = process.argv[4] ?? `.figma/shots/_-1440.png`;

const W = 560;
const a = sharp(fig), b = sharp(shot);
const [ma, mb] = [await a.metadata(), await b.metadata()];
// normalise both to the same width, then optionally take a vertical slice
const ha = Math.round((ma.height * W) / ma.width);
const hb = Math.round((mb.height * W) / mb.width);
let A = await sharp(fig).resize({ width: W }).toBuffer();
let B = await sharp(shot).resize({ width: W }).toBuffer();
let H = Math.max(ha, hb);
if (slice !== null) {
  const S = 1100, top = slice * S;
  A = await sharp(A).extract({ left: 0, top: Math.min(top, Math.max(0, ha - 1)), width: W, height: Math.min(S, Math.max(1, ha - top)) }).toBuffer();
  B = await sharp(B).extract({ left: 0, top: Math.min(top, Math.max(0, hb - 1)), width: W, height: Math.min(S, Math.max(1, hb - top)) }).toBuffer();
  H = S;
}
await sharp({ create: { width: W * 2 + 24, height: H, channels: 3, background: { r: 20, g: 20, b: 22 } } })
  .composite([{ input: A, left: 0, top: 0 }, { input: B, left: W + 24, top: 0 }])
  .jpeg({ quality: 84 })
  .toFile(`/tmp/cmp-${name}${slice ?? ""}.jpg`);
console.log(`/tmp/cmp-${name}${slice ?? ""}.jpg   (left = Figma, right = build)`);
