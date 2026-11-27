import json
import re
from bs4 import BeautifulSoup
from pathlib import Path

HTML_DIR = Path("research/reference/html")
OUT_DIR = Path("research/reference/content")
OUT_DIR.mkdir(parents=True, exist_ok=True)

summary = {}

for html_file in sorted(HTML_DIR.glob("*.html")):
    soup = BeautifulSoup(html_file.read_text(encoding="utf-8"), "html.parser")
    # Remove script/style tags for clean text extraction
    for tag in soup(["script", "style"]):
        tag.decompose()

    title = soup.title.string.strip() if soup.title and soup.title.string else ""
    headings = []
    for h in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6"]):
        headings.append({"tag": h.name, "cls": " ".join(h.get("class", [])), "text": " ".join(h.get_text(" ", strip=True).split())})

    # Extract structured blocks (paragraphs, list items, links)
    blocks = []
    for el in soup.find_all(["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote"]):
        txt = " ".join(el.get_text(" ", strip=True).split())
        if txt:
            blocks.append({"tag": el.name, "cls": " ".join(el.get("class", [])), "text": txt})

    imgs = []
    for im in soup.find_all("img"):
        imgs.append({"src": im.get("src"), "alt": im.get("alt"), "cls": " ".join(im.get("class", []))})

    summary[html_file.stem] = {
        "title": title,
        "headings": headings,
        "blocks": blocks,
        "images": imgs,
    }

(OUT_DIR / "all_pages_extracted.json").write_text(json.dumps(summary, indent=2, ensure_ascii=False), encoding="utf-8")
print("Extracted pages:", len(summary))
for k in ["our-advisors", "instructions", "style-guide", "licenses", "changelog", "services__portfolio-management", "blog__understanding-market-trends-before-you-invest"]:
    if k in summary:
        print(f"=== {k} ({summary[k]['title']}) ===")
        for b in summary[k]["blocks"][:20]:
            print(f"  [{b['tag']}] {b['text'][:140]}")
