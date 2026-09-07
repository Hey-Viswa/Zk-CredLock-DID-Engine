"use client";

import React from "react";
import { KeyRound, Shield, CheckCircle2, UserCheck } from "lucide-react";

export interface IdentityItem {
  id: string;
  name: string;
  leaf_index: number;
  commitment_hash: string;
  institution: string;
  department: string;
}

interface IdentityVaultProps {
  identities: IdentityItem[];
  selectedDid: string;
  onSelectDid: (did: string) => void;
}

export const IdentityVault: React.FC<IdentityVaultProps> = ({
  identities,
  selectedDid,
  onSelectDid,
}) => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <KeyRound className="h-4 w-4 text-emerald-400" />
          <h2 className="text-sm font-semibold tracking-tight">Identity Vault (W3C DID Commitments)</h2>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted">
          {identities.length} Enrolled Leaves
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Raw identity data never touches the blockchain. Each user possesses an off-chain secret key bound into a Poseidon state commitment leaf <code className="font-mono text-[11px] text-zinc-300">C = Hash(sk, attrs)</code>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {identities.map((item) => {
          const isSelected = item.id === selectedDid;
          return (
            <div
              key={item.id}
              onClick={() => onSelectDid(item.id)}
              className={`cursor-pointer rounded-lg border p-3 transition text-left flex flex-col justify-between ${
                isSelected
                  ? "border-emerald-500/80 bg-emerald-950/20 shadow-sm"
                  : "border-border bg-muted/40 hover:bg-muted"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <UserCheck className={`h-3.5 w-3.5 ${isSelected ? "text-emerald-400" : "text-muted-foreground"}`} />
                    <span className="font-semibold text-xs tracking-tight">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-background border border-border">
                    Leaf #{item.leaf_index}
                  </span>
                </div>
                <div className="text-[11px] font-mono text-muted-foreground truncate mb-1">
                  DID: <span className="text-foreground">{item.id}</span>
                </div>
                <div className="text-[10px] font-mono text-zinc-500 truncate">
                  Hash: {item.commitment_hash.slice(0, 18)}...
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-border/50 flex items-center justify-between text-[10px]">
                <span className="text-muted-foreground">{item.institution}</span>
                {isSelected && (
                  <span className="flex items-center gap-1 font-semibold text-emerald-400">
                    <CheckCircle2 className="h-3 w-3" /> Active Prover
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
