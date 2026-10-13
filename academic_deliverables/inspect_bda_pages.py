import fitz

doc = fitz.open(r"C:\Users\agent\Downloads\BDA Report_261013_203123.pdf")
with open(r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\bda_pages_analysis.txt", "w", encoding="utf-8") as out:
    for pno in range(len(doc)):
        page = doc[pno]
        out.write(f"\n================= PAGE {pno+1} (w={page.rect.width}, h={page.rect.height}) =================\n")
        blocks = page.get_text("dict")["blocks"]
        for b in blocks:
            if b.get("type") == 0:  # text
                for line in b["lines"]:
                    for span in line["spans"]:
                        text = span["text"].strip()
                        if text:
                            color = hex(span["color"])
                            bbox = [round(x, 1) for x in span["bbox"]]
                            out.write(f"{bbox} font={span['font']} size={round(span['size'], 1)} color={color} : {text}\n")
            elif b.get("type") == 1:  # image
                bbox = [round(x, 1) for x in b["bbox"]]
                out.write(f"{bbox} [IMAGE] xref={b.get('image', 'n/a')}\n")

print("Analysis written successfully.")
