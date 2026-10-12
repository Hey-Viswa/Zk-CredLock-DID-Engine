"use client";

import React, { useState } from "react";
import {
  UserCheck,
  Cpu,
  ShieldCheck,
  Terminal,
  ArrowRight,
  ArrowLeft,
  Lock,
  CheckCircle2,
  XCircle,
  Clock,
  Flame,
  KeyRound,
  RotateCcw,
  Sparkles,
  Layers,
  AlertTriangle,
  EyeOff,
  Eye,
} from "lucide-react";
import { IdentityItem } from "./IdentityVault";
import { ProofResponse } from "./ProofStudio";
import { VerificationResponse } from "./OnChainVerifier";

interface CleanFlowWorkbenchProps {
  identities: IdentityItem[];
  selectedDid: string;
  onSelectDid: (did: string) => void;
  attributeType: string;
  setAttributeType: (t: string) => void;
  claimedThreshold: number;
  setClaimedThreshold: (v: number) => void;
  scope: string;
  setScope: (s: string) => void;
  onGenerateProof: () => Promise<ProofResponse | null>;
  isGenerating: boolean;
  proofData: ProofResponse | null;
  onVerifyProof: () => Promise<void>;
  isVerifying: boolean;
  verifResult: VerificationResponse | null;
  onSelectPreset: (presetId: string) => void;
  onResetNullifiers: () => void;
}

