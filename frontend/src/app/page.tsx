"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { UnifiedZkWorkspace } from "@/components/UnifiedZkWorkspace";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <UnifiedZkWorkspace />
      </main>

      <footer className="border-t border-border bg-card/60 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>Zk-CredLock Protocol • Zero-Knowledge Decentralized Identity Engine</span>
          <span className="font-mono">BN254 Pairing (Precompile 0x08) • Poseidon Merkle State</span>
        </div>
      </footer>
    </div>
  );
}
