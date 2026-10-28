# -*- coding: utf-8 -*-
"""去掉诗笺卡片右上角那行「点击换一句」提示，保留点击换句功能。"""
import io, sys

P = r"C:\Users\reze\WorkBuddy\2026-10-26-21-05-21\reze-blog\assets\js\main.js"

with io.open(P, "rb") as f:
    b = f.read()

# 1) 卡片头收口带上 </div>，为删掉提示做准备
old_head = 'ICONS.info + "\u8bd7\u7b3a</span>" +\r\n'.encode("utf-8")
new_head = 'ICONS.info + "\u8bd7\u7b3a</span></div>" +\r\n'.encode("utf-8")
assert b.count(old_head) == 1, "head match=%d" % b.count(old_head)
b = b.replace(old_head, new_head)

# 2) 整段删掉提示 span
old_tip = (
    "      (canSwap\r\n"
    "        ? '<span class=\"gn-tip\" style=\"font-size:11px;letter-spacing:.04em;"
    "color:var(--g-text-3);opacity:.75\">\u70b9\u51fb\u6362\u4e00\u53e5</span>'\r\n"
    "        : \"\") +\r\n"
).encode("utf-8")
assert b.count(old_tip) == 1, "tip match=%d" % b.count(old_tip)
b = b.replace(old_tip, b"")

with io.open(P, "wb") as f:
    f.write(b)

print("ok")
