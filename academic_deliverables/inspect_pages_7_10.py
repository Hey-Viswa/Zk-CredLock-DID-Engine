import fitz

doc = fitz.open(r"C:\Users\agent\Downloads\BDA Report_261013_203123.pdf")
for pno in [6, 7, 8, 9]:
    page = doc[pno]
    print(f"=== PAGE {pno+1} ===")
    blocks = page.get_text("dict")["blocks"]
    for b in blocks:
        if b.get("type") == 0:
            for line in b["lines"]:
                for s in line["spans"]:
                    t = s["text"].strip()
                    if t:
                        b0, b1 = round(s["bbox"][0], 1), round(s["bbox"][1], 1)
                        print(f"  [{b0}, {b1}] sz={round(s['size'],1)} font={s['font']} : {t}")
