"use client";

import React, { useState } from "react";
import { GitBranch, Layers, ShieldCheck, Box, Table } from "lucide-react";
import { MerkleTree3D } from "./MerkleTree3D";

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
  const [viewMode, setViewMode] = useState<"3d" | "2d">("3d");

  if (!merkleState) return null;

  return (
    <div className="space-y-4">
      {/* View Mode Toggle Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-purple-950/40 border border-purple-800/60 flex items-center justify-center text-purple-400">
            <GitBranch className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight">Poseidon Merkle State Commitment</h2>
            <p className="text-xs text-muted-foreground">
              Binary Merkle tree with Poseidon algebraic field hash • Depth {merkleState.depth} ({merkleState.num_leaves} Enclave Leaves)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-muted border border-border text-xs font-medium">
          <button
            onClick={() => setViewMode("3d")}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              viewMode === "3d"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Box className="h-3.5 w-3.5 text-emerald-400" />
            <span>3D Three.js Tree</span>
          </button>
          <button
            onClick={() => setViewMode("2d")}
            className={`px-3 py-1.5 rounded-md transition flex items-center gap-1.5 ${
              viewMode === "2d"
                ? "bg-background text-foreground shadow-sm font-semibold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Table className="h-3.5 w-3.5 text-zinc-400" />
            <span>2D Hash Hierarchy</span>
          </button>
        </div>
      </div>

      {/* 3D Visualization Canvas */}
      {viewMode === "3d" && (
        <MerkleTree3D
          merkleState={merkleState}
          selectedLeafIndex={selectedLeafIndex}
        />
      )}

      {/* Root & Node State Inspector */}
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
        {/* Root Display */}
        <div className="p-3.5 rounded-lg bg-muted/40 border border-border">
          <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>On-Chain Merkle State Root</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5" /> BN254 Precompile Anchored
            </span>
          </div>
          <div className="text-xs font-mono text-foreground break-all select-all font-semibold">
            {merkleState.root}
          </div>
        </div>

        {/* Tree Hierarchy Breakdown */}
        <div className="space-y-3 pt-1">
          <div className="text-xs font-semibold tracking-tight text-foreground flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-zinc-400" />
            <span>Poseidon Hash Hierarchy By Layer</span>
          </div>

          {merkleState.levels
            .slice()
            .reverse()
            .map((lvl) => {
              const isRoot = lvl.level === merkleState.depth;
              const isLeaves = lvl.level === 0;

              return (
                <div key={lvl.level} className="text-xs font-mono border-t border-border/50 pt-2.5">
                  <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1.5">
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      {isRoot ? "Layer 3: State Root" : lvl.name}
                    </span>
                    <span>
                      {lvl.nodes.length} {lvl.nodes.length === 1 ? "Node" : "Nodes"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1.5">
                    {lvl.nodes.map((nodeHex, nodeIdx) => {
                      const isTargetLeaf = isLeaves && nodeIdx === selectedLeafIndex;
                      return (
                        <div
                          key={nodeIdx}
                          className={`p-2 rounded-lg border text-[10px] transition ${
                            isRoot
                              ? "border-emerald-500/80 bg-emerald-950/20 text-emerald-300 font-bold"
                              : isTargetLeaf
                              ? "border-cyan-500/80 bg-cyan-950/20 text-cyan-300 font-semibold shadow-sm"
                              : "border-border bg-muted/30 text-zinc-400 hover:text-foreground"
                          }`}
                          title={nodeHex}
                        >
                          <div className="flex items-center justify-between text-[9px] text-zinc-500 mb-0.5">
                            <span>#{nodeIdx}</span>
                            {isTargetLeaf && <span className="text-cyan-400 font-bold">Prover Leaf</span>}
                            {isRoot && <span className="text-emerald-400 font-bold">Root</span>}
                          </div>
                          <div className="truncate font-mono">{nodeHex}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
