"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MerkleState } from "./MerkleExplorer";
import { RotateCw, Maximize2, ShieldCheck, Info, Sparkles } from "lucide-react";

interface MerkleTree3DProps {
  merkleState: MerkleState;
  selectedLeafIndex: number;
}

interface NodeUserData {
  level: number;
  index: number;
  hash: string;
  isRoot: boolean;
  isLeaf: boolean;
  isTargetLeaf: boolean;
  isInProofPath: boolean;
  label: string;
}

export const MerkleTree3D: React.FC<MerkleTree3DProps> = ({
  merkleState,
  selectedLeafIndex,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [hoveredNode, setHoveredNode] = useState<NodeUserData | null>(null);
  const [selectedNode, setSelectedNode] = useState<NodeUserData | null>(null);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const autoRotateRef = useRef<boolean>(true);
  autoRotateRef.current = autoRotate;

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current || !merkleState) return;

    const width = containerRef.current.clientWidth || 800;
    const height = 480;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x09090b);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 12);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 25;
    controls.minDistance = 4;
    controls.maxPolarAngle = Math.PI / 1.7; // don't go too far below floor

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 12, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x10b981, 2, 10);
    pointLight.position.set(0, 4, 1);
    scene.add(pointLight);

    // 4. Subtle Hex / Grid Ground
    const gridHelper = new THREE.GridHelper(16, 16, 0x27272a, 0x18181b);
    gridHelper.position.y = -3.2;
    scene.add(gridHelper);

    // 5. Build Merkle Tree Nodes & Edges
    // Compute Proof Path for selectedLeafIndex
    // In a binary tree of depth D, path from leaf i to root:
    // At level 0: leaf i
    // At level 1: parent = Math.floor(i / 2)
    // At level 2: grandParent = Math.floor(parent / 2), etc.
    const proofPathNodes: { level: number; index: number }[] = [];
    let curIdx = selectedLeafIndex;
    for (let lvl = 0; lvl <= merkleState.depth; lvl++) {
      proofPathNodes.push({ level: lvl, index: curIdx });
      curIdx = Math.floor(curIdx / 2);
    }

    const isNodeInProofPath = (lvl: number, idx: number) => {
      return proofPathNodes.some((p) => p.level === lvl && p.index === idx);
    };

    // Calculate Coordinates for Each Node
    // Depth: level 0 (leaves) to level depth (root)
    // Level 3 (root): y = 3.2
    // Level 2: y = 1.3
    // Level 1: y = -0.6
    // Level 0 (leaves): y = -2.5
    const nodeObjects: THREE.Mesh[] = [];
    const nodeCoords: Map<string, THREE.Vector3> = new Map();

    const ySpread = 1.9;
    const baseLeaves = merkleState.levels[0]?.nodes.length || 8;
    const maxWidth = 10.5;

    merkleState.levels.forEach((lvl) => {
      const levelNum = lvl.level;
      const count = lvl.nodes.length;
      const y = -2.5 + levelNum * ySpread;

      lvl.nodes.forEach((hash, idx) => {
        let x = 0;
        if (count > 1) {
          const step = maxWidth / (count - 1);
          x = -maxWidth / 2 + idx * step;
        }

        const z = 0;
        const pos = new THREE.Vector3(x, y, z);
        nodeCoords.set(`${levelNum}-${idx}`, pos);

        const isRoot = levelNum === merkleState.depth;
        const isLeaf = levelNum === 0;
        const isTargetLeaf = isLeaf && idx === selectedLeafIndex;
        const inPath = isNodeInProofPath(levelNum, idx);

        // Geometries & Colors
        let radius = 0.28;
        let color = 0x3f3f46; // default zinc-700
        let emissive = 0x09090b;

        if (isRoot) {
          radius = 0.46;
          color = 0x10b981; // emerald
          emissive = 0x059669;
        } else if (isTargetLeaf) {
          radius = 0.40;
          color = 0x06b6d4; // cyan
          emissive = 0x0891b2;
        } else if (inPath) {
          radius = 0.34;
          color = 0xa855f7; // purple path
          emissive = 0x7e22ce;
        } else if (isLeaf) {
          radius = 0.26;
          color = 0x52525b; // zinc-600
        }

        const geometry = new THREE.SphereGeometry(radius, 32, 32);
        const material = new THREE.MeshStandardMaterial({
          color,
          emissive,
          emissiveIntensity: inPath || isRoot || isTargetLeaf ? 0.7 : 0.1,
          roughness: 0.25,
          metalness: 0.8,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(pos);

        // User Data for Tooltips / Raycasting
        let label = `Intermediate Node [L${levelNum}-${idx}]`;
        if (isRoot) label = "Root State Commitment (On-Chain)";
        if (isTargetLeaf) label = `Prover's Active Credential Leaf #${idx}`;
        if (isLeaf && !isTargetLeaf) label = `Enclave Credential Leaf #${idx}`;

        const uData: NodeUserData = {
          level: levelNum,
          index: idx,
          hash,
          isRoot,
          isLeaf,
          isTargetLeaf,
          isInProofPath: inPath,
          label,
        };
        mesh.userData = uData;

        scene.add(mesh);
        nodeObjects.push(mesh);

        // Add Glowing Halo Ring for Target Leaf and Root
        if (isTargetLeaf || isRoot) {
          const ringGeo = new THREE.RingGeometry(radius * 1.3, radius * 1.5, 32);
          const ringMat = new THREE.MeshBasicMaterial({
            color: isRoot ? 0x34d399 : 0x22d3ee,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6,
          });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.position.copy(pos);
          scene.add(ring);
        }
      });
    });

    // 6. Connect Parent-Child Nodes with Lines
    for (let lvl = 0; lvl < merkleState.depth; lvl++) {
      const childCount = merkleState.levels[lvl]?.nodes.length || 0;
      for (let cIdx = 0; cIdx < childCount; cIdx++) {
        const pIdx = Math.floor(cIdx / 2);
        const childPos = nodeCoords.get(`${lvl}-${cIdx}`);
        const parentPos = nodeCoords.get(`${lvl + 1}-${pIdx}`);

        if (childPos && parentPos) {
          const inProofEdge =
            isNodeInProofPath(lvl, cIdx) && isNodeInProofPath(lvl + 1, pIdx);

          const points = [childPos, parentPos];
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const lineMat = new THREE.LineBasicMaterial({
            color: inProofEdge ? 0x10b981 : 0x27272a,
            linewidth: inProofEdge ? 3 : 1,
            transparent: true,
            opacity: inProofEdge ? 0.95 : 0.35,
          });

          const line = new THREE.Line(lineGeo, lineMat);
          scene.add(line);
        }
      }
    }

    // 7. Raycasting for Mouse Hover & Selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeObjects);
      if (intersects.length > 0) {
        const target = intersects[0].object as THREE.Mesh;
        setSelectedNode(target.userData as NodeUserData);
      }
    };

    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("click", onClick);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Subtle slow orbit if autoRotate is enabled
      if (autoRotateRef.current) {
        scene.rotation.y = Math.sin(elapsedTime * 0.15) * 0.25;
      }

      // Hover Raycast
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeObjects);
      if (intersects.length > 0) {
        const topMesh = intersects[0].object as THREE.Mesh;
        setHoveredNode(topMesh.userData as NodeUserData);
        renderer.domElement.style.cursor = "pointer";
      } else {
        setHoveredNode(null);
        renderer.domElement.style.cursor = "grab";
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const newWidth = containerRef.current.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };

    window.addEventListener("resize", handleResize);

    // 10. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("click", onClick);
      controls.dispose();
      renderer.dispose();
    };
  }, [merkleState, selectedLeafIndex]);

  const activeInspectNode = selectedNode || hoveredNode;

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border border-border bg-zinc-950 overflow-hidden shadow-xl"
    >
      {/* 3D Canvas */}
      <canvas ref={canvasRef} className="w-full h-[480px] block" />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-200 backdrop-blur-md shadow-md">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span className="font-semibold">Interactive 3D Merkle Poseidon Tree</span>
            <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800">
              Depth 3 • 8 Leaves
            </span>
          </div>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition flex items-center gap-1.5 backdrop-blur-md ${
              autoRotate
                ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-300"
                : "bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>{autoRotate ? "Auto-Rotate: On" : "Rotate: Paused"}</span>
          </button>
        </div>
      </div>

      {/* Legend & Instructions Overlay (Bottom-Left) */}
      <div className="absolute bottom-4 left-4 pointer-events-none hidden sm:flex flex-col gap-1.5 text-[11px] font-mono text-zinc-400 p-3 rounded-xl bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md max-w-xs shadow-md">
        <div className="flex items-center gap-2 text-zinc-200 font-semibold mb-1">
          <Info className="h-3.5 w-3.5 text-blue-400" />
          <span>Interactive Navigation</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          <span>Root (On-Chain State Anchor)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyan-400"></span>
          <span>Prover's Active Credential Leaf</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-purple-500"></span>
          <span>O(log N) Membership Proof Path</span>
        </div>
        <div className="text-[10px] text-zinc-500 mt-1">
          Drag to rotate 360° • Scroll to zoom • Click node to inspect hash
        </div>
      </div>

      {/* Node Inspector Overlay (Bottom-Right / Floating) */}
      {activeInspectNode && (
        <div className="absolute bottom-4 right-4 pointer-events-auto p-4 rounded-xl bg-zinc-900/90 border border-zinc-700/80 backdrop-blur-md max-w-sm text-xs shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between gap-2 border-b border-zinc-800 pb-2">
            <span className="font-semibold text-zinc-100 flex items-center gap-1.5">
              {activeInspectNode.isRoot && <ShieldCheck className="h-4 w-4 text-emerald-400" />}
              {activeInspectNode.label}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
              Level {activeInspectNode.level} • Node #{activeInspectNode.index}
            </span>
          </div>

          <div>
            <div className="text-[10px] uppercase font-mono text-zinc-400 mb-0.5">
              Poseidon Hash (256-bit Field Element)
            </div>
            <div className="font-mono text-[11px] text-emerald-400 bg-black/60 p-2 rounded-md border border-zinc-800/80 break-all select-all">
              {activeInspectNode.hash}
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1">
            <span>Proof Status:</span>
            <span
              className={`font-semibold ${
                activeInspectNode.isInProofPath
                  ? "text-purple-400"
                  : "text-zinc-500"
              }`}
            >
              {activeInspectNode.isInProofPath ? "Active in zk-SNARK Witness" : "Off-Path Branch"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
