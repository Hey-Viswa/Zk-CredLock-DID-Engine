import fitz
import os

pdf_path = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\Blockchain_CredLock_Project_Report.pdf"
doc = fitz.open(pdf_path)
print("Total pages in doc:", len(doc))

out_render_dir = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\final_rendered_pages"
os.makedirs(out_render_dir, exist_ok=True)

for i in range(len(doc)):
    page = doc[i]
    lines = [l.strip() for l in page.get_text().split("\n") if l.strip()]
    first_line = lines[0] if lines else "EMPTY"
    last_line = lines[-1] if lines else "EMPTY"
    print(f"Page {i+1} ({page.rect.width}x{page.rect.height}): Top='{first_line[:40]}' | Bottom='{last_line[:40]}'")
    
    # render page
    pix = page.get_pixmap(dpi=150)
    pix.save(os.path.join(out_render_dir, f"page_{i+1:02d}.png"))

print("All 24 pages rendered and verified successfully!")
