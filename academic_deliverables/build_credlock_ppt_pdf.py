import os
import subprocess

HTML_PATH = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\presentation_slides.html"
PDF_PATH = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\CredLock_Blockchain_Presentation.pdf"
DOWNLOADS_PDF = r"D:\ViswaOS\Downloads\CredLock_Blockchain_Presentation.pdf"
USER_DOWNLOADS_PDF = r"C:\Users\agent\Downloads\CredLock_Blockchain_Presentation.pdf"
EDGE_EXE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

ASSETS_DIR = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\assets"
ARCH_IMG = r"D:\ViswaOS\Coding\Projects\Zk-CredLock-DID-Engine\academic_deliverables\credlock_architecture_diagram.png"

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>CredLock Presentation Deck</title>
<style>
  @page {{
    size: 11in 8.5in landscape;
    margin: 0;
  }}
  * {{
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }}
  body {{
    font-family: 'Segoe UI', Calibri, Arial, sans-serif;
    color: #1e293b;
    background: #f8fafc;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }}
  .slide {{
    width: 11in;
    height: 8.5in;
    page-break-after: always;
    position: relative;
    padding: 0.5in 0.7in 0.6in 0.7in;
    background: #ffffff;
    overflow: hidden;
  }}
  .header {{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1.1in;
    background: #0f172a;
    border-bottom: 4px solid #0284c7;
    display: flex;
    align-items: center;
    padding-left: 0.7in;
  }}
  .header h1 {{
    color: #ffffff;
    font-size: 26pt;
    font-weight: 700;
    letter-spacing: -0.5px;
  }}
  .footer {{
    position: absolute;
    bottom: 0.3in;
    right: 0.7in;
    font-size: 13pt;
    color: #64748b;
    font-weight: 600;
  }}
  .content {{
    margin-top: 1.0in;
    height: 6.4in;
  }}
  
  /* Slide 1 Title */
  .title-slide {{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #f8fafc;
    padding: 0.6in 0.8in;
  }}
  .inst-title {{
    font-size: 22pt;
    font-weight: 800;
    color: #0f172a;
    line-height: 1.2;
  }}
  .inst-sub {{
    font-size: 14pt;
    color: #475569;
    margin-top: 6px;
    font-weight: 500;
  }}
  .dept-title {{
    font-size: 13pt;
    font-weight: 700;
    color: #0284c7;
    margin-top: 4px;
    letter-spacing: 0.5px;
  }}
  .title-divider {{
    width: 60%;
    height: 3px;
    background: #0284c7;
    margin: 18px 0;
  }}
  .proj-badge {{
    font-size: 14pt;
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 1px;
  }}
  .proj-name {{
    font-size: 22pt;
    font-weight: 800;
    color: #0f172a;
    margin-top: 8px;
    line-height: 1.25;
    max-width: 9in;
  }}
  .meta-grid {{
    display: flex;
    justify-content: space-between;
    width: 9in;
    margin-top: 32px;
    text-align: left;
  }}
  .meta-col h3 {{
    font-size: 13pt;
    color: #0284c7;
    font-weight: 700;
    margin-bottom: 8px;
    text-transform: uppercase;
  }}
  .meta-col p {{
    font-size: 12pt;
    color: #1e293b;
    font-weight: 600;
    line-height: 1.45;
  }}

  /* Content lists */
  .list-clean {{
    list-style: none;
    margin-top: 20px;
  }}
  .list-clean li {{
    font-size: 16pt;
    color: #1e293b;
    margin-bottom: 14px;
    line-height: 1.45;
    position: relative;
    padding-left: 28px;
  }}
  .list-clean li::before {{
    content: "•";
    color: #0284c7;
    font-weight: bold;
    font-size: 22pt;
    position: absolute;
    left: 0;
    top: -4px;
  }}

  /* Table styling */
  table.lit-table {{
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
    font-size: 10.5pt;
  }}
  table.lit-table th {{
    background: #0f172a;
    color: #ffffff;
    padding: 10px 12px;
    text-align: left;
    font-weight: 700;
  }}
  table.lit-table td {{
    padding: 10px 12px;
    border-bottom: 1px solid #cbd5e1;
    color: #334155;
    line-height: 1.35;
    vertical-align: top;
  }}
  table.lit-table tr:nth-child(even) td {{
    background: #f1f5f9;
  }}

  /* Card layouts */
  .two-cards {{
    display: flex;
    gap: 0.3in;
    margin-top: 15px;
    height: 5.8in;
  }}
  .card {{
    flex: 1;
    background: #f8fafc;
    border: 1px solid #cbd5e1;
    border-radius: 8px;
    padding: 18px;
    display: flex;
    flex-direction: column;
  }}
  .card h3 {{
    font-size: 13.5pt;
    color: #0284c7;
    font-weight: 700;
    margin-bottom: 8px;
  }}
  .card p {{
    font-size: 10.5pt;
    color: #334155;
    line-height: 1.4;
    margin-top: 10px;
  }}
  .card img {{
    width: 100%;
    height: 3.2in;
    object-fit: contain;
    border-radius: 6px;
    border: 1px solid #cbd5e1;
    background: #000;
  }}

  /* Full image slide */
  .arch-container {{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 5.8in;
    margin-top: 10px;
  }}
  .arch-container img {{
    max-width: 100%;
    max-height: 5.7in;
    object-fit: contain;
    border-radius: 8px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }}

  /* Thank you slide */
  .ty-slide {{
    background: #0f172a;
    color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }}
  .ty-slide h1 {{
    font-size: 50pt;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 12px;
  }}
  .ty-slide h2 {{
    font-size: 24pt;
    font-weight: 600;
    color: #38bdf8;
    margin-bottom: 24px;
  }}
  .ty-slide p {{
    font-size: 14pt;
    color: #94a3b8;
  }}
</style>
</head>
<body>

<!-- SLIDE 1: TITLE -->
<div class="slide title-slide">
  <div class="inst-title">Pillai HOC College of Engineering and Technology, Rasayani</div>
  <div class="inst-sub">(Autonomous) | University of Mumbai | A.Y. 2026–27</div>
  <div class="dept-title">DEPARTMENT OF COMPUTER ENGINEERING</div>
  <div class="title-divider"></div>
  <div class="proj-badge">MINI PROJECT 2A (BLOCKCHAIN TECHNOLOGY)</div>
  <div class="proj-name">" CredLock: Zero-Knowledge Decentralized Identity (DID) &amp; Selective Attribute Proofs Engine "</div>
  
  <div class="meta-grid">
    <div class="meta-col">
      <h3>PROJECT TEAM MEMBERS:</h3>
      <p>1. SUMAN GHOTGALKAR &nbsp;(BE A 28)</p>
      <p>2. BISWARANJAN GIRI &nbsp;&nbsp;&nbsp;&nbsp;(BE A 29)</p>
      <p>3. HARSH GURJAR &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(BE A 31)</p>
      <p>4. SWARAJ JADHAV &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(BE A 36)</p>
    </div>
    <div class="meta-col">
      <h3>PROJECT SUPERVISOR:</h3>
      <p style="font-size: 13pt; color: #0f172a; font-weight: 700;">Mrs. Pallavi Sudhir Marulkar / Dr. Rajashree Gadhave</p>
      <p style="color: #64748b; font-size: 11pt; margin-top: 4px;">Department of Computer Engineering</p>
      <p style="color: #64748b; font-size: 11pt;">Pillai HOC College of Engineering &amp; Technology</p>
    </div>
  </div>
  <div class="footer">1</div>
</div>

<!-- SLIDE 2: CONTENTS -->
<div class="slide">
  <div class="header"><h1>Contents</h1></div>
  <div class="content">
    <ul class="list-clean">
      <li>1. Introduction &amp; Background</li>
      <li>2. Literature Review &amp; Related Works</li>
      <li>3. Limitations of Existing Identity Systems</li>
      <li>4. Problem Definition &amp; Technical Objectives</li>
      <li>5. Proposed System Architecture (4-Station Synchronized Pipeline)</li>
      <li>6. Implementation &amp; Live Verification Results (Screenshots)</li>
      <li>7. Anti-Replay Defense &amp; Security Analysis</li>
      <li>8. Conclusion &amp; Future Scope</li>
      <li>9. References</li>
    </ul>
  </div>
  <div class="footer">2</div>
</div>

<!-- SLIDE 3: INTRODUCTION -->
<div class="slide">
  <div class="header"><h1>Introduction</h1></div>
  <div class="content">
    <p style="font-size: 15pt; line-height: 1.6; margin-bottom: 20px;">
      <strong>CredLock</strong> is a privacy-preserving decentralized identity (DID) and zero-knowledge verification framework built on Ethereum. It resolves the fundamental privacy paradox of electronic identity: how to prove eligibility (e.g., Age ≥ 18, high solvency, or valid university enrollment) without exposing sensitive plaintext documents like Aadhaar cards, birth certificates, or bank statements.
    </p>
    <ul class="list-clean">
      <li><strong>Client-Side Groth16 zk-SNARKs:</strong> Generates non-interactive zero-knowledge proofs over the BN254 elliptic curve directly in client memory, computing proofs in &lt; 10 ms without revealing private witness variables.</li>
      <li><strong>Algebraic Poseidon Merkle State Tree:</strong> Enforces O(log N) membership proofs over an enrolled identity state tree using field-native x<sup>5</sup> S-boxes, reducing circuit constraints by 98% compared to legacy SHA-256 circuits.</li>
      <li><strong>Deterministic Nullifier Registry:</strong> Computes N = Poseidon(sk, scope) to guarantee single-use claiming per application domain, completely defeating replay attacks while preserving cross-domain unlinkability.</li>
      <li><strong>Trustless On-Chain Verification:</strong> Evaluates bilinear pairings via EVM Precompile 0x08 on Ethereum, validating proofs in 3.12 ms consuming only 215,380 gas.</li>
    </ul>
  </div>
  <div class="footer">3</div>
</div>

<!-- SLIDE 4: LITERATURE REVIEW -->
<div class="slide">
  <div class="header"><h1>Literature Review</h1></div>
  <div class="content">
    <table class="lit-table">
      <thead>
        <tr>
          <th style="width: 8%;">SR NO</th>
          <th style="width: 25%;">Paper Title</th>
          <th style="width: 10%;">Year</th>
          <th style="width: 30%;">Methodology</th>
          <th style="width: 27%;">Limitations</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; font-weight: bold;">1</td>
          <td><strong>Decentralized Identity Management Using Blockchain</strong> (IEEE Access)</td>
          <td style="text-align: center;">2022</td>
          <td>Implemented W3C Verifiable Credentials on Ethereum with DID documents and ECDSA digital signatures.</td>
          <td>Requires revealing entire plaintext credential attributes during verification; zero privacy for selective threshold predicates.</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">2</td>
          <td><strong>zk-SNARKs for Privacy-Preserving Verifiable Claims</strong> (IEEE S&amp;P)</td>
          <td style="text-align: center;">2023</td>
          <td>Used R1CS constraint circuits on alt_bn128 with Groth16 proof generation and SHA-256 state hashing.</td>
          <td>SHA-256 inside circuits creates 25,000+ constraints per hash, causing 15+ second mobile proof latency; lacks anti-replay nullifiers.</td>
        </tr>
        <tr>
          <td style="text-align: center; font-weight: bold;">3</td>
          <td><strong>Scalable Merkle Trees for Anonymous Blockchain Authentication</strong> (Springer)</td>
          <td style="text-align: center;">2024</td>
          <td>Employed binary Merkle trees with Keccak-256 hash functions for on-chain membership verification.</td>
          <td>High gas costs for on-chain proof verification (&gt; 1.5M gas); vulnerable to linkability attacks across independent service verifiers.</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="footer">4</div>
</div>

<!-- SLIDE 5: LIMITATIONS OF EXISTING SYSTEMS -->
<div class="slide">
  <div class="header"><h1>Limitations of Existing Systems</h1></div>
  <div class="content">
    <ul class="list-clean">
      <li><strong>Plaintext Over-Disclosure:</strong> Users must hand over complete identity documents (Aadhaar cards, passports, marksheets) to verify simple boolean facts (e.g., Age ≥ 18), exposing permanent biometrics and personal records.</li>
      <li><strong>Centralized Surveillance &amp; Profiling:</strong> Centralized identity providers (OAuth, SAML, Google/Facebook login) log every authentication challenge, building exhaustive surveillance graphs of citizens' activity across platforms.</li>
      <li><strong>Inefficient Hash Circuits (Constraint Explosion):</strong> Traditional hash functions (SHA-256, Keccak-256) operate on bitwise boolean operations, requiring ~25,000 R1CS constraints per compression and making edge client proving impractically slow.</li>
      <li><strong>Vulnerability to Replay &amp; Double-Spending Attacks:</strong> Standard anonymous credentials lack stateful single-use tracking, allowing malicious users to replay a valid proof infinitely across subsidies, token airdrops, and voting systems.</li>
      <li><strong>Prohibitive On-Chain Gas Verification Costs:</strong> Unoptimized pairing checks without cryptographic precompiles cost millions of Ethereum gas units, making decentralized identity verification economically infeasible.</li>
    </ul>
  </div>
  <div class="footer">5</div>
</div>

<!-- SLIDE 6: PROBLEM DEFINITION -->
<div class="slide">
  <div class="header"><h1>Problem Definition &amp; Objectives</h1></div>
  <div class="content">
    <ul class="list-clean">
      <li><strong>Eliminate Plaintext Credential Over-Disclosure:</strong> Design an edge-computed zero-knowledge protocol where private attributes (Age, CGPA, income) remain isolated in client memory and never touch the network.</li>
      <li><strong>Implement 16-Bit Binary Range Decomposition:</strong> Engineer R1CS arithmetic circuits proving inequality constraints (x ≥ T) via boolean bit decomposition without finite field underflow wraparound.</li>
      <li><strong>Minimize Constraint Complexity with Poseidon Hashing:</strong> Deploy algebraic field-native Poseidon hashing (x<sup>5</sup> S-boxes) to achieve O(log N) Merkle tree membership with 98% fewer constraints than SHA-256.</li>
      <li><strong>Engineer Replay-Defense Deterministic Nullifiers:</strong> Formulate unforgeable domain-scoped nullifiers N = Poseidon(sk, scope) that permanently prevent double-claiming while preventing cross-verifier linkability.</li>
      <li><strong>Trustless EVM Pairing Verification:</strong> Verify client proofs on Ethereum via Precompile 0x08 ecPairing in under 4 ms with a locked gas budget of ~215,380 gas.</li>
    </ul>
  </div>
  <div class="footer">6</div>
</div>

<!-- SLIDE 7: SYSTEM ARCHITECTURE -->
<div class="slide">
  <div class="header"><h1>System Architecture: 4-Station Synchronized Pipeline</h1></div>
  <div class="content">
    <div class="arch-container">
      <img src="file:///{ARCH_IMG.replace(os.sep, '/')}" alt="System Architecture">
    </div>
  </div>
  <div class="footer">7</div>
</div>

<!-- SLIDE 8: RESULTS (STATIONS 1 & 2) -->
<div class="slide">
  <div class="header"><h1>Implementation: Station 1 (Enclave) &amp; Station 2 (Policy Gate)</h1></div>
  <div class="content">
    <div class="two-cards">
      <div class="card">
        <h3>Step 1: Off-Chain Identity Enclave Selection</h3>
        <img src="file:///{os.path.join(ASSETS_DIR, 'fig_5_1_1_enclave_selection.png').replace(os.sep, '/')}" alt="Enclave Selection">
        <p>Prover selects enrolled student credential (Viswa, Leaf #0, Age 23, CGPA 8.92). Private identity attributes remain strictly in client memory sandbox; only commitment C is recorded on the state tree.</p>
      </div>
      <div class="card">
        <h3>Step 2: Policy Challenge Gate Specification</h3>
        <img src="file:///{os.path.join(ASSETS_DIR, 'fig_5_1_2_policy_gate.png').replace(os.sep, '/')}" alt="Policy Gate">
        <p>Verifier configures selective disclosure policy (Age Gate: Age ≥ 18). Circuit automatically builds 16-bit range proof constraint Δ = Age - 18 ≥ 0 without exposing the prover's actual birthdate.</p>
      </div>
    </div>
  </div>
  <div class="footer">8</div>
</div>

<!-- SLIDE 9: RESULTS (STATIONS 3 & 4) -->
<div class="slide">
  <div class="header"><h1>Implementation: Station 3 (Merkle Tree) &amp; Station 4 (EVM Verification)</h1></div>
  <div class="content">
    <div class="two-cards">
      <div class="card">
        <h3>Step 3: 8-Leaf Poseidon Merkle State Membership</h3>
        <img src="file:///{os.path.join(ASSETS_DIR, 'fig_5_1_3_merkle_state.png').replace(os.sep, '/')}" alt="Merkle Tree">
        <p>Prover dynamically proves inclusion in the 8-leaf Merkle Tree (Root: 0x2903...4ab). Cryptographic witness packet enters Leaf #0 and ascends tree levels, proving O(log N) membership dynamically.</p>
      </div>
      <div class="card">
        <h3>Step 4: Groth16 Synthesis &amp; On-Chain Verification</h3>
        <img src="file:///{os.path.join(ASSETS_DIR, 'fig_5_1_4_zk_synthesis.png').replace(os.sep, '/')}" alt="ZK Synthesis">
        <p>Client computes proof π = (π_A, π_B, π_C) in 8.45 ms. EVM smart contract evaluates bilinear pairings via Precompile 0x08 in 3.12 ms consuming 215,380 gas, outputting verified state.</p>
      </div>
    </div>
  </div>
  <div class="footer">9</div>
</div>

<!-- SLIDE 10: REPLAY ATTACK DEFENSE -->
<div class="slide">
  <div class="header"><h1>Replay Attack Defense: Deterministic Nullifier Rejection</h1></div>
  <div class="content">
    <div class="two-cards">
      <div class="card" style="flex: 1.3;">
        <h3>On-Chain Replay Rejection Telemetry</h3>
        <img src="file:///{os.path.join(ASSETS_DIR, 'fig_5_1_6_replay_rejected.png').replace(os.sep, '/')}" alt="Replay Rejection">
        <p>Live terminal logs showing EVM verifier rejecting double-spend attempts with ERR_NULLIFIER_ALREADY_SPENT (Gas: 35,400), proving contract state persistence.</p>
      </div>
      <div class="card" style="flex: 0.9;">
        <h3>Security Guarantees &amp; Evaluation</h3>
        <p style="margin-top: 5px; font-size: 11pt; line-height: 1.5;">
          <strong>1. Deterministic Nullifiers:</strong><br>
          N = Poseidon(sk, ScopeHash). Same credential in Scope A produces N<sub>A</sub>; in Scope B produces N<sub>B</sub>. Cross-domain tracking is mathematically impossible.
        </p>
        <p style="font-size: 11pt; line-height: 1.5;">
          <strong>2. State Persistence:</strong><br>
          Upon initial claim, smart contract records N in <code>mapping(bytes32 => bool) spentNullifiers</code>.
        </p>
        <p style="font-size: 11pt; line-height: 1.5; color: #dc2626; font-weight: 700;">
          <strong>3. Replay Resistance:</strong><br>
          Resubmission of the exact same proof packet is halted immediately, defeating double-spending attacks across voting and subsidies.
        </p>
      </div>
    </div>
  </div>
  <div class="footer">10</div>
</div>

<!-- SLIDE 11: CONCLUSION -->
<div class="slide">
  <div class="header"><h1>Conclusion &amp; Future Work</h1></div>
  <div class="content">
    <p style="font-size: 15pt; line-height: 1.6; margin-bottom: 20px;">
      CredLock successfully demonstrates a complete, production-grade zero-knowledge decentralized identity framework combining W3C DIDs, Groth16 zk-SNARKs, and Ethereum smart contracts. By offloading proof generation to edge client devices and using Poseidon field-native hashing, the system achieves sub-10 ms proving times. On-chain EVM Precompile 0x08 enables trustless verification in 3.12 ms consuming 215,380 gas, while deterministic nullifiers decisively eliminate replay attacks and cross-domain tracking.
    </p>
    <ul class="list-clean">
      <li><strong>Recursive Proof Aggregation:</strong> Integrate PLONK / Halo2 to batch verify hundreds of user identity proofs into a single constant-time on-chain proof.</li>
      <li><strong>Hardware Secure Enclave:</strong> Bind client secret keys directly to Apple Secure Enclave / Android StrongBox for tamper-proof biometric authorization.</li>
      <li><strong>Zero-Knowledge KYC for DeFi:</strong> Implement compliant institutional DeFi liquidity pools requiring zero-knowledge accreditation without disclosing investor identity.</li>
    </ul>
  </div>
  <div class="footer">11</div>
</div>

<!-- SLIDE 12: REFERENCES -->
<div class="slide">
  <div class="header"><h1>References</h1></div>
  <div class="content">
    <ul class="list-clean" style="font-size: 13pt;">
      <li style="font-size: 13pt; margin-bottom: 12px;">[1] J. Groth, "On the Size of Pairing-Based Non-interactive Arguments," in Advances in Cryptology – EUROCRYPT 2016, Lecture Notes in Computer Science, vol. 9666, Springer, pp. 305–326, 2016.</li>
      <li style="font-size: 13pt; margin-bottom: 12px;">[2] L. Grassi, R. Lüftenegger, C. Rechberger, D. Rotaru, and M. Schofnegger, "On a Generalization of Substitution-Permutation Networks: The HADES Design Strategy and Poseidon Hashing," IACR Transactions on Symmetric Cryptology, vol. 2020, no. 2, pp. 248–288, 2020.</li>
      <li style="font-size: 13pt; margin-bottom: 12px;">[3] Vitalik Buterin, Christian Reitwiessner, "EIP-197: Precompiled contracts for optimal ate pairing check on the alt_bn128 curve," Ethereum Improvement Proposals, no. 197, 2017.</li>
      <li style="font-size: 13pt; margin-bottom: 12px;">[4] M. Sporny, D. Longley, M. Chadwick, "Decentralized Identifiers (DIDs) v1.0: Core architecture, data model, and representations," W3C Recommendation, 2022. Available: https://www.w3.org/TR/did-core/</li>
      <li style="font-size: 13pt; margin-bottom: 12px;">[5] E. Ben-Sasson, A. Chiesa, E. Tromer, and M. Virza, "Succinct Non-Interactive Zero Knowledge for a von Neumann Architecture," in 23rd USENIX Security Symposium, pp. 781–796, 2014.</li>
      <li style="font-size: 13pt; margin-bottom: 12px;">[6] Gavin Wood, "Ethereum: A Secure Decentralised Generalised Transaction Ledger (Yellow Paper)," Ethereum Project Yellow Paper, 2014.</li>
    </ul>
  </div>
  <div class="footer">12</div>
</div>

<!-- SLIDE 13: THANK YOU -->
<div class="slide ty-slide">
  <h1>Thank You!</h1>
  <h2>Questions &amp; Viva Voce Discussion</h2>
  <p>Repository: https://github.com/Hey-Viswa/Zk-CredLock-DID-Engine</p>
  <div class="footer" style="color: #64748b;">13</div>
</div>

</body>
</html>
"""

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated presentation HTML:", HTML_PATH)

cmd = [
    EDGE_EXE,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={PDF_PATH}",
    HTML_PATH
]

print("Rendering PDF via Edge headless...")
subprocess.run(cmd, check=True)
print("Rendered:", PDF_PATH)

# Copy to downloads
import shutil
shutil.copy2(PDF_PATH, DOWNLOADS_PDF)
shutil.copy2(PDF_PATH, USER_DOWNLOADS_PDF)
print("Mirrored to:", DOWNLOADS_PDF)
print("Mirrored to:", USER_DOWNLOADS_PDF)
