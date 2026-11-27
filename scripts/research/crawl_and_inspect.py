import asyncio
import json
import os
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse
from playwright.async_api import async_playwright

BASE_URL = "https://valtriix.webflow.io"
SEED_PATHS = [
    "/",
    "/company",
    "/services",
    "/case-study",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms-condition",
    "/changelog",
    "/licenses",
    "/style-guide",
    "/404",
]

OUT_DIR = Path("research")
HTML_DIR = OUT_DIR / "reference" / "html"
MANIFEST_DIR = OUT_DIR / "manifests"
HTML_DIR.mkdir(parents=True, exist_ok=True)
MANIFEST_DIR.mkdir(parents=True, exist_ok=True)


def normalize_path(href: str, current_url: str) -> tuple[str | None, str]:
    if not href:
        return None, "empty"
    href = href.strip()
    if href.startswith(("#", "mailto:", "tel:", "javascript:")):
        return None, "special"
    full = urljoin(current_url, href)
    parsed = urlparse(full)
    if parsed.netloc and parsed.netloc != urlparse(BASE_URL).netloc:
        return full, "external"
    path = parsed.path or "/"
    if len(path) > 1 and path.endswith("/"):
        path = path[:-1]
    return path, "internal"


def slug_for_path(path: str) -> str:
    if path == "/":
        return "home"
    return path.lstrip("/").replace("/", "__")


