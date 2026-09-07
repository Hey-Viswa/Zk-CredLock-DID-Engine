"use client";

import React from "react";
import { Cpu, Zap, Lock, Sliders, ShieldAlert, Sparkles, Hash } from "lucide-react";

export interface ProofResponse {
  circuit_name: string;
  circuit_satisfied: boolean;
  attribute_type: string;
  claimed_threshold: number;
  scope: string;
  nullifier: string;
  public_signals: string[];
  proof: {
    pi_a: string[];
    pi_b: string[][];
    pi_c: string[];
    protocol: string;
    curve: string;
  };
  merkle_witness: {
    root: string;
    path_elements: string[];
    path_indices: number[];
  };
  telemetry: {
    r1cs_constraints: number;
    proof_generation_ms: number;
    witness_size_bytes: number;
    zero_knowledge_guarantee: string;
  };
}

interface ProofStudioProps {
  attributeType: string;
  setAttributeType: (t: string) => void;
  claimedThreshold: number;
  setClaimedThreshold: (v: number) => void;
  scope: string;
  setScope: (s: string) => void;
  onGenerateProof: () => void;
  isGenerating: boolean;
  proofData: ProofResponse | null;
  onSelectPreset: (presetId: string) => void;
}

export const ProofStudio: React.FC<ProofStudioProps> = ({
  attributeType,
  setAttributeType,
  claimedThreshold,
  setClaimedThreshold,
  scope,
  setScope,
  onGenerateProof,
  isGenerating,
  proofData,
  onSelectPreset,
}) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Cpu className="h-4 w-4 text-cyan-400" />
          <h2 className="text-sm font-semibold tracking-tight">Zero-Knowledge Circuit Studio (R1CS Witness)</h2>
        </div>
        <span className="text-[11px] font-mono text-zinc-400 flex items-center gap-1">
          <Lock className="h-3 w-3 text-emerald-400" /> Groth16 • BN254
        </span>
      </div>

      {/* Preset Scenario Buttons */}
      <div className="mb-4">
        <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
          Stress-Test Benchmarks & Presets
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onSelectPreset("preset-1")}
            className="text-xs px-2.5 py-1 rounded border border-border bg-muted/50 hover:bg-muted font-medium transition"
          >
            🎂 Legal Age (21+)
          </button>
          <button
            onClick={() => onSelectPreset("preset-2")}
            className="text-xs px-2.5 py-1 rounded border border-border bg-muted/50 hover:bg-muted font-medium transition"
          >
            💰 Solvency (₹75k+/mo)
          </button>
          <button
            onClick={() => onSelectPreset("preset-3")}
            className="text-xs px-2.5 py-1 rounded border border-border bg-muted/50 hover:bg-muted font-medium transition"
          >
            🎓 Honors CGPA (≥ 8.5)
          </button>
          <button
            onClick={() => onSelectPreset("preset-4")}
            className="text-xs px-2.5 py-1 rounded border border-rose-900/50 bg-rose-950/30 text-rose-300 hover:bg-rose-950/50 font-medium transition"
          >
            ⚠️ Underage Attack
          </button>
          <button
            onClick={() => onSelectPreset("preset-5")}
            className="text-xs px-2.5 py-1 rounded border border-amber-900/50 bg-amber-950/30 text-amber-300 hover:bg-amber-950/50 font-medium transition"
          >
            🔁 Replay Attack
          </button>
        </div>
      </div>

      {/* Circuit Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* 1. Attribute Selection */}
        <div>
          <label className="text-xs font-semibold text-foreground block mb-1.5">
            Selective Attribute
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

        {/* 2. Threshold Slider / Input */}
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

        {/* 3. Application Scope */}
        <div>
          <label className="text-xs font-semibold text-foreground block mb-1.5">
            Application Scope (Nullifier Domain)
          </label>
          <input
            type="text"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="w-full text-xs font-mono rounded-md border border-border bg-background px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-zinc-400"
            placeholder="e.g. PillaiHOC-Portal"
          />
        </div>
      </div>

      {/* Generate Proof Button */}
      <button
        onClick={onGenerateProof}
        disabled={isGenerating}
        className="w-full py-2.5 px-4 rounded-lg bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 font-semibold text-xs tracking-wide hover:bg-zinc-800 dark:hover:bg-zinc-200 transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
      >
        {isGenerating ? (
          <Zap className="h-4 w-4 animate-spin text-cyan-400" />
        ) : (
          <Sparkles className="h-4 w-4 text-emerald-400" />
        )}
        <span>{isGenerating ? "Synthesizing R1CS Constraint Proof..." : "Synthesize Groth16 zk-SNARK Proof"}</span>
      </button>

      {/* Proof Telemetry & Output */}
      {proofData && (
        <div className="mt-5 pt-4 border-t border-border">
          {/* Status Banner */}
          <div
            className={`p-3 rounded-lg mb-4 flex items-center justify-between ${
              proofData.circuit_satisfied
                ? "bg-emerald-950/30 border border-emerald-800/60 text-emerald-300"
                : "bg-rose-950/30 border border-rose-800/60 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold">
              <Cpu className="h-4 w-4" />
              <span>
                Circuit Status:{" "}
                {proofData.circuit_satisfied
                  ? "R1CS CONSTRAINTS SATISFIED (Witness Valid)"
                  : "CONSTRAINT VIOLATION: UNDERAGE / THRESHOLD DEFICIT"}
              </span>
            </div>
            <span className="text-[11px] font-mono">
              Latency: {proofData.telemetry.proof_generation_ms} ms
            </span>
          </div>

          {/* Cryptographic Artifacts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-[11px] font-mono">
            {/* Groth16 Proof Components */}
            <div className="p-3 rounded-lg bg-muted/40 border border-border">
              <span className="font-semibold text-foreground block mb-1">
                Groth16 Curve Points (BN254)
              </span>
              <div className="space-y-1 text-zinc-400">
                <div className="truncate">
                  <span className="text-zinc-500">pi_A (G1):</span> {proofData.proof.pi_a[0].slice(0, 24)}...
                </div>
                <div className="truncate">
                  <span className="text-zinc-500">pi_B (G2):</span> {proofData.proof.pi_b[0][0].slice(0, 24)}...
                </div>
                <div className="truncate">
                  <span className="text-zinc-500">pi_C (G1):</span> {proofData.proof.pi_c[0].slice(0, 24)}...
                </div>
              </div>
            </div>

            {/* Nullifier & Signals */}
            <div className="p-3 rounded-lg bg-muted/40 border border-border">
              <span className="font-semibold text-foreground block mb-1">
                Deterministic Nullifier & State Root
              </span>
              <div className="space-y-1 text-zinc-400">
                <div className="truncate">
                  <span className="text-zinc-500">Nullifier:</span> {proofData.nullifier.slice(0, 24)}...
                </div>
                <div className="truncate">
                  <span className="text-zinc-500">Root:</span> {proofData.merkle_witness.root.slice(0, 24)}...
                </div>
                <div className="truncate text-emerald-400 text-[10px]">
                  ✓ 100% Unlinkable across scopes (Zero Replay Risk)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
