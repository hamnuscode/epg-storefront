// Full-page screenshot at a real viewport width, via CDP against the
// installed Chrome. Chrome's --window-size flag does not control the layout
// viewport in headless screenshot mode, so it cannot be used for this.
// Usage: node scripts/shoot.mjs /route 390 out.png
import puppeteer from "puppeteer-core";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const route = process.argv[2] ?? "/";
const width = Number(process.argv[3] ?? 1440);
const out = process.argv[4] ?? `.figma/shots/${(route.replace(/\W+/g, "_") || "home")}-${width}.png`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--disable-gpu", "--hide-scrollbars", "--no-sandbox"],
});
const page = await browser.newPage();
await page.setViewport({ width, height: 1200, deviceScaleFactor: 1 });
await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle2", timeout: 60000 });
// let fonts settle and lazy images below the fold decode
await page.evaluate(async () => {
  await document.fonts.ready;
  await new Promise((r) => {
    let y = 0;
    const step = () => {
      window.scrollTo(0, y);
      y += 600;
      if (y < document.body.scrollHeight) setTimeout(step, 40);
      else { window.scrollTo(0, 0); setTimeout(r, 400); }
    };
    step();
  });
});
const metrics = await page.evaluate(() => ({
  scrollWidth: document.documentElement.scrollWidth,
  clientWidth: document.documentElement.clientWidth,
  scrollHeight: document.body.scrollHeight,
}));
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(JSON.stringify({ out, ...metrics }));
