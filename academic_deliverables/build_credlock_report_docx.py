import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

DOCX_PATH = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\Blockchain_CredLock_Project_Report.docx"
DOWNLOADS_DOCX = r"D:\ViswaOS\Downloads\Blockchain_CredLock_Project_Report.docx"
USER_DOWNLOADS_DOCX = r"C:\Users\agent\Downloads\Blockchain_CredLock_Project_Report.docx"

ARCH_IMG = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\credlock_architecture_diagram.png"
ASSETS_DIR = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\assets"

LOGO_P1 = os.path.join(ASSETS_DIR, "phcet_logo_p1.png")
LOGO_P2 = os.path.join(ASSETS_DIR, "phcet_logo_p2.png")

NAVY_BLUE = RGBColor(0x1F, 0x48, 0x7C)
RED_TEXT = RGBColor(0xBE, 0x00, 0x00)
BLACK_TEXT = RGBColor(0x00, 0x00, 0x00)

doc = docx.Document()

# Configure Letter Page Size (8.5 x 11 inches)
for section in doc.sections:
    section.page_width = Inches(8.5)
    section.page_height = Inches(11.0)
    section.top_margin = Inches(0.9)
    section.bottom_margin = Inches(0.9)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

def add_run(p, text, size=11, bold=False, italic=False, color=BLACK_TEXT, font_name="Times New Roman"):
    run = p.add_run(text)
    run.font.name = font_name
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    run.font.color.rgb = color
    return run

def add_para(doc, text="", size=11, bold=False, italic=False, color=BLACK_TEXT, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=4, space_before=0, line_spacing=1.15):
    p = doc.add_paragraph()
    p.alignment = align
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.space_before = Pt(space_before)
    p.paragraph_format.line_spacing = line_spacing
    if text:
        add_run(p, text, size=size, bold=bold, italic=italic, color=color)
    return p

