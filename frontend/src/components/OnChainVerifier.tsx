"use client";

import React from "react";
import { CheckCircle2, XCircle, Terminal, Flame, Clock, Network, AlertTriangle } from "lucide-react";
import { ProofResponse } from "./ProofStudio";

export interface VerificationResponse {
  is_valid: boolean;
  rejection_reason: string | null;
  smart_contract: {
    verifier_address: string;
    network: string;
    precompile_invoked: string;
    gas_consumed: number;
    execution_time_ms: number;
  };
  nullifier_status: {
    nullifier: string;
    action_recorded: string;
    total_nullifiers_spent: number;
  };
}

interface OnChainVerifierProps {
  proofData: ProofResponse | null;
  onVerifyProof: () => void;
  isVerifying: boolean;
  verifResult: VerificationResponse | null;
}

export const OnChainVerifier: React.FC<OnChainVerifierProps> = ({
  proofData,
  onVerifyProof,
  isVerifying,
  verifResult,
}) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold tracking-tight">On-Chain EVM Smart Contract Verifier</h2>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted">
          Precompile 0x08 (ecPairing)
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Simulates an Ethereum / Arbitrum smart contract verifying Groth16 bilinear pairings over the BN254 curve:{" "}
        <code className="font-mono text-[11px] text-zinc-300">e(pi_A, pi_B) == e(alpha, beta) * e(x, gamma) * e(pi_C, delta)</code>.
      </p>

      {/* Action Button */}
      <button
        onClick={onVerifyProof}
        disabled={!proofData || isVerifying}
        className="w-full py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {isVerifying ? (
          <Clock className="h-4 w-4 animate-spin" />
        ) : (
          <CheckCircle2 className="h-4 w-4" />
        )}
        <span>{isVerifying ? "Evaluating Bilinear Pairing on EVM..." : "Execute On-Chain Verification (Gas Benchmark)"}</span>
      </button>

      {/* Verification Result Banner */}
      {verifResult && (
        <div className="space-y-3">
          <div
            className={`p-4 rounded-lg border flex items-start gap-3 ${
              verifResult.is_valid
                ? "bg-emerald-950/30 border-emerald-800/80 text-emerald-200"
                : "bg-rose-950/30 border-rose-800/80 text-rose-200"
            }`}
          >
            {verifResult.is_valid ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="h-5 w-5 text-rose-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold text-sm">
                {verifResult.is_valid
                  ? "PROOF CRYPTOGRAPHICALLY VALID (Attribute Verified)"
                  : "ON-CHAIN TRANSACTION REVERTED"}
              </div>
              <div className="text-xs mt-1 text-zinc-300">
                {verifResult.is_valid
                  ? "The smart contract confirmed valid Groth16 pairings. Zero knowledge was preserved; no raw attribute was leaked."
                  : verifResult.rejection_reason}
              </div>
            </div>
          </div>

          {/* Smart Contract Telemetry Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-md bg-muted/40 border border-border">
              <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
                <Flame className="h-3 w-3 text-amber-400" /> Gas Consumed
              </span>
              <span className="font-bold text-foreground">
                {verifResult.smart_contract.gas_consumed.toLocaleString()}
              </span>
            </div>

            <div className="p-2.5 rounded-md bg-muted/40 border border-border">
              <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
                <Clock className="h-3 w-3 text-cyan-400" /> Execution Time
              </span>
              <span className="font-bold text-foreground">
                {verifResult.smart_contract.execution_time_ms} ms
              </span>
            </div>

            <div className="p-2.5 rounded-md bg-muted/40 border border-border">
              <span className="text-[10px] text-muted-foreground block flex items-center gap-1">
                <Network className="h-3 w-3 text-indigo-400" /> Precompile
              </span>
              <span className="font-bold text-foreground">
                {verifResult.smart_contract.precompile_invoked.slice(0, 14)}...
              </span>
            </div>

            <div className="p-2.5 rounded-md bg-muted/40 border border-border">
              <span className="text-[10px] text-muted-foreground block">
                Nullifiers Spent
              </span>
              <span className="font-bold text-foreground">
                {verifResult.nullifier_status.total_nullifiers_spent} Registered
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
