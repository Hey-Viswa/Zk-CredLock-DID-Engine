"use client";

import { ShieldCheck, Moon, Sun } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Engine Specs */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-zinc-900 border border-zinc-700 flex items-center justify-center text-zinc-100 shadow-sm">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-base tracking-tight">Zk-CredLock</span>
              <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700">
                zk-SNARK DID
              </span>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Zero-Knowledge Decentralized Identity & Selective Attribute Proofs Engine
            </p>
          </div>
        </div>

        {/* Right: Production Telemetry & Theme */}
        <div className="flex items-center gap-3">
          {/* EVM 0x08 Precompile Status Badge */}
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md border border-border bg-card text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>EVM 0x08 (BN254)</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-md border border-border bg-card hover:bg-muted text-foreground transition"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-zinc-700" />}
          </button>
        </div>
      </div>
    </header>
  );
};
