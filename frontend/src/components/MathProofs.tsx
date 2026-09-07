"use client";

import React, { useEffect, useRef } from "react";
import katex from "katex";
import { BookOpen } from "lucide-react";

interface MathBlockProps {
  math: string;
  display?: boolean;
}

const MathBlock: React.FC<MathBlockProps> = ({ math, display = false }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      try {
        katex.render(math, containerRef.current, {
          displayMode: display,
          throwOnError: false,
        });
      } catch (err) {
        console.error("KaTeX render error:", err);
      }
    }
  }, [math, display]);

  return <span ref={containerRef} />;
};

export const MathProofs: React.FC = () => {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-4 w-4 text-blue-400" />
        <h2 className="text-sm font-semibold tracking-tight">Cryptographic Foundations & Theorems</h2>
      </div>

      <p className="text-xs text-muted-foreground mb-4">
        Mathematical derivations underpinning the Groth16 zero-knowledge proof generation and on-chain BN254 verification pipeline.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Formula 1: QAP Reduction */}
        <div className="p-3 rounded-lg bg-muted/40 border border-border">
          <div className="font-semibold text-foreground mb-1 text-[11px]">
            1. R1CS to QAP Polynomial Reduction
          </div>
          <div className="my-2 py-1 text-center bg-background/60 rounded border border-border/50 overflow-x-auto text-zinc-200">
            <MathBlock math="L(x) \cdot R(x) - O(x) = H(x) \cdot T(x)" display={true} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Where <MathBlock math="T(x) = \prod_{i=1}^m (x - r_i)" /> is the vanishing polynomial over roots <MathBlock math="r_i" />. Proves all arithmetic gate constraints are satisfied simultaneously in zero knowledge.
          </p>
        </div>

        {/* Formula 2: Bilinear Pairing */}
        <div className="p-3 rounded-lg bg-muted/40 border border-border">
          <div className="font-semibold text-foreground mb-1 text-[11px]">
            2. Groth16 Bilinear Pairing Verification
          </div>
          <div className="my-2 py-1 text-center bg-background/60 rounded border border-border/50 overflow-x-auto text-zinc-200">
            <MathBlock math="e(\pi_A, \pi_B) = e(\alpha, \beta) \cdot e\left(\sum_{i=0}^l x_i \gamma_i, \delta\right) \cdot e(\pi_C, \delta)" display={true} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Evaluated on-chain over <MathBlock math="\mathbb{G}_1 \times \mathbb{G}_2 \to \mathbb{G}_T" /> using the Ethereum BN254 precompiled pairing engine at contract address <code className="font-mono text-[10px]">0x08</code>.
          </p>
        </div>

        {/* Formula 3: Range Proof */}
        <div className="p-3 rounded-lg bg-muted/40 border border-border">
          <div className="font-semibold text-foreground mb-1 text-[11px]">
            3. Bit-Decomposition Range Constraint
          </div>
          <div className="my-2 py-1 text-center bg-background/60 rounded border border-border/50 overflow-x-auto text-zinc-200">
            <MathBlock math="\Delta = x - T = \sum_{i=0}^{15} b_i 2^i, \quad b_i(b_i - 1) = 0" display={true} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Enforcing boolean constraints <MathBlock math="b_i \in \{0, 1\}" /> guarantees non-negativity <MathBlock math="\Delta \ge 0" /> over finite field <MathBlock math="\mathbb{F}_p" />, proving <MathBlock math="x \ge T" /> without disclosing <MathBlock math="x" />.
          </p>
        </div>

        {/* Formula 4: Deterministic Nullifier */}
        <div className="p-3 rounded-lg bg-muted/40 border border-border">
          <div className="font-semibold text-foreground mb-1 text-[11px]">
            4. Deterministic Replay-Defense Nullifier
          </div>
          <div className="my-2 py-1 text-center bg-background/60 rounded border border-border/50 overflow-x-auto text-zinc-200">
            <MathBlock math="\text{Nullifier} = \text{Poseidon}(\text{SecretKey}, \text{ScopeHash})" display={true} />
          </div>
          <p className="text-[11px] text-muted-foreground">
            Yields an un-linkable single-use pseudorandom identifier per application domain. Prevents double-spending or double-voting without leaking identity.
          </p>
        </div>
      </div>
    </div>
  );
};
