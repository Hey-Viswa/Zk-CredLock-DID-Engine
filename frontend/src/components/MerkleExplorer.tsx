"use client";

import React from "react";
import { GitBranch, Layers, ShieldCheck } from "lucide-react";

export interface MerkleLevel {
  level: number;
  name: string;
  nodes: string[];
}

export interface MerkleState {
  depth: number;
  num_leaves: number;
  root: string;
  levels: MerkleLevel[];
}

interface MerkleExplorerProps {
  merkleState: MerkleState | null;
  selectedLeafIndex: number;
}

export const MerkleExplorer: React.FC<MerkleExplorerProps> = ({
  merkleState,
  selectedLeafIndex,
}) => {
  if (!merkleState) return null;

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-purple-400" />
          <h2 className="text-sm font-semibold tracking-tight">Poseidon Merkle State Commitment</h2>
        </div>
        <span className="text-[11px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-muted">
          Depth {merkleState.depth} • {merkleState.num_leaves} Leaves
        </span>
      </div>

      <div className="text-xs text-muted-foreground mb-4">
        On-chain state is committed to a single 32-byte Merkle root. Provers verify credential membership in $O(\log N)$ operations without revealing their leaf index or personal identifier.
      </div>

      {/* Root Display */}
      <div className="p-3 rounded-lg bg-muted/40 border border-border mb-4">
        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>Active State Root (Committed On-Chain)</span>
          <span className="text-emerald-400 font-semibold flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Anchored
          </span>
        </div>
        <div className="text-xs font-mono text-foreground break-all select-all font-semibold">
          {merkleState.root}
        </div>
      </div>

      {/* Tree Hierarchy Visualizer */}
      <div className="space-y-3">
        {merkleState.levels
          .slice()
          .reverse()
          .map((lvl) => {
            const isRoot = lvl.level === merkleState.depth;
            const isLeaves = lvl.level === 0;

            return (
              <div key={lvl.level} className="text-xs font-mono">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                  <span className="font-semibold text-foreground flex items-center gap-1">
                    <Layers className="h-3 w-3 text-zinc-400" /> {lvl.name}
                  </span>
                  <span>{lvl.nodes.length} {lvl.nodes.length === 1 ? "Node" : "Nodes"}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {lvl.nodes.map((nodeHex, nodeIdx) => {
                    const isTargetLeaf = isLeaves && nodeIdx === selectedLeafIndex;
                    return (
                      <div
                        key={nodeIdx}
                        className={`px-2 py-1 rounded border text-[10px] truncate max-w-[130px] transition ${
                          isRoot
                            ? "border-emerald-500/80 bg-emerald-950/20 text-emerald-300 font-bold"
                            : isTargetLeaf
                            ? "border-cyan-500/80 bg-cyan-950/20 text-cyan-300 font-semibold"
                            : "border-border bg-muted/30 text-zinc-400 hover:text-foreground"
                        }`}
                        title={nodeHex}
                      >
                        {isTargetLeaf ? `[Target #${nodeIdx}] ` : ""}
                        {nodeHex.slice(0, 8)}...
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