export const CleanFlowWorkbench: React.FC<CleanFlowWorkbenchProps> = ({
  identities,
  selectedDid,
  onSelectDid,
  attributeType,
  setAttributeType,
  claimedThreshold,
  setClaimedThreshold,
  scope,
  setScope,
  onGenerateProof,
  isGenerating,
  proofData,
  onVerifyProof,
  isVerifying,
  verifResult,
  onSelectPreset,
  onResetNullifiers,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [showPlaintextSecrets, setShowPlaintextSecrets] = useState(false);

  // Find currently selected identity
  const currentIdentity = identities.find((i) => i.id === selectedDid) || identities[0];

  // Helper mock attributes to show contrast between private raw data vs ZK proof
  const mockAttributesMap: Record<string, { age: number; income: number; cgpa: number }> = {
    "did:zk:viswa-001": { age: 23, income: 125000, cgpa: 8.92 },
    "did:zk:aarav-002": { age: 22, income: 85000, cgpa: 8.45 },
    "did:zk:neha-003": { age: 21, income: 92000, cgpa: 9.14 },
    "did:zk:underage-004": { age: 16, income: 15000, cgpa: 6.80 },
  };

  const selectedAttrs = mockAttributesMap[selectedDid] || { age: 23, income: 125000, cgpa: 8.92 };

  const handleNextFromStep2 = async () => {
    const res = await onGenerateProof();
    if (res) {
      setCurrentStep(3);
    }
  };

  const handleNextFromStep3 = async () => {
    await onVerifyProof();
    setCurrentStep(4);
  };

  const handlePresetClick = (presetId: string) => {
    onSelectPreset(presetId);
    // After running preset, jump to Step 3 or Step 4
    setTimeout(() => {
      setCurrentStep(3);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Quick Presets Bar */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span className="text-xs font-semibold tracking-tight text-foreground">
              One-Click Stress Test Presets
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground">
            Click any scenario to auto-run the end-to-end 4-step pipeline
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePresetClick("preset-1")}
            className="text-xs px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted font-medium transition flex items-center gap-1.5"
          >
            <span>🎂</span>
            <span>Legal Age (21+)</span>
          </button>

          <button
            onClick={() => handlePresetClick("preset-2")}
            className="text-xs px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted font-medium transition flex items-center gap-1.5"
          >
            <span>💼</span>
            <span>Solvency (≥ ₹75k/mo)</span>
          </button>

          <button
            onClick={() => handlePresetClick("preset-3")}
            className="text-xs px-3 py-1.5 rounded-lg border border-border bg-muted/40 hover:bg-muted font-medium transition flex items-center gap-1.5"
          >
            <span>🎓</span>
            <span>Honors CGPA (≥ 8.5)</span>
          </button>

          <button
            onClick={() => handlePresetClick("preset-4")}
            className="text-xs px-3 py-1.5 rounded-lg border border-rose-800/40 bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 font-medium transition flex items-center gap-1.5"
          >
            <span>⚠️</span>
            <span>Underage Rejection (16yo vs 18+)</span>
          </button>

          <button
            onClick={() => handlePresetClick("preset-5")}
            className="text-xs px-3 py-1.5 rounded-lg border border-amber-800/40 bg-amber-950/20 text-amber-300 hover:bg-amber-950/40 font-medium transition flex items-center gap-1.5"
          >
            <span>🔁</span>
            <span>Replay Attack (Double-Spend)</span>
          </button>
        </div>
      </div>

      {/* 4-Step Interactive Progress Stepper */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {/* Step 1 */}
          <button
            onClick={() => setCurrentStep(1)}
            className={`p-3 rounded-lg border text-left transition flex items-center gap-2.5 ${
              currentStep === 1
                ? "border-emerald-500/80 bg-emerald-950/20 text-emerald-300 font-bold"
                : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-mono">
              1
            </div>
            <div>
              <div className="text-xs leading-none">Select Identity</div>
              <div className="text-[10px] text-zinc-500 mt-1 font-normal">DID Credentials</div>
            </div>
          </button>

          {/* Step 2 */}
          <button
            onClick={() => setCurrentStep(2)}
            className={`p-3 rounded-lg border text-left transition flex items-center gap-2.5 ${
              currentStep === 2
                ? "border-emerald-500/80 bg-emerald-950/20 text-emerald-300 font-bold"
                : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-mono">
              2
            </div>
            <div>
              <div className="text-xs leading-none">Define Policy Claim</div>
              <div className="text-[10px] text-zinc-500 mt-1 font-normal">Predicate & Scope</div>
            </div>
          </button>

          {/* Step 3 */}
          <button
            onClick={() => setCurrentStep(3)}
            disabled={!proofData}
            className={`p-3 rounded-lg border text-left transition flex items-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed ${
              currentStep === 3
                ? "border-emerald-500/80 bg-emerald-950/20 text-emerald-300 font-bold"
                : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-mono">
              3
            </div>
            <div>
              <div className="text-xs leading-none">Synthesize ZK Proof</div>
              <div className="text-[10px] text-zinc-500 mt-1 font-normal">Groth16 Shield</div>
            </div>
          </button>

          {/* Step 4 */}
          <button
            onClick={() => setCurrentStep(4)}
            disabled={!proofData}
            className={`p-3 rounded-lg border text-left transition flex items-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed ${
              currentStep === 4
                ? "border-emerald-500/80 bg-emerald-950/20 text-emerald-300 font-bold"
                : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            <div className="h-6 w-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-mono">
              4
            </div>
            <div>
              <div className="text-xs leading-none">Verify On-Chain</div>
              <div className="text-[10px] text-zinc-500 mt-1 font-normal">EVM 0x08 Precompile</div>
            </div>
          </button>
        </div>
      </div>

      {/* STEP 1: CHOOSE IDENTITY */}
      {currentStep === 1 && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5 animate-in fade-in duration-150">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-400" />
                Step 1: Choose the Off-Chain Identity to Prove
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                All raw documents and attributes remain stored strictly on the user device. Nothing is published to the blockchain.
              </p>
            </div>
            <button
              onClick={() => setShowPlaintextSecrets(!showPlaintextSecrets)}
              className="text-[11px] font-medium px-2.5 py-1 rounded border border-border bg-muted/40 hover:bg-muted text-zinc-300 flex items-center gap-1.5 transition"
            >
              {showPlaintextSecrets ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              <span>{showPlaintextSecrets ? "Hide Raw Attributes" : "Inspect Raw Attributes"}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {identities.map((item) => {
              const isSelected = item.id === selectedDid;
              const attrs = mockAttributesMap[item.id] || { age: 20, income: 50000, cgpa: 7.5 };

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectDid(item.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition ${
                    isSelected
                      ? "border-emerald-500 bg-emerald-950/20 shadow-sm"
                      : "border-border bg-muted/20 hover:bg-muted/40"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-xs text-foreground flex items-center gap-1.5">
                      <KeyRound className={`h-3.5 w-3.5 ${isSelected ? "text-emerald-400" : "text-zinc-500"}`} />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-background border border-border">
                      Leaf #{item.leaf_index}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-muted-foreground truncate mb-2">
                    DID: <span className="text-foreground">{item.id}</span>
                  </div>

                  {/* Private Attributes Preview */}
                  <div className="p-2.5 rounded-lg bg-background/70 border border-border/60 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Age:</span>
                      <span className="font-mono font-medium text-foreground">
                        {showPlaintextSecrets ? `${attrs.age} Years (DOB: 2003)` : "••• [Locked in Enclave]"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">Income:</span>
                      <span className="font-mono font-medium text-foreground">
                        {showPlaintextSecrets ? `₹${attrs.income.toLocaleString()}/mo` : "•••••• [Locked]"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-muted-foreground">CGPA:</span>
                      <span className="font-mono font-medium text-foreground">
                        {showPlaintextSecrets ? `${attrs.cgpa} / 10.0` : "••• [Locked]"}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-border/40 flex items-center justify-between text-[10px]">
                    <span className="text-zinc-500">{item.institution}</span>
                    {isSelected && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> Selected Prover
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-5 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-sm"
            >
              <span>Next: Define Policy Claim</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: DEFINE POLICY CLAIM */}
      {currentStep === 2 && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5 animate-in fade-in duration-150">
          <div>
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <Cpu className="h-4 w-4 text-cyan-400" />
              Step 2: Define the Verification Policy (Zero-Knowledge Predicate)
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Choose the statement you want to mathematically prove without revealing your actual numbers.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-border bg-muted/20 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Attribute Choice */}
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                Target Attribute
              </label>
              <select
                value={attributeType}
                onChange={(e) => {
                  const val = e.target.value;
                  setAttributeType(val);
                  if (val === "age") setClaimedThreshold(21);
                  else if (val === "income") setClaimedThreshold(75000);
                  else if (val === "cgpa") setClaimedThreshold(8.5);
                }}
                className="w-full text-xs rounded-md border border-border bg-background px-3 py-2 text-foreground focus:outline-none focus:ring-1 focus:ring-zinc-400"
              >
                <option value="age">Age Compliance (Years)</option>
                <option value="income">Financial Solvency (INR / mo)</option>
                <option value="cgpa">Academic CGPA (Grade Point)</option>
              </select>
            </div>

            {/* Claimed Threshold */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-foreground">
                  Claimed Threshold (Predicate: val ≥ T)
                </label>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {attributeType === "income"
                    ? `₹${claimedThreshold.toLocaleString()}`
                    : claimedThreshold}
                </span>
              </div>
              <input
                type="number"
                step={attributeType === "cgpa" ? "0.1" : "1"}
                value={claimedThreshold}
                onChange={(e) => setClaimedThreshold(parseFloat(e.target.value) || 0)}
                className="w-full text-xs rounded-md border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-zinc-400"
              />
            </div>

            {/* Scope / Nullifier Domain */}
            <div>
              <label className="text-xs font-semibold text-foreground block mb-1.5">
                Application Scope (Nullifier Domain)
              </label>
              <input
                type="text"
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full text-xs font-mono rounded-md border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-zinc-400"
                placeholder="e.g. PillaiHOC-Convocation"
              />
            </div>
          </div>

          {/* Circuit Predicate Preview Card */}
          <div className="p-4 rounded-xl border border-border bg-background flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-semibold text-foreground">
                Mathematical Assertion Being Proven:
              </div>
              <div className="font-mono text-cyan-400 text-xs mt-0.5">
                {currentIdentity.name}&apos;s {attributeType} ≥ {attributeType === "income" ? `₹${claimedThreshold.toLocaleString()}` : claimedThreshold} (Scope: {scope})
              </div>
            </div>
            <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-400" /> 128 R1CS Constraints • Groth16 BN254
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs font-semibold transition flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back: Identity</span>
            </button>

            <button
              onClick={handleNextFromStep2}
              disabled={isGenerating}
              className="px-5 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isGenerating ? (
                <Clock className="h-4 w-4 animate-spin text-cyan-500" />
              ) : (
                <Cpu className="h-4 w-4 text-emerald-500" />
              )}
              <span>{isGenerating ? "Compiling Circuit..." : "Synthesize zk-SNARK Proof ➔"}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: SYNTHESIZE ZK PROOF */}
      {currentStep === 3 && proofData && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5 animate-in fade-in duration-150">
          <div>
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              Step 3: Zero-Knowledge Shield Generated (What is Shared vs Hidden)
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              The client has synthesized the Groth16 cryptographic proof. Compare what normal apps leak vs what Zk-CredLock shares.
            </p>
          </div>

          {/* Privacy Contrast Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Plaintext Leaked (Legacy App) */}
            <div className="p-4 rounded-xl border border-rose-900/40 bg-rose-950/10 text-xs space-y-2">
              <div className="font-bold text-rose-400 flex items-center gap-1.5">
                <XCircle className="h-4 w-4 text-rose-500" />
                ❌ Legacy Plaintext Verification (Leaked Data)
              </div>
              <ul className="text-zinc-400 text-[11px] space-y-1 pl-4 list-disc">
                <li>Birth Year & Exact Date of Birth exposed to server</li>
                <li>Exact Monthly Income or Bank Statements published</li>
                <li>Full Grade Transcript & Roll Number logged in plaintext</li>
                <li>Single central database can track user activity everywhere</li>
              </ul>
            </div>

            {/* Zero-Knowledge Shield (Zk-CredLock) */}
            <div className="p-4 rounded-xl border border-emerald-900/40 bg-emerald-950/10 text-xs space-y-2">
              <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                🛡️ Zk-CredLock Cryptographic Shield (Zero Leakage)
              </div>
              <ul className="text-zinc-300 text-[11px] space-y-1 pl-4 list-disc">
                <li><strong className="text-white">0 Plaintext Numbers:</strong> DOB, salary, and marks are hidden</li>
                <li><strong className="text-white">Proof Only:</strong> 3 elliptic curve points (pi_A, pi_B, pi_C)</li>
                <li><strong className="text-white">1 Deterministic Nullifier:</strong> Prevents double-claiming</li>
                <li><strong className="text-white">100% Unlinkable:</strong> Cannot track user across different scopes</li>
              </ul>
            </div>
          </div>

          {/* Circuit Status Banner */}
          <div
            className={`p-3.5 rounded-lg border flex items-center justify-between text-xs ${
              proofData.circuit_satisfied
                ? "border-emerald-800/80 bg-emerald-950/30 text-emerald-300"
                : "border-rose-800/80 bg-rose-950/30 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2 font-semibold">
              {proofData.circuit_satisfied ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-rose-400" />
              )}
              <span>
                {proofData.circuit_satisfied
                  ? "R1CS CONSTRAINTS SATISFIED: Witness Valid & Non-Negative"
                  : "CONSTRAINT VIOLATION: Underage Deficit or Negative Range Difference"}
              </span>
            </div>
            <span className="font-mono text-[11px]">
              Generation Latency: {proofData.telemetry.proof_generation_ms} ms
            </span>
          </div>

          {/* Cryptographic Proof Inspection */}
          <div className="p-3.5 rounded-lg bg-muted/40 border border-border text-[11px] font-mono space-y-1.5 text-zinc-400">
            <div className="text-foreground font-semibold text-xs mb-1">
              Public Signals & BN254 Group Elements:
            </div>
            <div className="truncate">
              <span className="text-zinc-500">pi_A:</span> {proofData.proof.pi_a[0]}
            </div>
            <div className="truncate">
              <span className="text-zinc-500">pi_B:</span> {proofData.proof.pi_b[0][0]}
            </div>
            <div className="truncate">
              <span className="text-zinc-500">Nullifier:</span> {proofData.nullifier}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs font-semibold transition flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back: Claim Policy</span>
            </button>

            <button
              onClick={handleNextFromStep3}
              disabled={isVerifying}
              className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-sm disabled:opacity-50"
            >
              {isVerifying ? (
                <Clock className="h-4 w-4 animate-spin" />
              ) : (
                <Terminal className="h-4 w-4" />
              )}
              <span>{isVerifying ? "Evaluating On-Chain..." : "Verify Proof On-Chain (EVM Precompile 0x08) ➔"}</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ON-CHAIN EVM VERIFICATION */}
      {currentStep === 4 && verifResult && (
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5 animate-in fade-in duration-150">
          <div>
            <h3 className="text-sm font-bold tracking-tight text-foreground flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              Step 4: On-Chain Smart Contract Settlement Result
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Simulates the Ethereum / Arbitrum EVM smart contract executing bilinear pairings via precompile 0x08.
            </p>
          </div>

          {/* Large Result Banner */}
          <div
            className={`p-5 rounded-xl border flex items-start gap-3.5 ${
              verifResult.is_valid
                ? "border-emerald-800 bg-emerald-950/40 text-emerald-100"
                : "border-rose-800 bg-rose-950/40 text-rose-100"
            }`}
          >
            {verifResult.is_valid ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-6 w-6 text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-base tracking-tight">
                {verifResult.is_valid
                  ? "TRANSACTION VERIFIED ON-CHAIN (Attribute Approved)"
                  : "TRANSACTION REVERTED BY SMART CONTRACT"}
              </div>
              <div className="text-xs mt-1 text-zinc-300">
                {verifResult.is_valid
                  ? "The smart contract confirmed valid Groth16 bilinear pairings e(A, B) == e(alpha, beta)... The nullifier has been immutably committed to state. Zero plaintext personal data was exposed."
                  : verifResult.rejection_reason}
              </div>
            </div>
          </div>

          {/* Smart Contract Gas & Performance Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-muted/40 border border-border">
              <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
                <Flame className="h-3 w-3 text-amber-400" /> EVM Gas Used
              </span>
              <span className="font-bold text-foreground text-sm">
                {verifResult.smart_contract.gas_consumed.toLocaleString()}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border">
              <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
                <Clock className="h-3 w-3 text-cyan-400" /> Verification Time
              </span>
              <span className="font-bold text-foreground text-sm">
                {verifResult.smart_contract.execution_time_ms} ms
              </span>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border">
              <span className="text-[10px] text-muted-foreground block">
                Precompile Invoked
              </span>
              <span className="font-bold text-foreground text-sm">
                0x08 (ecPairing)
              </span>
            </div>

            <div className="p-3 rounded-lg bg-muted/40 border border-border">
              <span className="text-[10px] text-muted-foreground block">
                Nullifiers Spent
              </span>
              <span className="font-bold text-foreground text-sm">
                {verifResult.nullifier_status.total_nullifiers_spent} Registered
              </span>
            </div>
          </div>

          {/* Contract Address Callout */}
          <div className="p-3 rounded-lg bg-background border border-border text-[11px] font-mono text-zinc-400 flex items-center justify-between">
            <div>
              <span className="text-zinc-500">Verifier Contract:</span>{" "}
              <span className="text-foreground">{verifResult.smart_contract.verifier_address}</span>
            </div>
            <span className="text-emerald-400 font-semibold text-[10px]">
              EVM Compatible
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <button
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-lg border border-border bg-muted/40 hover:bg-muted text-xs font-semibold transition flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back: Claim Policy</span>
            </button>

            <div className="flex items-center gap-2">
              {/* Test Replay Attack Button */}
              <button
                onClick={onVerifyProof}
                className="px-3 py-2 rounded-lg border border-amber-800/60 bg-amber-950/20 text-amber-300 hover:bg-amber-950/40 text-xs font-semibold transition flex items-center gap-1.5"
                title="Submit the exact same proof again to test replay protection"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Test Replay Attack</span>
              </button>

              {/* Start New Verification */}
              <button
                onClick={() => {
                  setCurrentStep(1);
                }}
                className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold text-xs tracking-wide transition shadow-sm"
              >
                New Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
