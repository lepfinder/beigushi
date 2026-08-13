#!/usr/bin/env python3
"""从 content/*.html 提取古诗词基础元数据 → data/poems_meta.json

说明：
- 唯一数据源是 data/poems_meta.json（含手工维护的 places）
- 重跑本脚本会更新标题/作者/朝代等字段，并按 id 保留已有 places
"""

from __future__ import annotations

import json
import re
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content"
OUT_DIR = ROOT / "data"
OUT_FILE = OUT_DIR / "poems_meta.json"
GRADE_ORDER = [
    "一年级上册",
    "一年级下册",
    "二年级上册",
    "二年级下册",
    "三年级上册",
    "三年级下册",
    "四年级上册",
    "四年级下册",
    "五年级上册",
    "五年级下册",
    "六年级上册",
    "六年级下册",
    "七年级上册",
    "七年级下册",
    "八年级上册",
    "八年级下册",
    "九年级上册",
    "九年级下册",
]

DYNASTY_FROM_CLASS = {
    "xianqin": "先秦",
    "han": "汉",
    "wei": "魏",
    "jin": "晋",
    "nanbeichao": "南北朝",
    "tang": "唐",
    "song": "宋",
    "yuan": "元",
    "ming": "明",
    "qing": "清",
    "modern": "现代",
}

DYNASTY_ALIASES = [
    ("南北朝", "南北朝", "nanbeichao"),
    ("北朝", "南北朝", "nanbeichao"),
    ("南朝", "南北朝", "nanbeichao"),
    ("东汉", "汉", "han"),
    ("西汉", "汉", "han"),
    ("先秦", "先秦", "xianqin"),
    ("东晋", "晋", "jin"),
    ("西晋", "晋", "jin"),
    ("现代", "现代", "modern"),
    ("当代", "现代", "modern"),
    ("唐", "唐", "tang"),
    ("宋", "宋", "song"),
    ("元", "元", "yuan"),
    ("明", "明", "ming"),
    ("清", "清", "qing"),
    ("汉", "汉", "han"),
    ("魏", "魏", "wei"),
    ("晋", "晋", "jin"),
    ("诗经", "先秦", "xianqin"),
    ("古诗十九首", "汉", "han"),
    ("乐府", "汉", "han"),
]

# 无 dynasty-tag 或需校正的条目
MANUAL: dict[tuple[str, str], dict] = {
    ("一年级上册", "poem-03"): {
        "dynasty": "唐",
        "dynastyKey": "tang",
        "author": "佚名",
        "dynastyNote": "课本未署作者，传统多归于王维名下",
    },
    ("二年级上册", "poem-04"): {
        "dynasty": "南北朝",
        "dynastyKey": "nanbeichao",
        "author": "北朝民歌",
    },
    ("四年级下册", "poem-06"): {"dynasty": "元", "dynastyKey": "yuan"},
    ("四年级下册", "poem-07"): {
        "dynasty": "现代",
        "dynastyKey": "modern",
        "author": "毛泽东",
    },
    ("六年级下册", "poem-02"): {
        "dynasty": "汉",
        "dynastyKey": "han",
        "author": "佚名",
    },
    ("六年级下册", "poem-07"): {
        "dynasty": "先秦",
        "dynastyKey": "xianqin",
        "author": "佚名",
    },
    ("六年级下册", "poem-17"): {
        "dynasty": "汉",
        "dynastyKey": "han",
        "author": "汉乐府",
    },
}


def clean_text(html: str) -> str:
    html = re.sub(r"<rt[^>]*>.*?</rt>", "", html, flags=re.S)
    html = re.sub(r"<br\s*/?>", "", html, flags=re.I)
    text = re.sub(r"<[^>]+>", "", html)
    return re.sub(r"\s+", " ", text).strip()


def infer_dynasty(meta_text: str) -> tuple[str, str]:
    for alias, label, key in DYNASTY_ALIASES:
        if alias in meta_text:
            return label, key
    return "", ""


def parse_author(meta_html: str, meta_text: str) -> str:
    # 优先取 dynasty-tag 之后的文本
    after = re.split(r"</span>", meta_html, maxsplit=1)
    if len(after) == 2 and "dynasty-tag" in meta_html:
        author = clean_text(after[1]).strip(" ·・")
        if author:
            return author

    t = meta_text
    for alias, _, _ in DYNASTY_ALIASES:
        if t.startswith(alias):
            t = t[len(alias) :].strip(" ·・.\u3000")
            break
    t = re.sub(r"^选自", "", t).strip()
    return t.strip(" ·・") or meta_text


