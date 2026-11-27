import json
import re
from bs4 import BeautifulSoup
from pathlib import Path

HTML_DIR = Path("research/reference/html")
OUT = {}

def soup_of(name):
    return BeautifulSoup((HTML_DIR / f"{name}.html").read_text(encoding="utf-8"), "html.parser")

def clean(t):
    return " ".join((t or "").split()).strip()

def asset_name(src):
    if not src:
        return None
    n = src.split("/")[-1].replace("%20", "-")
    if "%2F" in n:
        n = n.split("%2F")[-1]
    parts = n.split("_", 1)
    return (parts[1] if len(parts) == 2 and len(parts[0]) >= 20 else n).lower()

# 1. Company hero quote, core values, careers, advisors, reviews
comp = soup_of("company")
OUT["company_hero_quote"] = ""
# Let's inspect all text blocks & images inside company.html sections
OUT["company_sections"] = []
for sec in comp.select("section"):
    cls = " ".join(sec.get("class", []))
    if "header" in cls:
        continue
    imgs = [asset_name(i.get("src")) for i in sec.select("img") if i.get("src")]
    texts = [clean(x.get_text(" ")) for x in sec.select("h1,h2,h3,h4,p,a") if clean(x.get_text(" "))]
    OUT["company_sections"].append({"cls": cls, "imgs": imgs, "texts": texts[:40]})

# 2. Our advisors exact card list
adv = soup_of("our-advisors")
OUT["advisors_groups"] = []
for grp in adv.select(".advisors-group, .team-group, [class*='advisors-wrap'] > div, section:not(.header) .container > div"):
    title_el = grp.select_one("h2, h3, .advisors-title")
    cards = []
    for item in grp.select(".advisors-member-item"):
        im = item.select_one("img:not(.social-icon)")
        name_el = item.select_one("h3, h4, .advisors-name, [class*='name']")
        role_el = item.select_one("p, .advisors-role, [class*='title']:not(.section-title)")
        # fallback: all text nodes inside .advisors-info
        info_texts = [clean(x.get_text(" ")) for x in item.select(".advisors-info > *") if clean(x.get_text(" "))]
        cards.append({
            "img": asset_name(im.get("src")) if im else None,
            "texts": info_texts or [clean(item.get_text(" "))],
        })
    if cards:
        OUT["advisors_groups"].append({"heading": clean(title_el.get_text(" ")) if title_el else "", "cards": cards})

# 3. Blogs exact list + featured + details
blog_soup = soup_of("blog")
OUT["blog_featured"] = {}
feat = blog_soup.select_one(".blog-featured, .featured-blog, .blog-item-1")
if feat:
    a = feat.select_one("a[href^='/blog/']")
    im = feat.select_one("img")
    OUT["blog_featured"] = {
        "href": a.get("href") if a else None,
        "img": asset_name(im.get("src")) if im else None,
        "texts": [clean(x.get_text(" ")) for x in feat.select("div, h2, h3, h4, p, a") if clean(x.get_text(" "))][:12],
    }

OUT["blog_grid"] = []
for item in blog_soup.select(".blog-collection-list .blog-item, .blog-list .blog-item"):
    a = item.select_one("a[href^='/blog/']")
    im = item.select_one("img")
    OUT["blog_grid"].append({
        "href": a.get("href") if a else None,
        "img": asset_name(im.get("src")) if im else None,
        "texts": [clean(x.get_text(" ")) for x in item.select(".blog-title, .blog-tag-text, p, h3, h4") if clean(x.get_text(" "))],
    })

OUT["blog_details"] = {}
for f in sorted(HTML_DIR.glob("blog__*.html")):
    s = BeautifulSoup(f.read_text(encoding="utf-8"), "html.parser")
    slug = f.stem.replace("blog__", "")
    # find images outside header/footer
    for x in s.select("header, .header, footer, .footer-and-cta"):
        x.decompose()
    imgs = [asset_name(i.get("src")) for i in s.select("img") if i.get("src")]
    author_name = clean(s.select_one(".author-name, [class*='author'] h4, [class*='author'] div:last-child").get_text(" ")) if s.select_one(".author-name, [class*='author']") else ""
    summary = clean(s.select_one(".blog-details-summary, [class*='blog-details'] p").get_text(" ")) if s.select_one("[class*='blog-details'] p") else ""
    tags = [clean(t.get_text(" ")) for t in s.select(".blog-tag-text")]
    rt = s.select_one(".w-richtext, .blog-rich-text, .rich-text")
    body_blocks = []
    if rt:
        for ch in rt.find_all(["h2", "h3", "h4", "p", "li"]):
            txt = clean(ch.get_text(" "))
            if txt and txt != "\u200d":
                body_blocks.append({"tag": ch.name, "text": txt})
    OUT["blog_details"][slug] = {
        "title": clean(s.select_one("h1").get_text(" ")) if s.select_one("h1") else "",
        "tags": tags[:3],
        "imgs": imgs,
        "author": author_name,
        "summary": summary,
        "body": body_blocks,
    }

# 4. Case studies listing + details
cs_soup = soup_of("case-study")
OUT["case_study_details"] = {}
for f in sorted(HTML_DIR.glob("case-study__*.html")):
    s = BeautifulSoup(f.read_text(encoding="utf-8"), "html.parser")
    for x in s.select("header, .header, footer, .footer-and-cta"):
        x.decompose()
    slug = f.stem.replace("case-study__", "")
    imgs = [asset_name(i.get("src")) for i in s.select("img") if i.get("src")]
    texts = [clean(x.get_text(" ")) for x in s.select("h1,h2,h3,h4,p,li,.stat-number,.stat-paragraph") if clean(x.get_text(" ")) and clean(x.get_text(" ")) != "\u200d"]
    OUT["case_study_details"][slug] = {"title": clean(s.select_one("h1").get_text(" ")) if s.select_one("h1") else "", "imgs": imgs, "texts": texts}

# 5. Services details
OUT["service_details"] = {}
for f in sorted(HTML_DIR.glob("services__*.html")):
    s = BeautifulSoup(f.read_text(encoding="utf-8"), "html.parser")
    for x in s.select("header, .header, footer, .footer-and-cta"):
        x.decompose()
    slug = f.stem.replace("services__", "")
    imgs = [asset_name(i.get("src")) for i in s.select("img") if i.get("src")]
    h1 = clean(s.select_one("h1").get_text(" ")) if s.select_one("h1") else ""
    sub = clean(s.select_one(".service-details-hero p, section p").get_text(" ")) if s.select_one("section p") else ""
    rt = s.select_one(".w-richtext, .overview-rich-text")
    overview = clean(rt.get_text(" ")) if rt else ""
    OUT["service_details"][slug] = {"title": h1, "subtitle": sub, "imgs": imgs, "overview": overview}

Path("research/reference/content/exact_mappings.json").write_text(json.dumps(OUT, indent=2, ensure_ascii=False), encoding="utf-8")
print("Wrote exact_mappings.json")
print("Advisors groups:", [(g["heading"], len(g["cards"])) for g in OUT["advisors_groups"]])
print("Blog grid count:", len(OUT["blog_grid"]), "Blog details count:", len(OUT["blog_details"]))
print("Service details count:", len(OUT["service_details"]))
for slug, sd in OUT["service_details"].items():
    print("  SVC:", slug, "->", sd["title"], "| imgs:", sd["imgs"][:2])
