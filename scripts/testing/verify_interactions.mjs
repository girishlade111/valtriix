import { chromium } from "playwright";

const BASE = process.env.LOCAL_URL || "http://localhost:3097";
const b = await chromium.launch({ headless: true });
const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();

await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.locator("button:has-text('All Pages')").click();
await page.waitForTimeout(150);
const megaOpenOnClick = await page.locator("#all-pages-mega-menu").isVisible();
await page.keyboard.press("Escape");
await page.waitForTimeout(100);
const megaClosedOnEscape = !(await page.locator("#all-pages-mega-menu").isVisible());

await page.locator("button:has-text('All Pages')").hover();
await page.waitForTimeout(150);
const megaOpenOnHover = await page.locator("#all-pages-mega-menu").isVisible();

await page.mouse.click(20, 400);
await page.waitForTimeout(100);
const megaClosedOnOutsideClick = !(await page.locator("#all-pages-mega-menu").isVisible());

// Video Play/Pause button
const playBtn = page.locator("button:has-text('Play Video')");
await playBtn.scrollIntoViewIfNeeded();
await playBtn.click();
await page.waitForTimeout(250);
const pauseBtnVisible = await page.locator("button:has-text('Pause Video')").isVisible();

// FAQ on /contact
await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
const faq1Expanded = await page.locator("#faq-btn-faq-1").getAttribute("aria-expanded");
await page.locator("#faq-btn-faq-2").click();
const faq2Expanded = await page.locator("#faq-btn-faq-2").getAttribute("aria-expanded");

// Mobile menu at 390x844
const mCtx = await b.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
const mPage = await mCtx.newPage();
await mPage.goto(BASE + "/", { waitUntil: "networkidle" });
await mPage.locator("button[aria-label='Open navigation menu']").click();
const mobMenuVisible = await mPage.locator("#mobile-navigation-menu").isVisible();
await mCtx.close();

await b.close();

console.log(
  JSON.stringify(
    {
      megaOpenOnClick,
      megaClosedOnEscape,
      megaOpenOnHover,
      megaClosedOnOutsideClick,
      pauseBtnVisible,
      faq1Expanded,
      faq2Expanded,
      mobMenuVisible,
    },
    null,
    2
  )
);
