/**
 * Regenerate marketing screenshots from the live NVDA deep dive page.
 * Usage (from repo root): npm install && npm run screenshots:nvda
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const ASSETS = join(ROOT, "assets");
const URL = "https://xvary.com/stock/nvda/deep-dive/";

async function main() {
  await mkdir(ASSETS, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: "light",
  });
  const page = await context.newPage();
  await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90_000 });
  await page.waitForTimeout(4_000);

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({
    path: join(ASSETS, "nvda-deep-dive-hero.png"),
    type: "png",
  });

  const thesis = page.locator("text=Thesis Pillar").first();
  if ((await thesis.count()) > 0) {
    await thesis.scrollIntoViewIfNeeded();
  } else {
    await page.evaluate(() => window.scrollBy(0, 1400));
  }
  await page.waitForTimeout(600);
  await page.screenshot({
    path: join(ASSETS, "nvda-deep-dive-thesis.png"),
    type: "png",
  });

  const scenarios = page.locator("text=Bear Case").first();
  if ((await scenarios.count()) > 0) {
    await scenarios.scrollIntoViewIfNeeded();
  } else {
    await page.evaluate(() => window.scrollBy(0, 1200));
  }
  await page.waitForTimeout(600);
  await page.screenshot({
    path: join(ASSETS, "nvda-deep-dive-scenarios.png"),
    type: "png",
  });

  await browser.close();
  console.log("Wrote:", [
    "assets/nvda-deep-dive-hero.png",
    "assets/nvda-deep-dive-thesis.png",
    "assets/nvda-deep-dive-scenarios.png",
  ].join("\n"));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
