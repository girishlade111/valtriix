import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import sharp from "sharp";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const BASE_URL = process.env.LOCAL_URL || "http://localhost:3000";
const COMP_DIR = path.join(process.cwd(), "research", "comparisons");
const REF_DIR = path.join(process.cwd(), "research", "reference", "screenshots", "desktop");

const ROUTES = [
  { route: "/", ref: "home.png", slug: "home" },
  { route: "/company", ref: "company.png", slug: "company" },
  { route: "/services", ref: "services_listing.png", slug: "services" },
  { route: "/services/portfolio-management", ref: "services_detail_portfolio.png", slug: "service-detail" },
  { route: "/case-study", ref: "case_study_listing.png", slug: "case-study-listing" },
  { route: "/case-study/building-a-clear-strategy-for-lasting-wealth", ref: "case_study_detail.png", slug: "case-study-detail" },
  { route: "/blog", ref: "blog_listing.png", slug: "blog-listing" },
  { route: "/blog/understanding-market-trends-before-you-invest", ref: "blog_detail_featured.png", slug: "blog-detail" },
  { route: "/contact", ref: "contact.png", slug: "contact" },
  { route: "/our-advisors", ref: "our_advisors.png", slug: "our-advisors" },
  { route: "/privacy-policy", ref: "privacy_policy.png", slug: "privacy-policy" },
  { route: "/terms-condition", ref: "terms_condition.png", slug: "terms-condition" },
  { route: "/changelog", ref: "changelog.png", slug: "changelog" },
  { route: "/licenses", ref: "licenses.png", slug: "licenses" },
  { route: "/instructions", ref: "instructions.png", slug: "instructions" },
  { route: "/style-guide", ref: "style_guide.png", slug: "style-guide" },
  { route: "/404", ref: "not_found.png", slug: "not-found" },
];

async function compareAboveFold(refPath, implPath, diffPath) {
  if (!fs.existsSync(refPath) || !fs.existsSync(implPath)) return null;
  const w = 1440;
  const h = 900;
  const refBuf = await sharp(refPath)
    .extract({ left: 0, top: 0, width: w, height: h })
    .ensureAlpha()
    .raw()
    .toBuffer();
  const implBuf = await sharp(implPath)
    .extract({ left: 0, top: 0, width: w, height: h })
    .ensureAlpha()
    .raw()
    .toBuffer();

  const diff = new PNG({ width: w, height: h });
  const diffPixels = pixelmatch(refBuf, implBuf, diff.data, w, h, { threshold: 0.15 });
  fs.writeFileSync(diffPath, PNG.sync.write(diff));
  const total = w * h;
  return {
    width: w,
    height: h,
    diffPixels,
    diffPercent: Number(((diffPixels / total) * 100).toFixed(2)),
  };
}

