import hashlib
import json
import re
import urllib.request
from pathlib import Path
from urllib.parse import urljoin, urlparse

CSS_PATH = Path("research/reference/styles/valtriix.webflow.shared.b35da27ac.css")
HTML_DIR = Path("research/reference/html")
CRAWL_PATH = Path("research/manifests/crawl_raw.json")
MANIFEST_DIR = Path("research/manifests")
ORIG_DIR = Path("assets-source/original")
ORIG_DIR.mkdir(parents=True, exist_ok=True)

css_text = CSS_PATH.read_text(encoding="utf-8")

# 1. Extract all CSS custom properties
vars_dict = {}
for m in re.finditer(r"(--[a-zA-Z0-9_-]+)\s*:\s*([^;}{]+);", css_text):
    k, v = m.group(1), m.group(2).strip()
    vars_dict.setdefault(k, []).append(v)

# Extract media query blocks
media_blocks = re.findall(r"@media([^{]+)\{", css_text)
print("CSS custom properties count:", len(vars_dict))
print("Media queries:", sorted(set(m.strip() for m in media_blocks)))
(MANIFEST_DIR / "css_variables.json").write_text(json.dumps(vars_dict, indent=2), encoding="utf-8")

# 2. Discover all media URLs from crawl_raw.json, HTML files, and CSS
urls = {}  # url -> set of sources

def add_url(u: str, src: str):
    if not u or u.startswith("data:") or u.startswith("#"):
        return
    u = u.strip()
    if u.startswith("//"):
        u = "https:" + u
    if not u.startswith("http"):
        return
    urls.setdefault(u, set()).add(src)

# From CSS url(...)
for m in re.finditer(r'url\(["\']?([^"\')]+)["\']?\)', css_text):
    add_url(m.group(1), "css")

# From crawl_raw.json
crawl = json.loads(CRAWL_PATH.read_text(encoding="utf-8"))
for path, info in crawl.items():
    if info.get("ogImage"):
        add_url(info["ogImage"], f"{path}:ogImage")
    if info.get("favicon"):
        add_url(info["favicon"], f"{path}:favicon")
    for img in info.get("images", []):
        if img.get("src"):
            add_url(img["src"], f"{path}:img.src")
        if img.get("currentSrc"):
            add_url(img["currentSrc"], f"{path}:img.currentSrc")
        if img.get("srcset"):
            for part in img["srcset"].split(","):
                tok = part.strip().split(" ")[0]
                if tok:
                    add_url(tok, f"{path}:img.srcset")
    for vid in info.get("videos", []):
        if vid.get("dataPosterUrl"):
            add_url(vid["dataPosterUrl"], f"{path}:video.dataPosterUrl")
        if vid.get("poster"):
            add_url(vid["poster"], f"{path}:video.poster")
        if vid.get("currentSrc"):
            add_url(vid["currentSrc"], f"{path}:video.currentSrc")
        if vid.get("dataVideoUrls"):
            for vu in vid["dataVideoUrls"].split(","):
                add_url(vu.strip(), f"{path}:video.dataVideoUrls")
        for s in vid.get("sources", []):
            if s.get("src"):
                add_url(s["src"], f"{path}:video.source")

# From raw HTML regex (e.g. website-files URLs in attributes/scripts)
for html_file in HTML_DIR.glob("*.html"):
    txt = html_file.read_text(encoding="utf-8")
    for m in re.finditer(r'https://cdn\.prod\.website-files\.com/[^\s"\'<>),]+', txt):
        u = m.group(0).rstrip("\\")
        if any(ext in u.lower() for ext in [".webp", ".png", ".jpg", ".jpeg", ".svg", ".mp4", ".webm", ".avif", ".gif", ".ico"]):
            add_url(u, f"html:{html_file.stem}")

print(f"Total unique media URLs discovered: {len(urls)}")

# Filter to primary assets (exclude resized -p-500/-p-800/-p-1080/-p-1600/-p-2000 variants unless master missing, keep all non -p- + videos + svgs)
primary_urls = []
variant_urls = []
for u in sorted(urls.keys()):
    if re.search(r"-p-\d+\.(webp|png|jpg|jpeg)$", u, re.I):
        variant_urls.append(u)
    else:
        primary_urls.append(u)

print(f"Primary media URLs: {len(primary_urls)}, Responsive variant URLs: {len(variant_urls)}")

# Download primary assets
assets_manifest = []
sha_map = {}

def categorize(url: str) -> tuple[str, str]:
    low = url.lower()
    if low.endswith((".mp4", ".webm")):
        return "video", "video"
    if low.endswith(".svg"):
        if "brand-logo" in low:
            return "logos", "svg"
        return "icons", "svg"
    if "poster" in low:
        return "posters", "image"
    if "hero" in low:
        return "hero", "image"
    if "cta" in low:
        return "cta", "image"
    if "case-study" in low or "case_study" in low:
        return "case-studies", "image"
    if "blog" in low:
        return "articles", "image"
    if "service" in low:
        return "services", "image"
    return "general", "image"

for idx, u in enumerate(primary_urls, 1):
    cat, atype = categorize(u)
    parsed = urlparse(u)
    raw_name = Path(parsed.path).name
    # clean encoded %2F
    if "%2F" in raw_name:
        raw_name = raw_name.split("%2F")[-1]
    dest_dir = ORIG_DIR / cat
    dest_dir.mkdir(parents=True, exist_ok=True)
    dest = dest_dir / raw_name

    status = None
    mime = ""
    size = 0
    sha256 = ""
    err = None
    dup_of = None

    if dest.exists() and dest.stat().st_size > 0:
        data_bytes = dest.read_bytes()
        sha256 = hashlib.sha256(data_bytes).hexdigest()
        size = len(data_bytes)
        status = 200
    else:
        try:
            req = urllib.request.Request(u, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as r:
                status = r.status
                mime = r.headers.get("Content-Type", "")
                data_bytes = r.read()
                size = len(data_bytes)
                sha256 = hashlib.sha256(data_bytes).hexdigest()
                dest.write_bytes(data_bytes)
        except Exception as e:
            err = str(e)

    if sha256:
        if sha256 in sha_map:
            dup_of = sha_map[sha256]
        else:
            sha_map[sha256] = raw_name

    assets_manifest.append({
        "id": f"asset-{idx:03d}",
        "name": raw_name,
        "sourceUrl": u,
        "sources": sorted(urls[u]),
        "category": cat,
        "assetType": atype,
        "mimeType": mime,
        "httpStatus": status,
        "fileSize": size,
        "sha256": sha256,
        "duplicateOf": dup_of,
        "masterPath": str(dest).replace("\\", "/"),
        "error": err,
    })
    print(f"  [{idx}/{len(primary_urls)}] {status} {cat}/{raw_name} ({size} B)" + (f" DUP={dup_of}" if dup_of else "") + (f" ERR={err}" if err else ""))

(MANIFEST_DIR / "assets_raw.json").write_text(json.dumps(assets_manifest, indent=2), encoding="utf-8")
print("Unique SHA-256 files:", len(sha_map))
