import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zk-CredLock: Zero-Knowledge Decentralized Identity Engine",
  description: "Groth16 zk-SNARKs, BN254 Elliptic Curve Pairings, Poseidon Merkle State Commitments & Deterministic Nullifiers | Pillai HOC Autonomous Capstone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background text-foreground selection:bg-zinc-800 selection:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
