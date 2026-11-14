import re, glob, os

files = sorted(glob.glob("content/posts/*.md"))
yr = re.compile(r"(?:19|20)\d{2}")
cands = []
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
    if bad:
        tm = re.search(r'title:\s*"([^"]+)"', fm)
        title = tm.group(1) if tm else "?"
        cands.append((os.path.basename(f).replace(".md", ""), title, dyear, years, bad))

print("TOTAL CANDIDATES:", len(cands))
for pid, t, dy, ys, bad in cands:
    print(f"{pid}\t{dy}\t{bad}\t{ys}\t{t}")
