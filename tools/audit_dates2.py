# -*- coding: utf-8 -*-
"""日期穿帮二级分析：把 76 个候选按「发布年 vs 正文最新年」分档，方便定夺。"""
import re, glob, os

files = sorted(glob.glob("content/posts/*.md"))
yr = re.compile(r"(?:19|20)\d{2}")
rows = []
for f in files:
    txt = open(f, encoding="utf-8").read()
    m = re.match(r"^---\s*\n(.*?)\n---\s*\n", txt, re.S)
    if not m:
        continue
    fm = m.group(1)
    body = txt[m.end():]
    dm = re.search(r'date:\s*"(\d{4})-', fm)
    if not dm:
        continue
    dyear = int(dm.group(1))
    prose = re.split(r"#{1,6}\s*参考", body)[0]
    prose_clean = re.sub(r"<[^>]+>", "", prose)
    years = sorted(set(int(y) for y in yr.findall(prose_clean)))
    bad = [y for y in years if y > dyear and y <= 2026]
    if not bad:
        continue
    tm = re.search(r'title:\s*"([^"]+)"', fm)
    title = tm.group(1) if tm else "?"
    maxp = max(years)
    gap = maxp - dyear
    # 分档：
    #  A 不可能：发布年<=2022 且正文最新年>=发布年+2（多半是导入时日期被打乱）
    #  B 可疑：发布年 2023-2024 且正文出现 2025-2026
    #  C 边界：发布年 2025 且正文出现 2026（可能是 2025 文提了 2026 这个未来点，也可能标错）
    if dyear <= 2022 and gap >= 2:
        tier = "A 不可能"
    elif dyear in (2023, 2024) and maxp >= 2025:
        tier = "B 可疑"
    else:
        tier = "C 边界"
    rows.append((tier, os.path.basename(f).replace(".md", ""), dyear, maxp, gap, bad, title))

order = {"A 不可能": 0, "B 可疑": 1, "C 边界": 2}
rows.sort(key=lambda r: (order[r[0]], r[2], r[3]))
from collections import Counter
c = Counter(r[0] for r in rows)
print("分档统计:", dict(c), "总计", len(rows))
print()
for tier, pid, dy, mp, gap, bad, title in rows:
    print(f"[{tier}] {pid}  发布{dy} 正文最新{mp} 差{gap} 触发{bad}  {title}")