async def inspect_page(page, path: str, visited_data: dict):
    url = BASE_URL + (path if path != "/" else "/")
    network_records = []

    def on_response(resp):
        try:
            ct = resp.headers.get("content-type", "")
            network_records.append({
                "url": resp.url,
                "status": resp.status,
                "mime": ct,
                "resourceType": resp.request.resource_type,
            })
        except Exception:
            pass

    page.on("response", on_response)
    resp = await page.goto(url, wait_until="domcontentloaded", timeout=30000)
    status = resp.status if resp else None
    try:
        await page.wait_for_load_state("networkidle", timeout=10000)
    except Exception:
        pass
    await page.evaluate("() => document.fonts.ready")
    await asyncio.sleep(0.5)

    html = await page.content()
    (HTML_DIR / f"{slug_for_path(path)}.html").write_text(html, encoding="utf-8")

    data = await page.evaluate("""() => {
        const htmlEl = document.documentElement;
        const wfSite = htmlEl.getAttribute('data-wf-site');
        const wfPage = htmlEl.getAttribute('data-wf-page');
        const title = document.title;
        const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null;
        const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || null;
        const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || null;
        const favicon = document.querySelector('link[rel="shortcut icon"], link[rel="icon"]')?.getAttribute('href') || null;

        const links = Array.from(document.querySelectorAll('a')).map(a => ({
            href: a.getAttribute('href') || '',
            text: (a.innerText || a.textContent || '').replace(/\\s+/g, ' ').trim(),
            classes: a.className || '',
            ariaLabel: a.getAttribute('aria-label') || null,
            inHeader: !!a.closest('header, .navbar, .nav, [role="banner"], .w-nav'),
            inFooter: !!a.closest('footer, .footer'),
            inDropdown: !!a.closest('.w-dropdown, .dropdown'),
        }));

        const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).map(l => l.href);
        const scripts = Array.from(document.querySelectorAll('script[src]')).map(s => s.src);

        const images = Array.from(document.querySelectorAll('img')).map(img => ({
            src: img.getAttribute('src'),
            currentSrc: img.currentSrc,
            srcset: img.getAttribute('srcset'),
            alt: img.getAttribute('alt'),
            naturalWidth: img.naturalWidth,
            naturalHeight: img.naturalHeight,
            width: img.getBoundingClientRect().width,
            height: img.getBoundingClientRect().height,
            classes: img.className || '',
            loading: img.getAttribute('loading'),
        }));

        const videos = Array.from(document.querySelectorAll('video, .w-background-video')).map(v => {
            const vid = v.tagName === 'VIDEO' ? v : v.querySelector('video');
            const sources = Array.from((vid || v).querySelectorAll('source')).map(s => ({
                src: s.getAttribute('src'),
                type: s.getAttribute('type'),
            }));
            return {
                tag: v.tagName,
                classes: v.className || '',
                dataPosterUrl: v.getAttribute('data-poster-url'),
                dataVideoUrls: v.getAttribute('data-video-urls'),
                dataAutoplay: v.getAttribute('data-autoplay'),
                dataLoop: v.getAttribute('data-loop'),
                poster: vid?.getAttribute('poster') || null,
                currentSrc: vid?.currentSrc || null,
                sources,
                rect: v.getBoundingClientRect().toJSON(),
            };
        });

        const svgs = Array.from(document.querySelectorAll('svg')).map((svg, idx) => ({
            index: idx,
            classes: svg.getAttribute('class') || '',
            viewBox: svg.getAttribute('viewBox'),
            width: svg.getBoundingClientRect().width,
            height: svg.getBoundingClientRect().height,
            outerHTML: svg.outerHTML.slice(0, 4000),
        }));

        const fonts = Array.from(document.fonts).map(f => ({
            family: f.family,
            weight: f.weight,
            style: f.style,
            status: f.status,
        }));

        const keyStyles = {};
        const pick = (sel, key) => {
            const el = document.querySelector(sel);
            if (!el) return;
            const cs = getComputedStyle(el);
            keyStyles[key] = {
                selector: sel,
                text: (el.innerText || '').trim().slice(0, 80),
                fontFamily: cs.fontFamily,
                fontSize: cs.fontSize,
                fontWeight: cs.fontWeight,
                lineHeight: cs.lineHeight,
                letterSpacing: cs.letterSpacing,
                color: cs.color,
                backgroundColor: cs.backgroundColor,
                padding: cs.padding,
                margin: cs.margin,
                borderRadius: cs.borderRadius,
                maxWidth: cs.maxWidth,
                rect: el.getBoundingClientRect().toJSON(),
            };
        };
        pick('body', 'body');
        pick('h1', 'h1');
        pick('h2', 'h2');
        pick('h3', 'h3');
        pick('p', 'p');
        pick('.w-nav, header, nav', 'header');
        pick('.w-container, .container, [class*="container"]', 'container');
        pick('footer, .footer', 'footer');

        return {
            wfSite, wfPage, title, canonical, metaDesc, ogImage, favicon,
            links, stylesheets, scripts, images, videos, svgs, fonts, keyStyles,
            viewport: { width: window.innerWidth, height: window.innerHeight, dpr: window.devicePixelRatio },
            scrollHeight: document.body.scrollHeight,
        };
    }""")

    page.remove_listener("response", on_response)

    internal_links = []
    external_links = []
    for lk in data["links"]:
        norm, kind = normalize_path(lk["href"], url)
        if kind == "internal" and norm:
            internal_links.append({**lk, "path": norm})
        elif kind == "external" and norm:
            external_links.append({**lk, "url": norm})

    visited_data[path] = {
        "path": path,
        "url": url,
        "httpStatus": status,
        "wfSite": data["wfSite"],
        "wfPage": data["wfPage"],
        "title": data["title"],
        "canonical": data["canonical"],
        "metaDesc": data["metaDesc"],
        "ogImage": data["ogImage"],
        "favicon": data["favicon"],
        "stylesheets": data["stylesheets"],
        "scripts": data["scripts"],
        "fonts": data["fonts"],
        "keyStyles": data["keyStyles"],
        "images": data["images"],
        "videos": data["videos"],
        "svgsCount": len(data["svgs"]),
        "svgs": data["svgs"],
        "internalLinks": internal_links,
        "externalLinks": external_links,
        "networkRecords": network_records,
        "scrollHeight": data["scrollHeight"],
    }
    return [lk["path"] for lk in internal_links]


async def main():
    visited = {}
    queue = list(SEED_PATHS)
    seen = set(SEED_PATHS)

    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1)
        page = await context.new_page()

        while queue:
            path = queue.pop(0)
            print(f"Inspecting {path} ...", flush=True)
            try:
                discovered = await inspect_page(page, path, visited)
                for d in discovered:
                    if d not in seen:
                        seen.add(d)
                        queue.append(d)
            except Exception as e:
                print(f"Error on {path}: {e}", flush=True)
                visited[path] = {"path": path, "error": str(e)}

        await browser.close()

    (MANIFEST_DIR / "crawl_raw.json").write_text(json.dumps(visited, indent=2), encoding="utf-8")
    print(f"Done. Total routes inspected: {len(visited)}")
    for p_key, info in sorted(visited.items()):
        print(f"  {info.get('httpStatus')} {p_key} -> {info.get('title')}")


if __name__ == "__main__":
    asyncio.run(main())
