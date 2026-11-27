import json
import re
from bs4 import BeautifulSoup
from pathlib import Path

HTML_DIR = Path("research/reference/html")
OUT_DIR = Path("research/reference/content")
OUT_DIR.mkdir(parents=True, exist_ok=True)


def clean(txt: str) -> str:
    return " ".join((txt or "").split()).strip()


def parse_file(name: str) -> BeautifulSoup:
    return BeautifulSoup((HTML_DIR / f"{name}.html").read_text(encoding="utf-8"), "html.parser")


def extract_home():
    soup = parse_file("home")
    data = {}
    # Hero
    hero = soup.select_one(".hero-section, section[class*='hero']")
    data["hero_text"] = [clean(el.get_text(" ")) for el in (hero.select("h1, h2, p, a, .badge-text") if hero else []) if clean(el.get_text(" "))]
    # Services slider
    data["home_services"] = []
    for item in soup.select(".service-section .service-item, .service-slider .w-slide"):
        a = item.select_one("a")
        t = item.select_one(".service-title, h3, h4, .heading-4, div[class*='title']")
        im = item.select_one("img")
        data["home_services"].append({
            "href": a.get("href") if a else None,
            "title": clean(t.get_text(" ")) if t else clean(item.get_text(" ")),
            "img": im.get("src") if im else None,
        })
    # Approach items
    data["approach"] = []
    for row in soup.select("[class*='approach'] [class*='item'], [class*='approach'] .w-dropdown, [class*='approach'] .accordion-item"):
        data["approach"].append(clean(row.get_text(" | ")))
    # Stats
    data["stats"] = [clean(s.get_text(" | ")) for s in soup.select("[class*='stat-card'], [class*='counter-item'], [class*='statistic']")]
    # Case studies on home
    data["home_case_studies"] = []
    for cs in soup.select(".case-study-section .case-study-item, section .case-study-card-2"):
        a = cs if cs.name == "a" else cs.select_one("a")
        imgs = [i.get("src") for i in cs.select("img")]
        data["home_case_studies"].append({
            "href": a.get("href") if a else None,
            "text": clean(cs.get_text(" | ")),
            "imgs": imgs,
        })
    # Testimonials
    data["testimonials"] = []
    for ts in soup.select(".testimonial-section .w-slide, .customer-review-section .w-slide, [class*='testimonial'] .w-slide"):
        imgs = [i.get("src") for i in ts.select("img")]
        data["testimonials"].append({"text": clean(ts.get_text(" | ")), "imgs": imgs})
    # Audience tabs
    data["audiences"] = []
    tabs = soup.select("[class*='serve'] .w-tab-link, .who-we-serve .w-tab-link, .w-tab-link")
    panes = soup.select("[class*='serve'] .w-tab-pane, .who-we-serve .w-tab-pane, .w-tab-pane")
    for t, p in zip(tabs, panes):
        imgs = [i.get("src") for i in p.select("img")]
        data["audiences"].append({"tab": clean(t.get_text(" ")), "content": clean(p.get_text(" | ")), "imgs": imgs})
    # Process steps
    data["process"] = [clean(p.get_text(" | ")) for p in soup.select("[class*='process-card'], [class*='how-it-works'] [class*='card'], [class*='work-card']")]
    return data


def extract_services():
    soup = parse_file("services")
    items = []
    for a in soup.select("a[href^='/services/']"):
        if a.find_parent("footer") or a.find_parent("nav"):
            continue
        im = a.select_one("img")
        items.append({"href": a.get("href"), "title": clean(a.get_text(" ")), "img": im.get("src") if im else None})

    details = {}
    for f in sorted(HTML_DIR.glob("services__*.html")):
        s = BeautifulSoup(f.read_text(encoding="utf-8"), "html.parser")
        slug = f.stem.replace("services__", "")
        h1 = s.select_one("h1")
        hero_img = s.select_one("section img, .service-details-image img, [class*='service'] img")
        # summary near h1
        paras = [clean(p.get_text(" ")) for p in s.select("p") if clean(p.get_text(" "))]
        details[slug] = {
            "slug": slug,
            "title": clean(h1.get_text(" ")) if h1 else "",
            "heroImg": hero_img.get("src") if hero_img else None,
            "paragraphs": paras[:15],
        }
    return {"listing": items, "details": details}


