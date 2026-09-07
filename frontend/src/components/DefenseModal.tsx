"use client";

import React, { useState } from "react";
import { X, Award, Shield, UserCheck, HelpCircle, CheckSquare } from "lucide-react";

interface DefenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DefenseModal: React.FC<DefenseModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"matrix" | "scripts" | "viva" | "rubric">("matrix");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-xl border border-border bg-background shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-2.5">
            <Award className="h-5 w-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold tracking-tight">Academic Oral Defense & Viva Voce War Room</h2>
              <p className="text-xs text-muted-foreground">
                Pillai HOC College of Engineering & Technology (Autonomous) • 4-Member Defense Suite
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-border bg-muted/30 px-6">
          <button
            onClick={() => setActiveTab("matrix")}
            className={`py-2.5 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === "matrix"
                ? "border-emerald-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            25% Allocation Matrix
          </button>
          <button
            onClick={() => setActiveTab("scripts")}
            className={`py-2.5 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === "scripts"
                ? "border-emerald-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            2-Min Oral Scripts
          </button>
          <button
            onClick={() => setActiveTab("viva")}
            className={`py-2.5 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === "viva"
                ? "border-emerald-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Top 5 Viva Voce Q&A
          </button>
          <button
            onClick={() => setActiveTab("rubric")}
            className={`py-2.5 px-3 text-xs font-semibold border-b-2 transition ${
              activeTab === "rubric"
                ? "border-emerald-500 text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            100-Mark Rubric
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs">
          {/* TAB 1: 25% ALLOCATION MATRIX */}
          {activeTab === "matrix" && (
            <div className="space-y-3">
              <p className="text-muted-foreground">
                Workload and intellectual property are divided with mathematical equity (25.0% per member) to satisfy autonomous university rubrics.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted text-muted-foreground uppercase text-[10px] font-mono">
                      <th className="p-2.5 border border-border">Member</th>
                      <th className="p-2.5 border border-border">Role & Specialization</th>
                      <th className="p-2.5 border border-border">Core Module Delivered</th>
                      <th className="p-2.5 border border-border">Primary Viva Defense Focus</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-2.5 font-bold text-foreground">Member 1 (25%)</td>
                      <td className="p-2.5">Lead Cryptographer</td>
                      <td className="p-2.5">R1CS Arithmetic Circuits & 16-bit Range Proofs</td>
                      <td className="p-2.5 italic">Binary decomposition preventing field underflow attacks</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-foreground">Member 2 (25%)</td>
                      <td className="p-2.5">State Architect</td>
                      <td className="p-2.5">Poseidon Merkle Tree & State Commitments</td>
                      <td className="p-2.5 italic">Poseidon algebraic efficiency vs SHA-256 in circuits</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-foreground">Member 3 (25%)</td>
                      <td className="p-2.5">Protocol Security</td>
                      <td className="p-2.5">Deterministic Nullifiers & Replay Defense</td>
                      <td className="p-2.5 italic">Cross-scope anonymity & double-spend prevention math</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-foreground">Member 4 (25%)</td>
                      <td className="p-2.5">Full-Stack & Cloud</td>
                      <td className="p-2.5">EVM Pairing Verifier & Next.js shadcn UI</td>
                      <td className="p-2.5 italic">Ethereum 0x08 precompile gas benchmarks and KaTeX math</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: ORAL DEFENSE SCRIPTS */}
          {activeTab === "scripts" && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-lg border border-border bg-muted/30">
                <div className="font-semibold text-emerald-400 mb-1">Member 1 (Lead Cryptographer):</div>
                <p className="text-zinc-300 leading-relaxed italic">
                  &ldquo;Honorable examiners, my contribution focused on designing the R1CS range constraint circuit. When a user claims Age &ge; 21, my circuit decomposes the delta into 16 binary bits enforcing <code className="font-mono text-emerald-300">b_i(b_i - 1) = 0</code>. This guarantees mathematical non-negativity over prime field BN254 without revealing the underlying private age.&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-border bg-muted/30">
                <div className="font-semibold text-cyan-400 mb-1">Member 2 (State Architect):</div>
                <p className="text-zinc-300 leading-relaxed italic">
                  &ldquo;My responsibility was the Poseidon Merkle state commitment. To avoid storing identities on-chain, credentials exist as 32-byte leaf commitments in a depth-3 tree. Using Poseidon hash functions optimized for field arithmetic, our circuit generates membership inclusion proofs in under 5 milliseconds.&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-border bg-muted/30">
                <div className="font-semibold text-purple-400 mb-1">Member 3 (Protocol Security):</div>
                <p className="text-zinc-300 leading-relaxed italic">
                  &ldquo;I designed the cryptographic nullifier protocol. Because zk-SNARKs provide zero knowledge, the verifier cannot see who submits. To prevent double-claiming, the circuit outputs <code className="font-mono text-purple-300">N = Hash(Secret, Scope)</code>. The smart contract registers N; subsequent submissions with the same nullifier are rejected while user anonymity is 100% preserved.&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-lg border border-border bg-muted/30">
                <div className="font-semibold text-amber-400 mb-1">Member 4 (Full-Stack & Cloud):</div>
                <p className="text-zinc-300 leading-relaxed italic">
                  &ldquo;I engineered the full-stack architecture, linking our FastAPI backend to the Next.js dual-theme workbench. I simulated the EVM <code className="font-mono text-amber-300">ecPairing</code> precompile at address 0x08, verifying proofs with 215,380 gas and providing synchronous KaTeX mathematical proofs in real time.&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TOP 5 VIVA VOCE Q&A */}
          {activeTab === "viva" && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="font-semibold text-foreground mb-1">
                  Q1: Why use zk-SNARKs instead of a traditional asymmetric signature (ECDSA/RSA)?
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Answer:</strong> ECDSA proves document authenticity but requires sharing the plaintext document. zk-SNARKs prove a mathematical predicate (e.g. age &ge; 18) without the verifier ever learning the underlying document contents.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="font-semibold text-foreground mb-1">
                  Q2: What is the significance of the BN254 elliptic curve?
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Answer:</strong> BN254 (alt_bn128) has native precompiled contract support on Ethereum at address 0x08 (ecPairing), drastically reducing pairing verification gas costs to ~215,000 gas.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="font-semibold text-foreground mb-1">
                  Q3: What prevents an adversary from forging a fake proof?
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Answer:</strong> The Soundness property of Groth16. Breaking soundness requires solving the Discrete Logarithm or Computational Diffie-Hellman problem on BN254, which has a 128-bit security level.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="font-semibold text-foreground mb-1">
                  Q4: What is a Nullifier and why is it needed?
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Answer:</strong> Because zk-SNARKs provide zero knowledge, the verifier cannot see who is submitting. The nullifier <code className="font-mono text-zinc-300">Hash(Secret, Scope)</code> guarantees single-use per domain without leaking identity.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/30 border border-border">
                <div className="font-semibold text-foreground mb-1">
                  Q5: Why is Poseidon hashing superior to SHA-256 in zero-knowledge circuits?
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Answer:</strong> SHA-256 requires ~25,000 R1CS constraints due to bitwise boolean operations. Poseidon is algebraically defined over prime fields, requiring only ~300 constraints, reducing prover latency by 98%.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: 100-MARK RUBRIC */}
          {activeTab === "rubric" && (
            <div className="space-y-3">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-border">
                  <thead>
                    <tr className="bg-muted text-muted-foreground uppercase text-[10px] font-mono">
                      <th className="p-2.5 border border-border">Evaluation Parameter</th>
                      <th className="p-2.5 border border-border">Max Marks</th>
                      <th className="p-2.5 border border-border">Target Achievement & Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="p-2.5 font-bold">Problem Definition & Cryptographic Rationale</td>
                      <td className="p-2.5 font-mono">15</td>
                      <td className="p-2.5">Identification of identity leakage; mathematical justification for zk-SNARKs.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Mathematical Rigor & Circuit Derivations</td>
                      <td className="p-2.5 font-mono">20</td>
                      <td className="p-2.5">R1CS to QAP reduction, Groth16 BN254 pairings, bit-decomposition range proofs.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Implementation & On-Chain Simulation</td>
                      <td className="p-2.5 font-mono">20</td>
                      <td className="p-2.5">FastAPI backend, Poseidon Merkle tree, deterministic nullifiers, EVM 0x08 gas model.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">UI/UX Polish & Defense Workbench</td>
                      <td className="p-2.5 font-mono">15</td>
                      <td className="p-2.5">Next.js 14 dual-theme shadcn UI, interactive proof studio, KaTeX math rendering.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Equitable Team Contribution & Defense</td>
                      <td className="p-2.5 font-mono">15</td>
                      <td className="p-2.5">4-member 25% equal matrix with individual 2-min oral speeches.</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold">Academic Dossier, Repo & Standards</td>
                      <td className="p-2.5 font-mono">15</td>
                      <td className="p-2.5">5-page ReportLab PDF dossier, Mermaid flowchart, clean GitHub repository.</td>
                    </tr>
                    <tr className="bg-muted font-bold text-foreground">
                      <td className="p-2.5">TOTAL COMPOSITE SCORE</td>
                      <td className="p-2.5 font-mono">100</td>
                      <td className="p-2.5 text-emerald-400">Target: First Class with Distinction (O-Grade: 95-100/100)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-border bg-card flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 font-semibold text-xs hover:bg-zinc-800 dark:hover:bg-zinc-200 transition"
          >
            Close War Room
          </button>
        </div>
      </div>
    </div>
  );
};
