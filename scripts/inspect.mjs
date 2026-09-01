// Dump a node subtree with layout + text content. Usage: node scripts/inspect.mjs <nodeName|id> [maxDepth]
import { readFileSync } from "node:fs";
const doc = JSON.parse(readFileSync(".figma/document.json", "utf8"));
const target = process.argv[2], maxDepth = Number(process.argv[3] ?? 3);

let found = null;
const find = (n) => {
  if (n.id === target || n.name === target) { found ??= n; return; }
  for (const c of n.children ?? []) find(c);
};
find(doc.document);
if (!found) { console.error("not found:", target); process.exit(1); }

const hex = (c) => c ? "#" + [c.r,c.g,c.b].map(v=>Math.round(v*255).toString(16).padStart(2,"0")).join("") : "";
const show = (n, d = 0) => {
  if (d > maxDepth) return;
  const b = n.absoluteBoundingBox;
  const bits = [];
  if (b) bits.push(`${Math.round(b.width)}x${Math.round(b.height)}`);
  if (n.layoutMode && n.layoutMode !== "NONE") {
    bits.push(`${n.layoutMode==="HORIZONTAL"?"row":"col"}`);
    if (n.itemSpacing) bits.push(`gap:${n.itemSpacing}`);
    const p=[n.paddingTop,n.paddingRight,n.paddingBottom,n.paddingLeft].map(v=>v??0);
    if (p.some(v=>v)) bits.push(`pad:${p.join("/")}`);
    if (n.primaryAxisAlignItems) bits.push(n.primaryAxisAlignItems.toLowerCase());
    if (n.counterAxisAlignItems) bits.push(`x-${n.counterAxisAlignItems.toLowerCase()}`);
  }
  const solid = (n.fills??[]).find(f=>f.type==="SOLID"&&f.visible!==false);
  if (solid) bits.push(hex(solid.color) + (solid.opacity!==undefined&&solid.opacity<1?`@${solid.opacity.toFixed(2)}`:""));
  if ((n.fills??[]).some(f=>f.type==="IMAGE")) bits.push("IMG");
  if ((n.fills??[]).some(f=>f.type?.startsWith("GRADIENT"))) bits.push("GRAD");
  if (n.cornerRadius) bits.push(`r:${typeof n.cornerRadius==="number"?Math.round(n.cornerRadius*100)/100:n.cornerRadius}`);
  if (n.style) bits.push(`${n.style.fontFamily} ${n.style.fontWeight} ${Math.round(n.style.fontSize*100)/100}px`);
  const txt = n.characters ? `  "${n.characters.replace(/\n/g," ").slice(0,60)}"` : "";
  console.log(`${"  ".repeat(d)}${n.name} [${n.type}] ${bits.join(" ")}${txt}`);
  for (const c of n.children ?? []) show(c, d + 1);
};
show(found);
