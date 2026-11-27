import json
from bs4 import BeautifulSoup
from pathlib import Path

# 1. Print hero states & home geometry
g = json.loads(Path("research/manifests/home_geometry.json").read_text(encoding="utf-8"))
print("=== HERO STATES ===")
for hs in g["hero_states"]:
    print("  t=", hs["sec"], [(e["cls"], e["text"][:40], e["opacity"]) for e in hs["elements"]])
print("=== SECTIONS ===")
for s in g["sections"]:
    print(f"  {s['tag']}.{s['cls']} rect={s['rect']} bg={s['bg']} pad={s['paddingTop']}/{s['paddingBottom']}")

# 2. Inspect header/dropdown & hero alternate headlines in home.html
soup = BeautifulSoup(Path("research/reference/html/home.html").read_text(encoding="utf-8"), "html.parser")
print("\n=== DROPDOWN STRUCTURE ===")
dd = soup.select_one(".w-dropdown")
if dd:
    for a in dd.select("a"):
        print(" ", a.get("href"), "|", " ".join(a.get_text(" ").split()))

print("\n=== HERO HEADLINE ELEMENTS ===")
hero = soup.select_one(".hero-section")
if hero:
    for el in hero.select("h1, h2, .hero-heading, [class*='hero-title'], [class*='heading']"):
        print(" ", el.name, el.get("class"), "|", " ".join(el.get_text(" ").split()))

# 3. Inspect about-section (green-to-charcoal architectural video) & about-us-section (editorial banner)
print("\n=== ABOUT SECTION (VIDEO) ===")
ab = soup.select_one(".about-section")
if ab:
    print("  texts:", [" ".join(x.get_text(" ").split()) for x in ab.select("p, h1, h2, h3, div") if " ".join(x.get_text(" ").split())][:10])

# 4. Inspect footer links & active states
print("\n=== FOOTER STRUCTURE ===")
ft = soup.select_one("footer")
if ft:
    for col in ft.select(".footer-widget-item, [class*='footer-widget']"):
        t = col.select_one(".footer-widget-title")
        links = [(a.get("href"), " ".join(a.get_text(" ").split())) for a in col.select("a")]
        print(" ", t.get_text(strip=True) if t else "COL", "->", links)
    for a in ft.select(".footer-bottom-block a, .footer-social-wtrapper a"):
        print("  SOCIAL:", a.get("href"), a.get("class"))
