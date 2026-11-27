import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.LOCAL_URL || "http://localhost:3098";

const b = await chromium.launch({ headless: true });
const c = await b.newContext({ viewport: { width: 1440, height: 900 } });
const p = await c.newPage();

for (const r of ["/", "/company"]) {
  await p.goto(BASE + r, { waitUntil: "networkidle" });
  const h = await p.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y <= h; y += 600) {
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await p.waitForTimeout(80);
  }
  await p.evaluate(() => window.scrollTo(0, 0));
  await p.waitForTimeout(300);

  const broken = await p.evaluate(() =>
    Array.from(document.querySelectorAll("img"))
      .filter((i) => !i.complete || i.naturalWidth === 0)
      .map((i) => i.getAttribute("src"))
  );
  const axe = await new AxeBuilder({ page: p }).analyze();
  const crit = axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious");
  console.log(
    r,
    "broken:",
    broken,
    "axe:",
    JSON.stringify(crit.map((v) => ({ id: v.id, impact: v.impact, help: v.help, targets: v.nodes.map((n) => n.target) })))
  );
}

await p.goto(BASE + "/contact", { waitUntil: "networkidle" });
await p.fill("#contact-first-name", "Brooklyn");
await p.fill("#contact-last-name", "Simmons");
await p.fill("#contact-email", "brooklyn@example.com");
await p.fill("#contact-subject", "Portfolio Review");
await p.fill("#contact-message", "Requesting an introductory consultation.");
await p.locator("form button[type='submit']").click();
await p.waitForTimeout(1500);
console.log("CONTACT STATUS/ALERT:", await p.locator("[role='status'], [role='alert']").allInnerTexts());
await b.close();
