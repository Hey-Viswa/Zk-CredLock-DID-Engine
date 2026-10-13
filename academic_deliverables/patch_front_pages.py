import fitz
import os

bda_path = r"C:\Users\agent\Downloads\BDA Report_261013_203123.pdf"
out_dir = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables"

doc = fitz.open(bda_path)

# Extract only first 4 pages
doc_front = fitz.open()
doc_front.insert_pdf(doc, from_page=0, to_page=3)

# Fonts
times_font = r"C:\Windows\Fonts\times.ttf"
times_bd_font = r"C:\Windows\Fonts\timesbd.ttf"
navy_color = (0x1f / 255.0, 0x48 / 255.0, 0x7c / 255.0)
black_color = (0.0, 0.0, 0.0)

# ================= PAGE 1 =================
p1 = doc_front[0]
# Redact old title: “Car Sales Data Analysis and Price Prediction Using Random Forest in R”
# Located around bbox [73.6, 121.2, 554.1, 137.9]
rect_p1 = fitz.Rect(50, 115, 570, 142)
p1.add_redact_annot(rect_p1, fill=(1, 1, 1))
p1.apply_redactions()

# Insert new title in 2 lines, centered, exact navy color & bold Times
title_line1 = "“CredLock: Zero-Knowledge Decentralized Identity (DID)"
title_line2 = "& Selective Attribute Proofs Engine”"

# Calculate centered position for line 1 and 2
p1.insert_text(
    fitz.Point(306 - fitz.get_text_length(title_line1, fontname="Times-Bold", fontsize=13.5)/2, 126),
    title_line1,
    fontname="Times-Bold",
    fontsize=13.5,
    color=navy_color
)
p1.insert_text(
    fitz.Point(306 - fitz.get_text_length(title_line2, fontname="Times-Bold", fontsize=13.5)/2, 140),
    title_line2,
    fontname="Times-Bold",
    fontsize=13.5,
    color=navy_color
)

# ================= PAGE 2 =================
p2 = doc_front[1]
# Lines 1 & 2 of certificate paragraph: y=240 to y=295
# "This is to certify that the Mini Project entitled “Air Traffic Network Analysis..."
rect_p2 = fitz.Rect(80, 235, 550, 295)
p2.add_redact_annot(rect_p2, fill=(1, 1, 1))
p2.apply_redactions()

# Let's cleanly insert the updated line 1 and line 2
# Line 1: "This is to certify that the Mini Project entitled “CredLock: Zero-Knowledge"
# Line 2: "Decentralized Identity (DID) & Selective Attribute Proofs Engine” is a bona-fide"
# Line 1 text
p2.insert_text(
    fitz.Point(84.9, 255.0),
    "This is to certify that the Mini Project entitled ",
    fontname="Times-Roman",
    fontsize=13.0,
    color=black_color
)
len_t1 = fitz.get_text_length("This is to certify that the Mini Project entitled ", fontname="Times-Roman", fontsize=13.0)
p2.insert_text(
    fitz.Point(84.9 + len_t1, 255.0),
    "“CredLock: Zero-Knowledge",
    fontname="Times-Bold",
    fontsize=13.0,
    color=black_color
)

# Line 2 text
p2.insert_text(
    fitz.Point(84.9, 280.0),
    "Decentralized Identity (DID) & Selective Attribute Proofs Engine” ",
    fontname="Times-Bold",
    fontsize=13.0,
    color=black_color
)
len_t2 = fitz.get_text_length("Decentralized Identity (DID) & Selective Attribute Proofs Engine” ", fontname="Times-Bold", fontsize=13.0)
p2.insert_text(
    fitz.Point(84.9 + len_t2, 280.0),
    "is a bona-fide",
    fontname="Times-Roman",
    fontsize=13.0,
    color=black_color
)

# ================= PAGE 3 =================
p3 = doc_front[2]
# Redact paragraph lines on Page 3 from y=175 to y=260
rect_p3 = fitz.Rect(30, 175, 585, 260)
p3.add_redact_annot(rect_p3, fill=(1, 1, 1))
p3.apply_redactions()

# Reinsert lines matching authentic approval layout
p3.insert_text(
    fitz.Point(36.0, 195.0),
    "This project report entitled ",
    fontname="Times-Roman",
    fontsize=13.0,
    color=black_color
)
len_app1 = fitz.get_text_length("This project report entitled ", fontname="Times-Roman", fontsize=13.0)
p3.insert_text(
    fitz.Point(36.0 + len_app1, 195.0),
    "“CredLock: Zero-Knowledge Decentralized Identity",
    fontname="Times-Bold",
    fontsize=13.0,
    color=black_color
)

p3.insert_text(
    fitz.Point(36.0, 218.0),
    "(DID) & Selective Attribute Proofs Engine” ",
    fontname="Times-Bold",
    fontsize=13.0,
    color=black_color
)
len_app2 = fitz.get_text_length("(DID) & Selective Attribute Proofs Engine” ", fontname="Times-Bold", fontsize=13.0)
p3.insert_text(
    fitz.Point(36.0 + len_app2, 218.0),
    "submitted by ",
    fontname="Times-Roman",
    fontsize=13.0,
    color=black_color
)
len_app2_sub = fitz.get_text_length("submitted by ", fontname="Times-Roman", fontsize=13.0)
p3.insert_text(
    fitz.Point(36.0 + len_app2 + len_app2_sub, 218.0),
    "“Harsh Gurjar, Suman Ghotgalkar,",
    fontname="Times-Bold",
    fontsize=13.0,
    color=black_color
)

p3.insert_text(
    fitz.Point(36.0, 241.0),
    "Biswaranjan Giri” ",
    fontname="Times-Bold",
    fontsize=13.0,
    color=black_color
)
len_app3 = fitz.get_text_length("Biswaranjan Giri” ", fontname="Times-Bold", fontsize=13.0)
p3.insert_text(
    fitz.Point(36.0 + len_app3, 241.0),
    "is approved for the degree of ",
    fontname="Times-Roman",
    fontsize=13.0,
    color=black_color
)
len_app3_app = fitz.get_text_length("is approved for the degree of ", fontname="Times-Roman", fontsize=13.0)
p3.insert_text(
    fitz.Point(36.0 + len_app3 + len_app3_app, 241.0),
    "Bachelor of Engineering in Computer Engineering.",
    fontname="Times-Bold",
    fontsize=13.0,
    color=black_color
)

# Page 4 is untouched Declaration!

test_pdf_path = os.path.join(out_dir, "patched_front_pages.pdf")
doc_front.save(test_pdf_path)
print("Saved patched front pages to:", test_pdf_path)

# Render them to PNG for visual verification
for i in range(4):
    pix = doc_front[i].get_pixmap(dpi=150)
    pix.save(os.path.join(out_dir, f"test_front_p{i+1}.png"))
print("Rendered test images 1-4 successfully.")
