# 🍎 Zk-CredLock: macOS Quickstart & Academic Demo Guide

Welcome! If you are running **Zk-CredLock** on a Mac (macOS), follow these simple steps to run both the FastAPI Cryptographic Backend and Next.js Frontend with zero hassle.

---

## ⚡ Option 1: One-Command Automated Launch (Recommended)

Open your macOS Terminal in the project root folder and run:

```bash
chmod +x start_mac.sh
./start_mac.sh
```

### What this script does automatically:
1. Verifies `python3` and `node` / `npm`.
2. Automatically frees ports `8004` and `3003` if they were occupied.
3. Sets up a local virtual environment in `backend/.venv` (satisfies macOS PEP 668 cleanly) and installs `requirements.txt`.
4. Installs frontend `node_modules` if not already installed.
5. Launches FastAPI on **http://127.0.0.1:8004** in the background.
6. Launches Next.js on **http://localhost:3003** in the background.
7. Automatically opens `http://localhost:3003` in your default macOS browser.
8. Gracefully shuts down both servers when you press `Ctrl+C`.

---

## 🛠️ Option 2: Manual 2-Terminal Launch

If you prefer running the backend and frontend in separate macOS Terminal tabs:

### Terminal 1: Python FastAPI Cryptographic Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 -m uvicorn api:app --host 127.0.0.1 --port 8004
```
*Verify it is running:* Open [http://127.0.0.1:8004/docs](http://127.0.0.1:8004/docs) in your browser.

### Terminal 2: Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```
*Verify it is running:* Open [http://localhost:3003](http://localhost:3003) in your browser.

---

## 🎓 How to Present & Demo to Professors / Evaluators

The web application is designed as a **guided 4-step live interactive workbench**:

### 1. The Normal Flow (Proof of Age / Solvency / CGPA):
1. **Step 1: Select Prover Identity**
   - Click on `Viswa (Admin Prover)` or `Aarav Sharma`.
   - Point out to the examiner: *"Notice that only the cryptographic Commitment Hash is known on-chain; private fields like date of birth and exact income remain strictly on the client."*
2. **Step 2: Choose Predicate Claim**
   - Select `Legal Age Compliance (Age ≥ 21)`.
   - Show the slider and domain scope (`PillaiHOC-Convocation-Portal`).
3. **Step 3: Generate Zero-Knowledge Proof**
   - Click **Generate Zero-Knowledge Proof**.
   - Show the telemetry:
     - 128 R1CS constraints
     - 16-bit range decomposition proof: $\Delta = \text{age} - 21 = \sum_{i=0}^{15} b_i \cdot 2^i$
     - Poseidon Merkle membership proof ($O(\log N)$)
     - Deterministic Nullifier generated: $N = \text{Hash}(sk, \text{scope})$
     - Groth16 cryptographic proof tuple: $(\pi_A, \pi_B, \pi_C)$ on the BN254 curve.
4. **Step 4: Verify on Ethereum Smart Contract**
   - Click **Verify on Smart Contract (0x08 Precompile)**.
   - Show the green verification badge:
     - Gas consumed: **215,380 gas**
     - Execution time: **~3.12 ms**
     - Status: **COMMITTED TO STATE**
     - Highlight: The contract verified the user is 21+ **WITHOUT ever seeing their real age or birth date!**

---

### 2. The Adversarial Attack Demos (Guaranteed High Marks):

Examiners love security edge cases. You can demonstrate two live attacks in 30 seconds:

#### Attack A: Underage Rejection (Predicate Violation)
- Under Presets, click **Preset 4: Underage Rejection Attack (Age 16 vs 18+)**.
- Click **Generate Zero-Knowledge Proof** & **Verify**.
- The smart contract immediately rejects with:
  `ERR_SNARK_PAIRING_FAILED: R1CS range constraint was violated`.
- **Explain to teacher:** *"The bit-decomposition circuit proved that $\Delta < 0$, making it mathematically impossible for an underage person to forge a proof over prime fields."*

#### Attack B: Replay Attack / Double-Spend Prevention
- After a successful verification, click **Verify on Smart Contract** a second time with the same proof.
- The smart contract rejects with:
  `ERR_NULLIFIER_ALREADY_SPENT: Credential has already been submitted for this scope`.
- **Explain to teacher:** *"Because proofs are zero-knowledge, the verifier doesn't know who you are. To prevent someone from using the same credential multiple times, the deterministic nullifier $N = \text{Poseidon}(sk, \text{scope})$ is stored in the contract's nullifier registry."*

---

### 3. Extra Presentation Assets:
- **5-Page Defense Dossier PDF:** Click the **Download Defense PDF** button in the top navigation bar to download the publication-grade 5-page institutional PDF (`Zk_CredLock_Blockchain_Academic_Defense_Dossier.pdf`) with running headers, evaluation rubrics, and the 4-member contribution matrix.
- **Mathematical Derivations:** Click the **Math Proofs** tab in the top navigation bar to display live KaTeX derivations of QAP reduction, Bilinear Pairings, and Poseidon hash matrices.
- **Merkle Tree Topology:** Click the **Merkle Explorer** tab to visually inspect the on-chain identity tree and path elements.