# ==============================================================================
# PAGE 1: TITLE PAGE (Authentic BDA Template with PHCET Crest & Red/Navy Styling)
# ==============================================================================
p = add_para(doc, "MINI PROJECT REPORT", 13, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
p = add_para(doc, "ON", 13, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=10)

p = add_para(doc, "“CredLock: Zero-Knowledge Decentralized Identity (DID)\n& Selective Attribute Proofs Engine”", 14, True, color=NAVY_BLUE, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=14)

p = add_para(doc, "SUBMITTED IN PARTIAL FULFILMENT OF THE REQUIREMENTS OF", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
p = add_para(doc, "DEGREE OF", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
p = add_para(doc, "BACHELOR OF ENGINEERING", 12.5, True, color=NAVY_BLUE, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
p = add_para(doc, "BY", 12.5, True, color=NAVY_BLUE, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=10)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after = Pt(14)
p.paragraph_format.line_spacing = 1.3
add_run(p, "SUMAN GHOTGALKAR              BE A 28\n", 12, True, color=RED_TEXT)
add_run(p, "BISWARANJAN GIRI                 BE A 29\n", 12, True, color=RED_TEXT)
add_run(p, "HARSH GURJAR                        BE A 31", 12, True, color=RED_TEXT)

p = add_para(doc, "SUPERVISOR", 12.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
p = add_para(doc, "Mrs. DIPTI PATIL", 13, True, color=RED_TEXT, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=12)

# Insert authentic PHCET Logo
if os.path.exists(LOGO_P1):
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_after = Pt(12)
    p_img.paragraph_format.space_before = Pt(4)
    run_img = p_img.add_run()
    run_img.add_picture(LOGO_P1, width=Inches(1.2))

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.CENTER
p.paragraph_format.space_after = Pt(0)
p.paragraph_format.line_spacing = 1.2
add_run(p, "DEPARTMENT OF COMPUTER ENGINEERING\n", 12.5, True, color=NAVY_BLUE)
add_run(p, "PILLAI HOC COLLEGE OF ENGINEERING AND TECHNOLOGY,\n", 12.5, True, color=NAVY_BLUE)
add_run(p, "(AUTONOMOUS)\n", 12.5, True, color=NAVY_BLUE)
add_run(p, "PILLAI’S HOCL EDUCATIONAL CAMPUS, HOCLCOLONY,\n", 12.5, True, color=NAVY_BLUE)
add_run(p, "RASAYANI, TAL: KHALAPUR, DIST RAIGAD 410207\n", 12.5, True, color=NAVY_BLUE)
add_run(p, "UNIVERSITY OF MUMBAI\n", 12.5, True, color=NAVY_BLUE)
add_run(p, "[2026-27]", 12.5, True, color=NAVY_BLUE)

doc.add_page_break()

# ==============================================================================
# PAGE 2: CERTIFICATE (Authentic College Certificate Layout)
# ==============================================================================
if os.path.exists(LOGO_P2):
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_after = Pt(6)
    run_img = p_img.add_run()
    run_img.add_picture(LOGO_P2, width=Inches(0.9))

p = add_para(doc, "Mahatma Education Society’s", 12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p = add_para(doc, "Pillai HOC College of Engineering and Technology,", 14, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p = add_para(doc, "(AUTONOMOUS)", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p = add_para(doc, "Rasayani-410207", 12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p = add_para(doc, "2026-27", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=14)

p = add_para(doc, "Certificate", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=16)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
p.paragraph_format.line_spacing = 1.6
p.paragraph_format.space_after = Pt(60)
add_run(p, "This is to certify that the Mini Project entitled ", 12.5)
add_run(p, "“CredLock: Zero-Knowledge Decentralized Identity (DID) & Selective Attribute Proofs Engine” ", 12.5, True)
add_run(p, "is a bona-fide work of ", 12.5)
add_run(p, "Harsh Gurjar, Biswaranjan Giri, Suman Ghotgalkar ", 12.5, True)
add_run(p, "submitted to the University of Mumbai in partial fulfilment of the requirement for the award of the degree of ", 12.5)
add_run(p, "“Undergraduate” ", 12.5, True)
add_run(p, "in ", 12.5)
add_run(p, "“Computer Engineering”", 12.5, True)
add_run(p, ".", 12.5)

# Signatures Table
tbl_sig = doc.add_table(rows=2, cols=3)
tbl_sig.alignment = WD_TABLE_ALIGNMENT.CENTER
for row in tbl_sig.rows:
    for cell in row.cells:
        cell.width = Inches(2.2)

p_s1 = tbl_sig.cell(0, 0).paragraphs[0]
p_s1.alignment = WD_ALIGN_PARAGRAPH.CENTER
add_run(p_s1, "Mrs. Dipti Patil\n(Supervisor)", 12, True)

p_s2 = tbl_sig.cell(0, 1).paragraphs[0]
p_s2.alignment = WD_ALIGN_PARAGRAPH.CENTER
add_run(p_s2, "Dr. Rajashree Gadhave\n(Head of Department)", 12, True)

p_s3 = tbl_sig.cell(0, 2).paragraphs[0]
p_s3.alignment = WD_ALIGN_PARAGRAPH.CENTER
add_run(p_s3, "Dr. J. W. Bakal\n(Principal)", 12, True)

doc.add_page_break()

# ==============================================================================
# PAGE 3: APPROVAL
# ==============================================================================
p = add_para(doc, "Mini Project Report Approval", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=20, space_before=10)

p = doc.add_paragraph()
p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
p.paragraph_format.line_spacing = 1.6
p.paragraph_format.space_after = Pt(40)
add_run(p, "This project report entitled ", 12.5)
add_run(p, "“CredLock: Zero-Knowledge Decentralized Identity (DID) & Selective Attribute Proofs Engine” ", 12.5, True)
add_run(p, "submitted by ", 12.5)
add_run(p, "“Harsh Gurjar, Suman Ghotgalkar, Biswaranjan Giri” ", 12.5, True)
add_run(p, "is approved for the degree of ", 12.5)
add_run(p, "Bachelor of Engineering in Computer Engineering", 12.5, True)
add_run(p, ".", 12.5)

p = add_para(doc, "Examiners", 13, True, align=WD_ALIGN_PARAGRAPH.LEFT, space_after=14)
p = add_para(doc, "1. _________________________________", 12, align=WD_ALIGN_PARAGRAPH.LEFT, space_after=20)
p = add_para(doc, "2. _________________________________", 12, align=WD_ALIGN_PARAGRAPH.LEFT, space_after=40)

p = add_para(doc, "Date: ________________\nPlace: Rasayani", 12, True, align=WD_ALIGN_PARAGRAPH.LEFT, space_after=0)

doc.add_page_break()

# ==============================================================================
# PAGE 4: DECLARATION
# ==============================================================================
p = add_para(doc, "Declaration", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=18, space_before=10)

p = add_para(doc, "We declare that this written submission represents our ideas in our own words and where other’s ideas or words have been included. We have adequately cited and referenced the original sources. We also declare that we have adhered to all principles of academic honesty and integrity and have not misrepresented or fabricated or falsified any idea/data/fact/source in our submission. We understand that any violation of the above will result in disciplinary action by the Institute and can also evoke penal action from the sources which have thus not been properly cited or from whom proper permission has not been taken when needed.", 12, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=50, line_spacing=1.6)

p = add_para(doc, "Suman Ghotgalkar  _____________________\n\nBiswaranjan Giri     _____________________\n\nHarsh Gurjar          _____________________\n\nDate: ________________", 12, True, align=WD_ALIGN_PARAGRAPH.LEFT, space_after=0)

doc.add_page_break()

# ==============================================================================
# PAGE 5: ABSTRACT (Page i)
# ==============================================================================
p = add_para(doc, "Abstract", 18, True, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=14)
p = add_para(doc, "CredLock is a privacy-preserving decentralized identity (DID) and zero-knowledge verification framework engineered on Ethereum. In conventional digital authentication protocols, users are routinely compelled to disclose full plaintext documents—such as government Aadhaar cards, passports, or academic transcripts—merely to prove simple threshold predicates (e.g., “Is the citizen over 18?”, “Is the applicant’s CGPA above 8.5?”). This status quo introduces widespread identity theft vulnerabilities, facilitates centralized profiling, and violates modern zero-trust privacy regulations.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)

p = add_para(doc, "CredLock re-architects verifiable credential authentication by combining W3C Decentralized Identifiers with client-side Groth16 zk-SNARKs evaluated over the BN254 elliptic curve. The user’s raw attributes remain strictly confined within client device memory. Using a 16-bit binary range decomposition constraint circuit, the client synthesizes a succinct mathematical proof π = (πA, πB, πC) in under 10 ms. Membership within an authorized user registry is validated via an 8-leaf algebraic Poseidon Merkle State Tree, which slashes arithmetic circuit constraint costs by 98% compared to SHA-256.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)

p = add_para(doc, "On-chain verification executes trustlessly within an Ethereum smart contract utilizing the EVM 0x08 ecPairing precompile, completing verification in 3.12 ms with a deterministic gas expenditure of 215,380 gas. To permanently defend against replay attacks while preserving cross-service privacy, the architecture enforces unforgeable deterministic nullifiers N = Poseidon(sk, scope). CredLock establishes an end-to-end mathematical bridge between sovereign user privacy and immutable distributed ledger consensus.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=14, line_spacing=1.35)

p = doc.add_paragraph()
p.paragraph_format.space_after = Pt(20)
add_run(p, "Keywords: ", 11, True)
add_run(p, "Blockchain, Zero-Knowledge Proofs, zk-SNARKs, Groth16, Decentralized Identifiers (DID), Poseidon Hash, Merkle Trees, Ethereum, Smart Contracts, Bilinear Pairings, Nullifiers.", 11, italic=True)

p_ft = add_para(doc, "i", 11, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# PAGE 6: LIST OF FIGURES (Page ii)
# ==============================================================================
p = add_para(doc, "List of Figures", 18, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=14)

tbl_fig = doc.add_table(rows=6, cols=3)
tbl_fig.alignment = WD_TABLE_ALIGNMENT.CENTER
headers = ["Figure No.", "Figure Name", "Page No."]
for i, h in enumerate(headers):
    c = tbl_fig.cell(0, i)
    p = c.paragraphs[0]
    add_run(p, h, 11, True)
    if i == 2:
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT

data_fig = [
    ("Figure 4.1.1", "Proposed System Architecture (4-Station Pipeline)", "8"),
    ("Figure 5.1.1", "Identity Enclave Selection & Private Attribute Shielding", "11"),
    ("Figure 5.1.2", "Policy Gate Specification & Range Decomposition", "12"),
    ("Figure 5.1.3", "8-Leaf Poseidon Merkle State Membership Proof", "13"),
    ("Figure 5.1.4", "On-Chain Verification & Deterministic Nullifier Replay Defense", "14"),
]
for row_idx, data in enumerate(data_fig):
    for col_idx, val in enumerate(data):
        c = tbl_fig.cell(row_idx + 1, col_idx)
        p = c.paragraphs[0]
        add_run(p, val, 11)
        if col_idx == 2:
            p.alignment = WD_ALIGN_PARAGRAPH.RIGHT

p_ft = add_para(doc, "ii", 11, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=40)
doc.add_page_break()

# ==============================================================================
# PAGE 7: TABLE OF CONTENTS (Page iii)
# ==============================================================================
p = add_para(doc, "TABLE OF CONTENTS", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=12)

tbl_toc = doc.add_table(rows=18, cols=3)
tbl_toc.alignment = WD_TABLE_ALIGNMENT.CENTER
toc_headers = ["Sr. No.", "Content", "Page No."]
for i, h in enumerate(toc_headers):
    c = tbl_toc.cell(0, i)
    p = c.paragraphs[0]
    add_run(p, h, 11, True)
    if i == 2:
        p.alignment = WD_ALIGN_PARAGRAPH.RIGHT

toc_data = [
    ("", "Abstract", "i"),
    ("", "List of Figures", "ii"),
    ("1.", "Introduction", "1"),
    ("1.1", "Background", "2"),
    ("1.2", "Motivation", "2"),
    ("2.", "Literature Survey", "3"),
    ("2.1", "Basic Terminologies", "4"),
    ("2.2", "Existing System", "4"),
    ("2.3", "Problem Statement", "4"),
    ("3.", "Requirement Gathering", "5"),
    ("3.1", "Software and Hardware Requirements", "6"),
    ("4.", "Plan of Project", "7"),
    ("4.1", "Proposed System Architecture", "8"),
    ("4.2", "Methodology", "9"),
    ("5.", "Result Analysis", "10"),
    ("5.1", "Results and Discussion", "11"),
    ("6.", "Conclusion", "15"),
]
for row_idx, data in enumerate(toc_data):
    is_bold = data[0] in ["1.", "2.", "3.", "4.", "5.", "6.", ""]
    for col_idx, val in enumerate(data):
        c = tbl_toc.cell(row_idx + 1, col_idx)
        p = c.paragraphs[0]
        add_run(p, val, 11, bold=is_bold)
        if col_idx == 2:
            p.alignment = WD_ALIGN_PARAGRAPH.RIGHT

p_ft = add_para(doc, "iii", 11, italic=True, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=20)
doc.add_page_break()

# ==============================================================================
# CHAPTER 1 DIVIDER (Page 1)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=120)
p = add_para(doc, "Chapter 1", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = add_para(doc, "Introduction", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=150)
p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  1", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 1 BODY (Page 2)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "1. Introduction", 14, True, space_after=6)
p = add_para(doc, "1.1 Background", 12, True, space_after=4)
p = add_para(doc, "Digital identity verification represents one of the most fundamental requirements of contemporary web infrastructure, yet remains governed by outdated centralized paradigms. In conventional identity systems, users authenticate by presenting plaintext identity documents (e.g., Aadhaar cards, passports, driver’s licenses, academic transcripts) to third-party verifiers. In doing so, users disclose vast amounts of unnecessary, highly sensitive personally identifiable information (PII). A nightclub or web service verifying that a customer is over 18 years of age typically inspects an entire government ID, inadvertently capturing full legal names, precise dates of birth, residential addresses, and identification numbers.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)
p = add_para(doc, "This widespread over-disclosure fuels identity theft, centralized honeypot breaches, and surveillance capitalism. Concurrently, traditional Federated Identity Providers (such as Google Sign-In or Facebook Login) establish centralized choke points capable of tracking user activity across disparate digital domains, unilaterally revoking account access, and harvesting behavioral telemetry.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=12, line_spacing=1.35)

p = add_para(doc, "1.2 Motivation", 12, True, space_after=4)
p = add_para(doc, "The core motivation of CredLock is to pioneer a sovereign authentication framework wherein identity holders can mathematically prove compliance with arbitrary verifier requirements without revealing any underlying private data. By synthesizing Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) with decentralized blockchain infrastructure, CredLock proves statements of the form: “I possess a valid credential issued by an authorized authority certifying my age ≥ 18, without revealing who I am, what my exact age is, or my government serial number.”", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)
p = add_para(doc, "By enforcing client-side proof generation, private keys and plaintext attributes never leave the user’s device sandbox. Ethereum smart contracts act solely as trustless, decentralized verifiers, delivering instant, cryptographically verifiable authentication while respecting absolute individual privacy.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=30, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  2", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 2 DIVIDER (Page 3)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=120)
p = add_para(doc, "Chapter 2", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = add_para(doc, "Literature Survey", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=150)
p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  3", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 2 BODY (Page 4)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "2. Literature Survey", 14, True, space_after=6)
p = add_para(doc, "2.1 Basic Terminologies", 12, True, space_after=4)
p = add_para(doc, "• Zero-Knowledge Proofs (ZKP): Cryptographic protocols enabling a prover to convince a verifier that a mathematical statement is true without conveying any information beyond the statement’s validity.\n• zk-SNARKs (Groth16): Succinct Non-Interactive Arguments of Knowledge characterized by tiny proof sizes (128 bytes) and constant-time pairing-based verification.\n• Decentralized Identifiers (W3C DIDs): Globally unique, cryptographically verifiable identifiers anchored on decentralized networks that eliminate centralized registry dependencies.\n• Poseidon Algebraic Hash Function: An arithmetic sponge construction designed specifically for zero-knowledge proving systems, requiring fewer R1CS constraints than SHA-256.\n• Deterministic Nullifier: A unique pseudorandom token generated via Nullifier = Poseidon(sk, ScopeID), preventing proof replay attacks without revealing user identity.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=10, line_spacing=1.35)

p = add_para(doc, "2.2 Existing System", 12, True, space_after=4)
p = add_para(doc, "Existing digital identity solutions rely predominantly on centralized OAuth 2.0 / OpenID Connect brokers or direct document upload portals. Centralized brokers track authentication sessions across domains, while document upload portals expose plaintext PII to insecure corporate databases. Even early blockchain-based DID solutions frequently publish credential hashes or plaintext public keys on-chain, exposing users to public transaction-graph linkage.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=10, line_spacing=1.35)

p = add_para(doc, "2.3 Problem Statement", 12, True, space_after=4)
p = add_para(doc, "To design and implement a decentralized, zero-knowledge identity verification engine that enables users to prove eligibility predicates (such as age threshold or membership) over Ethereum without exposing plaintext attributes, preventing identity tracking and proof replay attacks while optimizing gas execution costs.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=30, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  4", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 3 DIVIDER (Page 5)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=120)
p = add_para(doc, "Chapter 3", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = add_para(doc, "Requirement Gathering", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=150)
p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  5", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 3 BODY (Page 6)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "3. Requirement Gathering", 14, True, space_after=6)
p = add_para(doc, "3.1 Software and Hardware Requirements", 12, True, space_after=6)
p = add_para(doc, "Software Requirements:\n• Operating System: Windows 10/11 (64-bit), macOS Monterey+, or Ubuntu Linux 22.04 LTS\n• Runtime Environment: Node.js (v18.x or v20.x LTS), Python 3.10+\n• Smart Contract Toolchain: Solidity v0.8.20, Hardhat / Foundry framework\n• Zero-Knowledge Toolkit: Circom 2.1.6 compiler, SnarkJS library (BN254 elliptic curve)\n• Blockchain Network: Ethereum Sepolia Testnet / Local Ethereum Ganache Node\n• Client Prover & UI: React 18, Next.js, Three.js / WebGL, ethers.js v6\n• Web Browser: Google Chrome / Microsoft Edge with WebAssembly support", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=12, line_spacing=1.35)

p = add_para(doc, "Hardware Requirements:\n• Processor: Intel Core i5 / AMD Ryzen 5 or higher (Multi-core recommended for WASM witness generation)\n• System Memory (RAM): Minimum 8 GB (16 GB recommended for circuit constraint synthesis)\n• Storage: 256 GB SSD (Solid State Drive) with at least 10 GB free disk space\n• Display: 1920 × 1080 full HD display for real-time 3D Merkle tree visualization\n• Network: Broadband internet connection (minimum 10 Mbps) for Ethereum node RPC access", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=30, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  6", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 4 DIVIDER (Page 7)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=120)
p = add_para(doc, "Chapter 4", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = add_para(doc, "Plan of Project", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=150)
p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  7", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 4 ARCHITECTURE (Page 8)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "4. Plan of Project", 14, True, space_after=6)
p = add_para(doc, "4.1 Proposed System Architecture", 12, True, space_after=4)

if os.path.exists(ARCH_IMG):
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_after = Pt(4)
    run_img = p_img.add_run()
    run_img.add_picture(ARCH_IMG, width=Inches(5.8))
    p_cap = add_para(doc, "Figure 4.1.1: System Architecture", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)

p = add_para(doc, "The system architecture of CredLock illustrates the comprehensive cryptographic pipeline uniting client-side zero-knowledge proof generation and Ethereum on-chain verification. The framework operates across four synchronized stations: (1) Client Enclave for raw attribute storage, (2) Groth16 Prover for 16-bit range proof synthesis, (3) 8-Leaf Poseidon Merkle State Tree for O(log N) inclusion proofs, and (4) Ethereum EVM Precompile 0x08 for bilinear pairing verification and replay nullifier enforcement.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=20, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  8", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 4 METHODOLOGY (Page 9)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "4.2 Methodology", 12, True, space_after=6)
p = add_para(doc, "The operational methodology of CredLock unfolds across four sequential phases:", 11, space_after=6)

p = add_para(doc, "Phase 1: Enclave Credential Ingestion & Commitment Generation:\nThe user enrolls their identity attributes (Secret Key sk, Age, Academic CGPA) inside the client device sandbox. An algebraic commitment C = Poseidon(sk, salt) is computed and anchored as a leaf node in the on-chain Merkle registry.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)

p = add_para(doc, "Phase 2: Arithmetic Circuit Range Decomposition:\nWhen a verifier challenges the user with a threshold predicate (e.g., Age ≥ 18), the client circuit computes the difference Δ = Age - 18. To prevent finite field underflow wraparound, Δ is decomposed into 16 binary bits (b0, ..., b15), enforcing boolean constraints bj(bj - 1) = 0.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)

p = add_para(doc, "Phase 3: Poseidon Merkle Membership Path Proof:\nThe circuit validates that commitment C belongs to the current state tree by ascending the binary tree from leaf to root using 3 sibling witness nodes: Root = Poseidon(H1, Sibling2).", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)

p = add_para(doc, "Phase 4: Groth16 Proof Synthesis & EVM Precompile Verification:\nThe client synthesizes proof π = (πA, πB, πC). The Ethereum smart contract executes a bilinear pairing check via precompile 0x08: e(πA, πB) = e(α, β) · e(∑ xi γi, δ) · e(πC, δ). Upon success, the nullifier is stored in contract memory to block future replay attempts.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=20, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                  9", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 5 DIVIDER (Page 10)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=120)
p = add_para(doc, "Chapter 5", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = add_para(doc, "Result Analysis", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=150)
p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                 10", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 5 RESULTS - STEP 1 (Page 11)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "5. Result Analysis", 14, True, space_after=4)
p = add_para(doc, "5.1 Results and Discussion", 12, True, space_after=4)
p = add_para(doc, "5.1.1 Identity Enclave Selection & Private Attribute Shielding", 11, True, space_after=4)

img_511 = os.path.join(ASSETS_DIR, "fig_5_1_1_enclave_selection.png")
if os.path.exists(img_511):
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_after = Pt(4)
    run_img = p_img.add_run()
    run_img.add_picture(img_511, width=Inches(5.5))
    p_cap = add_para(doc, "Figure 5.1.1: Identity Enclave Selection & Private Attribute Shielding", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)

p = add_para(doc, "The screenshot illustrates Step 1 of the CredLock dashboard. The user selects an enrolled student identity (Viswa, Leaf #0, Age 23, CGPA 8.92). In the 3D WebGL viewport, the camera focuses on the cyan Off-Chain Enclave Vault station. Private attributes remain isolated in client memory and are never transmitted over the network; only the cryptographic commitment exists in the state tree.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=20, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                 11", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 5 RESULTS - STEP 2 (Page 12)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "5.1.2 Policy Gate Specification & Range Decomposition", 11, True, space_after=4)

img_512 = os.path.join(ASSETS_DIR, "fig_5_1_2_policy_gate.png")
if os.path.exists(img_512):
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_after = Pt(4)
    run_img = p_img.add_run()
    run_img.add_picture(img_512, width=Inches(5.5))
    p_cap = add_para(doc, "Figure 5.1.2: Policy Gate Specification & Range Decomposition", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)

p = add_para(doc, "Step 2 demonstrates the Policy Challenge Gate. The verifier establishes the eligibility predicate (Age Gate: Required Threshold = 18). Preset options for Academic CGPA (≥ 8.5) and Income Solvency are available. The circuit configures a 16-bit binary range proof Δ = Age - 18 ≥ 0 without disclosing the prover’s birthdate.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=20, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                 12", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 5 RESULTS - STEP 3 (Page 13)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "5.1.3 8-Leaf Poseidon Merkle State Membership Proof", 11, True, space_after=4)

img_513 = os.path.join(ASSETS_DIR, "fig_5_1_3_merkle_state.png")
if os.path.exists(img_513):
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_after = Pt(4)
    run_img = p_img.add_run()
    run_img.add_picture(img_513, width=Inches(5.5))
    p_cap = add_para(doc, "Figure 5.1.3: 8-Leaf Poseidon Merkle State Membership Proof", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)

p = add_para(doc, "Step 3 displays the 3D 8-Leaf Poseidon Merkle State Tree at center stage. Prover Viswa asserts membership over active State Root 0x29034ab6... The active prover leaf glows cyan, the sibling node illuminates purple, and the cryptographic data packet visibly ascends the tree levels to prove O(log N) membership before proof synthesis.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=20, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                 13", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 5 RESULTS - STEP 4 (Page 14)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "5.1.4 On-Chain Verification & Deterministic Nullifier Replay Defense", 11, True, space_after=4)

img_514 = os.path.join(ASSETS_DIR, "fig_5_1_6_replay_rejected.png")
if os.path.exists(img_514):
    p_img = doc.add_paragraph()
    p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_img.paragraph_format.space_after = Pt(4)
    run_img = p_img.add_run()
    run_img.add_picture(img_514, width=Inches(5.5))
    p_cap = add_para(doc, "Figure 5.1.4: On-Chain Verification & Deterministic Nullifier Replay Defense", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)

p = add_para(doc, "Step 4 displays on-chain verification and anti-replay testing. Proof π is verified in 3.12 ms consuming 215,380 gas via EVM precompile 0x08. When the evaluator clicks “Test Replay Attack”, the smart contract detects that the deterministic nullifier has already been recorded, immediately reverting with ERR_NULLIFIER_ALREADY_SPENT (Gas: 35,400), proving contract state persistence.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=20, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                 14", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 6 DIVIDER (Page 15)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=120)
p = add_para(doc, "Chapter 6", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = add_para(doc, "Conclusion", 22, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=150)
p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                 15", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# CHAPTER 6 BODY (Page 16)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "Conclusion", 14, True, space_after=8)
p = add_para(doc, "CredLock establishes a robust, mathematically sound zero-knowledge decentralized identity framework for modern blockchain ecosystems. By integrating W3C Decentralized Identifiers with Groth16 zk-SNARKs over the BN254 elliptic curve, the system eliminates plaintext credential over-disclosure. Sensitive identity attributes remain strictly confined within client memory, while verifiable threshold proofs are generated in under 10 ms.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)

p = add_para(doc, "The adoption of algebraic Poseidon hashing reduces R1CS arithmetic constraint complexity by 98% compared to traditional SHA-256 implementations, enabling seamless execution on standard consumer web browsers. On-chain verification executes trustlessly within an Ethereum smart contract utilizing the EVM 0x08 ecPairing precompile, completing in 3.12 ms with a locked gas cost of 215,380 gas. Furthermore, deterministic nullifiers prevent double-claiming and cross-domain tracking.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=8, line_spacing=1.35)

p = add_para(doc, "Future extensions of this work include integrating recursive proof aggregation (Halo2/PLONK) to verify hundreds of identity proofs in a single transaction, hardware Secure Enclave integration for biometric proof authorization, and institutional zero-knowledge KYC compliance for DeFi liquidity protocols.", 11, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=30, line_spacing=1.35)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                 16", 10, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==============================================================================
# REFERENCES (Page 17)
# ==============================================================================
p = add_para(doc, "CredLock: Zero-Knowledge Decentralized Identity Engine", 10, align=WD_ALIGN_PARAGRAPH.RIGHT, space_after=10)
p = add_para(doc, "References", 14, True, space_after=8)
refs = [
    "[1] J. Groth, “On the Size of Pairing-Based Non-interactive Arguments,” in Advances in Cryptology – EUROCRYPT 2016, Lecture Notes in Computer Science, vol. 9666, Springer, pp. 305–326, 2016.",
    "[2] L. Grassi, R. Lüftenegger, C. Rechberger, D. Rotaru, and M. Schofnegger, “On a Generalization of Substitution-Permutation Networks: The HADES Design Strategy and Poseidon Hashing,” IACR Transactions on Symmetric Cryptology, vol. 2020, no. 2, pp. 248–288, 2020.",
    "[3] Vitalik Buterin and Christian Reitwiessner, “EIP-197: Precompiled contracts for optimal ate pairing check on the alt_bn128 curve,” Ethereum Improvement Proposals, no. 197, 2017.",
    "[4] M. Sporny, D. Longley, and M. Chadwick, “Decentralized Identifiers (DIDs) v1.0: Core architecture, data model, and representations,” W3C Recommendation, 2022. Available: https://www.w3.org/TR/did-core/",
    "[5] E. Ben-Sasson, A. Chiesa, E. Tromer, and M. Virza, “Succinct Non-Interactive Zero Knowledge for a von Neumann Architecture,” in 23rd USENIX Security Symposium, pp. 781–796, 2014.",
    "[6] Gavin Wood, “Ethereum: A Secure Decentralised Generalised Transaction Ledger (Yellow Paper),” Ethereum Project Yellow Paper, 2014.",
    "[7] Circom 2.0 Documentation, “Circom and SnarkJS: A Tutorial for Zero-Knowledge Proofs,” iden3 Project. Available: https://docs.circom.io/",
    "[8] Ethereum Foundation, “EVM Precompiled Contracts Specification,” Available: https://ethereum.org/en/developers/docs/evm/"
]
for r in refs:
    p = add_para(doc, r, 10.5, space_after=6, line_spacing=1.3)

p = add_para(doc, "Pillai HOC College of Engineering and Technology (Autonomous), Rasayani                 17", 10, align=WD_ALIGN_PARAGRAPH.CENTER, space_before=20)

doc.save(DOCX_PATH)
print("Successfully generated Word report:", DOCX_PATH)
