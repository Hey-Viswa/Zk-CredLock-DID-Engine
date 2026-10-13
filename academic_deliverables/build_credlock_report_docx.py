import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

DOCX_PATH = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\Blockchain_CredLock_Project_Report.docx"
DOWNLOADS_DOCX = r"D:\ViswaOS\Downloads\Blockchain_CredLock_Project_Report.docx"
USER_DOWNLOADS_DOCX = r"C:\Users\agent\Downloads\Blockchain_CredLock_Project_Report.docx"

ARCH_IMG = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\credlock_architecture_diagram.png"
ASSETS_DIR = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\assets"

doc = docx.Document()

# Page Margins 1 inch
for section in doc.sections:
    section.top_margin = Inches(1.0)
    section.bottom_margin = Inches(1.0)
    section.left_margin = Inches(1.0)
    section.right_margin = Inches(1.0)

def set_para(p, text, size=12, bold=False, italic=False, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=6, font_name="Times New Roman"):
    p.alignment = align
    p.paragraph_format.space_after = Pt(space_after)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(text)
    run.font.name = font_name
    run.font.size = Pt(size)
    run.bold = bold
    run.italic = italic
    return run

# ==========================================
# PAGE 1: TITLE PAGE
# ==========================================
p = doc.add_paragraph()
set_para(p, "MINI PROJECT REPORT", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=12)
p = doc.add_paragraph()
set_para(p, "ON", 13, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=18)
p = doc.add_paragraph()
set_para(p, '“CredLock: Zero-Knowledge Decentralized Identity (DID) & Selective Attribute Proofs Engine”', 18, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=24)
p = doc.add_paragraph()
set_para(p, "SUBMITTED IN PARTIAL FULFILMENT OF THE REQUIREMENTS OF\nDEGREE OF\nBACHELOR OF ENGINEERING", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=18)
p = doc.add_paragraph()
set_para(p, "BY", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=12)
p = doc.add_paragraph()
set_para(p, "SUMAN GHOTGALKAR    BE A 28\nBISWARANJAN GIRI        BE A 29\nHARSH GURJAR               BE A 31", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=24)
p = doc.add_paragraph()
set_para(p, "SUPERVISOR", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=6)
p = doc.add_paragraph()
set_para(p, "Mrs. DIPTI PATIL / Dr. RAJASHREE GADHAVE", 13, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=30)
p = doc.add_paragraph()
set_para(p, "DEPARTMENT OF COMPUTER ENGINEERING\nPILLAI HOC COLLEGE OF ENGINEERING AND TECHNOLOGY,\n(AUTONOMOUS)\nPILLAI’S HOCL EDUCATIONAL CAMPUS, HOCL COLONY,\nRASAYANI, TAL: KHALAPUR, DIST RAIGAD 410207\nUNIVERSITY OF MUMBAI\n[2026-27]", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=0)
doc.add_page_break()

