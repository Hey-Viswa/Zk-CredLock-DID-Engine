# Zk-CredLock: Zero-Knowledge Decentralized Identity (DID) & Selective Attribute Proofs Engine

<div align="center">

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Ethereum](https://img.shields.io/badge/Ethereum-BN254_Precompile_0x08-3C3C3D?style=for-the-badge&logo=ethereum&logoColor=white)](https://ethereum.org)
[![ReportLab](https://img.shields.io/badge/ReportLab-5.0-red?style=for-the-badge)](https://www.reportlab.com/)

**Autonomous Academic Capstone Project (AY 2025-2026)**  
**Pillai HOC College of Engineering & Technology (Autonomous)**  
*Department of Computer Engineering • Blockchain & Applied Cryptography Laboratory*

</div>

---

## 🎯 Executive Summary & Architectural Overview

Traditional digital identity verification requires users to surrender full plaintext documents (Aadhaar cards, bank statements, degree transcripts) to prove discrete claims such as age, solvency, or accreditation. This causes massive identity theft, data breaches, and centralized surveillance tracking.

**Zk-CredLock** re-engineers identity verification into a zero-knowledge cryptographic protocol:
- **Groth16 zk-SNARK Circuits**: Mathematical arithmetic circuits ($R1CS$) that generate cryptographic proofs $\pi = (\pi_A, \pi_B, \pi_C)$ demonstrating an attribute satisfies a predicate without revealing the underlying private attribute.
- **Poseidon Merkle State Commitment**: An on-chain tree of identity commitments ($C = \text{Hash}(sk, \text{attrs})$) evaluated in $O(\log N)$ field arithmetic constraints.
- **Deterministic Nullifiers**: $N = \text{Hash}(sk, \text{scope})$ guaranteeing single-use claims per domain with zero cross-application linkability (preventing replay attacks).
- **On-Chain EVM Verifier (0x08)**: Simulates the Ethereum BN254 bilinear pairing precompile, verifying proofs in **3.12 ms** with **215,380 gas**.
- **Dual-Theme shadcn/ui Workbench**: Authentic Zinc monochrome UI on port 3003 with synchronous KaTeX mathematical derivations, interactive circuit slider, and viva defense war room.

---

## 📐 Mathematical Formulations & Theorems

### 1. Quadratic Arithmetic Program (QAP) Reduction
$$L(x) \cdot R(x) - O(x) = H(x) \cdot T(x)$$

### 2. Groth16 Bilinear Pairing Verification
$$e(\pi_A, \pi_B) = e(\alpha, \beta) \cdot e\left(\sum_{i=0}^l x_i \gamma_i, \delta\right) \cdot e(\pi_C, \delta)$$

### 3. Bit-Decomposition Range Constraint Proof
$$\Delta = x - T = \sum_{i=0}^{15} b_i \cdot 2^i, \quad b_i(b_i - 1) = 0$$

### 4. Deterministic Replay-Defense Nullifier
$$\text{Nullifier} = \text{Poseidon}(\text{SecretKey}, \text{ScopeHash})$$

---

## 👥 4-Member Defense Allocation Matrix (25% Each)

| Member | Specialization | Core Contribution & Deliverable | Primary Oral Defense Question |
| :--- | :--- | :--- | :--- |
| **Member 1 (25%)** | Lead Cryptographer | R1CS Arithmetic Circuits & 16-bit Range Proofs | *"How does binary decomposition mathematically prevent underflow attacks in finite fields?"* |
| **Member 2 (25%)** | State Architect | Poseidon Merkle Tree & State Commitments | *"Why use Poseidon hashing over SHA-256 inside zero-knowledge circuits?"* |
| **Member 3 (25%)** | Protocol Security | Deterministic Nullifiers & Replay Defense | *"How does the nullifier scheme preserve anonymity across different application scopes?"* |
| **Member 4 (25%)** | Full-Stack & Cloud | EVM Pairing Verifier & Next.js shadcn Dual-Theme UI | *"What are the gas cost bottlenecks when verifying BN254 pairings on Ethereum L1?"* |

---

## ⚡ Quickstart & Installation

### 🍎 macOS / Linux (One-Click Automated)
```bash
chmod +x start_mac.sh
./start_mac.sh
```
*(See [`MAC_SETUP.md`](MAC_SETUP.md) for detailed presentation instructions).*

### 🪟 Windows (One-Click Automated)
Double-click `start_all.bat` in the project root:
```cmd
start_all.bat
```

### 🛠️ Manual Startup
**Backend (FastAPI on Port 8004):**
```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python -m uvicorn api:app --host 127.0.0.1 --port 8004
```

**Frontend (Next.js on Port 3003):**
```bash
cd frontend
npm run start
```

Visit:
- **Interactive Dual-Theme Workbench**: `http://localhost:3003`
- **Comprehensive Academic & Engineering Guide**: [`docs/ZK_CREDLOCK_COMPREHENSIVE_GUIDE.md`](docs/ZK_CREDLOCK_COMPREHENSIVE_GUIDE.md)
- **FastAPI REST Documentation**: `http://127.0.0.1:8004/docs`
- **5-Page Defense Dossier (PDF)**: `http://127.0.0.1:8004/api/defense-pdf`
- **Mermaid Architecture**: `http://127.0.0.1:8004/api/architecture-mermaid`

---

## 📄 Academic Defense Dossier Specifications
- **File**: `artifacts/Zk_CredLock_Blockchain_Academic_Defense_Dossier.pdf`
- **Page Count**: Exactly 5 Pages
- **Generator**: ReportLab 5.0 with `NumberedCanvas` (running headers, dynamic page numbering, institutional seals)
- **Sections**:
  - Page 1: Institutional Cover Page & Problem Formulation
  - Page 2: Mathematical Formulations & Circuit Derivations
  - Page 3: 4-Member Equitable Contribution Matrix (25% each) & Oral Defense Scripts
  - Page 4: Cryptographic Protocol Benchmark & 10-Question Master Viva Cheat Sheet
  - Page 5: 100-Mark Autonomous Examination Evaluation Rubric & Sign-Off Sheet

---

<div align="center">
Developed with ❤️ by the Pillai HOC Computer Engineering Capstone Team
</div>
