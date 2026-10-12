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
  RotateCcw,
  Sparkles,
  Layers,
  Eye,
  KeyRound,
  ArrowRight
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

  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [cameraView, setCameraView] = useState<"overview" | "enclave" | "circuit" | "merkle" | "evm">("overview");

  // Mock raw private attributes for enclave visualization
  const mockAttributesMap: Record<string, { age: number; income: number; cgpa: number }> = {
    "did:zk:viswa-001": { age: 23, income: 125000, cgpa: 8.92 },
    "did:zk:aarav-002": { age: 22, income: 85000, cgpa: 8.45 },
    "did:zk:neha-003": { age: 21, income: 92000, cgpa: 9.14 },
    "did:zk:underage-004": { age: 16, income: 15000, cgpa: 6.80 },
  };

  const currentIdentity = identities.find((i) => i.id === selectedDid) || identities[0];
  const selectedAttrs = mockAttributesMap[selectedDid] || { age: 23, income: 125000, cgpa: 8.92 };

  const stateRef = useRef({
    isGenerating,
    isVerifying,
    hasProof: !!proofData,
    hasResult: !!verifResult,
    isValid: verifResult?.is_valid === true,
  });

  useEffect(() => {
    stateRef.current = {
      isGenerating,
      isVerifying,
      hasProof: !!proofData,
      hasResult: !!verifResult,
      isValid: verifResult?.is_valid === true,
    };
  }, [isGenerating, isVerifying, proofData, verifResult]);

  // Sync step automatically based on application progress
  useEffect(() => {
    if (verifResult) {
      setActiveStep(4);
    } else if (proofData) {
      setActiveStep(3);
    } else {
      setActiveStep(1);
    }
  }, [proofData, verifResult]);

  // Camera preset positions
  const setCameraPreset = (preset: "overview" | "enclave" | "circuit" | "merkle" | "evm") => {
    setCameraView(preset);
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    switch (preset) {
      case "overview":
        camera.position.set(0, 4.5, 17);
        controls.target.set(0, 0, 0);
        break;
      case "enclave":
        camera.position.set(-7, 2, 6);
        controls.target.set(-7, 0, 0);
        break;
      case "circuit":
        camera.position.set(-2.2, 2, 6);
        controls.target.set(-2.2, 0, 0);
        break;
      case "merkle":
        camera.position.set(2.4, 2.5, 6.5);
        controls.target.set(2.4, 0.5, 0);
        break;
      case "evm":
        camera.position.set(7, 2.2, 6);
        controls.target.set(7, 0, 0);
        break;
    }
    controls.update();
  };

  // Main Three.js Scene Setup
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 900;
    const height = 540;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090b);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 4.5, 17);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 28;
    controls.minDistance = 3;
    controls.maxPolarAngle = Math.PI / 1.75;
    controlsRef.current = controls;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 12, 10);
    scene.add(dirLight);

    // Floor Grid
    const grid = new THREE.GridHelper(26, 26, 0x27272a, 0x18181b);
    grid.position.y = -2.2;
    scene.add(grid);

    // ==========================================
    // STATION 1: SECURE ENCLAVE VAULT (x = -7)
    // ==========================================
    const enclaveGroup = new THREE.Group();
    enclaveGroup.position.set(-7, 0, 0);

    // Vault Frame
    const vaultBoxGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const vaultBoxMat = new THREE.MeshStandardMaterial({
      color: 0x0e7490,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const vaultBox = new THREE.Mesh(vaultBoxGeo, vaultBoxMat);
    enclaveGroup.add(vaultBox);

    // Inner Glowing Core (Private Key Enclave)
    const vaultCoreGeo = new THREE.OctahedronGeometry(0.8, 1);
    const vaultCoreMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2,
    });
    const vaultCore = new THREE.Mesh(vaultCoreGeo, vaultCoreMat);
    enclaveGroup.add(vaultCore);

    // Halo Orbit Ring
    const vaultRingGeo = new THREE.TorusGeometry(1.5, 0.03, 16, 64);
    const vaultRingMat = new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.6 });
    const vaultRing = new THREE.Mesh(vaultRingGeo, vaultRingMat);
    vaultRing.rotation.x = Math.PI / 2;
    enclaveGroup.add(vaultRing);

    scene.add(enclaveGroup);

    // ==========================================
    // STATION 2: R1CS ARITHMETIC CIRCUIT (x = -2.2)
    // ==========================================
    const circuitGroup = new THREE.Group();
    circuitGroup.position.set(-2.2, 0, 0);

    // Circuit Base Plate
    const basePlateGeo = new THREE.BoxGeometry(2.8, 0.15, 2.8);
    const basePlateMat = new THREE.MeshStandardMaterial({ color: 0x18181b, metalness: 0.9, roughness: 0.3 });
    const basePlate = new THREE.Mesh(basePlateGeo, basePlateMat);
    basePlate.position.y = -1.1;
    circuitGroup.add(basePlate);

    // 3 Logic Gates (Multiply, Add, Range Check)
    const gateGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.6, 16);
    const gateColors = [0xf59e0b, 0xd97706, 0xb45309];
    const gateMeshes: THREE.Mesh[] = [];

    const gateOffsets = [
      new THREE.Vector3(-0.7, -0.4, 0),
      new THREE.Vector3(0.7, -0.4, 0),
      new THREE.Vector3(0, 0.6, 0),
    ];

    gateOffsets.forEach((pos, idx) => {
      const mat = new THREE.MeshStandardMaterial({
        color: gateColors[idx],
        emissive: gateColors[idx],
        emissiveIntensity: 0.5,
        metalness: 0.7,
        roughness: 0.3,
      });
      const gate = new THREE.Mesh(gateGeo, mat);
      gate.position.copy(pos);
      circuitGroup.add(gate);
      gateMeshes.push(gate);
    });

    // Circuit Wires
    const wireMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2, transparent: true, opacity: 0.7 });
    const wirePoints = [
      new THREE.Vector3(-0.7, -0.1, 0),
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(0.7, -0.1, 0),
    ];
    const wireGeo = new THREE.BufferGeometry().setFromPoints(wirePoints);
    const circuitWire = new THREE.Line(wireGeo, wireMat);
    circuitGroup.add(circuitWire);

    scene.add(circuitGroup);

    // ==========================================
    // STATION 3: POSEIDON MERKLE TREE (x = 2.4)
    // ==========================================
    const merkleGroup = new THREE.Group();
    merkleGroup.position.set(2.4, 0, 0);

    // Root Node (Top)
    const rootGeo = new THREE.SphereGeometry(0.45, 32, 32);
    const rootMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.9,
      metalness: 0.8,
      roughness: 0.2,
    });
    const rootMesh = new THREE.Mesh(rootGeo, rootMat);
    rootMesh.position.set(0, 1.4, 0);
    merkleGroup.add(rootMesh);

    // Branch Nodes
    const branchGeo = new THREE.SphereGeometry(0.3, 24, 24);
    const branchMat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.6,
      metalness: 0.7,
      roughness: 0.3,
    });

    const branchLeft = new THREE.Mesh(branchGeo, branchMat);
    branchLeft.position.set(-1.1, 0.2, 0);
    merkleGroup.add(branchLeft);

    const branchRight = new THREE.Mesh(branchGeo, branchMat);
    branchRight.position.set(1.1, 0.2, 0);
    merkleGroup.add(branchRight);

    // Leaves (Bottom)
    const leafGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x52525b, metalness: 0.8, roughness: 0.4 });
    const targetLeafMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 1,
      metalness: 0.9,
      roughness: 0.2,
    });

    const leafPositions = [-1.7, -0.6, 0.6, 1.7];
    leafPositions.forEach((lx, idx) => {
      const isTarget = idx === 0;
      const leafMesh = new THREE.Mesh(leafGeo, isTarget ? targetLeafMat : leafMat);
      leafMesh.position.set(lx, -1.0, 0);
      merkleGroup.add(leafMesh);
    });

    // Merkle Tree Branch Lines
    const merkleLineMat = new THREE.LineBasicMaterial({ color: 0x3f3f46, transparent: true, opacity: 0.4 });
    const proofLineMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.95 });

    const proofTreeLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-1.7, -1.0, 0),
        new THREE.Vector3(-1.1, 0.2, 0),
        new THREE.Vector3(0, 1.4, 0),
      ]),
      proofLineMat
    );
    merkleGroup.add(proofTreeLine);

    const otherTreeLine = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(1.7, -1.0, 0),
        new THREE.Vector3(1.1, 0.2, 0),
        new THREE.Vector3(0, 1.4, 0),
      ]),
      merkleLineMat
    );
    merkleGroup.add(otherTreeLine);

    scene.add(merkleGroup);

    // ==========================================
    // STATION 4: EVM VERIFIER & PRECOMPILE (x = 7)
    // ==========================================
    const evmGroup = new THREE.Group();
    evmGroup.position.set(7, 0, 0);

    // Ethereum Diamond Core (Octahedron)
    const ethDiamondGeo = new THREE.OctahedronGeometry(1.1, 0);
    const ethDiamondMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x047857,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: false,
    });
    const ethDiamond = new THREE.Mesh(ethDiamondGeo, ethDiamondMat);
    evmGroup.add(ethDiamond);

    // Surrounding Dual Orbiting Rings (Smart Contract Guard)
    const evmRingGeo = new THREE.TorusGeometry(1.6, 0.04, 16, 64);
    const evmRingMat = new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.6 });
    const evmRing1 = new THREE.Mesh(evmRingGeo, evmRingMat);
    evmRing1.rotation.x = Math.PI / 3;
    evmGroup.add(evmRing1);

    const evmRing2 = new THREE.Mesh(evmRingGeo, evmRingMat);
    evmRing2.rotation.y = Math.PI / 3;
    evmGroup.add(evmRing2);

    scene.add(evmGroup);

    // ==========================================
    // CONNECTING PIPELINE DATA CONDUITS (Splines)
    // ==========================================
    const conduitMat = new THREE.LineDashedMaterial({
      color: 0x3f3f46,
      dashSize: 0.3,
      gapSize: 0.15,
      transparent: true,
      opacity: 0.5,
    });

    const conduitPoints = [
      new THREE.Vector3(-7, -0.2, 0),
      new THREE.Vector3(-2.2, -0.2, 0),
      new THREE.Vector3(2.4, -0.2, 0),
      new THREE.Vector3(7, -0.2, 0),
    ];
    const conduitGeo = new THREE.BufferGeometry().setFromPoints(conduitPoints);
    const conduitLine = new THREE.Line(conduitGeo, conduitMat);
    conduitLine.computeLineDistances();
    scene.add(conduitLine);

    // Flying Cryptographic Proof Capsule (Active when generated)
    const capsuleGeo = new THREE.CapsuleGeometry(0.2, 0.4, 16, 16);
    const capsuleMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 1.2,
      metalness: 0.9,
      roughness: 0.1,
    });
    const capsule = new THREE.Mesh(capsuleGeo, capsuleMat);
    capsule.position.set(-2.2, 0.5, 0);
    capsule.visible = false;
    scene.add(capsule);

    // ==========================================
    // 5. ANIMATION LOOP
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Enclave Rotation
      vaultBox.rotation.y = elapsedTime * 0.3;
      vaultBox.rotation.x = elapsedTime * 0.15;
      vaultCore.rotation.y = -elapsedTime * 0.5;
      vaultRing.rotation.z = elapsedTime * 0.2;

      // Circuit Gate Oscillation
      gateMeshes.forEach((gm, idx) => {
        gm.rotation.y = elapsedTime * (0.8 + idx * 0.2);
        if (stateRef.current.isGenerating) {
          (gm.material as THREE.MeshStandardMaterial).emissiveIntensity =
            0.6 + Math.sin(elapsedTime * 8 + idx) * 0.5;
        } else {
          (gm.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4;
        }
      });

      // Merkle Tree Root Pulse
      rootMesh.rotation.y = elapsedTime * 0.4;
      (rootMesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.7 + Math.sin(elapsedTime * 2) * 0.2;

      // EVM Diamond & Rings
      ethDiamond.rotation.y = elapsedTime * 0.5;
      ethDiamond.rotation.z = Math.sin(elapsedTime * 0.4) * 0.2;
      evmRing1.rotation.z = elapsedTime * 0.7;
      evmRing2.rotation.x = elapsedTime * 0.6;

      // Handle Proof Capsule Trajectory & Verification Visuals
      if (stateRef.current.hasProof) {
        capsule.visible = true;
        capsule.rotation.z = elapsedTime * 2;
        capsule.rotation.y = elapsedTime * 3;

        if (stateRef.current.isVerifying) {
          // Fly from circuit to EVM
          const t = (Math.sin(elapsedTime * 3) + 1) / 2;
          capsule.position.x = -2.2 + t * (7 - -2.2);
          capsule.position.y = 0.5 + Math.sin(t * Math.PI) * 1.5;
        } else if (stateRef.current.hasResult) {
          // Locked at EVM
          capsule.position.set(7, 0, 0);
          capsule.scale.setScalar(0.7 + Math.sin(elapsedTime * 4) * 0.15);
        } else {
          // Sitting minted at circuit
          capsule.position.set(-2.2, 0.8 + Math.sin(elapsedTime * 2) * 0.1, 0);
        }
      } else {
        capsule.visible = false;
      }

      // EVM Ring Color on Verification
      if (stateRef.current.hasResult) {
        if (stateRef.current.isValid) {
          evmRingMat.color.setHex(0x10b981);
          (ethDiamond.material as THREE.MeshStandardMaterial).emissive.setHex(0x059669);
          (ethDiamond.material as THREE.MeshStandardMaterial).emissiveIntensity =
            1.0 + Math.sin(elapsedTime * 6) * 0.4;
        } else {
          evmRingMat.color.setHex(0xef4444);
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

  const handleNextAction = async () => {
    if (activeStep === 1) {
      setActiveStep(2);
      setCameraPreset("circuit");
    } else if (activeStep === 2) {
      setCameraPreset("circuit");
      const res = await onGenerateProof();
      if (res) {
        setActiveStep(3);
        setCameraPreset("merkle");
      }
    } else if (activeStep === 3) {
      setCameraPreset("evm");
      await onVerifyProof();
      setActiveStep(4);
    }
  };

  return (
    <div className="space-y-4">
      {/* 3D Holo-Deck Container */}
      <div
        ref={containerRef}
        className="relative rounded-2xl border border-border bg-zinc-950 overflow-hidden shadow-2xl"
      >
        <canvas ref={canvasRef} className="w-full h-[540px] block cursor-grab active:cursor-grabbing" />

        {/* Top Control Bar: Camera Presets & Telemetry */}
        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
          <div className="pointer-events-auto flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-100 backdrop-blur-md shadow-lg">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="font-semibold">3D Zero-Knowledge Execution Pipeline</span>
              <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800">
                Live Spatial WebGL
              </span>
            </div>
          </div>

          {/* Camera View Switcher */}
          <div className="pointer-events-auto flex items-center gap-1 p-1 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md shadow-lg text-xs">
            <button
              onClick={() => setCameraPreset("overview")}
              className={`px-2.5 py-1 rounded-lg transition ${
                cameraView === "overview" ? "bg-zinc-800 text-emerald-400 font-semibold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setCameraPreset("enclave")}
              className={`px-2.5 py-1 rounded-lg transition ${
                cameraView === "enclave" ? "bg-zinc-800 text-cyan-400 font-semibold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              1. Enclave
            </button>
            <button
              onClick={() => setCameraPreset("circuit")}
              className={`px-2.5 py-1 rounded-lg transition ${
                cameraView === "circuit" ? "bg-zinc-800 text-amber-400 font-semibold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              2. Circuit
            </button>
            <button
              onClick={() => setCameraPreset("merkle")}
              className={`px-2.5 py-1 rounded-lg transition ${
                cameraView === "merkle" ? "bg-zinc-800 text-purple-400 font-semibold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              3. Merkle
            </button>
            <button
              onClick={() => setCameraPreset("evm")}
              className={`px-2.5 py-1 rounded-lg transition ${
                cameraView === "evm" ? "bg-zinc-800 text-emerald-400 font-semibold" : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              4. EVM
            </button>
          </div>
        </div>

        {/* 4 Spatial Station Labels (Floated on top) */}
        <div className="absolute top-16 left-6 right-6 hidden md:grid grid-cols-4 gap-4 pointer-events-none text-center">
          <div className="p-2 rounded-lg bg-zinc-900/60 border border-cyan-800/40 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">Station 1</span>
            <span className="text-xs text-zinc-300 font-medium">Off-Chain Enclave</span>
          </div>
          <div className="p-2 rounded-lg bg-zinc-900/60 border border-amber-800/40 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">Station 2</span>
            <span className="text-xs text-zinc-300 font-medium">Groth16 R1CS Circuit</span>
          </div>
          <div className="p-2 rounded-lg bg-zinc-900/60 border border-purple-800/40 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold block">Station 3</span>
            <span className="text-xs text-zinc-300 font-medium">Poseidon Merkle State</span>
          </div>
          <div className="p-2 rounded-lg bg-zinc-900/60 border border-emerald-800/40 backdrop-blur-sm">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">Station 4</span>
            <span className="text-xs text-zinc-300 font-medium">EVM Pairing Verifier</span>
          </div>
        </div>

        {/* Bottom Interactive Dashboard Controller */}
        <div className="absolute bottom-4 left-4 right-4 pointer-events-auto p-4 rounded-xl bg-zinc-900/90 border border-zinc-800/90 backdrop-blur-md shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Identity & Policy Selectors */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Identity Switcher */}
            <div>
              <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                Active Prover (Enclave)
              </label>
              <select
                value={selectedDid}
                onChange={(e) => onSelectDid(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {identities.map((id) => (
                  <option key={id.id} value={id.id}>
                    {id.name} ({id.id.replace("did:zk:", "")})
                  </option>
                ))}
              </select>
            </div>

            {/* Policy Selector */}
            <div>
              <label className="text-[10px] uppercase font-mono text-zinc-400 block mb-1">
                Claim Predicate
              </label>
              <select
                value={attributeType}
                onChange={(e) => {
                  const val = e.target.value;
                  setAttributeType(val);
                  if (val === "age") setClaimedThreshold(18.0);
                  if (val === "cgpa") setClaimedThreshold(8.0);
                  if (val === "income") setClaimedThreshold(100000.0);
                }}
                className="bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-lg px-2.5 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="age">Age &gt;= {claimedThreshold} Years</option>
                <option value="cgpa">CGPA &gt;= {claimedThreshold}</option>
                <option value="income">Income &gt;= ₹{claimedThreshold.toLocaleString()}</option>
              </select>
            </div>

            {/* Live Cryptographic Status Pill */}
            <div className="hidden lg:block text-xs font-mono pl-2 border-l border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase">Enclave Raw Attribute</div>
              <div className="text-cyan-400 font-semibold">
                {attributeType === "age" && `Actual Age: ${selectedAttrs.age} yrs`}
                {attributeType === "cgpa" && `Actual CGPA: ${selectedAttrs.cgpa}`}
                {attributeType === "income" && `Actual Income: ₹${selectedAttrs.income.toLocaleString()}`}
                <span className="text-zinc-500 text-[10px] ml-1">(Private)</span>
              </div>
            </div>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            {/* Step 2 Trigger: Generate Proof */}
            {!proofData ? (
              <button
                onClick={async () => {
                  setCameraPreset("circuit");
                  await onGenerateProof();
                  setActiveStep(3);
                }}
                disabled={isGenerating}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Cpu className="h-4 w-4" />
                <span>{isGenerating ? "Compiling R1CS Circuit..." : "1. Generate zk-SNARK Proof"}</span>
              </button>
            ) : !verifResult ? (
              /* Step 3 Trigger: Verify Proof On-Chain */
              <button
                onClick={async () => {
                  setCameraPreset("evm");
                  await onVerifyProof();
                  setActiveStep(4);
                }}
                disabled={isVerifying}
                className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold text-xs tracking-wide transition flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>{isVerifying ? "Evaluating Bilinear Pairing..." : "2. Verify On-Chain (EVM 0x08)"}</span>
              </button>
            ) : (
              /* Step 4: Verification Result Badge */
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
                    Status: {verifResult.is_valid ? "VERIFIED (0x08)" : "REJECTED"} (
                    {verifResult.smart_contract.gas_consumed.toLocaleString()} Gas)
                  </span>
                </div>

                <button
                  onClick={() => {
                    setCameraPreset("overview");
                    setActiveStep(1);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-medium transition"
                >
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
