"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { IdentityVault, IdentityItem } from "@/components/IdentityVault";
import { MerkleExplorer, MerkleState } from "@/components/MerkleExplorer";
import { ProofStudio, ProofResponse } from "@/components/ProofStudio";
import { OnChainVerifier, VerificationResponse } from "@/components/OnChainVerifier";
import { MathProofs } from "@/components/MathProofs";
import { DefenseModal } from "@/components/DefenseModal";
import { Shield, Sparkles } from "lucide-react";

// Default Initial Identities for instant zero-delay SSR paint
const INITIAL_IDENTITIES: IdentityItem[] = [
  {
    id: "did:zk:viswa-001",
    name: "Viswa (Admin Prover)",
    leaf_index: 0,
    commitment_hash: "0x1c38aa66229afe8c4bd7ff0a795244bf0651ad4672ed8cc3984629302342fb12",
    institution: "Pillai HOC College of Engineering & Technology",
    department: "Computer Engineering"
  },
  {
    id: "did:zk:aarav-002",
    name: "Aarav Sharma",
    leaf_index: 1,
    commitment_hash: "0x23ee694123a619a6a3a5ea99e280eb65fed83ccd821a3feb8a6b3aeacdad9c48",
    institution: "Pillai HOC College of Engineering & Technology",
    department: "Computer Engineering"
  },
  {
    id: "did:zk:neha-003",
    name: "Neha Patil",
    leaf_index: 2,
    commitment_hash: "0x02c6344da41aaa79ca1b3b9028b9326a4c71c3d21fce5b5e05e82ce9db5c29cc",
    institution: "Pillai HOC College of Engineering & Technology",
    department: "Computer Engineering"
  },
  {
    id: "did:zk:underage-004",
    name: "Rohan (Underage Demo)",
    leaf_index: 3,
    commitment_hash: "0x1e5a201b1b9e283746a819c4d28e719b02847a918237b649a182749102837461",
    institution: "Secondary High School",
    department: "Science"
  }
];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isDefenseModalOpen, setIsDefenseModalOpen] = useState(false);

  // Core State
  const [identities, setIdentities] = useState<IdentityItem[]>(INITIAL_IDENTITIES);
  const [selectedDid, setSelectedDid] = useState<string>("did:zk:viswa-001");
  const [merkleState, setMerkleState] = useState<MerkleState | null>(null);

  // Prover Controls
  const [attributeType, setAttributeType] = useState<string>("age");
  const [claimedThreshold, setClaimedThreshold] = useState<number>(21.0);
  const [scope, setScope] = useState<string>("PillaiHOC-Convocation-Portal");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [proofData, setProofData] = useState<ProofResponse | null>(null);

  // Verifier State
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifResult, setVerifResult] = useState<VerificationResponse | null>(null);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Fetch initial data from backend (with localhost / 127.0.0.1 fallback)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const idRes = await fetch("http://127.0.0.1:8004/api/identities");
        if (idRes.ok) {
          const idData = await idRes.json();
          setIdentities(idData.identities);
        }

        const mRes = await fetch("http://127.0.0.1:8004/api/merkle-state");
        if (mRes.ok) {
          const mData = await mRes.json();
          setMerkleState(mData);
        }
      } catch (err) {
        console.warn("Backend connection delayed; using SSR state.", err);
      }
    };
    fetchInitialData();
  }, []);

  const handleGenerateProof = async () => {
    setIsGenerating(true);
    setVerifResult(null);
    try {
      const res = await fetch("http://127.0.0.1:8004/api/generate-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          did: selectedDid,
          attribute_type: attributeType,
          claimed_threshold: claimedThreshold,
          scope: scope,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(`Proof generation error: ${err.detail}`);
        return;
      }

      const data = await res.json();
      setProofData(data);
    } catch (err) {
      alert("Failed to reach FastAPI backend on port 8004.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleVerifyProof = async () => {
    if (!proofData) return;
    setIsVerifying(true);
    try {
      const res = await fetch("http://127.0.0.1:8004/api/verify-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proof_payload: proofData,
        }),
      });

      const data = await res.json();
      setVerifResult(data);
    } catch (err) {
      alert("Failed to communicate with On-Chain Verifier.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSelectPreset = async (presetId: string) => {
    try {
      const res = await fetch("http://127.0.0.1:8004/api/presets");
      const presets = await res.json();
      const p = presets.find((x: any) => x.id === presetId);
      if (p) {
        setSelectedDid(p.did);
        setAttributeType(p.attribute_type);
        setClaimedThreshold(p.claimed_threshold);
        setScope(p.scope);

        // Automatically synthesize proof for immediate review
        setIsGenerating(true);
        setVerifResult(null);
        const pRes = await fetch("http://127.0.0.1:8004/api/generate-proof", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            did: p.did,
            attribute_type: p.attribute_type,
            claimed_threshold: p.claimed_threshold,
            scope: p.scope,
          }),
        });
        const pData = await pRes.json();
        setProofData(pData);
        setIsGenerating(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetNullifiers = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8004/api/reset-nullifiers", { method: "POST" });
      const data = await res.json();
      alert(data.message);
      setVerifResult(null);
    } catch (err) {
      alert("Failed to reset nullifiers.");
    }
  };

  const currentIdentity = identities.find((i) => i.id === selectedDid) || identities[0];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenDefenseModal={() => setIsDefenseModalOpen(true)}
        onResetNullifiers={handleResetNullifiers}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hero Section */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/40 text-emerald-400 border border-emerald-800/60 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                Autonomous Capstone Project AY 2025-2026
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                Zk-CredLock: Zero-Knowledge Decentralized Identity Engine
              </h1>
              <p className="text-xs text-muted-foreground mt-1 max-w-3xl">
                Prove discrete identity claims (Age &ge; 21, Solvency &ge; ₹75k, Honors CGPA &ge; 8.5) using Groth16 zk-SNARK circuits over BN254. Zero personal plaintext leaked. Verified on-chain via EVM pairing precompile 0x08 with deterministic replay-defending nullifiers.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded border border-border bg-muted">
                FastAPI: <span className="text-emerald-400 font-bold">8004</span>
              </span>
              <span className="px-2.5 py-1 rounded border border-border bg-muted">
                Next.js: <span className="text-cyan-400 font-bold">3003</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2-Column Core Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 Cols): Identity Vault & Merkle State */}
          <div className="lg:col-span-5 space-y-6">
            <IdentityVault
              identities={identities}
              selectedDid={selectedDid}
              onSelectDid={(did) => setSelectedDid(did)}
            />
            <MerkleExplorer
              merkleState={merkleState}
              selectedLeafIndex={currentIdentity ? currentIdentity.leaf_index : 0}
            />
          </div>

          {/* Right Column (7 Cols): Proof Studio & On-Chain Verifier */}
          <div className="lg:col-span-7 space-y-6">
            <ProofStudio
              attributeType={attributeType}
              setAttributeType={setAttributeType}
              claimedThreshold={claimedThreshold}
              setClaimedThreshold={setClaimedThreshold}
              scope={scope}
              setScope={setScope}
              onGenerateProof={handleGenerateProof}
              isGenerating={isGenerating}
              proofData={proofData}
              onSelectPreset={handleSelectPreset}
            />
            <OnChainVerifier
              proofData={proofData}
              onVerifyProof={handleVerifyProof}
              isVerifying={isVerifying}
              verifResult={verifResult}
            />
          </div>
        </div>

        {/* Bottom Section: Cryptographic Proofs & Theorems */}
        <MathProofs />
      </main>

      {/* Defense Modal */}
      <DefenseModal
        isOpen={isDefenseModalOpen}
        onClose={() => setIsDefenseModalOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-border bg-card/60 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-muted-foreground">
          Developed with ❤️ by the Pillai HOC Computer Engineering Capstone Team • Autonomous Academic Year 2025-2026
        </div>
      </footer>
    </div>
  );
}
