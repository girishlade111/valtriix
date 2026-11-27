import json
from bs4 import BeautifulSoup
from pathlib import Path

def clean(t):
    return " ".join((t or "").split()).strip()

def asset_name(src):
    if not src: return None
    n = src.split("/")[-1].replace("%20", "-")
    if "%2F" in n: n = n.split("%2F")[-1]
    parts = n.split("_", 1)
    return (parts[1] if len(parts) == 2 and len(parts[0]) >= 20 else n).lower()

# 1. Our Advisors
s = BeautifulSoup(Path("research/reference/html/our-advisors.html").read_text(encoding="utf-8"), "html.parser")
for x in s.select("header, .header, footer, .footer-and-cta"): x.decompose()
print("=== OUR ADVISORS ===")
for sec in s.select("section"):
    h = [clean(x.get_text(" ")) for x in sec.select("h1, h2, h3, .advisors-heading") if clean(x.get_text(" "))]
    items = []
    for it in sec.select(".advisors-member-item"):
        im = it.select_one("img")
        items.append((asset_name(im.get("src")) if im else None, clean(it.get_text(" | "))))
    if items:
        print("SEC:", h[:4], "count=", len(items))
        for a, txt in items:
            print("  ", a, "->", txt)

# 2. Company
c = BeautifulSoup(Path("research/reference/html/company.html").read_text(encoding="utf-8"), "html.parser")
for x in c.select("header, .header, footer, .footer-and-cta"): x.decompose()
print("\n=== COMPANY HERO / QUOTE / STORY / CORE VALUES / CAREERS / REVIEWS ===")
for sel in [".banner-section", ".company-banner-section", ".brand-logo-section", ".our-story-section", ".core-value-section", ".career-section", ".customer-review-section", ".review-section"]:
    el = c.select_one(sel)
    if el:
        imgs = [asset_name(i.get("src")) for i in el.select("img") if i.get("src")]
        print(f"SEL {sel}: imgs={imgs[:10]}")
        print("  texts:", [clean(x.get_text(" ")) for x in el.select("h1,h2,h3,h4,p,a,.badge-text,.review-text,.author-name") if clean(x.get_text(" "))][:20])

print("\n=== COMPANY ALL SECTIONS ===")
for sec in c.select("section"):
    imgs = [asset_name(i.get("src")) for i in sec.select("img") if i.get("src")]
    texts = [clean(x.get_text(" ")) for x in sec.select("h1,h2,h3,h4,p,.badge-text,.review-card,.career-item,.career-title,.job-title") if clean(x.get_text(" "))]
    print("SEC:", sec.get("class"), "| imgs:", imgs[:8], "| texts[:8]:", texts[:8])

# 3. Company review cards & career items explicitly
print("\n=== COMPANY REVIEWS ===")
for rc in c.select(".review-card"):
    imgs = [asset_name(i.get("src")) for i in rc.select("img") if i.get("src")]
    print(" ", imgs, "|", clean(rc.get_text(" | ")))

print("\n=== COMPANY CAREERS ===")
for cr in c.select("a[href='/contact']"):
    if "button" not in (cr.get("class") or []):
        print(" ", cr.get("class"), "|", clean(cr.get_text(" | ")))

# 4. Contact inputs & cards
ct = BeautifulSoup(Path("research/reference/html/contact.html").read_text(encoding="utf-8"), "html.parser")
for x in ct.select("header, .header, footer, .footer-and-cta"): x.decompose()
print("\n=== CONTACT ===")
for card in ct.select(".contact-info-card"):
    print("  OFFICE:", clean(card.get_text(" | ")), "| links:", [(a.get("href"), clean(a.get_text(" "))) for a in card.select("a")])
for inp in ct.select("input, textarea"):
    print("  INPUT:", inp.name, inp.get("name"), inp.get("type"), "ph=", inp.get("placeholder"), "val=", inp.get("value"), "req=", inp.has_attr("required"))
print("  COLLAB AVATARS:", [asset_name(i.get("src")) for i in ct.select("img") if i.get("src")])