async function run() {
  fs.mkdirSync(COMP_DIR, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const results = [];

  // 1. Desktop 1440x900 checks across all 17 primary/template routes
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  for (const item of ROUTES) {
    const consoleErrors = [];
    const pageErrors = [];
    const failedAssets = [];
    page.removeAllListeners("console");
    page.removeAllListeners("pageerror");
    page.removeAllListeners("response");
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrors.push(m.text());
    });
    page.on("pageerror", (err) => pageErrors.push(String(err)));
    page.on("response", (res) => {
      if (res.status() >= 400 && !item.route.includes("404")) {
        failedAssets.push({ url: res.url(), status: res.status() });
      }
    });

    const resp = await page.goto(BASE_URL + item.route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const totalH = await page.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y <= totalH; y += 500) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(120);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.evaluate(async () => {
      const imgs = Array.from(document.querySelectorAll("img"));
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((res) => {
            img.addEventListener("load", res, { once: true });
            img.addEventListener("error", res, { once: true });
            setTimeout(res, 2000);
          });
        })
      );
    });

    const metrics = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll("img"));
      const brokenImgs = imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.src);
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      const h1 = document.querySelector("h1");
      const h1Style = h1 ? getComputedStyle(h1) : null;
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        overflow,
        imgCount: imgs.length,
        brokenImgs,
        h1Font: h1Style?.fontFamily,
        h1Size: h1Style?.fontSize,
      };
    });

    const axe = await new AxeBuilder({ page }).analyze();
    const criticalAxe = axe.violations.filter((v) => v.impact === "critical" || v.impact === "serious");

    const routeCompDir = path.join(COMP_DIR, item.slug);
    fs.mkdirSync(routeCompDir, { recursive: true });
    const implPath = path.join(routeCompDir, "implementation.png");
    await page.screenshot({ path: implPath, fullPage: true });

    const refPath = path.join(REF_DIR, item.ref);
    if (fs.existsSync(refPath)) {
      fs.copyFileSync(refPath, path.join(routeCompDir, "reference.png"));
    }
    const aboveFoldDiff = await compareAboveFold(
      refPath,
      implPath,
      path.join(routeCompDir, "diff_above_fold.png")
    );

    results.push({
      route: item.route,
      status: resp?.status(),
      overflow: metrics.overflow,
      brokenImgs: metrics.brokenImgs,
      consoleErrors,
      pageErrors,
      failedAssets,
      axeCriticalCount: criticalAxe.length,
      axeCritical: criticalAxe.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
      h1Font: metrics.h1Font,
      h1Size: metrics.h1Size,
      aboveFoldDiff,
    });
    console.log(
      `[${item.route}] status=${resp?.status()} overflow=${metrics.overflow} brokenImgs=${metrics.brokenImgs.length} axeCritical=${criticalAxe.length} aboveFoldDiff=${aboveFoldDiff?.diffPercent ?? "n/a"}%`
    );
  }

  // 2. Interactive checks on / and /contact
  await page.goto(BASE_URL + "/", { waitUntil: "networkidle" });
  // All Pages dropdown
  await page.locator("button:has-text('All Pages')").click();
  const megaMenuVisible = await page.locator("#all-pages-mega-menu").isVisible();
  await page.keyboard.press("Escape");
  const megaMenuClosed = !(await page.locator("#all-pages-mega-menu").isVisible());

  // Approach selector
  await page.locator("#approach-tab-app-2").click();
  const app2Selected = await page.locator("#approach-tab-app-2").getAttribute("aria-selected");

  // Audience tabs
  await page.locator("#audience-tab-aud-2").click();
  const aud2Visible = await page.locator("#audience-panel-aud-2").isVisible();

  // Testimonial slider
  const quoteBefore = await page.locator("blockquote").first().innerText();
  await page.locator("button[aria-label='Next testimonial']").click();
  const quoteAfter = await page.locator("blockquote").first().innerText();

  // Contact form demonstration submit
  await page.goto(BASE_URL + "/contact", { waitUntil: "networkidle" });
  await page.fill("#contact-first-name", "Brooklyn");
  await page.fill("#contact-last-name", "Simmons");
  await page.fill("#contact-email", "brooklyn@example.com");
  await page.fill("#contact-subject", "Portfolio Review");
  await page.fill("#contact-message", "Requesting an introductory consultation.");
  await page.locator("form button[type='submit']").click();
  await page.locator("[data-testid='contact-form-status']").waitFor({ state: "visible", timeout: 5000 });
  const contactStatus = await page.locator("[data-testid='contact-form-status']").innerText();

  // 3. Verify all remaining CMS detail routes return HTTP 200 with zero errors
  const cmsExtra = [
    "/services/asset-management",
    "/services/wealth-management",
    "/services/financial-consulting",
    "/services/investment-planning",
    "/services/risk-management",
    "/services/financial-advisory",
    "/services/wealth-preservation",
    "/services/family-wealth-management",
    "/case-study/helping-clients-grow-their-wealth",
    "/case-study/helping-businesses-improve-financial-performance",
    "/case-study/creating-smarter-investment-plans-for-families",
    "/blog/making-better-financial-decisions-with-confidence",
    "/blog/what-every-investor-should-know-about-market-trends",
    "/blog/common-investment-mistakes-and-how-to-avoid-them",
    "/blog/5-investment-strategies-for-a-stronger-financial-future",
    "/blog/why-diversification-matters-in-your-investment-portfolio",
    "/blog/making-smarter-financial-decisions-at-every-stage",
    "/blog/how-business-owners-can-grow-their-wealth",
    "/blog/navigating-market-uncertainty-with-a-clear-strategy",
    "/blog/the-power-of-starting-your-investment-journey-early",
  ];
  const cmsResults = [];
  for (const r of cmsExtra) {
    const resp = await page.goto(BASE_URL + r, { waitUntil: "domcontentloaded" });
    cmsResults.push({ route: r, status: resp?.status() });
  }

  // 4. Mobile 390x844 overflow check
  const mCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const mPage = await mCtx.newPage();
  const mobileOverflows = [];
  for (const r of ["/", "/company", "/services", "/blog", "/contact"]) {
    await mPage.goto(BASE_URL + r, { waitUntil: "networkidle" });
    const ov = await mPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    mobileOverflows.push({ route: r, overflow: ov });
  }
  await mCtx.close();
  await ctx.close();
  await browser.close();

  const report = {
    routes: results,
    cmsExtraRoutes: cmsResults,
    interactions: {
      megaMenuVisible,
      megaMenuClosed,
      app2Selected,
      aud2Visible,
      testimonialChanged: quoteBefore !== quoteAfter,
      contactStatus,
    },
    mobileOverflows,
  };

  fs.mkdirSync(path.join(process.cwd(), "research", "reports"), { recursive: true });
  fs.writeFileSync(
    path.join(process.cwd(), "research", "reports", "verification-report.json"),
    JSON.stringify(report, null, 2)
  );
  console.log("Interactions:", JSON.stringify(report.interactions));
  console.log("Mobile overflows:", JSON.stringify(mobileOverflows));
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
