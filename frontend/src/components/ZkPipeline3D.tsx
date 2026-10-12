"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { IdentityItem } from "./IdentityVault";
import { ProofResponse } from "./ProofStudio";
import { VerificationResponse } from "./OnChainVerifier";
import { MerkleState } from "./MerkleExplorer";
import {
  ShieldCheck,
  Cpu,
  Lock,
  GitBranch,
  Flame,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Baby,
  Eye,
  KeyRound,
  Check,
  HelpCircle,
  Zap,
} from "lucide-react";

interface ZkPipeline3DProps {
  identities: IdentityItem[];
  selectedDid: string;
  onSelectDid: (did: string) => void;
  attributeType: string;
  setAttributeType: (t: string) => void;
  claimedThreshold: number;
  setClaimedThreshold: (v: number) => void;
  scope: string;
  setScope: (s: string) => void;
  onGenerateProof: () => Promise<ProofResponse | null>;
  isGenerating: boolean;
  proofData: ProofResponse | null;
  onVerifyProof: () => Promise<void>;
  isVerifying: boolean;
  verifResult: VerificationResponse | null;
  merkleState: MerkleState | null;
}

export const ZkPipeline3D: React.FC<ZkPipeline3DProps> = ({
  identities,
  selectedDid,
  onSelectDid,
  attributeType,
  setAttributeType,
  claimedThreshold,
  setClaimedThreshold,
  scope,
  setScope,
  onGenerateProof,
  isGenerating,
  proofData,
  onVerifyProof,
  isVerifying,
  verifResult,
  merkleState,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Guided Step (1 to 5)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [explanationMode, setExplanationMode] = useState<"simple" | "professor">("simple");
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);

  // Target Camera Positions for Smooth Gliding
  const targetCameraPos = useRef(new THREE.Vector3(0, 4.5, 17));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Mock attributes for enclave
  const mockAttributesMap: Record<string, { age: number; income: number; cgpa: number }> = {
    "did:zk:viswa-001": { age: 23, income: 125000, cgpa: 8.92 },
    "did:zk:aarav-002": { age: 22, income: 85000, cgpa: 8.45 },
    "did:zk:neha-003": { age: 21, income: 92000, cgpa: 9.14 },
    "did:zk:underage-004": { age: 16, income: 15000, cgpa: 6.80 },
  };

  const currentIdentity = identities.find((i) => i.id === selectedDid) || identities[0];
  const selectedAttrs = mockAttributesMap[selectedDid] || { age: 23, income: 125000, cgpa: 8.92 };

  // Set Camera Targets per Step
  const applyStepCamera = (step: 1 | 2 | 3 | 4 | 5) => {
    setCurrentStep(step);
    switch (step) {
      case 1: // Enclave Vault
        targetCameraPos.current.set(-7, 2.2, 7.5);
        targetLookAt.current.set(-7, 0, 0);
        break;
      case 2: // The Question / Predicate
        targetCameraPos.current.set(-4.5, 3.2, 10);
        targetLookAt.current.set(-4.5, 0.5, 0);
        break;
      case 3: // ZK Arithmetic Circuit
        targetCameraPos.current.set(-2.2, 2.2, 7.2);
        targetLookAt.current.set(-2.2, 0, 0);
        break;
      case 4: // Merkle Tree Verification
        targetCameraPos.current.set(2.4, 2.8, 7.8);
        targetLookAt.current.set(2.4, 0.4, 0);
        break;
      case 5: // EVM Smart Contract Gate
        targetCameraPos.current.set(7, 2.2, 7.2);
        targetLookAt.current.set(7, 0, 0);
        break;
    }
  };

  // Three.js State Sync
  const animStateRef = useRef({
    step: currentStep,
    isGenerating,
    isVerifying,
    hasProof: !!proofData,
    hasResult: !!verifResult,
    isValid: verifResult?.is_valid === true,
  });

  useEffect(() => {
    animStateRef.current = {
      step: currentStep,
      isGenerating,
      isVerifying,
      hasProof: !!proofData,
      hasResult: !!verifResult,
      isValid: verifResult?.is_valid === true,
    };
  }, [currentStep, isGenerating, isVerifying, proofData, verifResult]);

  // Main Three.js Scene
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = 540;

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

    // ========================================================
    // STATION 1: THE USER'S PHONE / SECURE ENCLAVE (x = -7)
    // ========================================================
    const enclaveGroup = new THREE.Group();
    enclaveGroup.position.set(-7, 0, 0);

    // Outer Phone / Vault Cage
    const phoneGeo = new THREE.BoxGeometry(2.2, 3.2, 0.4);
    const phoneMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.85,
      roughness: 0.2,
    });
    const phoneMesh = new THREE.Mesh(phoneGeo, phoneMat);
    enclaveGroup.add(phoneMesh);

    // Glowing Inner Screen / Enclave Core
    const screenGeo = new THREE.PlaneGeometry(1.8, 2.6);
    const screenMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.z = 0.22;
    enclaveGroup.add(screenMesh);

    // Glowing Lock Symbol (Sphere Core)
    const lockCoreGeo = new THREE.SphereGeometry(0.35, 24, 24);
    const lockCoreMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0891b2,
      emissiveIntensity: 0.9,
    });
    const lockCore = new THREE.Mesh(lockCoreGeo, lockCoreMat);
    lockCore.position.z = 0.35;
    enclaveGroup.add(lockCore);

    // Beacon ring around phone
    const beaconGeo = new THREE.RingGeometry(1.8, 1.95, 32);
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, side: THREE.DoubleSide, transparent: true, opacity: 0.5 });
    const beaconRing = new THREE.Mesh(beaconGeo, beaconMat);
    beaconRing.rotation.x = Math.PI / 2;
    beaconRing.position.y = -1.6;
    enclaveGroup.add(beaconRing);

    scene.add(enclaveGroup);

    // ========================================================
    // STATION 2: THE CHALLENGE QUESTION GATE (x = -4.5)
    // ========================================================
    const challengeGroup = new THREE.Group();
    challengeGroup.position.set(-4.5, 0.4, 0);

    const questionPoleGeo = new THREE.CylinderGeometry(0.08, 0.08, 2.6, 16);
    const questionPoleMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, metalness: 0.8 });
    const poleMesh = new THREE.Mesh(questionPoleGeo, questionPoleMat);
    poleMesh.position.y = -0.5;
    challengeGroup.add(poleMesh);

    // Floating Hologram Sign
    const signGeo = new THREE.BoxGeometry(1.6, 1.0, 0.15);
    const signMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.6,
      metalness: 0.7,
      roughness: 0.2,
    });
    const signMesh = new THREE.Mesh(signGeo, signMat);
    signMesh.position.y = 1.0;
    challengeGroup.add(signMesh);

    scene.add(challengeGroup);

    // ========================================================
    // STATION 3: THE ZK-MATH ARITHMETIC CIRCUIT (x = -1.8)
    // ========================================================
    const circuitGroup = new THREE.Group();
    circuitGroup.position.set(-1.8, 0, 0);

    // Glowing Circuit Board
    const boardGeo = new THREE.BoxGeometry(2.6, 0.2, 2.6);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.25 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.y = -1.1;
    circuitGroup.add(board);

    // 3 Arithmetic Gates (Mult, Add, Bit Range)
    const gateGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16);
    const gateColors = [0xf59e0b, 0xd97706, 0xb45309];
    const gateMeshes: THREE.Mesh[] = [];

    const gatePositions = [
      new THREE.Vector3(-0.7, -0.4, 0),
      new THREE.Vector3(0.7, -0.4, 0),
      new THREE.Vector3(0, 0.6, 0),
    ];

    gatePositions.forEach((pos, idx) => {
      const gMat = new THREE.MeshStandardMaterial({
        color: gateColors[idx],
        emissive: gateColors[idx],
        emissiveIntensity: 0.5,
        metalness: 0.8,
        roughness: 0.2,
      });
      const gate = new THREE.Mesh(gateGeo, gMat);
      gate.position.copy(pos);
      circuitGroup.add(gate);
      gateMeshes.push(gate);
    });

    scene.add(circuitGroup);

    // ========================================================
    // STATION 4: THE UNIVERSITY REGISTRY MERKLE TREE (x = 2.4)
    // ========================================================
    const merkleGroup = new THREE.Group();
    merkleGroup.position.set(2.4, 0, 0);

    // State Root (Top)
    const rootGeo = new THREE.SphereGeometry(0.48, 32, 32);
    const rootMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.9,
      metalness: 0.85,
      roughness: 0.2,
    });
    const rootMesh = new THREE.Mesh(rootGeo, rootMat);
    rootMesh.position.set(0, 1.5, 0);
    merkleGroup.add(rootMesh);

    // Branch Nodes (Level 1)
    const branchGeo = new THREE.SphereGeometry(0.3, 24, 24);
    const branchMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.6,
      metalness: 0.8,
    });

    const bLeft = new THREE.Mesh(branchGeo, branchMat);
    bLeft.position.set(-1.1, 0.3, 0);
    merkleGroup.add(bLeft);

    const bRight = new THREE.Mesh(branchGeo, branchMat);
    bRight.position.set(1.1, 0.3, 0);
    merkleGroup.add(bRight);

    // Leaves (Bottom Level 0)
    const leafGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const normLeafMat = new THREE.MeshStandardMaterial({ color: 0x52525b, metalness: 0.8 });
    const activeLeafMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 1,
      metalness: 0.9,
    });

    const leafXs = [-1.7, -0.6, 0.6, 1.7];
    leafXs.forEach((lx, idx) => {
      const isTarget = idx === 0;
      const leaf = new THREE.Mesh(leafGeo, isTarget ? activeLeafMat : normLeafMat);
      leaf.position.set(lx, -0.9, 0);
      merkleGroup.add(leaf);
    });

    // Illuminated Witness Beam
    const witnessLineMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 3, transparent: true, opacity: 0.95 });
    const otherLineMat = new THREE.LineBasicMaterial({ color: 0x3f3f46, transparent: true, opacity: 0.35 });

    const witnessLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.7, -0.9, 0),
        new THREE.Vector3(-1.1, 0.3, 0),
        new THREE.Vector3(0, 1.5, 0),
      ]),
      witnessLineMat
    );
    merkleGroup.add(witnessLine);

    const otherLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(1.7, -0.9, 0),
        new THREE.Vector3(1.1, 0.3, 0),
        new THREE.Vector3(0, 1.5, 0),
      ]),
      otherLineMat
    );
    merkleGroup.add(otherLine);

    scene.add(merkleGroup);

    // ========================================================
    // STATION 5: THE GATEKEEPER / EVM SMART CONTRACT (x = 7)
    // ========================================================
    const evmGroup = new THREE.Group();
    evmGroup.position.set(7, 0, 0);

    // Ethereum Diamond Core
    const ethGeo = new THREE.OctahedronGeometry(1.2, 0);
    const ethMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x047857,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.15,
    });
    const ethDiamond = new THREE.Mesh(ethGeo, ethMat);
    evmGroup.add(ethDiamond);

    // Guard Rings (The Access Gate)
    const ringGeo = new THREE.TorusGeometry(1.7, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.65 });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    evmGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.y = Math.PI / 3;
    evmGroup.add(ring2);

    scene.add(evmGroup);

    // ========================================================
    // MOVING DATA PACKET (The Traveling Cryptographic Proof)
    // ========================================================
    const packetGeo = new THREE.SphereGeometry(0.25, 24, 24);
    const packetMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.4,
    });
    const movingPacket = new THREE.Mesh(packetGeo, packetMat);
    movingPacket.position.set(-7, 0, 0);
    scene.add(movingPacket);

    // 5. ANIMATION LOOP WITH SMOOTH CAMERA LERP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth Camera & LookAt Interpolation
      camera.position.lerp(targetCameraPos.current, 0.06);
      controls.target.lerp(targetLookAt.current, 0.06);

      // Station Rotations
      phoneMesh.rotation.y = Math.sin(elapsedTime * 0.5) * 0.15;
      signMesh.rotation.y = Math.sin(elapsedTime * 0.8) * 0.2;

      gateMeshes.forEach((gm, idx) => {
        gm.rotation.y = elapsedTime * (0.8 + idx * 0.2);
        if (animStateRef.current.isGenerating) {
          (gm.material as THREE.MeshStandardMaterial).emissiveIntensity =
            0.6 + Math.sin(elapsedTime * 9 + idx) * 0.5;
        }
      });

      rootMesh.rotation.y = elapsedTime * 0.4;
      ethDiamond.rotation.y = elapsedTime * 0.5;
      ring1.rotation.z = elapsedTime * 0.7;
      ring2.rotation.x = elapsedTime * 0.6;

      // Move data packet based on current step
      const step = animStateRef.current.step;
      let targetPacketX = -7;
      let targetPacketY = 0;

      if (step === 1) {
        targetPacketX = -7;
        targetPacketY = Math.sin(elapsedTime * 3) * 0.2;
      } else if (step === 2) {
        targetPacketX = -4.5;
        targetPacketY = 1.0 + Math.sin(elapsedTime * 3) * 0.15;
      } else if (step === 3) {
        targetPacketX = -1.8;
        targetPacketY = 0.5 + Math.sin(elapsedTime * 4) * 0.2;
      } else if (step === 4) {
        targetPacketX = 2.4;
        targetPacketY = 1.5 + Math.sin(elapsedTime * 2) * 0.1;
      } else if (step === 5) {
        targetPacketX = 7;
        targetPacketY = Math.sin(elapsedTime * 4) * 0.25;
      }

      movingPacket.position.x = THREE.MathUtils.lerp(movingPacket.position.x, targetPacketX, 0.08);
      movingPacket.position.y = THREE.MathUtils.lerp(movingPacket.position.y, targetPacketY, 0.08);

      // Verification Result Colors on EVM Station
      if (animStateRef.current.hasResult) {
        if (animStateRef.current.isValid) {
          ringMat.color.setHex(0x10b981);
          (ethDiamond.material as THREE.MeshStandardMaterial).emissive.setHex(0x059669);
          (ethDiamond.material as THREE.MeshStandardMaterial).emissiveIntensity =
            1.2 + Math.sin(elapsedTime * 6) * 0.4;
        } else {
          ringMat.color.setHex(0xef4444);
          (ethDiamond.material as THREE.MeshStandardMaterial).emissive.setHex(0xb91c1c);
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
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

  // Auto-Tour interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingAuto) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          const next = (prev % 5) + 1;
          applyStepCamera(next as 1 | 2 | 3 | 4 | 5);
          return next as 1 | 2 | 3 | 4 | 5;
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isPlayingAuto]);

  // Story Explanations (Simple vs Professor)
  const stepStories = {
    1: {
      title: "Step 1: Your Secret Vault (Inside Your Phone)",
      simple:
        `You have your real private credentials locked safely inside your phone's hardware enclave. Your real age is ${selectedAttrs.age}, but NOBODY outside your phone can see this number.`,
      professor:
        `Identity $C = \\text{Poseidon}(sk, \\text{attrs})$ generated in client-side secure enclave. Private witness inputs ($sk$, attributes) never leave the device.`,
      highlightStation: "Station 1: Off-Chain Enclave",
    },
    2: {
      title: "Step 2: The Challenge (What is the Gate asking?)",
      simple:
        `The gatekeeper asks: "Are you ${attributeType === "age" ? `Age >= ${claimedThreshold}` : `eligible`}?" Normally, showing an ID card leaks your name, address, and birthday. Here, the gatekeeper only asks for a YES/NO answer!`,
      professor:
        `Verifier public predicate: Attribute $\\ge$ ${claimedThreshold}. Public scope: "${scope}". Avoids over-disclosure of plaintext PII.`,
      highlightStation: "Station 2: Claim Gate",
    },
    3: {
      title: "Step 3: The Magic Math Seal (Zero-Knowledge Circuit)",
      simple:
        `Your phone's math engine calculates: ${selectedAttrs.age} - ${claimedThreshold} = ${selectedAttrs.age - claimedThreshold}. Since it's positive, it wraps this fact into a tiny 128-byte digital stamp (zk-SNARK). It proves you are 18+, WITHOUT revealing that you are ${selectedAttrs.age}!`,
      professor:
        `Groth16 R1CS Circuit proves 16-bit range decomposition $\\Delta = x - T = \\sum b_i 2^i$ where $b_i \\in \\{0,1\\}$, emitting proof $\\pi = (\\pi_A, \\pi_B, \\pi_C)$.`,
      highlightStation: "Station 3: R1CS Arithmetic Circuit",
    },
    4: {
      title: "Step 4: The University Registry Tree (Merkle Check)",
      simple:
        `How does the gatekeeper know you didn't invent a fake identity? The college has an official list of all valid students stored as a tree on the blockchain. A beam of light checks your spot in the tree up to the root in just 3 quick steps!`,
      professor:
        `Poseidon Merkle Membership Proof: Verifies leaf inclusion against anchored State Root in $O(\\log N)$ operations without revealing the leaf index.`,
      highlightStation: "Station 4: Poseidon Merkle State",
    },
    5: {
      title: "Step 5: Access Granted! (Ethereum Smart Contract)",
      simple:
        `The digital math stamp flies into Ethereum's smart contract. The math checks out in 3 milliseconds! The door turns GREEN. Access Granted! The gatekeeper learned ZERO personal details about you.`,
      professor:
        `EVM Precompile 0x08 evaluates bilinear pairing $e(\\pi_A, \\pi_B) == e(\\alpha, \\beta) \\dots$ Consumes ~215,380 gas and records single-use Nullifier.`,
      highlightStation: "Station 5: EVM Verifier (0x08)",
    },
  };

  const currentStory = stepStories[currentStep];

  return (
    <div className="space-y-4">
      {/* 3D Holo-Deck Container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl border border-border bg-zinc-950 overflow-hidden shadow-2xl"
      >
        <canvas ref={canvasRef} className="w-full h-[540px] block cursor-grab active:cursor-grabbing" />

        {/* Top Header: Guided Storyboard & Mode Switcher */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          {/* Mode Switcher */}
          <div className="pointer-events-auto flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md shadow-lg text-xs">
            <button
              onClick={() => setExplanationMode("simple")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                explanationMode === "simple"
                  ? "bg-emerald-950/60 border border-emerald-800 text-emerald-300 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Baby className="h-3.5 w-3.5" />
              <span>Simple Story Mode (Explain to Anyone)</span>
            </button>
            <button
              onClick={() => setExplanationMode("professor")}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                explanationMode === "professor"
                  ? "bg-purple-950/60 border border-purple-800 text-purple-300 font-semibold"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <GraduationCap className="h-3.5 w-3.5" />
              <span>Professor Mode (Cryptographic Deep Dive)</span>
            </button>
          </div>

          {/* Auto Tour Play/Pause */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={() => setIsPlayingAuto(!isPlayingAuto)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition flex items-center gap-1.5 backdrop-blur-md shadow-lg ${
                isPlayingAuto
                  ? "bg-amber-950/60 border-amber-800 text-amber-300"
                  : "bg-zinc-900/90 border-zinc-800 text-zinc-300 hover:text-zinc-100"
              }`}
            >
              {isPlayingAuto ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isPlayingAuto ? "Pause Story Tour" : "Play Guided 3D Tour"}</span>
            </button>
          </div>
        </div>

        {/* 5-Step Visual Progression Pills (Top Center) */}
        <div className="absolute top-16 left-4 right-4 flex items-center justify-center gap-1.5 pointer-events-none">
          {([1, 2, 3, 4, 5] as const).map((s) => (
            <button
              key={s}
              onClick={() => {
                setIsPlayingAuto(false);
                applyStepCamera(s);
              }}
              className={`pointer-events-auto px-3 py-1 rounded-full text-xs font-medium border transition flex items-center gap-1.5 shadow-md ${
                currentStep === s
                  ? "bg-emerald-500 text-zinc-950 border-emerald-400 font-bold scale-105"
                  : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800/80"
              }`}
            >
              <span>{s}</span>
              <span className="hidden sm:inline">
                {s === 1 && "Vault"}
                {s === 2 && "Question"}
                {s === 3 && "ZK-Math"}
                {s === 4 && "Merkle Tree"}
                {s === 5 && "Gatekeeper"}
              </span>
            </button>
          ))}
        </div>

        {/* Floating Story Explainer Banner (Hero Explanation Card) */}
        <div className="absolute top-28 left-6 right-6 pointer-events-none flex justify-center">
          <div className="max-w-2xl w-full p-4 rounded-xl bg-zinc-900/95 border border-zinc-700/80 backdrop-blur-md shadow-2xl text-zinc-100 animate-in fade-in zoom-in-95 duration-200 pointer-events-auto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                {currentStory.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                {currentStory.highlightStation}
              </span>
            </div>

            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
              {explanationMode === "simple" ? currentStory.simple : currentStory.professor}
            </p>

            {/* Step Navigation Arrows */}
            <div className="flex items-center justify-between pt-3 mt-1 border-t border-zinc-800/60 text-xs">
              <button
                onClick={() => {
                  setIsPlayingAuto(false);
                  const prev = Math.max(1, currentStep - 1) as 1 | 2 | 3 | 4 | 5;
                  applyStepCamera(prev);
                }}
                disabled={currentStep === 1}
                className="flex items-center gap-1 text-zinc-400 hover:text-zinc-200 disabled:opacity-30 transition font-medium"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </button>

              <div className="text-[11px] font-mono text-zinc-500">
                Step {currentStep} of 5
              </div>

              <button
                onClick={() => {
                  setIsPlayingAuto(false);
                  const next = Math.min(5, currentStep + 1) as 1 | 2 | 3 | 4 | 5;
                  applyStepCamera(next);
                }}
                disabled={currentStep === 5}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 disabled:opacity-30 transition font-semibold"
              >
                Next <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Dashboard Controller */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Identity & Policy Selectors */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Identity Switcher */}
            <div>
              <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                Whose ID are we testing?
              </label>
              <select
                value={selectedDid}
                onChange={(e) => {
                  onSelectDid(e.target.value);
                  applyStepCamera(1);
                }}
                className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {identities.map((id) => (
                  <option key={id.id} value={id.id}>
                    {id.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Policy Selector */}
            <div>
              <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                Question to Prove
              </label>
              <select
                value={attributeType}
                onChange={(e) => {
                  const val = e.target.value;
                  setAttributeType(val);
                  if (val === "age") setClaimedThreshold(18.0);
                  if (val === "cgpa") setClaimedThreshold(8.0);
                  if (val === "income") setClaimedThreshold(100000.0);
                  applyStepCamera(2);
                }}
                className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="age">Prove Age &gt;= {claimedThreshold} Years</option>
                <option value="cgpa">Prove CGPA &gt;= {claimedThreshold}</option>
                <option value="income">Prove Income &gt;= ₹{claimedThreshold.toLocaleString()}</option>
              </select>
            </div>

            {/* Real Private Data Peek (To show what is being protected) */}
            <div className="hidden lg:block text-xs font-mono pl-3 border-l border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase">Hidden Enclave Reality</div>
              <div className="text-cyan-400 font-semibold flex items-center gap-1">
                <Lock className="h-3 w-3" />
                {attributeType === "age" && `Real Age: ${selectedAttrs.age}`}
                {attributeType === "cgpa" && `Real CGPA: ${selectedAttrs.cgpa}`}
                {attributeType === "income" && `Real Income: ₹${selectedAttrs.income.toLocaleString()}`}
                <span className="text-zinc-500 text-[10px] ml-1">(Private)</span>
              </div>
            </div>
          </div>

          {/* Action Execution Triggers */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            {/* Step 3 Action: Generate Proof */}
            {!proofData ? (
              <button
                onClick={async () => {
                  applyStepCamera(3);
                  await onGenerateProof();
                  setTimeout(() => applyStepCamera(4), 1200);
                }}
                disabled={isGenerating}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Zap className="h-4 w-4" />
                <span>{isGenerating ? "Computing Zero-Knowledge Proof..." : "Create ZK Math Proof"}</span>
              </button>
            ) : !verifResult ? (
              /* Step 5 Action: Verify On Smart Contract */
              <button
                onClick={async () => {
                  applyStepCamera(5);
                  await onVerifyProof();
                }}
                disabled={isVerifying}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>{isVerifying ? "Verifying On Blockchain..." : "Test Gatekeeper (EVM Precompile)"}</span>
              </button>
            ) : (
              /* Verified Result Badge */
              <div className="flex items-center gap-2">
                <div
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 ${
                    verifResult.is_valid
                      ? "bg-emerald-950/60 border border-emerald-800 text-emerald-300"
                      : "bg-rose-950/60 border border-rose-800 text-rose-300"
                  }`}
                >
                  {verifResult.is_valid ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <XCircle className="h-4 w-4 text-rose-400" />
                  )}
                  <span>
                    {verifResult.is_valid ? "GATE OPEN: ACCESS GRANTED" : "ACCESS DENIED"} (
                    {verifResult.smart_contract.gas_consumed.toLocaleString()} Gas)
                  </span>
                </div>

                <button
                  onClick={() => {
                    applyStepCamera(1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition"
                >
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
