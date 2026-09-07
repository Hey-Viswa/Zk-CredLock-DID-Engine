# Zk-CredLock: System Architecture & Cryptographic Dataflow

## 🏛️ Executive Architectural Summary
Zk-CredLock is an academic-grade, production-hardened Zero-Knowledge Decentralized Identity (DID) system designed to provide **Selective Attribute Disclosure** without exposing private user records. The system utilizes:
- **Groth16 zk-SNARKs**: Proves arithmetic circuit satisfaction in constant-size proofs (3 group elements: $\pi_A \in \mathbb{G}_1, \pi_B \in \mathbb{G}_2, \pi_C \in \mathbb{G}_1$).
- **BN254 (alt_bn128) Elliptic Curve**: Native EVM pairing precompile support at address `0x08` (`ecPairing`).
- **Poseidon Merkle State Commitment**: An on-chain Merkle tree of identity commitments ($C = \text{Hash}(sk, \text{attrs})$) evaluated in $O(\log N)$ field arithmetic constraints.
- **Deterministic Nullifiers**: $N = \text{Hash}(sk, \text{scope})$ guaranteeing single-use claims per domain with zero cross-application linkability.

---

## 📐 Complete End-to-End Dataflow Diagram

```mermaid
graph TD
    subgraph Client_Prover["Client-Side Zero-Knowledge Prover (Edge / Browser)"]
        A["User Private Credentials\n(DOB, Income, CGPA, SecretKey)"] --> B["Poseidon Commitment Generator\nC = Hash_P(sk, attrs)"]
        B --> C["R1CS Arithmetic Constraint Circuit\n(128 Constraints)"]
        
        C --> D1["16-Bit Decomposition Range Proof\nDelta = x - T = sum(b_i * 2^i)"]
        C --> D2["Merkle Membership Witness\nO(log N) Poseidon Path Elements"]
        C --> D3["Deterministic Nullifier Synthesis\nN = Hash_P(SecretKey, Scope)"]
        
        D1 & D2 & D3 --> E["Groth16 Polynomial Synthesizer\nQAP: L(x)R(x) - O(x) = H(x)T(x)"]
        E --> F["Cryptographic Proof Output\npi = (pi_A, pi_B, pi_C) in BN254"]
    end

    subgraph Transport_Layer["API Bridge & Serialization"]
        F --> G["FastAPI Cryptographic Microservice\n(Port 8004: POST /api/verify-proof)"]
        H["Public Signals\n[Root, Threshold, Nullifier, Scope]"] --> G
    end

    subgraph On_Chain_EVM["On-Chain Smart Contract Verifier (EVM / L2)"]
        G --> I["ZkCredLockVerifier.sol\nContract: 0x7a250d..."]
        I --> J{"Nullifier Registry Check\nIs N already spent?"}
        J -- "Yes (Replay)" --> K["Revert: ERR_NULLIFIER_ALREADY_SPENT"]
        J -- "No" --> L{"Merkle Root Validation\nMatches Active State?"}
        L -- "No" --> M["Revert: ERR_ROOT_INVALID"]
        L -- "Yes" --> N["Precompile 0x08: ecPairing(BN254)\ne(A, B) == e(alpha, beta) * e(x, gamma) * e(C, delta)"]
        N -- "Valid" --> O["Emit VerifiedEvent(Nullifier)\nGas: 215,380 | Status: SUCCESS"]
        N -- "Invalid" --> P["Revert: ERR_PAIRING_FAILED"]
    end

    subgraph Presentation_Layer["Next.js 14 shadcn/ui Workbench (Port 3003)"]
        O --> Q["Live Verification Badge\nGas Meter & KaTeX Math Derivations"]
        K & P --> R["Adversarial Error Warning\nAttack Prevention Audit"]
    end
```

---

## ⚡ Mathematical Proof Equations

### 1. Quadratic Arithmetic Program (QAP)
$$L(x) \cdot R(x) - O(x) = H(x) \cdot T(x)$$

### 2. Bilinear Pairing Equation on BN254
$$e(\pi_A, \pi_B) = e(\alpha, \beta) \cdot e\left(\sum_{i=0}^l x_i \gamma_i, \delta\right) \cdot e(\pi_C, \delta)$$

### 3. Binary Bit-Decomposition Range Constraint
$$\Delta = x - T = \sum_{i=0}^{15} b_i 2^i, \quad \text{where } b_i(b_i - 1) = 0$$

### 4. Deterministic Nullifier Scheme
$$\text{Nullifier} = \text{Poseidon}(\text{SecretKey}, \text{ScopeHash})$$