def extract_case_studies():
    soup = parse_file("case-study")
    listing = []
    for card in soup.select("a[href^='/case-study/']"):
        if card.find_parent("footer") or card.find_parent("nav"):
            continue
        im = card.select_one("img")
        listing.append({"href": card.get("href"), "text": clean(card.get_text(" | ")), "img": im.get("src") if im else None})

    details = {}
    for f in sorted(HTML_DIR.glob("case-study__*.html")):
        s = BeautifulSoup(f.read_text(encoding="utf-8"), "html.parser")
        slug = f.stem.replace("case-study__", "")
        h1 = s.select_one("h1")
        imgs = [i.get("src") for i in s.select("main img, section img") if i.get("src")]
        # extract rich text, metrics, client details, quote
        content_blocks = [clean(el.get_text(" ")) for el in s.select("h1, h2, h3, h4, p, li, blockquote") if clean(el.get_text(" "))]
        details[slug] = {
            "slug": slug,
            "title": clean(h1.get_text(" ")) if h1 else "",
            "imgs": imgs[:10],
            "blocks": content_blocks,
        }
    return {"listing": listing, "details": details}


def extract_blogs():
    soup = parse_file("blog")
    cards = []
    for a in soup.select("a[href^='/blog/']"):
        if a.find_parent("footer") or a.find_parent("nav"):
            continue
        im = a.select_one("img")
        cards.append({"href": a.get("href"), "text": clean(a.get_text(" | ")), "img": im.get("src") if im else None})

    details = {}
    for f in sorted(HTML_DIR.glob("blog__*.html")):
        s = BeautifulSoup(f.read_text(encoding="utf-8"), "html.parser")
        slug = f.stem.replace("blog__", "")
        h1 = s.select_one("h1")
        imgs = [i.get("src") for i in s.select("section img") if i.get("src")]
        blocks = [clean(el.get_text(" ")) for el in s.select("h1, h2, h3, h4, p, li") if clean(el.get_text(" "))]
        details[slug] = {
            "slug": slug,
            "title": clean(h1.get_text(" ")) if h1 else "",
            "imgs": imgs[:8],
            "blocks": blocks,
        }
    return {"listing_links": cards, "details": details}


def extract_simple(name: str):
    s = parse_file(name)
    blocks = []
    for el in s.select("h1, h2, h3, h4, p, li, a"):
        if el.find_parent("nav") or el.find_parent("footer"):
            continue
        t = clean(el.get_text(" "))
        if t:
            blocks.append({"tag": el.name, "cls": " ".join(el.get("class", [])), "text": t, "href": el.get("href")})
    imgs = [{"src": i.get("src"), "alt": i.get("alt"), "cls": " ".join(i.get("class", []))} for i in s.select("img") if not i.find_parent("nav") and not i.find_parent("footer")]
    return {"blocks": blocks, "imgs": imgs}


out = {
    "home": extract_home(),
    "services": extract_services(),
    "case_studies": extract_case_studies(),
    "blogs": extract_blogs(),
    "company": extract_simple("company"),
    "our_advisors": extract_simple("our-advisors"),
    "contact": extract_simple("contact"),
    "privacy_policy": extract_simple("privacy-policy"),
    "terms_condition": extract_simple("terms-condition"),
    "changelog": extract_simple("changelog"),
    "licenses": extract_simple("licenses"),
    "instructions": extract_simple("instructions"),
    "style_guide": extract_simple("style-guide"),
    "not_found": extract_simple("404"),
}
(OUT_DIR / "structured_site_data.json").write_text(json.dumps(out, indent=2, ensure_ascii=False), encoding="utf-8")
print("Wrote structured_site_data.json")
print("Home services:", len(out["home"]["home_services"]))
print("Listing services:", len(out["services"]["listing"]), "Detail services:", len(out["services"]["details"]))
print("Case studies listing:", len(out["case_studies"]["listing"]), "Detail:", len(out["case_studies"]["details"]))
print("Blog listing links:", len(out["blogs"]["listing_links"]), "Detail:", len(out["blogs"]["details"]))
