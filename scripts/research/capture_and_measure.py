import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright

BASE_URL = "https://valtriix.webflow.io"
SS_DIR = Path("research/reference/screenshots")
MANIFEST_DIR = Path("research/manifests")

KEY_ROUTES = [
    ("/", "home"),
    ("/company", "company"),
    ("/services", "services_listing"),
    ("/services/portfolio-management", "services_detail_portfolio"),
    ("/case-study", "case_study_listing"),
    ("/case-study/building-a-clear-strategy-for-lasting-wealth", "case_study_detail"),
    ("/blog", "blog_listing"),
    ("/blog/understanding-market-trends-before-you-invest", "blog_detail_featured"),
    ("/contact", "contact"),
    ("/our-advisors", "our_advisors"),
    ("/privacy-policy", "privacy_policy"),
    ("/terms-condition", "terms_condition"),
    ("/changelog", "changelog"),
    ("/licenses", "licenses"),
    ("/instructions", "instructions"),
    ("/style-guide", "style_guide"),
    ("/404", "not_found"),
]


async def capture_route(page, path: str, name: str, folder: str, full_page: bool = True):
    out_dir = SS_DIR / folder
    out_dir.mkdir(parents=True, exist_ok=True)
    await page.goto(BASE_URL + path, wait_until="domcontentloaded", timeout=30000)
    try:
        await page.wait_for_load_state("networkidle", timeout=8000)
    except Exception:
        pass
    await page.evaluate("() => document.fonts.ready")
    await asyncio.sleep(0.8)
    await page.screenshot(path=str(out_dir / f"{name}.png"), full_page=full_page)


async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)

        # 1. Desktop 1440x900
        ctx = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page = await ctx.new_page()

        for path, name in KEY_ROUTES:
            print(f"[desktop 1440] {path}", flush=True)
            await capture_route(page, path, name, "desktop", full_page=True)

        # Interactive & geometry inspection on /
        await page.goto(BASE_URL + "/", wait_until="domcontentloaded", timeout=30000)
        await page.evaluate("() => document.fonts.ready")
        await asyncio.sleep(1.2)

        # Inspect hero state over 4 seconds
        hero_states = []
        for t in [0, 1, 2, 3]:
            st = await page.evaluate("""() => {
                const h1s = Array.from(document.querySelectorAll('h1, .hero-heading, [class*="hero"] h1, [class*="hero"] [class*="heading"]'));
                return h1s.map(el => ({
                    tag: el.tagName,
                    cls: el.className,
                    text: (el.innerText || '').trim(),
                    opacity: getComputedStyle(el).opacity,
                    transform: getComputedStyle(el).transform,
                    display: getComputedStyle(el).display,
                    rect: el.getBoundingClientRect().toJSON(),
                }));
            }""")
            hero_states.append({"sec": t, "elements": st})
            await asyncio.sleep(1.0)

        # Open All Pages dropdown
        dd_dir = SS_DIR / "dropdowns"
        dd_dir.mkdir(parents=True, exist_ok=True)
        toggle = page.locator(".w-dropdown-toggle").first
        if await toggle.count() > 0:
            await toggle.hover()
            await asyncio.sleep(0.4)
            await toggle.click()
            await asyncio.sleep(0.5)
            await page.screenshot(path=str(dd_dir / "all_pages_open_home.png"), full_page=False)

        # Extract geometry of all sections on home
        home_geom = await page.evaluate("""() => {
            const sections = Array.from(document.querySelectorAll('section, header, nav, footer, .section, [class*="section"]'));
            const seen = new Set();
            const out = [];
            for (const el of sections) {
                if (seen.has(el)) continue;
                seen.add(el);
                const r = el.getBoundingClientRect();
                if (r.height < 20) continue;
                const cs = getComputedStyle(el);
                out.push({
                    tag: el.tagName,
                    cls: el.className,
                    id: el.id || null,
                    rect: { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), width: Math.round(r.width), height: Math.round(r.height) },
                    bg: cs.backgroundColor,
                    bgImage: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 160) : null,
                    paddingTop: cs.paddingTop,
                    paddingBottom: cs.paddingBottom,
                    textSample: (el.innerText || '').replace(/\\s+/g, ' ').trim().slice(0, 120),
                });
            }
            return out;
        }""")

        # Case study hover capture
        hover_dir = SS_DIR / "hover"
        hover_dir.mkdir(parents=True, exist_ok=True)
        cs_card = page.locator(".case-study-item").first
        if await cs_card.count() > 0:
            await cs_card.scroll_into_view_if_needed()
            await asyncio.sleep(0.4)
            await cs_card.hover()
            await asyncio.sleep(0.6)
            await cs_card.screenshot(path=str(hover_dir / "case_study_card_hover.png"))

        # Audience tabs capture
        tabs_dir = SS_DIR / "tabs"
        tabs_dir.mkdir(parents=True, exist_ok=True)
        tabs = page.locator(".w-tab-link")
        tab_count = await tabs.count()
        for ti in range(min(tab_count, 5)):
            tb = tabs.nth(ti)
            await tb.scroll_into_view_if_needed()
            await tb.click()
            await asyncio.sleep(0.4)
            await page.screenshot(path=str(tabs_dir / f"audience_tab_{ti+1}.png"), full_page=False)

        # Inline script / GSAP inspection
        gsap_scripts = await page.evaluate("""() => {
            return Array.from(document.querySelectorAll('script:not([src])')).map(s => s.textContent || '').filter(Boolean);
        }""")

        await ctx.close()

        # 2. Tablet 768x1024 (home, company, services, contact)
        ctx_t = await browser.new_context(viewport={"width": 768, "height": 1024}, device_scale_factor=1)
        page_t = await ctx_t.new_page()
        for path, name in [("/", "home"), ("/company", "company"), ("/services", "services_listing"), ("/contact", "contact")]:
            print(f"[tablet 768] {path}", flush=True)
            await capture_route(page_t, path, name, "tablet", full_page=True)
        await ctx_t.close()

        # 3. Mobile 390x844 + mobile nav open
        ctx_m = await browser.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=1, has_touch=True, is_mobile=True)
        page_m = await ctx_m.new_page()
        for path, name in [("/", "home"), ("/company", "company"), ("/services", "services_listing"), ("/blog", "blog_listing"), ("/contact", "contact")]:
            print(f"[mobile 390] {path}", flush=True)
            await capture_route(page_m, path, name, "mobile", full_page=True)
        await page_m.goto(BASE_URL + "/", wait_until="domcontentloaded", timeout=30000)
        await asyncio.sleep(0.6)
        mob_btn = page_m.locator(".w-nav-button").first
        if await mob_btn.count() > 0:
            await mob_btn.click()
            await asyncio.sleep(0.5)
            nav_dir = SS_DIR / "navigation"
            nav_dir.mkdir(parents=True, exist_ok=True)
            await page_m.screenshot(path=str(nav_dir / "mobile_nav_open.png"), full_page=False)
        await ctx_m.close()

        await browser.close()

    (MANIFEST_DIR / "home_geometry.json").write_text(json.dumps({
        "hero_states": hero_states,
        "sections": home_geom,
        "gsap_inline_scripts": gsap_scripts,
    }, indent=2), encoding="utf-8")
    print("Capture & geometry measurement complete.")


if __name__ == "__main__":
    asyncio.run(main())
