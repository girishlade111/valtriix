import json
import shutil
from pathlib import Path

ORIG = Path("assets-source/original")
PUB = Path("public/assets")

# Copy every downloaded original asset to public/assets/<clean-category>/<clean-name>
# Also preserve original filenames in a deterministic mapping so any code referencing assets works reliably.
MAPPING = {}

def copy_dir(src_sub: str, dst_sub: str):
    src_dir = ORIG / src_sub
    dst_dir = PUB / dst_sub
    dst_dir.mkdir(parents=True, exist_ok=True)
    if not src_dir.exists():
        return
    for f in sorted(src_dir.iterdir()):
        if not f.is_file() or f.stat().st_size == 0:
            continue
        # Strip Webflow hash prefix `<24hex>_` or `<24hex>%2F<24hex>_` for clean filename, keeping suffix
        name = f.name
        if "%20" in name:
            name = name.replace("%20", "-")
        # keep unique name by stripping only leading hash if no collision
        parts = name.split("_", 1)
        clean_name = parts[1] if len(parts) == 2 and len(parts[0]) >= 20 else name
        clean_name = clean_name.lower()
        target = dst_dir / clean_name
        if target.exists():
            # Keep full name if collision (like multiple Favicon.png sizes or avatar-1)
            target = dst_dir / name.lower()
        shutil.copy2(f, target)
        MAPPING[f.name] = "/" + str(target.relative_to(Path("public"))).replace("\\", "/")

copy_dir("icons", "icons")
copy_dir("logos", "logos")
copy_dir("hero", "images/hero")
copy_dir("cta", "images/cta")
copy_dir("services", "images/services")
copy_dir("case-studies", "images/case-studies")
copy_dir("articles", "images/blog")
copy_dir("posters", "posters")
copy_dir("video", "videos")
copy_dir("general", "images/general")

# Special clean copies for brand assets
brand_dir = PUB / "brand"
brand_dir.mkdir(parents=True, exist_ok=True)
for f in (ORIG / "icons").glob("*"):
    low = f.name.lower()
    if "logo-black" in low:
        shutil.copy2(f, brand_dir / "valtriix-logo-dark.svg")
        MAPPING["brand-dark"] = "/assets/brand/valtriix-logo-dark.svg"
    elif "logo%20white" in low or "logo-white" in low:
        shutil.copy2(f, brand_dir / "valtriix-logo-light.svg")
        MAPPING["brand-light"] = "/assets/brand/valtriix-logo-light.svg"
    elif "shape-1" in low:
        shutil.copy2(f, brand_dir / "valtriix-decorative-mark.svg")
        MAPPING["brand-decorative"] = "/assets/brand/valtriix-decorative-mark.svg"

Path("research/manifests/asset-map.json").write_text(json.dumps(MAPPING, indent=2), encoding="utf-8")
print("Copied public assets:", len(MAPPING))