def stage_of(grade: str) -> str:
    if grade.startswith(("七", "八", "九")):
        return "初中"
    return "小学"


def extract() -> list[dict]:
    poems: list[dict] = []
    card_re = re.compile(
        r'<div class="poem-card"(?![\s\S]{0,40}recite-card)([^>]*)>'
        r"([\s\S]*?)(?=<div class=\"poem-card\"|<div class=\"section-label\"|<footer|$)"
    )

    for grade in GRADE_ORDER:
        path = CONTENT / f"{grade}古诗词.html"
        if not path.exists():
            raise SystemExit(f"missing file: {path}")
        text = path.read_text(encoding="utf-8")

        for m in card_re.finditer(text):
            attrs, body = m.group(1), m.group(2)
            if "recite-card" in attrs:
                continue
            id_m = re.search(r'id="(poem-\d+)"', attrs)
            if not id_m:
                continue

            poem_id = id_m.group(1)
            title_m = re.search(r'<div class="poem-title[^"]*"[^>]*>(.*?)</div>', body, re.S)
            meta_m = re.search(r'<div class="poem-meta"[^>]*>(.*?)</div>', body, re.S)
            src_m = re.search(r'<span class="source-tag"[^>]*>(.*?)</span>', body, re.S)
            body_m = re.search(r'<div class="poem-body[^"]*"[^>]*>(.*?)</div>', body, re.S)

            lines: list[str] = []
            if body_m:
                for p in re.findall(r"<p[^>]*>(.*?)</p>", body_m.group(1), re.S):
                    line = clean_text(p)
                    if line:
                        lines.append(line)

            notes = [
                clean_text(n)
                for n in re.findall(
                    r'class="poem-note-item"[^>]*>(.*?)</span>', body, re.S
                )
                if clean_text(n)
            ]

            title = clean_text(title_m.group(1)) if title_m else ""
            meta_html = meta_m.group(1) if meta_m else ""
            meta_text = clean_text(meta_html)
            source = clean_text(src_m.group(1)) if src_m else ""

            class_m = re.search(r"dynasty-tag\s+(\w+)", meta_html)
            if class_m and class_m.group(1) in DYNASTY_FROM_CLASS:
                dynasty_key = class_m.group(1)
                dynasty = DYNASTY_FROM_CLASS[dynasty_key]
            else:
                dynasty, dynasty_key = infer_dynasty(meta_text)

            item = {
                "id": f"{grade}-{poem_id}",
                "stage": stage_of(grade),
                "grade": grade,
                "poemId": poem_id,
                "title": title,
                "author": parse_author(meta_html, meta_text),
                "dynasty": dynasty,
                "dynastyKey": dynasty_key,
                "source": source,
                "metaRaw": meta_text,
                "excerpt": lines[0] if lines else "",
                "lines": lines,
                "notes": notes,
                "lineCount": len(lines),
                "href": f"/{grade}#{poem_id}",
                "file": path.name,
            }

            override = MANUAL.get((grade, poem_id))
            if override:
                item.update(override)

            poems.append(item)

    return poems


def main() -> None:
    poems = extract()
    missing = [p["id"] for p in poems if not p.get("dynasty")]
    if missing:
        raise SystemExit(f"missing dynasty for: {missing}")

    # 保留已有地理位置，避免重跑覆盖手工标注
    if OUT_FILE.exists():
        old = json.loads(OUT_FILE.read_text(encoding="utf-8"))
        places_by_id = {
            p["id"]: p.get("places")
            for p in old.get("poems", [])
            if p.get("places") is not None
        }
        for poem in poems:
            if poem["id"] in places_by_id:
                poem["places"] = places_by_id[poem["id"]]

    links = [pl for p in poems for pl in (p.get("places") or [])]
    OUT_DIR.mkdir(exist_ok=True)
    payload = {
        "version": 5,
        "description": "统编语文中小学古诗词元数据（含全文、注释与地理位置）。地图与其它功能只读本文件。",
        "count": len(poems),
        "dynastyStats": dict(Counter(p["dynasty"] for p in poems)),
        "placeStats": {
            "poemsWithPlaces": sum(1 for p in poems if p.get("places")),
            "poemsWithoutPlaces": sum(1 for p in poems if not p.get("places")),
            "totalPlaceLinks": len(links),
            "uniquePlaceKeys": len({pl.get("key") for pl in links}),
        },
        "poems": poems,
    }
    OUT_FILE.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    print(f"extracted {len(poems)} poems")
    print("dynasty:", payload["dynastyStats"])
    print("places:", payload["placeStats"])
    print(f"wrote {OUT_FILE}")


if __name__ == "__main__":
    main()