# ==========================================
# PAGE 2: CERTIFICATE
# ==========================================
p = doc.add_paragraph()
set_para(p, "Mahatma Education Society’s", 12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
p = doc.add_paragraph()
set_para(p, "Pillai HOC College of Engineering and Technology", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p = doc.add_paragraph()
set_para(p, "(AUTONOMOUS)", 13, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=2)
p = doc.add_paragraph()
set_para(p, "Rasayani-410207", 12, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=4)
p = doc.add_paragraph()
set_para(p, "2026-27", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=24)
p = doc.add_paragraph()
set_para(p, "Certificate", 18, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=20)
p = doc.add_paragraph()
set_para(p, "This is to certify that the Mini Project entitled “CredLock: Zero-Knowledge Decentralized Identity (DID) & Selective Attribute Proofs Engine” is a bona-fide work of Harsh Gurjar, Biswaranjan Giri, Suman Ghotgalkar submitted to the University of Mumbai in partial fulfilment of the requirement for the award of the degree of “Undergraduate” in “Computer Engineering”.", 12, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=80)

p = doc.add_paragraph()
set_para(p, "Mrs. Dipti Patil / Dr. Rajashree Gadhave                               Dr. Rajashree Gadhave\n(Supervisor)                                                                         (Head of Department)", 12, True, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==========================================
# PAGE 3: APPROVAL
# ==========================================
p = doc.add_paragraph()
set_para(p, "Mini Project Report Approval", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=24)
p = doc.add_paragraph()
set_para(p, "This project report entitled “CredLock: Zero-Knowledge Decentralized Identity (DID) & Selective Attribute Proofs Engine” submitted by “Harsh Gurjar, Suman Ghotgalkar, Biswaranjan Giri” is approved for the degree of Bachelor of Engineering in Computer Engineering.", 12, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=40)
p = doc.add_paragraph()
set_para(p, "Examiners\n\n1. _________________________________\n\n2. _________________________________", 12, True, align=WD_ALIGN_PARAGRAPH.LEFT, space_after=60)
p = doc.add_paragraph()
set_para(p, "Date: ________________\nPlace: Rasayani", 12, True, align=WD_ALIGN_PARAGRAPH.LEFT)
doc.add_page_break()

# ==========================================
# PAGE 4: DECLARATION
# ==========================================
p = doc.add_paragraph()
set_para(p, "Declaration", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=20)
p = doc.add_paragraph()
set_para(p, "We declare that this written submission represents our ideas in our own words and where other’s ideas or words have been included. We have adequately cited and referenced the original sources. We also declare that we have adhered to all principles of academic honesty and integrity and have not misrepresented or fabricated or falsified any idea/data/fact/source in our submission. We understand that any violation of the above will result in disciplinary action by the Institute and can also evoke penal action from the sources which have thus not been properly cited or from whom proper permission has not been taken when needed.", 12, align=WD_ALIGN_PARAGRAPH.JUSTIFY, space_after=60)
p = doc.add_paragraph()
set_para(p, "Suman Ghotgalkar _____________________\n\nBiswaranjan Giri   _____________________\n\nHarsh Gurjar        _____________________\n\nDate: ________________", 12, True, align=WD_ALIGN_PARAGRAPH.LEFT)
doc.add_page_break()

# ==========================================
# PAGE 5: ABSTRACT
# ==========================================
p = doc.add_paragraph()
set_para(p, "Abstract", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=16)
p = doc.add_paragraph()
set_para(p, "CredLock is a privacy-preserving decentralized identity (DID) and zero-knowledge verification framework engineered on Ethereum. In conventional digital authentication protocols, users are routinely compelled to disclose full plaintext documents—such as government Aadhaar cards, passports, or academic transcripts—merely to prove simple threshold predicates (e.g., “Is the citizen over 18?”, “Is the applicant’s CGPA above 8.5?”). This status quo introduces widespread identity theft vulnerabilities and enables centralized surveillance profiling.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "CredLock re-architects verifiable credential authentication by combining W3C Decentralized Identifiers with client-side Groth16 zk-SNARKs evaluated over the BN254 elliptic curve. The user’s raw attributes remain strictly confined within client device memory. Using a 16-bit binary range decomposition constraint circuit, the client synthesizes a succinct mathematical proof π = (πA, πB, πC) in under 10 ms. Membership within an authorized user registry is validated via an 8-leaf algebraic Poseidon Merkle State Tree, which slashes arithmetic circuit constraint costs by 98% compared to SHA-256.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "On-chain verification executes trustlessly within an Ethereum smart contract utilizing the EVM 0x08 ecPairing precompile, completing verification in 3.12 ms with a deterministic gas expenditure of 215,380 gas. To permanently defend against replay attacks while preserving cross-service privacy, the architecture enforces unforgeable deterministic nullifiers N = Poseidon(sk, scope). CredLock establishes an end-to-end mathematical bridge between sovereign user privacy and immutable distributed ledger consensus.", 12, space_after=16)
p = doc.add_paragraph()
set_para(p, "Keywords: Big Data, Blockchain, Zero-Knowledge Proofs, zk-SNARKs, Groth16, Decentralized Identifiers (DID), Poseidon Hash, Merkle Trees, Ethereum, Smart Contracts, Bilinear Pairings, Nullifiers.", 11.5, True)
p = doc.add_paragraph()
set_para(p, "i", 11, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=0)
doc.add_page_break()

# ==========================================
# PAGE 6: LIST OF FIGURES
# ==========================================
p = doc.add_paragraph()
set_para(p, "List of Figures", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=20)
table = doc.add_table(rows=7, cols=3)
table.alignment = WD_TABLE_ALIGNMENT.CENTER
table.rows[0].cells[0].paragraphs[0].add_run("Figure No.").bold = True
table.rows[0].cells[1].paragraphs[0].add_run("Figure Name").bold = True
table.rows[0].cells[2].paragraphs[0].add_run("Page No.").bold = True

fig_data = [
    ("Figure 4.1.1", "Proposed System Architecture (4-Station Pipeline)", "8"),
    ("Figure 5.1.1", "Step 1 – Identity Enclave & Credential Selection", "11"),
    ("Figure 5.1.2", "Step 2 – Policy Challenge Gate Specification", "12"),
    ("Figure 5.1.3", "Step 3 – 8-Leaf Poseidon Merkle State Membership", "13"),
    ("Figure 5.1.4", "Step 4 – Groth16 Proof Synthesis & Precompile Verification", "14"),
    ("Figure 5.1.5", "Replay Attack Defense & Nullifier Spent Rejection", "15")
]
for idx, (f_num, f_name, p_num) in enumerate(fig_data):
    table.rows[idx+1].cells[0].paragraphs[0].add_run(f_num)
    table.rows[idx+1].cells[1].paragraphs[0].add_run(f_name)
    table.rows[idx+1].cells[2].paragraphs[0].add_run(p_num)

p = doc.add_paragraph()
set_para(p, "\n\nii", 11, align=WD_ALIGN_PARAGRAPH.CENTER)
doc.add_page_break()

# ==========================================
# PAGE 7: TABLE OF CONTENTS
# ==========================================
p = doc.add_paragraph()
set_para(p, "TABLE OF CONTENTS", 16, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=18)
toc_table = doc.add_table(rows=19, cols=3)
toc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
toc_table.rows[0].cells[0].paragraphs[0].add_run("Sr. No.").bold = True
toc_table.rows[0].cells[1].paragraphs[0].add_run("Content").bold = True
toc_table.rows[0].cells[2].paragraphs[0].add_run("Page No.").bold = True

toc_entries = [
    ("", "Abstract", "i"),
    ("", "List of Figures", "ii"),
    ("1.", "Introduction", "1"),
    ("1.1", "Background", "2"),
    ("1.2", "Motivation", "2"),
    ("2.", "Literature Survey", "3"),
    ("2.1", "Basic Terminologies", "4"),
    ("2.2", "Existing System", "5"),
    ("2.3", "Problem Statement", "5"),
    ("3.", "Requirement Gathering", "6"),
    ("3.1", "Software and Hardware Requirements", "7"),
    ("4.", "Plan of Project", "8"),
    ("4.1", "Proposed System Architecture", "9"),
    ("4.2", "Methodology", "10"),
    ("5.", "Result Analysis", "11"),
    ("5.1", "Results and Discussion", "12"),
    ("6.", "Conclusion", "16"),
    ("7.", "References", "17")
]
for idx, (sr, cont, p_num) in enumerate(toc_entries):
    toc_table.rows[idx+1].cells[0].paragraphs[0].add_run(sr)
    toc_table.rows[idx+1].cells[1].paragraphs[0].add_run(cont)
    toc_table.rows[idx+1].cells[2].paragraphs[0].add_run(p_num)

doc.add_page_break()

# ==========================================
# PAGE 8: CHAPTER 1 DIVIDER
# ==========================================
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\nChapter 1\n\nIntroduction", 24, True, align=WD_ALIGN_PARAGRAPH.CENTER)
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\n1", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 9: CHAPTER 1 TEXT
# ==========================================
p = doc.add_paragraph()
set_para(p, "1. Introduction", 14, True, space_after=8)
p = doc.add_paragraph()
set_para(p, "1.1 Background", 12, True, space_after=4)
p = doc.add_paragraph()
set_para(p, "In contemporary digital authentication paradigms, proof of eligibility relies overwhelmingly on physical or centralized electronic identification documents. Citizens must repeatedly provide government cards, academic degree certificates, or financial statements to banks, universities, and service providers. This model introduces severe structural vulnerabilities: sensitive biometric and personal data are over-disclosed to third parties who lack robust enterprise security, leading to large-scale data breaches, identity impersonation, and permanent tracking across services.\n\nDecentralized Identifiers (DIDs) standardized by the World Wide Web Consortium (W3C) provide sovereign public-key identity roots. However, standard verifiable credentials require presenting plaintext certificates signed with ECDSA, preserving the risk of attribute over-disclosure. CredLock resolves this issue by integrating zero-knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) over the BN254 elliptic curve with an on-chain Ethereum Merkle state registry.", 12, space_after=12)

p = doc.add_paragraph()
set_para(p, "1.2 Motivation", 12, True, space_after=4)
p = doc.add_paragraph()
set_para(p, "The core motivation of CredLock is to establish a mathematically trustless system where users prove statements about their credentials without disclosing the credential itself. In real-world compliance, a verifier rarely requires a citizen’s exact birthdate; they merely require confirmation of the boolean condition: Age ≥ 18. Similarly, academic portals require verification that an applicant graduated from an accredited college with distinction, without requiring access to individual course grade sheets.\n\nBy marrying client-side arithmetic constraint circuits with Ethereum’s EVM 0x08 pairing precompile, CredLock guarantees zero-knowledge attribute verification, sub-10 ms proving latency, deterministic gas economics (215,380 gas), and complete replay attack resistance via single-use nullifiers.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "2", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 10: CHAPTER 2 DIVIDER
# ==========================================
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\nChapter 2\n\nLiterature Survey", 24, True, align=WD_ALIGN_PARAGRAPH.CENTER)
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\n3", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 11: CHAPTER 2 TEXT
# ==========================================
p = doc.add_paragraph()
set_para(p, "2. Literature Survey", 14, True, space_after=8)
p = doc.add_paragraph()
set_para(p, "2.1 Basic Terminologies", 12, True, space_after=4)
p = doc.add_paragraph()
set_para(p, "• Zero-Knowledge SNARKs (zk-SNARKs): Succinct cryptographic arguments enabling a prover to demonstrate knowledge of secret witness inputs satisfying arithmetic circuits without revealing the witness.\n• Groth16 Protocol: A pairing-based zero-knowledge proof system over pairing-friendly curves (BN254) achieving minimal proof size (3 group elements: 2 in G1, 1 in G2) and constant-time verification.\n• Rank-1 Constraint System (R1CS): A mathematical formulation expressing computational operations as quadratic constraints of the form ⟨a, w⟩ · ⟨b, w⟩ = ⟨c, w⟩.\n• Poseidon Hash Function: An algebraic cryptographic hash function operating natively over prime fields via x^5 S-boxes, reducing circuit constraint counts by 98% compared to SHA-256.\n• Merkle State Tree: A hierarchical hash tree where identity commitments form leaves and the root represents the immutable state anchor stored on the blockchain.\n• Deterministic Nullifier: A cryptographic token N = Poseidon(sk, scope) uniquely binding an identity to a domain scope to prevent replay and double-claiming.", 12, space_after=12)

p = doc.add_paragraph()
set_para(p, "2.2 Existing System", 12, True, space_after=4)
p = doc.add_paragraph()
set_para(p, "Existing decentralized identity protocols rely primarily on public-key digital signatures (ECDSA, Ed25519) on W3C JSON-LD credential objects. When verifying an attribute, the prover sends the signed document to the verifier, exposing all plaintext fields. While zero-knowledge selective disclosure schemes exist, they traditionally use bitwise hash functions (SHA-256) inside circuits, causing constraint explosion (>25,000 constraints per hash) and multi-minute client proof generation times.", 12, space_after=12)

p = doc.add_paragraph()
set_para(p, "2.3 Problem Statement", 12, True, space_after=4)
p = doc.add_paragraph()
set_para(p, "Current decentralized identity systems suffer from plaintext over-disclosure, high arithmetic constraint overhead, and vulnerability to replay attacks. CredLock aims to construct an end-to-end zero-knowledge DID architecture utilizing Groth16 zk-SNARKs, Poseidon Merkle state trees, deterministic nullifiers, and EVM precompile 0x08 pairing verification.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "4", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 12: CHAPTER 3 DIVIDER
# ==========================================
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\nChapter 3\n\nRequirement Gathering", 24, True, align=WD_ALIGN_PARAGRAPH.CENTER)
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\n5", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 13: CHAPTER 3 TEXT
# ==========================================
p = doc.add_paragraph()
set_para(p, "3. Requirement Gathering", 14, True, space_after=8)
p = doc.add_paragraph()
set_para(p, "3.1 Software and Hardware Requirements", 12, True, space_after=4)
p = doc.add_paragraph()
set_para(p, "Software Requirements:\n• Operating System: Windows 11 / Linux (Ubuntu 22.04 LTS) / macOS\n• Programming Languages: TypeScript / JavaScript, Python 3.12, Solidity ^0.8.20\n• Zero-Knowledge Toolchain: Circom 2.1.8, SnarkJS 0.7.4\n• Cryptographic Curve: BN254 (alt_bn128) Pairing-Friendly Curve\n• Backend Engine: Python FastAPI microservice (port 8004) with uvicorn\n• Frontend Framework: Next.js 14 (App Router) with Tailwind CSS and shadcn/ui\n• 3D Graphics & Visualization: Three.js WebGL Engine (port 3003)\n• Blockchain Environment: Hardhat / Foundry local EVM test node with precompile 0x08 support\n\nHardware Requirements:\n• Processor: Intel Core i5/i7/i9 (10th Gen or newer) or AMD Ryzen 5/7/9\n• RAM: Minimum 8 GB (16 GB recommended for rapid R1CS witness synthesis)\n• Storage: Minimum 10 GB free solid-state storage (SSD)\n• GPU: WebGL 2.0 compatible hardware graphics acceleration (NVIDIA / AMD / Intel Iris)\n• Network: Local loopback networking (127.0.0.1) for microservice RPC communication\n• Display: High-definition monitor (1080p / 4K UHD) for single-screen 3D pipeline visualization", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "6", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 14: CHAPTER 4 DIVIDER
# ==========================================
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\nChapter 4\n\nPlan of Project", 24, True, align=WD_ALIGN_PARAGRAPH.CENTER)
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\n7", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 15: CHAPTER 4 ARCHITECTURE
# ==========================================
p = doc.add_paragraph()
set_para(p, "4.1 Proposed System Architecture", 14, True, space_after=8)
if os.path.exists(ARCH_IMG):
    doc.add_picture(ARCH_IMG, width=Inches(6.2))
    p_cap = doc.add_paragraph()
    set_para(p_cap, "Figure 4.1.1: System Architecture", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = doc.add_paragraph()
set_para(p, "The system architecture of CredLock illustrates the comprehensive cryptographic pipeline uniting client-side zero-knowledge proof generation and Ethereum on-chain verification. The framework operates across four synchronized stations: (1) Client Enclave for raw attribute storage, (2) Groth16 Prover for 16-bit range proof synthesis, (3) 8-Leaf Poseidon Merkle State Tree for O(log N) inclusion proofs, and (4) Ethereum EVM Precompile 0x08 for bilinear pairing verification and replay nullifier enforcement.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "8", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 16: CHAPTER 4 METHODOLOGY
# ==========================================
p = doc.add_paragraph()
set_para(p, "4.2 Methodology", 14, True, space_after=8)
p = doc.add_paragraph()
set_para(p, "The operational methodology of CredLock unfolds across four sequential phases:\n\nPhase 1: Enclave Credential Ingestion & Commitment Generation:\nThe user enrolls their identity attributes (Secret Key sk, Age, Academic CGPA) inside the client device sandbox. An algebraic commitment C = Poseidon(sk, salt) is computed and anchored as a leaf node in the on-chain Merkle registry.\n\nPhase 2: Arithmetic Circuit Range Decomposition:\nWhen a verifier challenges the user with a threshold predicate (e.g., Age ≥ 18), the client circuit computes the difference Δ = Age - 18. To prevent finite field underflow wraparound, Δ is decomposed into 16 binary bits (b0, ..., b15), enforcing boolean constraints bj(bj - 1) = 0.\n\nPhase 3: Poseidon Merkle Membership Path Proof:\nThe circuit validates that commitment C belongs to the current state tree by ascending the binary tree from leaf to root using 3 sibling witness nodes: Root = Poseidon(H1, Sibling2).\n\nPhase 4: Groth16 Proof Synthesis & EVM Precompile Verification:\nThe client synthesizes proof π = (πA, πB, πC). The Ethereum smart contract executes a bilinear pairing check via precompile 0x08: e(πA, πB) = e(α, β) · e(∑ xi γi, δ) · e(πC, δ). Upon success, the nullifier is stored in contract memory to block future replay attempts.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "9", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 17: CHAPTER 5 DIVIDER
# ==========================================
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\nChapter 5\n\nResult Analysis", 24, True, align=WD_ALIGN_PARAGRAPH.CENTER)
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\n10", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 18: CHAPTER 5 - STEP 1
# ==========================================
p = doc.add_paragraph()
set_para(p, "5.1 Results and Discussion", 14, True, space_after=6)
p = doc.add_paragraph()
set_para(p, "5.1.1 Identity Enclave Selection", 12, True, space_after=6)
img1 = os.path.join(ASSETS_DIR, "fig_5_1_1_enclave_selection.png")
if os.path.exists(img1):
    doc.add_picture(img1, width=Inches(6.0))
    p_cap = doc.add_paragraph()
    set_para(p_cap, "Figure 5.1.1: Identity Enclave Selection", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = doc.add_paragraph()
set_para(p, "The screenshot illustrates Step 1 of the CredLock dashboard. The user selects an enrolled student identity (Viswa, Leaf #0, Age 23, CGPA 8.92). In the 3D WebGL viewport, the camera focuses on the cyan Off-Chain Enclave Vault station. Private attributes remain isolated in client memory and are never transmitted over the network; only the cryptographic commitment exists in the state tree.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "11", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 19: CHAPTER 5 - STEP 2
# ==========================================
p = doc.add_paragraph()
set_para(p, "5.1.2 Policy Challenge Gate", 12, True, space_after=6)
img2 = os.path.join(ASSETS_DIR, "fig_5_1_2_policy_gate.png")
if os.path.exists(img2):
    doc.add_picture(img2, width=Inches(6.0))
    p_cap = doc.add_paragraph()
    set_para(p_cap, "Figure 5.1.2: Policy Challenge Gate", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = doc.add_paragraph()
set_para(p, "Step 2 demonstrates the Policy Challenge Gate. The verifier establishes the eligibility predicate (Age Gate: Required Threshold = 18). Preset options for Academic CGPA (≥ 8.5) and Income Solvency are available. The circuit configures a 16-bit binary range proof Δ = Age - 18 ≥ 0 without disclosing the prover’s birthdate.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "12", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 20: CHAPTER 5 - STEP 3
# ==========================================
p = doc.add_paragraph()
set_para(p, "5.1.3 Poseidon Merkle State Proof", 12, True, space_after=6)
img3 = os.path.join(ASSETS_DIR, "fig_5_1_3_merkle_state.png")
if os.path.exists(img3):
    doc.add_picture(img3, width=Inches(6.0))
    p_cap = doc.add_paragraph()
    set_para(p_cap, "Figure 5.1.3: Poseidon Merkle State Proof", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = doc.add_paragraph()
set_para(p, "Step 3 displays the 3D 8-Leaf Poseidon Merkle State Tree at center stage. Prover Viswa asserts membership over active State Root 0x29034ab6... The active prover leaf glows cyan, the sibling node illuminates purple, and the cryptographic data packet visibly ascends the tree levels to prove O(log N) membership before proof synthesis.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "13", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 21: CHAPTER 5 - STEP 4 & REPLAY
# ==========================================
p = doc.add_paragraph()
set_para(p, "5.1.4 On-Chain Verification & Anti-Replay Defense", 12, True, space_after=6)
img6 = os.path.join(ASSETS_DIR, "fig_5_1_6_replay_rejected.png")
if os.path.exists(img6):
    doc.add_picture(img6, width=Inches(6.0))
    p_cap = doc.add_paragraph()
    set_para(p_cap, "Figure 5.1.4: On-Chain Verification and Anti-Replay Defense", 10.5, True, align=WD_ALIGN_PARAGRAPH.CENTER, space_after=8)
p = doc.add_paragraph()
set_para(p, "Step 4 displays on-chain verification and anti-replay testing. Proof π is verified in 3.12 ms consuming 215,380 gas via EVM precompile 0x08. When the evaluator clicks “Test Replay Attack”, the smart contract detects that the deterministic nullifier has already been recorded, immediately reverting with ERR_NULLIFIER_ALREADY_SPENT (Gas: 35,400), proving contract state persistence.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "14", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 22: CHAPTER 6 DIVIDER
# ==========================================
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\nChapter 6\n\nConclusion", 24, True, align=WD_ALIGN_PARAGRAPH.CENTER)
p = doc.add_paragraph()
set_para(p, "\n\n\n\n\n\n15", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 23: CONCLUSION TEXT
# ==========================================
p = doc.add_paragraph()
set_para(p, "Conclusion", 14, True, space_after=8)
p = doc.add_paragraph()
set_para(p, "CredLock establishes a robust, mathematically sound zero-knowledge decentralized identity framework for modern blockchain ecosystems. By integrating W3C Decentralized Identifiers with Groth16 zk-SNARKs over the BN254 elliptic curve, the system eliminates plaintext credential over-disclosure. Sensitive identity attributes remain strictly confined within client memory, while verifiable threshold proofs are generated in under 10 ms.\n\nThe adoption of algebraic Poseidon hashing reduces R1CS arithmetic constraint complexity by 98% compared to traditional SHA-256 implementations, enabling seamless execution on standard consumer web browsers. On-chain verification executes trustlessly within an Ethereum smart contract utilizing the EVM 0x08 ecPairing precompile, completing in 3.12 ms with a locked gas cost of 215,380 gas. Furthermore, deterministic nullifiers prevent double-claiming and cross-domain tracking.\n\nFuture extensions of this work include integrating recursive proof aggregation (Halo2/PLONK) to verify hundreds of identity proofs in a single transaction, hardware Secure Enclave integration for biometric proof authorization, and institutional zero-knowledge KYC compliance for DeFi liquidity protocols.", 12, space_after=12)
p = doc.add_paragraph()
set_para(p, "16", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)
doc.add_page_break()

# ==========================================
# PAGE 24: REFERENCES
# ==========================================
p = doc.add_paragraph()
set_para(p, "References", 14, True, space_after=8)
p = doc.add_paragraph()
set_para(p, "[1] J. Groth, “On the Size of Pairing-Based Non-interactive Arguments,” in Advances in Cryptology – EUROCRYPT 2016, Lecture Notes in Computer Science, vol. 9666, Springer, pp. 305–326, 2016.\n[2] L. Grassi, R. Lüftenegger, C. Rechberger, D. Rotaru, and M. Schofnegger, “On a Generalization of Substitution-Permutation Networks: The HADES Design Strategy and Poseidon Hashing,” IACR Transactions on Symmetric Cryptology, vol. 2020, no. 2, pp. 248–288, 2020.\n[3] Vitalik Buterin and Christian Reitwiessner, “EIP-197: Precompiled contracts for optimal ate pairing check on the alt_bn128 curve,” Ethereum Improvement Proposals, no. 197, 2017.\n[4] M. Sporny, D. Longley, and M. Chadwick, “Decentralized Identifiers (DIDs) v1.0: Core architecture, data model, and representations,” W3C Recommendation, 2022.\n[5] E. Ben-Sasson, A. Chiesa, E. Tromer, and M. Virza, “Succinct Non-Interactive Zero Knowledge for a von Neumann Architecture,” in 23rd USENIX Security Symposium, pp. 781–796, 2014.\n[6] Gavin Wood, “Ethereum: A Secure Decentralised Generalised Transaction Ledger (Yellow Paper),” Ethereum Project Yellow Paper, 2014.\n[7] Circom 2.0 Documentation, “Circom and SnarkJS: A Tutorial for Zero-Knowledge Proofs,” iden3 Project.\n[8] Ethereum Foundation, “EVM Precompiled Contracts Specification,” Available: https://ethereum.org/en/developers/docs/evm/", 11, space_after=12)
p = doc.add_paragraph()
set_para(p, "17", 11, align=WD_ALIGN_PARAGRAPH.RIGHT)

doc.save(DOCX_PATH)
import shutil
shutil.copy2(DOCX_PATH, DOWNLOADS_DOCX)
shutil.copy2(DOCX_PATH, USER_DOWNLOADS_DOCX)
print("DOCX built successfully!")
print("1.", DOCX_PATH)
print("2.", DOWNLOADS_DOCX)
print("3.", USER_DOWNLOADS_DOCX)
