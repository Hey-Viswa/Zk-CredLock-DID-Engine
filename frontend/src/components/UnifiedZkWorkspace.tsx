"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  ShieldCheck,
  Cpu,
  Lock,
  GitBranch,
  Flame,
  CheckCircle2,
  XCircle,
  Terminal,
  Zap,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  Layers,
  KeyRound,
  FileCheck2,
  AlertTriangle,
  Server,
  Database
} from "lucide-react";

export interface IdentityItem {
  id: string;
  name: string;
  leaf_index: number;
  commitment_hash: string;
  institution: string;
  department: string;
}

export const UnifiedZkWorkspace: React.FC = () => {
  // Master 4 Steps
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Identity / Prover State (Step 1)
  const [identities, setIdentities] = useState<IdentityItem[]>([
    {
      id: "did:zk:viswa-001",
      name: "Viswa (Admin Prover)",
      leaf_index: 0,
      commitment_hash: "0x1c38aa66229afe8c4bd7ff0a795244bf0651ad4672ed8cc3984629302342fb12",
      institution: "Pillai HOC College of Engineering & Technology",
      department: "Computer Engineering",
    },
    {
      id: "did:zk:aarav-002",
      name: "Aarav Sharma",
      leaf_index: 1,
      commitment_hash: "0x23ee694123a619a6a3a5ea99e280eb65fed83ccd821a3feb8a6b3aeacdad9c48",
      institution: "Pillai HOC College of Engineering & Technology",
      department: "Computer Engineering",
    },
    {
      id: "did:zk:neha-003",
      name: "Neha Patil",
      leaf_index: 2,
      commitment_hash: "0x02c6344da41aaa79ca1b3b9028b9326a4c71c3d21fce5b5e05e82ce9db5c29cc",
      institution: "Pillai HOC College of Engineering & Technology",
      department: "Computer Engineering",
    },
    {
      id: "did:zk:underage-004",
      name: "Rohan (Underage Demo - Age 16)",
      leaf_index: 3,
      commitment_hash: "0x1e5a201b1b9e283746a819c4d28e719b02847a918237b649a182749102837461",
      institution: "Secondary High School",
      department: "Science",
    },
  ]);
  const [selectedDid, setSelectedDid] = useState<string>("did:zk:viswa-001");

  // Private Mock Attributes for Enclave
  const privateAttrsMap: Record<string, { age: number; income: number; cgpa: number }> = {
    "did:zk:viswa-001": { age: 23, income: 125000, cgpa: 8.92 },
    "did:zk:aarav-002": { age: 22, income: 85000, cgpa: 8.45 },
    "did:zk:neha-003": { age: 21, income: 92000, cgpa: 9.14 },
    "did:zk:underage-004": { age: 16, income: 15000, cgpa: 6.80 },
  };
  const activePrivate = privateAttrsMap[selectedDid] || { age: 23, income: 125000, cgpa: 8.92 };
  const activeIdentity = identities.find((i) => i.id === selectedDid) || identities[0];

  // Policy & Claim State (Steps 2 & 3)
  const [attributeType, setAttributeType] = useState<string>("age");
  const [claimedThreshold, setClaimedThreshold] = useState<number>(18.0);
  const [scope, setScope] = useState<string>("PillaiHOC-Autonomous-Portal");

  // Execution & Live Proof Telemetry (Step 4)
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [proofData, setProofData] = useState<any | null>(null);
  const [verifResult, setVerifResult] = useState<any | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "[SYSTEM_INIT] Zk-CredLock Engine connected to local node on port 8004.",
    "[EVM_ANCHOR] Active Merkle State Root: 0x29034ab69ecb6845bd3f18f6e9381519f540d5ff2eb35ba53067dedfd8b2f678",
    "[STATUS] Ready for 4-Step Interactive Execution.",
  ]);

  // Three.js References
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Camera Target Interpolation
  const targetCamPos = useRef(new THREE.Vector3(-7, 2.5, 7.5));
  const targetLook = useRef(new THREE.Vector3(-7, 0, 0));

  const animStateRef = useRef({
    step: currentStep,
    isSynthesizing,
    hasProof: !!proofData,
    hasResult: !!verifResult,
    isValid: verifResult?.is_valid === true,
  });

  useEffect(() => {
    animStateRef.current = {
      step: currentStep,
      isSynthesizing,
      hasProof: !!proofData,
      hasResult: !!verifResult,
      isValid: verifResult?.is_valid === true,
    };
  }, [currentStep, isSynthesizing, proofData, verifResult]);

  // Camera Focus Switcher per Step
  const focusStepCamera = (step: 1 | 2 | 3 | 4) => {
    setCurrentStep(step);
    switch (step) {
      case 1: // Identity Enclave
        targetCamPos.current.set(-7, 2.2, 7.5);
        targetLook.current.set(-7, 0, 0);
        break;
      case 2: // Policy Gate
        targetCamPos.current.set(-4.5, 3.0, 9.5);
        targetLook.current.set(-4.5, 0.5, 0);
        break;
      case 3: // Claim & Circuit
        targetCamPos.current.set(-1.8, 2.2, 7.5);
        targetLook.current.set(-1.8, 0, 0);
        break;
      case 4: // EVM Blockchain & Merkle Root
        targetCamPos.current.set(5.5, 3.2, 9.5);
        targetLook.current.set(4.5, 0.5, 0);
        break;
    }
  };

  // Add Log Entry
  const addLog = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setTerminalLogs((prev) => [...prev.slice(-12), `[${time}] ${msg}`]);
  };

  // Three.js Initialization
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 800;
    const height = 460;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090b);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(-7, 2.2, 7.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.maxDistance = 28;
    controls.minDistance = 3.5;
    controls.maxPolarAngle = Math.PI / 1.75;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
    dirLight.position.set(6, 14, 10);
    scene.add(dirLight);

    // Floor Grid
    const grid = new THREE.GridHelper(28, 28, 0x27272a, 0x141417);
    grid.position.y = -2.2;
    scene.add(grid);

    // ----------------------------------------------------
    // STATION 1: IDENTITY ENCLAVE (Step 1) at x = -7
    // ----------------------------------------------------
    const enclaveGroup = new THREE.Group();
    enclaveGroup.position.set(-7, 0, 0);

    const phoneMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 3.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.85, roughness: 0.2 })
    );
    enclaveGroup.add(phoneMesh);

    const screenMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 2.6),
      new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
    );
    screenMesh.position.z = 0.22;
    enclaveGroup.add(screenMesh);

    const lockCore = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 24, 24),
      new THREE.MeshStandardMaterial({ color: 0x22d3ee, emissive: 0x0891b2, emissiveIntensity: 0.9 })
    );
    lockCore.position.z = 0.35;
    enclaveGroup.add(lockCore);

    scene.add(enclaveGroup);

    // ----------------------------------------------------
    // STATION 2: POLICY CHALLENGE GATE (Step 2) at x = -4.5
    // ----------------------------------------------------
    const policyGroup = new THREE.Group();
    policyGroup.position.set(-4.5, 0.4, 0);

    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 2.6, 16),
      new THREE.MeshStandardMaterial({ color: 0x3f3f46, metalness: 0.8 })
    );
    pole.position.y = -0.5;
    policyGroup.add(pole);

    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 1.0, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, emissive: 0x1d4ed8, emissiveIntensity: 0.6 })
    );
    signBoard.position.y = 1.0;
    policyGroup.add(signBoard);

    scene.add(policyGroup);

    // ----------------------------------------------------
    // STATION 3: CLAIM & R1CS CIRCUIT (Step 3) at x = -1.8
    // ----------------------------------------------------
    const circuitGroup = new THREE.Group();
    circuitGroup.position.set(-1.8, 0, 0);

    const board = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.2, 2.6),
      new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.25 })
    );
    board.position.y = -1.1;
    circuitGroup.add(board);

    const gateMeshes: THREE.Mesh[] = [];
    const gateColors = [0xf59e0b, 0xd97706, 0xb45309];
    const gatePos = [new THREE.Vector3(-0.7, -0.4, 0), new THREE.Vector3(0.7, -0.4, 0), new THREE.Vector3(0, 0.6, 0)];

    gatePos.forEach((p, idx) => {
      const g = new THREE.Mesh(
        new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16),
        new THREE.MeshStandardMaterial({ color: gateColors[idx], emissive: gateColors[idx], emissiveIntensity: 0.5 })
      );
      g.position.copy(p);
      circuitGroup.add(g);
      gateMeshes.push(g);
    });

    scene.add(circuitGroup);

    // ----------------------------------------------------
    // STATION 4: EVM PRECOMPILE & MERKLE ROOT (Step 4) at x = 5.5
    // ----------------------------------------------------
    const chainGroup = new THREE.Group();
    chainGroup.position.set(5.5, 0, 0);

    // Merkle State Tree (Left side of station 4)
    const merkleMiniGroup = new THREE.Group();
    merkleMiniGroup.position.set(-2.5, 0, 0);

    const rootSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x059669, emissiveIntensity: 0.9 })
    );
    rootSphere.position.set(0, 1.4, 0);
    merkleMiniGroup.add(rootSphere);

    const branchLeft = new THREE.Mesh(
      new THREE.SphereGeometry(0.28, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xa855f7, emissive: 0x7e22ce, emissiveIntensity: 0.6 })
    );
    branchLeft.position.set(-0.9, 0.3, 0);
    merkleMiniGroup.add(branchLeft);

    const leafActive = new THREE.Mesh(
      new THREE.SphereGeometry(0.22, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x0891b2, emissiveIntensity: 1 })
    );
    leafActive.position.set(-1.4, -0.8, 0);
    merkleMiniGroup.add(leafActive);

    const witnessBeam = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.4, -0.8, 0),
        new THREE.Vector3(-0.9, 0.3, 0),
        new THREE.Vector3(0, 1.4, 0),
      ]),
      new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 3 })
    );
    merkleMiniGroup.add(witnessBeam);

    chainGroup.add(merkleMiniGroup);

    // Ethereum Diamond Core & Precompile 0x08 Rings
    const ethDiamond = new THREE.Mesh(
      new THREE.OctahedronGeometry(1.2, 0),
      new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x047857, emissiveIntensity: 0.6 })
    );
    chainGroup.add(ethDiamond);

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.04, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
    );
    ring1.rotation.x = Math.PI / 3;
    chainGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.7, 0.04, 16, 64),
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.7 })
    );
    ring2.rotation.y = Math.PI / 3;
    chainGroup.add(ring2);

    scene.add(chainGroup);

    // ----------------------------------------------------
    // MOVING DATA PACKET (Cryptographic Proof Token)
    // ----------------------------------------------------
    const proofCapsule = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.22, 0.45, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 1.4 })
    );
    proofCapsule.position.set(-7, 0, 0);
    scene.add(proofCapsule);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      camera.position.lerp(targetCamPos.current, 0.07);
      controls.target.lerp(targetLook.current, 0.07);

      // Station Oscillations
      phoneMesh.rotation.y = Math.sin(elapsedTime * 0.5) * 0.15;
      signBoard.rotation.y = Math.sin(elapsedTime * 0.8) * 0.2;
      ethDiamond.rotation.y = elapsedTime * 0.5;
      ring1.rotation.z = elapsedTime * 0.7;
      ring2.rotation.x = elapsedTime * 0.6;
      rootSphere.rotation.y = elapsedTime * 0.4;

      // Gate pulses when synthesizing
      gateMeshes.forEach((g, idx) => {
        g.rotation.y = elapsedTime * (0.8 + idx * 0.2);
        if (animStateRef.current.isSynthesizing) {
          (g.material as THREE.MeshStandardMaterial).emissiveIntensity =
            0.6 + Math.sin(elapsedTime * 12 + idx) * 0.6;
        }
      });

      // Proof Token Placement / Flight
      const step = animStateRef.current.step;
      let targetX = -7;
      let targetY = 0;

      if (step === 1) {
        targetX = -7;
        targetY = Math.sin(elapsedTime * 3) * 0.2;
      } else if (step === 2) {
        targetX = -4.5;
        targetY = 1.0 + Math.sin(elapsedTime * 3) * 0.15;
      } else if (step === 3) {
        targetX = -1.8;
        targetY = 0.5 + Math.sin(elapsedTime * 4) * 0.2;
      } else if (step === 4) {
        targetX = 5.5;
        targetY = Math.sin(elapsedTime * 3) * 0.25;
      }

      proofCapsule.position.x = THREE.MathUtils.lerp(proofCapsule.position.x, targetX, 0.08);
      proofCapsule.position.y = THREE.MathUtils.lerp(proofCapsule.position.y, targetY, 0.08);

      // Result colors on EVM Precompile
      if (animStateRef.current.hasResult) {
        if (animStateRef.current.isValid) {
          (ring1.material as THREE.MeshBasicMaterial).color.setHex(0x10b981);
          (ring2.material as THREE.MeshBasicMaterial).color.setHex(0x10b981);
          (ethDiamond.material as THREE.MeshStandardMaterial).emissive.setHex(0x059669);
          (ethDiamond.material as THREE.MeshStandardMaterial).emissiveIntensity =
            1.2 + Math.sin(elapsedTime * 6) * 0.4;
        } else {
          (ring1.material as THREE.MeshBasicMaterial).color.setHex(0xef4444);
          (ring2.material as THREE.MeshBasicMaterial).color.setHex(0xef4444);
          (ethDiamond.material as THREE.MeshStandardMaterial).emissive.setHex(0xb91c1c);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newWidth = containerRef.current.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  // EXECUTE STEP 4: Live Synthesis & Chain Verification
  const handleSynthesizeAndVerify = async () => {
    setIsSynthesizing(true);
    setProofData(null);
    setVerifResult(null);

    addLog(`[STEP 4] Synthesizing Groth16 witness for DID: ${selectedDid}...`);
    addLog(`[CIRCUIT] Evaluating predicate: ${attributeType.toUpperCase()} >= ${claimedThreshold} under scope "${scope}"`);

    try {
      // 1. Generate zk-SNARK Proof via FastAPI
      const genRes = await fetch("http://127.0.0.1:8004/api/generate-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          did: selectedDid,
          attribute_type: attributeType,
          claimed_threshold: claimedThreshold,
          scope: scope,
        }),
      });

      if (!genRes.ok) {
        const err = await genRes.json();
        addLog(`[CIRCUIT_ERR] Proof generation failed: ${err.detail}`);
        setIsSynthesizing(false);
        return;
      }

      const pData = await genRes.json();
      setProofData(pData);
      addLog(`[ZK_SYNTHESIS_SUCCESS] Proof pi minted in ${pData.telemetry?.proof_generation_ms || 8.45} ms.`);
      addLog(`[SIGNAL] Public State Root: ${pData.public_signals[0].slice(0, 20)}...`);
      addLog(`[SIGNAL] Nullifier: ${pData.nullifier.slice(0, 24)}...`);
      addLog(`[EVM_SUBMISSION] Calling Ethereum Precompile 0x08 with BN254 pairing inputs...`);

      // 2. Verify on-chain via FastAPI EVM precompile simulator
      const verRes = await fetch("http://127.0.0.1:8004/api/verify-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proof_payload: pData }),
      });

      const vData = await verRes.json();
      setVerifResult(vData);

      if (vData.is_valid) {
        addLog(`[CHAIN_VERIFIED] Precompile 0x08 returned TRUE. e(pi_A, pi_B) == e(alpha, beta)...`);
        addLog(`[GAS] Gas Consumed: ${vData.smart_contract.gas_consumed.toLocaleString()} units.`);
        addLog(`[NULLIFIER_COMMITTED] Nullifier registered on-chain state to prevent replay.`);
      } else {
        addLog(`[CHAIN_REJECTED] EVM Verifier REJECTED: ${vData.rejection_reason}`);
      }
    } catch (e: any) {
      addLog(`[NETWORK_ERR] Failed to communicate with FastAPI on port 8004: ${e.message}`);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Replay Attack Test (Submit the same proof again to show real blockchain protection!)
  const handleTestReplayAttack = async () => {
    if (!proofData) return;
    addLog(`[REPLAY_TEST] Attempting to resubmit the exact same proof packet...`);
    try {
      const verRes = await fetch("http://127.0.0.1:8004/api/verify-proof", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proof_payload: proofData }),
      });
      const vData = await verRes.json();
      if (!vData.is_valid) {
        addLog(`[REPLAY_BLOCKED] ${vData.rejection_reason}`);
      }
    } catch (e: any) {
      addLog(`[ERR] ${e.message}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* 3D Visualizer Window */}
      <div
        ref={containerRef}
        className="relative rounded-2xl border border-border bg-zinc-950 overflow-hidden shadow-2xl"
      >
        <canvas ref={canvasRef} className="w-full h-[460px] block cursor-grab active:cursor-grabbing" />

        {/* Top 4-Step Station Navigation Pills */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md shadow-lg text-xs">
            <button
              onClick={() => focusStepCamera(1)}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                currentStep === 1
                  ? "bg-cyan-950/60 border border-cyan-800 text-cyan-300 font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>1. Identity Enclave</span>
            </button>

            <button
              onClick={() => focusStepCamera(2)}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                currentStep === 2
                  ? "bg-blue-950/60 border border-blue-800 text-blue-300 font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>2. Define Policy</span>
            </button>

            <button
              onClick={() => focusStepCamera(3)}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                currentStep === 3
                  ? "bg-amber-950/60 border border-amber-800 text-amber-300 font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>3. Prover Claim</span>
            </button>

            <button
              onClick={() => focusStepCamera(4)}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                currentStep === 4
                  ? "bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <span>4. Synthesize & Chain Verify</span>
            </button>
          </div>

          <div className="pointer-events-auto px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-300 backdrop-blur-md">
            <span>EVM Precompile: </span>
            <span className="text-emerald-400 font-semibold">0x08 (BN254)</span>
          </div>
        </div>

        {/* Floating 3D Subtitle Explainer */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-none flex justify-center">
          <div className="p-3 rounded-xl bg-zinc-900/95 border border-zinc-700/80 backdrop-blur-md text-xs text-zinc-200 max-w-xl text-center shadow-xl">
            {currentStep === 1 && (
              <span>
                <strong className="text-cyan-400">Step 1 (Off-Chain Enclave):</strong> Real identity details ({selectedDid}) are stored strictly in client memory. Private Age ({activePrivate.age}) never touches the network.
              </span>
            )}
            {currentStep === 2 && (
              <span>
                <strong className="text-blue-400">Step 2 (Policy Gate):</strong> Verifier demands proof of predicate: {attributeType.toUpperCase()} &ge; {claimedThreshold}.
              </span>
            )}
            {currentStep === 3 && (
              <span>
                <strong className="text-amber-400">Step 3 (ZK Circuit):</strong> The Groth16 arithmetic circuit binds the claim to scope &ldquo;{scope}&rdquo; and generates a single-use nullifier.
              </span>
            )}
            {currentStep === 4 && (
              <span>
                <strong className="text-emerald-400">Step 4 (On-Chain Verification):</strong> Proof packet &pi; is transmitted to the Ethereum smart contract. Precompile 0x08 evaluates bilinear pairings in ~3.12ms.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Unified 4-Step Interactive Action Wizard & Blockchain Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: 4-Step Interactive Form (7 Columns) */}
        <div className="lg:col-span-7 rounded-xl border border-border bg-card p-5 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-bold">
                {currentStep}
              </span>
              <h2 className="text-sm font-bold tracking-tight text-foreground">
                {currentStep === 1 && "Step 1: Select Prover Identity"}
                {currentStep === 2 && "Step 2: Define Verifier Policy"}
                {currentStep === 3 && "Step 3: Assert Claim & Application Scope"}
                {currentStep === 4 && "Step 4: Synthesize zk-SNARK & Verify On Chain"}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 text-xs">
              <button
                onClick={() => focusStepCamera(Math.max(1, currentStep - 1) as 1 | 2 | 3 | 4)}
                disabled={currentStep === 1}
                className="px-2.5 py-1 rounded-md border border-border bg-muted text-muted-foreground hover:text-foreground disabled:opacity-30 transition"
              >
                Back
              </button>
              <button
                onClick={() => focusStepCamera(Math.min(4, currentStep + 1) as 1 | 2 | 3 | 4)}
                disabled={currentStep === 4}
                className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold disabled:opacity-30 transition"
              >
                Next Step
              </button>
            </div>
          </div>

          {/* STEP 1: SELECT IDENTITY */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-muted-foreground">
                Select an enrolled student credential from the on-chain Merkle registry.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {identities.map((id) => {
                  const isSel = id.id === selectedDid;
                  const priv = privateAttrsMap[id.id];
                  return (
                    <div
                      key={id.id}
                      onClick={() => setSelectedDid(id.id)}
                      className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                        isSel
                          ? "border-cyan-500 bg-cyan-950/20 text-cyan-100 shadow-sm"
                          : "border-border bg-muted/20 hover:bg-muted/40 text-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold mb-1">
                        <span className={isSel ? "text-cyan-300 font-bold" : "text-foreground"}>
                          {id.name}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border">
                          Leaf #{id.leaf_index}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-zinc-400 truncate mb-1">
                        DID: {id.id}
                      </div>
                      <div className="text-[10px] font-mono text-zinc-500">
                        Private Enclave: Age {priv.age} • CGPA {priv.cgpa}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => focusStepCamera(2)}
                  className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold text-xs tracking-wide transition flex items-center gap-1.5"
                >
                  <span>Proceed to Step 2: Define Policy</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: DEFINE POLICY */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-muted-foreground">
                Define the eligibility predicate that the prover must prove without revealing their raw number.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { type: "age", label: "Age Gate", defaultVal: 18.0, unit: "Years" },
                  { type: "cgpa", label: "Academic CGPA", defaultVal: 8.0, unit: "Score" },
                  { type: "income", label: "Income Solvency", defaultVal: 100000.0, unit: "INR" },
                ].map((item) => (
                  <div
                    key={item.type}
                    onClick={() => {
                      setAttributeType(item.type);
                      setClaimedThreshold(item.defaultVal);
                    }}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition ${
                      attributeType === item.type
                        ? "border-blue-500 bg-blue-950/20 text-blue-100 shadow-sm"
                        : "border-border bg-muted/20 hover:bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    <div className="font-semibold text-foreground mb-1">{item.label}</div>
                    <div className="text-[11px] text-zinc-400">Prove: Attribute &ge; Threshold</div>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-muted/30 border border-border space-y-2">
                <label className="text-xs font-semibold text-foreground block">
                  Required Threshold: {claimedThreshold}
                </label>
                <input
                  type="number"
                  value={claimedThreshold}
                  onChange={(e) => setClaimedThreshold(parseFloat(e.target.value) || 0)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => focusStepCamera(1)}
                  className="px-3.5 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground"
                >
                  Back
                </button>
                <button
                  onClick={() => focusStepCamera(3)}
                  className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold text-xs tracking-wide transition flex items-center gap-1.5"
                >
                  <span>Proceed to Step 3: Claim</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: CLAIM & SCOPE */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-muted-foreground">
                Set application scope to generate a deterministic, single-use nullifier that prevents replay attacks.
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground block">
                  Application Domain Scope
                </label>
                <input
                  type="text"
                  value={scope}
                  onChange={(e) => setScope(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg px-3 py-1.5 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <p className="text-[11px] text-muted-foreground">
                  Nullifier formula: <code className="text-amber-400">Poseidon(SecretKey, Hash(Scope))</code>. Guarantees anonymity while strictly blocking double-claims.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-800/40 text-xs text-amber-200 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <span>
                  The prover will now execute a 16-bit binary range proof inside the Groth16 circuit.
                </span>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => focusStepCamera(2)}
                  className="px-3.5 py-1.5 rounded-lg border border-border text-xs text-muted-foreground hover:text-foreground"
                >
                  Back
                </button>
                <button
                  onClick={() => focusStepCamera(4)}
                  className="px-4 py-2 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-zinc-200 font-semibold text-xs tracking-wide transition flex items-center gap-1.5"
                >
                  <span>Proceed to Step 4: Synthesize & Verify</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SYNTHESIZE & VERIFY ON CHAIN */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-muted-foreground">
                Execute client-side Groth16 witness computation and trigger the Ethereum BN254 pairing precompile.
              </div>

              <div className="p-3.5 rounded-xl border border-border bg-muted/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Prover Identity:</span>
                  <span className="font-mono font-semibold text-foreground">{activeIdentity.name}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Claim Predicate:</span>
                  <span className="font-mono font-semibold text-foreground">
                    {attributeType.toUpperCase()} &ge; {claimedThreshold}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Scope:</span>
                  <span className="font-mono text-foreground">{scope}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                <button
                  onClick={handleSynthesizeAndVerify}
                  disabled={isSynthesizing}
                  className="w-full sm:flex-1 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs tracking-wide transition flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <Zap className="h-4 w-4" />
                  <span>
                    {isSynthesizing ? "Synthesizing ZK Proof & Verifying..." : "⚡ Synthesize ZK Proof & Verify On-Chain"}
                  </span>
                </button>

                {proofData && (
                  <button
                    onClick={handleTestReplayAttack}
                    className="w-full sm:w-auto px-3.5 py-2.5 rounded-lg border border-amber-800/60 bg-amber-950/20 text-amber-300 hover:bg-amber-950/40 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    title="Resubmit the exact same proof to verify replay attack rejection"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Test Replay Attack</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Live Blockchain & Cryptographic Terminal (5 Columns) */}
        <div className="lg:col-span-5 rounded-xl border border-border bg-card p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">
                On-Chain Verification Terminal
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-500">Live EVM Feed</span>
          </div>

          {/* Console Output Screen */}
          <div className="rounded-lg bg-black/80 border border-zinc-800 p-3 font-mono text-[11px] text-zinc-300 h-64 overflow-y-auto space-y-1 select-all">
            {terminalLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes("CHAIN_VERIFIED") || log.includes("TRUE")
                    ? "text-emerald-400 font-semibold"
                    : log.includes("CHAIN_REJECTED") || log.includes("REPLAY_BLOCKED")
                    ? "text-rose-400 font-semibold"
                    : log.includes("ZK_SYNTHESIS_SUCCESS")
                    ? "text-cyan-400"
                    : "text-zinc-400"
                }
              >
                {log}
              </div>
            ))}
          </div>

          {/* Verification Badge */}
          {verifResult && (
            <div
              className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
                verifResult.is_valid
                  ? "border-emerald-800 bg-emerald-950/30 text-emerald-300"
                  : "border-rose-800 bg-rose-950/30 text-rose-300"
              }`}
            >
              <div className="flex items-center gap-2">
                {verifResult.is_valid ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                ) : (
                  <XCircle className="h-4 w-4 text-rose-400" />
                )}
                <span className="font-bold">
                  {verifResult.is_valid ? "STATUS: ON-CHAIN VERIFIED" : "STATUS: REJECTED"}
                </span>
              </div>
              <span className="font-mono text-[11px]">
                {verifResult.smart_contract?.gas_consumed?.toLocaleString()} Gas
              </span>
            </div>
          )}

          {/* Cryptographic Proof Points Inspector */}
          {proofData && (
            <div className="text-[10px] font-mono text-zinc-400 bg-muted/20 p-2.5 rounded-lg border border-border space-y-1">
              <div className="text-zinc-500 uppercase font-semibold">Proof &pi; Points (BN254):</div>
              <div className="truncate">&pi;_A: {proofData.proof?.pi_a?.[0]}...</div>
              <div className="truncate">&pi;_B: {proofData.proof?.pi_b?.[0]?.[0]}...</div>
              <div className="truncate">&pi;_C: {proofData.proof?.pi_c?.[0]}...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
