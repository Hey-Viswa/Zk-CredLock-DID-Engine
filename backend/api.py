"""
Zk-CredLock FastAPI Microservice
Provides REST endpoints for Zero-Knowledge Proof Generation, On-Chain EVM Verifier Simulation,
Merkle State Inspection, Defense PDF streaming, and Architecture diagrams.

Institutional Affiliation: Pillai HOC College of Engineering & Technology (Autonomous)
Department of Computer Engineering • Blockchain & Applied Cryptography Laboratory
"""

import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, PlainTextResponse
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional

from crypto_engine import zk_engine
from academic_pdf_generator import build_zk_defense_pdf

app = FastAPI(
    title="Zk-CredLock: Zero-Knowledge Decentralized Identity Engine",
    description="Groth16 zk-SNARKs, BN254 Pairings, Poseidon Merkle State & Deterministic Nullifiers",
    version="1.0.0"
)

# Enable CORS for Next.js frontend (Port 3003)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ProofRequest(BaseModel):
    did: str = Field(..., example="did:zk:viswa-001")
    attribute_type: str = Field(..., example="age") # "age", "income", "cgpa"
    claimed_threshold: float = Field(..., example=21.0)
    scope: str = Field("PillaiHOC-Autonomous-Portal", example="PillaiHOC-Autonomous-Portal")

class VerifyRequest(BaseModel):
    proof_payload: Dict[str, Any]

@app.get("/")
def root():
    return {
        "system": "Zk-CredLock: Zero-Knowledge Decentralized Identity Engine",
        "institution": "Pillai HOC College of Engineering & Technology (Autonomous)",
        "department": "Computer Engineering",
        "course": "Blockchain & Applied Cryptography Laboratory",
        "status": "online",
        "capabilities": [
            "Groth16 zk-SNARK Arithmetic Circuit Simulation",
            "BN254 Elliptic Curve Bilinear Pairing Verification (0x08)",
            "Poseidon Cryptographic Merkle State Commitments",
            "Deterministic Replay-Defending Nullifiers",
            "Selective Attribute Range Proofs (Age, Income, CGPA)"
        ],
        "active_ports": {
            "api": 8004,
            "frontend": 3003
        }
    }

@app.get("/api/identities")
def list_identities():
    """Returns enrolled DID commitments in the Merkle state tree."""
    return {
        "count": len(zk_engine.mock_identities),
        "identities": zk_engine.get_identities()
    }

@app.get("/api/merkle-state")
def get_merkle_state():
    """Returns Merkle tree topology for frontend visualization."""
    return zk_engine.get_merkle_state()

@app.post("/api/generate-proof")
def generate_proof(req: ProofRequest):
    """Generates Groth16 zk-SNARK proof, R1CS witness, and nullifier."""
    try:
        proof_res = zk_engine.generate_zk_proof(
            did=req.did,
            attribute_type=req.attribute_type,
            claimed_threshold=req.claimed_threshold,
            scope=req.scope
        )
        return proof_res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/verify-proof")
def verify_proof(req: VerifyRequest):
    """Simulates on-chain EVM verification calling BN254 pairing precompile."""
    try:
        verif_res = zk_engine.verify_on_chain(req.proof_payload)
        return verif_res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/reset-nullifiers")
def reset_nullifiers():
    """Resets the spent nullifier registry for test runs."""
    zk_engine.reset_nullifiers()
    return {"status": "success", "message": "Nullifier registry purged. All scopes re-claimable."}

@app.get("/api/presets")
def get_presets():
    """Pre-loaded stress test scenarios for demonstration."""
    return [
        {
            "id": "preset-1",
            "name": "Legal Age Compliance (21+)",
            "description": "Proves candidate is at least 21 years old without disclosing exact date of birth.",
            "did": "did:zk:viswa-001",
            "attribute_type": "age",
            "claimed_threshold": 21.0,
            "scope": "PillaiHOC-Convocation-Portal",
            "expected_outcome": "VALID_PROOF"
        },
        {
            "id": "preset-2",
            "name": "High-Solvency Income Proof (₹75k+/mo)",
            "description": "Proves monthly earnings exceed ₹75,000 for housing/loan without sharing bank statement.",
            "did": "did:zk:viswa-001",
            "attribute_type": "income",
            "claimed_threshold": 75000.0,
            "scope": "Decentralized-Mortgage-DAO",
            "expected_outcome": "VALID_PROOF"
        },
        {
            "id": "preset-3",
            "name": "Autonomous University Honors (CGPA >= 8.5)",
            "description": "Proves graduation with distinction from Pillai HOC College without revealing full marksheet.",
            "did": "did:zk:viswa-001",
            "attribute_type": "cgpa",
            "claimed_threshold": 8.5,
            "scope": "Tier1-Enterprise-Recruitment",
            "expected_outcome": "VALID_PROOF"
        },
        {
            "id": "preset-4",
            "name": "Underage Rejection Attack (Age 16 vs 18+)",
            "description": "Adversary attempts to generate proof for age >= 18 with underage credentials (fails R1CS range constraint).",
            "did": "did:zk:underage-004",
            "attribute_type": "age",
            "claimed_threshold": 18.0,
            "scope": "Restricted-Services-Gateway",
            "expected_outcome": "REJECTED_PAIRING"
        },
        {
            "id": "preset-5",
            "name": "Double-Claim Replay Attack",
            "description": "Submits the same credential twice to test on-chain nullifier double-spend prevention.",
            "did": "did:zk:aarav-002",
            "attribute_type": "income",
            "claimed_threshold": 50000.0,
            "scope": "State-Subsidy-Disbursement",
            "expected_outcome": "REJECTED_NULLIFIER"
        }
    ]

@app.get("/api/defense-pdf")
def get_defense_pdf():
    """Streams publication-grade 5-page defense dossier PDF."""
    pdf_path = os.path.join(os.path.dirname(__file__), "..", "artifacts", "Zk_CredLock_Blockchain_Academic_Defense_Dossier.pdf")
    pdf_path = os.path.abspath(pdf_path)
    if not os.path.exists(pdf_path):
        build_zk_defense_pdf(pdf_path)
    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename="Zk_CredLock_Blockchain_Academic_Defense_Dossier.pdf"
    )

@app.get("/api/architecture-mermaid", response_class=PlainTextResponse)
def get_architecture_mermaid():
    """Returns downloadable Mermaid system architecture diagram."""
    mmd_path = os.path.join(os.path.dirname(__file__), "..", "docs", "architecture.mmd")
    mmd_path = os.path.abspath(mmd_path)
    if os.path.exists(mmd_path):
        with open(mmd_path, "r", encoding="utf-8") as f:
            return f.read()
    return """graph TD
    A[Client User Identity] --> B[R1CS Arithmetic Constraint Circuit]
    B --> C[Witness Computation & Range Decomposition]
    C --> D[Poseidon Merkle Membership Proof]
    D --> E[Deterministic Nullifier Generation]
    E --> F[Groth16 Proof Synthesis: pi_A, pi_B, pi_C]
    F --> G[EVM Smart Contract: 0x08 ecPairing Precompile]
    G --> H[State Verification & Nullifier Registration]"""

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8004)
