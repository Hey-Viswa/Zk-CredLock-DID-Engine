"use client";

import React from "react";
import { ShieldCheck, Moon, Sun, FileText, Download, RotateCcw, GraduationCap } from "lucide-react";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  onOpenDefenseModal: () => void;
  onResetNullifiers: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onOpenDefenseModal,
  onResetNullifiers,
}) => {
  const downloadPdf = () => {
    window.open("http://127.0.0.1:8004/api/defense-pdf", "_blank");
  };

  const downloadMermaid = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8004/api/architecture-mermaid");
      const text = await res.text();
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "zk_credlock_architecture.mmd";
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("Failed to download Mermaid file");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand & Institution */}
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
              Pillai HOC College of Engineering & Technology (Autonomous) • Blockchain Lab
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Defense Dossier PDF */}
          <button
            onClick={downloadPdf}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-border bg-card hover:bg-muted text-foreground transition"
            title="Download 5-Page Academic Defense Dossier PDF"
          >
            <FileText className="h-3.5 w-3.5 text-rose-500" />
            <span className="hidden md:inline">5-Page Dossier PDF</span>
          </button>

          {/* Download Architecture */}
          <button
            onClick={downloadMermaid}
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md border border-border bg-card hover:bg-muted text-foreground transition"
            title="Download Mermaid Architecture Flowchart"
          >
            <Download className="h-3.5 w-3.5 text-blue-400" />
            <span className="hidden lg:inline">Architecture .MMD</span>
          </button>

          {/* Reset Nullifiers */}
          <button
            onClick={onResetNullifiers}
            className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-md border border-border bg-card hover:bg-muted text-foreground transition"
            title="Purge spent nullifier registry"
          >
            <RotateCcw className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Reset Nullifiers</span>
          </button>

          {/* Viva Voce Defense Modal */}
          <button
            onClick={onOpenDefenseModal}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-zinc-100 text-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-200 transition shadow-sm"
          >
            <GraduationCap className="h-4 w-4" />
            <span>Viva Defense</span>
          </button>

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
