import os
import subprocess
import fitz

REPORT_DIR = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables"
ASSETS_DIR = os.path.join(REPORT_DIR, "assets")
ARCH_IMG = os.path.join(REPORT_DIR, "credlock_architecture_diagram.png")
BODY_HTML_PATH = os.path.join(REPORT_DIR, "body_pages.html")
BODY_PDF_PATH = os.path.join(REPORT_DIR, "body_pages.pdf")
FRONT_PDF_PATH = os.path.join(REPORT_DIR, "patched_front_pages.pdf")
FINAL_PDF_PATH = os.path.join(REPORT_DIR, "Blockchain_CredLock_Project_Report.pdf")
EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

def to_url(p):
    return "file:///" + p.replace("\\", "/")

img_arch = to_url(ARCH_IMG)
img_511 = to_url(os.path.join(ASSETS_DIR, "fig_5_1_1_enclave_selection.png"))
img_512 = to_url(os.path.join(ASSETS_DIR, "fig_5_1_2_policy_gate.png"))
img_513 = to_url(os.path.join(ASSETS_DIR, "fig_5_1_3_merkle_state.png"))
img_514 = to_url(os.path.join(ASSETS_DIR, "fig_5_1_6_replay_rejected.png"))

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CredLock Body Pages</title>
<style>
  @page {{
    size: 8.5in 11in;
    margin: 0;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: 'Times New Roman', Times, serif;
    font-size: 11pt;
    line-height: 1.45;
    color: #000000;
    background: #ffffff;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}
  .page {{
    width: 8.5in;
    height: 11in;
    page-break-after: always;
    position: relative;
    padding: 22mm 24mm 22mm 24mm;
    overflow: hidden;
    background: #ffffff;
  }}

  /* Authentic Running Header matching BDA report */
  .header-running {{
    position: absolute;
    top: 10mm;
    left: 24mm;
    right: 24mm;
    font-size: 10.5pt;
    font-family: 'Times New Roman', Times, serif;
    color: #111;
    text-align: right;
  }}

  /* Authentic Running Footer matching BDA report */
  .footer-running {{
    position: absolute;
    bottom: 12mm;
    left: 24mm;
    right: 24mm;
    display: flex;
    justify-content: space-between;
    font-size: 10.5pt;
    font-family: 'Times New Roman', Times, serif;
    color: #000;
  }}
  .footer-center-prelim {{
    position: absolute;
    bottom: 12mm;
    left: 24mm;
    right: 24mm;
    text-align: center;
    font-size: 11pt;
    font-style: italic;
    font-family: 'Times New Roman', Times, serif;
  }}

  /* Typography */
  h1.chap-head {{
    text-align: center;
    font-size: 20pt;
    font-weight: bold;
    margin-top: 12mm;
    margin-bottom: 6mm;
  }}
  h2.sec-head {{
    font-size: 14pt;
    font-weight: bold;
    margin-top: 4mm;
    margin-bottom: 3mm;
  }}
  h3.subsec-head {{
    font-size: 12pt;
    font-weight: bold;
    margin-top: 3.5mm;
    margin-bottom: 2mm;
  }}
  p {{
    text-align: justify;
    margin-bottom: 3mm;
    font-size: 11pt;
    line-height: 1.45;
  }}
  ul, ol {{
    margin-left: 6mm;
    margin-bottom: 3mm;
  }}
  li {{
    margin-bottom: 1.5mm;
    text-align: justify;
    font-size: 11pt;
    line-height: 1.45;
  }}

  /* Divider Pages matching BDA Chapter divider layout */
  .divider-container {{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100%;
    margin-top: -10mm;
  }}
  .divider-chap {{
    font-size: 22pt;
    font-weight: bold;
    margin-bottom: 4mm;
  }}
  .divider-title {{
    font-size: 22pt;
    font-weight: bold;
  }}

  /* Tables */
  .toc-table, .fig-table {{
    width: 100%;
    border-collapse: collapse;
    margin-top: 4mm;
  }}
  .toc-table th, .fig-table th {{
    border-bottom: 1.5px solid #000;
    padding: 6px 4px;
    font-size: 11pt;
    font-weight: bold;
    text-align: left;
  }}
  .toc-table td, .fig-table td {{
    padding: 5px 4px;
    font-size: 11pt;
  }}

  /* Figures */
  .figure-box {{
    text-align: center;
    margin: 3mm 0 3.5mm 0;
  }}
  .figure-box img {{
    max-width: 98%;
    max-height: 98mm;
    object-fit: contain;
    border: 1px solid #333;
  }}
  .figure-caption {{
    font-size: 10.5pt;
    font-weight: bold;
    margin-top: 2.5mm;
    text-align: center;
  }}
</style>
</head>
<body>

<!-- =================================================================== -->
<!-- PAGE 5: ABSTRACT (Page i) -->
<!-- =================================================================== -->
<div class="page" style="padding-top: 20mm;">
  <p style="text-align: center; font-size: 20pt; font-weight: bold; font-style: italic; margin-bottom: 8mm;">
    Abstract
  </p>
  <p>
    CredLock is a privacy-preserving decentralized identity (DID) and zero-knowledge verification framework engineered on Ethereum. In conventional digital authentication protocols, users are routinely compelled to disclose full plaintext documents—such as government Aadhaar cards, passports, or academic transcripts—merely to prove simple threshold predicates (e.g., “Is the citizen over 18?”, “Is the applicant’s CGPA above 8.5?”). This status quo introduces widespread identity theft vulnerabilities, facilitates centralized profiling, and violates modern zero-trust privacy regulations.
  </p>
  <p>
    CredLock re-architects verifiable credential authentication by combining W3C Decentralized Identifiers with client-side Groth16 zk-SNARKs evaluated over the BN254 elliptic curve. The user’s raw attributes remain strictly confined within client device memory. Using a 16-bit binary range decomposition constraint circuit, the client synthesizes a succinct mathematical proof π = (π<sub>A</sub>, π<sub>B</sub>, π<sub>C</sub>) in under 10 ms. Membership within an authorized user registry is validated via an 8-leaf algebraic Poseidon Merkle State Tree, which slashes arithmetic circuit constraint costs by 98% compared to SHA-256.
  </p>
  <p>
    On-chain verification executes trustlessly within an Ethereum smart contract utilizing the EVM 0x08 ecPairing precompile, completing verification in 3.12 ms with a deterministic gas expenditure of 215,380 gas. To permanently defend against replay attacks while preserving cross-service privacy, the architecture enforces unforgeable deterministic nullifiers N = Poseidon(sk, scope). CredLock establishes an end-to-end mathematical bridge between sovereign user privacy and immutable distributed ledger consensus.
  </p>
  <p style="margin-top: 6mm;">
    <strong>Keywords:</strong> <em>Blockchain, Zero-Knowledge Proofs, zk-SNARKs, Groth16, Decentralized Identifiers (DID), Poseidon Hash, Merkle Trees, Ethereum, Smart Contracts, Bilinear Pairings, Nullifiers.</em>
  </p>
  <div class="footer-center-prelim">i</div>
</div>

<!-- =================================================================== -->
<!-- PAGE 6: LIST OF FIGURES (Page ii) -->
<!-- =================================================================== -->
<div class="page" style="padding-top: 20mm;">
  <p style="text-align: center; font-size: 20pt; font-weight: bold; margin-bottom: 8mm;">
    List of Figures
  </p>
  
  <table class="fig-table">
    <thead>
      <tr>
        <th style="width: 25%;">Figure No.</th>
        <th style="width: 60%;">Figure Name</th>
        <th style="width: 15%; text-align: right;">Page No.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Figure 4.1.1</td>
        <td>Proposed System Architecture (4-Station Pipeline)</td>
        <td style="text-align: right;">8</td>
      </tr>
      <tr>
        <td>Figure 5.1.1</td>
        <td>Identity Enclave Selection &amp; Private Attribute Shielding</td>
        <td style="text-align: right;">11</td>
      </tr>
      <tr>
        <td>Figure 5.1.2</td>
        <td>Policy Gate Specification &amp; Range Decomposition</td>
        <td style="text-align: right;">12</td>
      </tr>
      <tr>
        <td>Figure 5.1.3</td>
        <td>8-Leaf Poseidon Merkle State Membership Proof</td>
        <td style="text-align: right;">13</td>
      </tr>
      <tr>
        <td>Figure 5.1.4</td>
        <td>On-Chain Verification &amp; Deterministic Nullifier Replay Defense</td>
        <td style="text-align: right;">14</td>
      </tr>
    </tbody>
  </table>
  <div class="footer-center-prelim">ii</div>
</div>

<!-- =================================================================== -->
<!-- PAGE 7: TABLE OF CONTENTS (Page iii) -->
<!-- =================================================================== -->
<div class="page" style="padding-top: 20mm;">
  <p style="text-align: center; font-size: 16pt; font-weight: bold; margin-bottom: 6mm;">
    TABLE OF CONTENTS
  </p>
  
  <table class="toc-table">
    <thead>
      <tr>
        <th style="width: 12%;">Sr. No.</th>
        <th style="width: 73%;">Content</th>
        <th style="width: 15%; text-align: right;">Page No.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td></td>
        <td><strong>Abstract</strong></td>
        <td style="text-align: right;"><strong>i</strong></td>
      </tr>
      <tr>
        <td></td>
        <td><strong>List of Figures</strong></td>
        <td style="text-align: right;"><strong>ii</strong></td>
      </tr>
      <tr>
        <td><strong>1.</strong></td>
        <td><strong>Introduction</strong></td>
        <td style="text-align: right;"><strong>1</strong></td>
      </tr>
      <tr>
        <td>1.1</td>
        <td>Background</td>
        <td style="text-align: right;">2</td>
      </tr>
      <tr>
        <td>1.2</td>
        <td>Motivation</td>
        <td style="text-align: right;">2</td>
      </tr>
      <tr>
        <td><strong>2.</strong></td>
        <td><strong>Literature Survey</strong></td>
        <td style="text-align: right;"><strong>3</strong></td>
      </tr>
      <tr>
        <td>2.1</td>
        <td>Basic Terminologies</td>
        <td style="text-align: right;">4</td>
      </tr>
      <tr>
        <td>2.2</td>
        <td>Existing System</td>
        <td style="text-align: right;">4</td>
      </tr>
      <tr>
        <td>2.3</td>
        <td>Problem Statement</td>
        <td style="text-align: right;">4</td>
      </tr>
      <tr>
        <td><strong>3.</strong></td>
        <td><strong>Requirement Gathering</strong></td>
        <td style="text-align: right;"><strong>5</strong></td>
      </tr>
      <tr>
        <td>3.1</td>
        <td>Software and Hardware Requirements</td>
        <td style="text-align: right;">6</td>
      </tr>
      <tr>
        <td><strong>4.</strong></td>
        <td><strong>Plan of Project</strong></td>
        <td style="text-align: right;"><strong>7</strong></td>
      </tr>
      <tr>
        <td>4.1</td>
        <td>Proposed System Architecture</td>
        <td style="text-align: right;">8</td>
      </tr>
      <tr>
        <td>4.2</td>
        <td>Methodology</td>
        <td style="text-align: right;">9</td>
      </tr>
      <tr>
        <td><strong>5.</strong></td>
        <td><strong>Result Analysis</strong></td>
        <td style="text-align: right;"><strong>10</strong></td>
      </tr>
      <tr>
        <td>5.1</td>
        <td>Results and Discussion</td>
        <td style="text-align: right;">11</td>
      </tr>
      <tr>
        <td><strong>6.</strong></td>
        <td><strong>Conclusion</strong></td>
        <td style="text-align: right;"><strong>15</strong></td>
      </tr>
      <tr>
        <td><strong>7.</strong></td>
        <td><strong>References</strong></td>
        <td style="text-align: right;"><strong>17</strong></td>
      </tr>
    </tbody>
  </table>
  <div class="footer-center-prelim">iii</div>
</div>

<!-- =================================================================== -->
<!-- PAGE 8: CHAPTER 1 DIVIDER (Page 1) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  <div class="divider-container">
    <div class="divider-chap">Chapter 1</div>
    <div class="divider-title">Introduction</div>
  </div>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>1</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 9: CHAPTER 1 BODY (Page 2) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <h2 class="sec-head" style="margin-top: 4mm;">1. Introduction</h2>
  <h3 class="subsec-head">1.1 Background</h3>
  <p>
    Digital identity verification represents one of the most fundamental requirements of contemporary web infrastructure, yet remains governed by outdated centralized paradigms. In conventional identity systems, users authenticate by presenting plaintext identity documents (e.g., Aadhaar cards, passports, driver’s licenses, academic transcripts) to third-party verifiers. In doing so, users disclose vast amounts of unnecessary, highly sensitive personally identifiable information (PII). A nightclub or web service verifying that a customer is over 18 years of age typically inspects an entire government ID, inadvertently capturing full legal names, precise dates of birth, residential addresses, and identification numbers.
  </p>
  <p>
    This widespread over-disclosure fuels identity theft, centralized honeypot breaches, and surveillance capitalism. Concurrently, traditional Federated Identity Providers (such as Google Sign-In or Facebook Login) establish centralized choke points capable of tracking user activity across disparate digital domains, unilaterally revoking account access, and harvesting behavioral telemetry.
  </p>
  
  <h3 class="subsec-head">1.2 Motivation</h3>
  <p>
    The core motivation of CredLock is to pioneer a sovereign authentication framework wherein identity holders can mathematically prove compliance with arbitrary verifier requirements without revealing any underlying private data. By synthesizing Zero-Knowledge Succinct Non-Interactive Arguments of Knowledge (zk-SNARKs) with decentralized blockchain infrastructure, CredLock proves statements of the form:
  </p>
  <p style="text-align: center; font-weight: bold; margin: 3mm 0;">
    “I possess a valid credential issued by an authorized authority certifying my age ≥ 18, without revealing who I am, what my exact age is, or my government serial number.”
  </p>
  <p>
    By enforcing client-side proof generation, private keys and plaintext attributes never leave the user’s device sandbox. Ethereum smart contracts act solely as trustless, decentralized verifiers, delivering instant, cryptographically verifiable authentication while respecting absolute individual privacy.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>2</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 10: CHAPTER 2 DIVIDER (Page 3) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  <div class="divider-container">
    <div class="divider-chap">Chapter 2</div>
    <div class="divider-title">Literature Survey</div>
  </div>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>3</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 11: CHAPTER 2 BODY (Page 4) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <h2 class="sec-head" style="margin-top: 4mm;">2. Literature Survey</h2>
  <h3 class="subsec-head">2.1 Basic Terminologies</h3>
  <p>
    • <strong>Zero-Knowledge Proofs (ZKP):</strong> Cryptographic protocols enabling a prover to convince a verifier that a mathematical statement is true without conveying any information beyond the statement’s validity.
  </p>
  <p>
    • <strong>zk-SNARKs (Groth16):</strong> Succinct Non-Interactive Arguments of Knowledge characterized by tiny proof sizes (128 bytes) and constant-time pairing-based verification.
  </p>
  <p>
    • <strong>Decentralized Identifiers (W3C DIDs):</strong> Globally unique, cryptographically verifiable identifiers anchored on decentralized networks that eliminate centralized registry dependencies.
  </p>
  <p>
    • <strong>Poseidon Algebraic Hash Function:</strong> An arithmetic sponge construction designed specifically for zero-knowledge proving systems, requiring fewer R1CS constraints than SHA-256.
  </p>
  <p>
    • <strong>Deterministic Nullifier:</strong> A unique pseudorandom token generated via <em>Nullifier = Poseidon(sk, ScopeID)</em>, preventing proof replay attacks without revealing user identity.
  </p>
  
  <h3 class="subsec-head">2.2 Existing System</h3>
  <p>
    Existing digital identity solutions rely predominantly on centralized OAuth 2.0 / OpenID Connect brokers or direct document upload portals. Centralized brokers track authentication sessions across domains, while document upload portals expose plaintext PII to insecure corporate databases. Even early blockchain-based DID solutions frequently publish credential hashes or plaintext public keys on-chain, exposing users to public transaction-graph linkage.
  </p>
  
  <h3 class="subsec-head">2.3 Problem Statement</h3>
  <p>
    To design and implement a decentralized, zero-knowledge identity verification engine that enables users to prove eligibility predicates (such as age threshold or membership) over Ethereum without exposing plaintext attributes, preventing identity tracking and proof replay attacks while optimizing gas execution costs.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>4</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 12: CHAPTER 3 DIVIDER (Page 5) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  <div class="divider-container">
    <div class="divider-chap">Chapter 3</div>
    <div class="divider-title">Requirement Gathering</div>
  </div>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>5</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 13: CHAPTER 3 BODY (Page 6) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <h2 class="sec-head" style="margin-top: 4mm;">3. Requirement Gathering</h2>
  <h3 class="subsec-head">3.1 Software and Hardware Requirements</h3>
  
  <p><strong>Software Requirements:</strong></p>
  <ul>
    <li><strong>Operating System:</strong> Windows 10/11 (64-bit), macOS Monterey+, or Ubuntu Linux 22.04 LTS</li>
    <li><strong>Runtime Environment:</strong> Node.js (v18.x or v20.x LTS), Python 3.10+</li>
    <li><strong>Smart Contract Toolchain:</strong> Solidity v0.8.20, Hardhat / Foundry framework</li>
    <li><strong>Zero-Knowledge Toolkit:</strong> Circom 2.1.6 compiler, SnarkJS library (BN254 elliptic curve)</li>
    <li><strong>Blockchain Network:</strong> Ethereum Sepolia Testnet / Local Ethereum Ganache Node</li>
    <li><strong>Client Prover &amp; UI:</strong> React 18, Next.js, Three.js / WebGL, ethers.js v6</li>
    <li><strong>Web Browser:</strong> Google Chrome / Microsoft Edge with WebAssembly support</li>
  </ul>
  
  <p style="margin-top: 4mm;"><strong>Hardware Requirements:</strong></p>
  <ul>
    <li><strong>Processor:</strong> Intel Core i5 / AMD Ryzen 5 or higher (Multi-core recommended for WASM witness generation)</li>
    <li><strong>System Memory (RAM):</strong> Minimum 8 GB (16 GB recommended for circuit constraint synthesis)</li>
    <li><strong>Storage:</strong> 256 GB SSD (Solid State Drive) with at least 10 GB free disk space</li>
    <li><strong>Display:</strong> 1920 × 1080 full HD display for real-time 3D Merkle tree visualization</li>
    <li><strong>Network:</strong> Broadband internet connection (minimum 10 Mbps) for Ethereum node RPC access</li>
  </ul>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>6</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 14: CHAPTER 4 DIVIDER (Page 7) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  <div class="divider-container">
    <div class="divider-chap">Chapter 4</div>
    <div class="divider-title">Plan of Project</div>
  </div>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>7</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 15: CHAPTER 4 ARCHITECTURE (Page 8) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <h2 class="sec-head" style="margin-top: 4mm;">4. Plan of Project</h2>
  <h3 class="subsec-head">4.1 Proposed System Architecture</h3>
  
  <div class="figure-box" style="margin: 2mm 0 3mm 0;">
    <img src="{img_arch}" alt="Proposed System Architecture" style="max-height: 85mm;">
    <div class="figure-caption">Figure 4.1.1: System Architecture</div>
  </div>
  
  <p>
    The system architecture of CredLock illustrates the comprehensive cryptographic pipeline uniting client-side zero-knowledge proof generation and Ethereum on-chain verification. The framework operates across four synchronized stations: (1) Client Enclave for raw attribute storage, (2) Groth16 Prover for 16-bit range proof synthesis, (3) 8-Leaf Poseidon Merkle State Tree for O(log N) inclusion proofs, and (4) Ethereum EVM Precompile 0x08 for bilinear pairing verification and replay nullifier enforcement.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>8</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 16: CHAPTER 4 METHODOLOGY (Page 9) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <h3 class="subsec-head" style="margin-top: 4mm;">4.2 Methodology</h3>
  <p>
    The operational methodology of CredLock unfolds across four sequential phases:
  </p>
  <p>
    <strong>Phase 1: Enclave Credential Ingestion &amp; Commitment Generation:</strong><br>
    The user enrolls their identity attributes (Secret Key <em>sk</em>, Age, Academic CGPA) inside the client device sandbox. An algebraic commitment <em>C = Poseidon(sk, salt)</em> is computed and anchored as a leaf node in the on-chain Merkle registry.
  </p>
  <p>
    <strong>Phase 2: Arithmetic Circuit Range Decomposition:</strong><br>
    When a verifier challenges the user with a threshold predicate (e.g., <em>Age ≥ 18</em>), the client circuit computes the difference Δ = Age - 18. To prevent finite field underflow wraparound, Δ is decomposed into 16 binary bits (b<sub>0</sub>, ..., b<sub>15</sub>), enforcing boolean constraints b<sub>j</sub>(b<sub>j</sub> - 1) = 0.
  </p>
  <p>
    <strong>Phase 3: Poseidon Merkle Membership Path Proof:</strong><br>
    The circuit validates that commitment <em>C</em> belongs to the current state tree by ascending the binary tree from leaf to root using 3 sibling witness nodes: Root = Poseidon(H<sub>1</sub>, Sibling<sub>2</sub>).
  </p>
  <p>
    <strong>Phase 4: Groth16 Proof Synthesis &amp; EVM Precompile Verification:</strong><br>
    The client synthesizes proof π = (π<sub>A</sub>, π<sub>B</sub>, π<sub>C</sub>). The Ethereum smart contract executes a bilinear pairing check via precompile 0x08: e(π<sub>A</sub>, π<sub>B</sub>) = e(α, β) · e(∑ x<sub>i</sub> γ<sub>i</sub>, δ) · e(π<sub>C</sub>, δ). Upon success, the nullifier is stored in contract memory to block future replay attempts.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>9</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 17: CHAPTER 5 DIVIDER (Page 10) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  <div class="divider-container">
    <div class="divider-chap">Chapter 5</div>
    <div class="divider-title">Result Analysis</div>
  </div>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>10</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 18: CHAPTER 5 - STEP 1 (Page 11) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <h2 class="sec-head" style="margin-top: 4mm;">5. Result Analysis</h2>
  <h3 class="subsec-head">5.1 Results and Discussion</h3>
  <p style="font-weight: bold; margin-bottom: 2mm;">5.1.1 Identity Enclave Selection &amp; Private Attribute Shielding</p>
  
  <div class="figure-box">
    <img src="{img_511}" alt="Identity Enclave Selection">
    <div class="figure-caption">Figure 5.1.1: Identity Enclave Selection &amp; Private Attribute Shielding</div>
  </div>
  
  <p>
    The screenshot illustrates Step 1 of the CredLock dashboard. The user selects an enrolled student identity (Viswa, Leaf #0, Age 23, CGPA 8.92). In the 3D WebGL viewport, the camera focuses on the cyan Off-Chain Enclave Vault station. Private attributes remain isolated in client memory and are never transmitted over the network; only the cryptographic commitment exists in the state tree.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>11</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 19: CHAPTER 5 - STEP 2 (Page 12) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <p style="font-weight: bold; margin-top: 4mm; margin-bottom: 2mm;">5.1.2 Policy Gate Specification &amp; Range Decomposition</p>
  
  <div class="figure-box">
    <img src="{img_512}" alt="Policy Challenge Gate">
    <div class="figure-caption">Figure 5.1.2: Policy Gate Specification &amp; Range Decomposition</div>
  </div>
  
  <p>
    Step 2 demonstrates the Policy Challenge Gate. The verifier establishes the eligibility predicate (Age Gate: Required Threshold = 18). Preset options for Academic CGPA (≥ 8.5) and Income Solvency are available. The circuit configures a 16-bit binary range proof Δ = Age - 18 ≥ 0 without disclosing the prover’s birthdate.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>12</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 20: CHAPTER 5 - STEP 3 (Page 13) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <p style="font-weight: bold; margin-top: 4mm; margin-bottom: 2mm;">5.1.3 8-Leaf Poseidon Merkle State Membership Proof</p>
  
  <div class="figure-box">
    <img src="{img_513}" alt="Poseidon Merkle State Proof">
    <div class="figure-caption">Figure 5.1.3: 8-Leaf Poseidon Merkle State Membership Proof</div>
  </div>
  
  <p>
    Step 3 displays the 3D 8-Leaf Poseidon Merkle State Tree at center stage. Prover Viswa asserts membership over active State Root <code>0x29034ab6...</code>. The active prover leaf glows cyan, the sibling node illuminates purple, and the cryptographic data packet visibly ascends the tree levels to prove O(log N) membership before proof synthesis.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>13</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 21: CHAPTER 5 - STEP 4 (Page 14) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <p style="font-weight: bold; margin-top: 4mm; margin-bottom: 2mm;">5.1.4 On-Chain Verification &amp; Deterministic Nullifier Replay Defense</p>
  
  <div class="figure-box">
    <img src="{img_514}" alt="On-Chain Verification and Anti-Replay Defense">
    <div class="figure-caption">Figure 5.1.4: On-Chain Verification &amp; Deterministic Nullifier Replay Defense</div>
  </div>
  
  <p>
    Step 4 displays on-chain verification and anti-replay testing. Proof π is verified in 3.12 ms consuming 215,380 gas via EVM precompile 0x08. When the evaluator clicks “Test Replay Attack”, the smart contract detects that the deterministic nullifier has already been recorded, immediately reverting with <code>ERR_NULLIFIER_ALREADY_SPENT</code> (Gas: 35,400), proving contract state persistence.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>14</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 22: CHAPTER 6 DIVIDER (Page 15) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  <div class="divider-container">
    <div class="divider-chap">Chapter 6</div>
    <div class="divider-title">Conclusion</div>
  </div>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>15</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 23: CONCLUSION TEXT (Page 16) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <h2 class="sec-head" style="margin-top: 4mm;">Conclusion</h2>
  <p>
    CredLock establishes a robust, mathematically sound zero-knowledge decentralized identity framework for modern blockchain ecosystems. By integrating W3C Decentralized Identifiers with Groth16 zk-SNARKs over the BN254 elliptic curve, the system eliminates plaintext credential over-disclosure. Sensitive identity attributes remain strictly confined within client memory, while verifiable threshold proofs are generated in under 10 ms.
  </p>
  <p>
    The adoption of algebraic Poseidon hashing reduces R1CS arithmetic constraint complexity by 98% compared to traditional SHA-256 implementations, enabling seamless execution on standard consumer web browsers. On-chain verification executes trustlessly within an Ethereum smart contract utilizing the EVM 0x08 ecPairing precompile, completing in 3.12 ms with a locked gas cost of 215,380 gas. Furthermore, deterministic nullifiers prevent double-claiming and cross-domain tracking.
  </p>
  <p>
    Future extensions of this work include integrating recursive proof aggregation (Halo2/PLONK) to verify hundreds of identity proofs in a single transaction, hardware Secure Enclave integration for biometric proof authorization, and institutional zero-knowledge KYC compliance for DeFi liquidity protocols.
  </p>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>16</span>
  </div>
</div>

<!-- =================================================================== -->
<!-- PAGE 24: REFERENCES (Page 17) -->
<!-- =================================================================== -->
<div class="page">
  <div class="header-running">CredLock: Zero-Knowledge Decentralized Identity Engine</div>
  
  <h2 class="sec-head" style="margin-top: 4mm;">References</h2>
  <ol style="margin-left: 6mm; font-size: 10.5pt; line-height: 1.55;">
    <li>J. Groth, “On the Size of Pairing-Based Non-interactive Arguments,” in <em>Advances in Cryptology – EUROCRYPT 2016</em>, Lecture Notes in Computer Science, vol. 9666, Springer, pp. 305–326, 2016.</li>
    <li>L. Grassi, R. Lüftenegger, C. Rechberger, D. Rotaru, and M. Schofnegger, “On a Generalization of Substitution-Permutation Networks: The HADES Design Strategy and Poseidon Hashing,” <em>IACR Transactions on Symmetric Cryptology</em>, vol. 2020, no. 2, pp. 248–288, 2020.</li>
    <li>Vitalik Buterin and Christian Reitwiessner, “EIP-197: Precompiled contracts for optimal ate pairing check on the alt_bn128 curve,” <em>Ethereum Improvement Proposals</em>, no. 197, 2017.</li>
    <li>M. Sporny, D. Longley, and M. Chadwick, “Decentralized Identifiers (DIDs) v1.0: Core architecture, data model, and representations,” <em>W3C Recommendation</em>, 2022. Available: https://www.w3.org/TR/did-core/</li>
    <li>E. Ben-Sasson, A. Chiesa, E. Tromer, and M. Virza, “Succinct Non-Interactive Zero Knowledge for a von Neumann Architecture,” in <em>23rd USENIX Security Symposium</em>, pp. 781–796, 2014.</li>
    <li>Gavin Wood, “Ethereum: A Secure Decentralised Generalised Transaction Ledger (Yellow Paper),” <em>Ethereum Project Yellow Paper</em>, 2014.</li>
    <li>Circom 2.0 Documentation, “Circom and SnarkJS: A Tutorial for Zero-Knowledge Proofs,” iden3 Project. Available: https://docs.circom.io/</li>
    <li>Ethereum Foundation, “EVM Precompiled Contracts Specification,” Available: https://ethereum.org/en/developers/docs/evm/</li>
  </ol>
  <div class="footer-running">
    <span>Pillai HOC College of Engineering and Technology (Autonomous), Rasayani</span>
    <span>17</span>
  </div>
</div>

</body>
</html>
"""

with open(BODY_HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)
print("Wrote body_pages.html successfully.")

# Print to PDF using Edge headless
cmd = [
    EDGE_EXE,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={BODY_PDF_PATH}",
    BODY_HTML_PATH
]
print("Running Edge command to generate body PDF...")
res = subprocess.run(cmd, capture_output=True, text=True)
print("Edge return code:", res.returncode)

# Check number of pages in body PDF
doc_body = fitz.open(BODY_PDF_PATH)
print("Body PDF page count:", len(doc_body))
for pno in range(len(doc_body)):
    page = doc_body[pno]
    print(f"  Page {pno+1}: w={page.rect.width}, h={page.rect.height}")

# Merge with Front Pages
doc_front = fitz.open(FRONT_PDF_PATH)
print("Front PDF page count:", len(doc_front))

doc_final = fitz.open()
doc_final.insert_pdf(doc_front)
doc_final.insert_pdf(doc_body)
print("Total pages in combined document:", len(doc_final))

doc_final.save(FINAL_PDF_PATH)
print("Successfully generated master report PDF:", FINAL_PDF_PATH)
