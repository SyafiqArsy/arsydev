"use client";

/* eslint-disable react/no-unknown-property */
import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { SKILL_ITEMS, SkillItem } from "./techIcons";

// Scaled down radii for 3 orbit rings with comfortable margin
const RING_RADII = {
  1: { rx: 3.2, rz: 2.2, tiltX: 0.22, tiltZ: 0.08 },  // Inner
  2: { rx: 5.2, rz: 3.6, tiltX: -0.3, tiltZ: -0.12 }, // Mid
  3: { rx: 7.0, rz: 4.8, tiltX: 0.12, tiltZ: 0.2 },   // Outer
};

interface OrbitNodeProps {
  item: SkillItem;
  activeId: string | null;
  setActiveId: (id: string | null) => void;
  isPaused: boolean;
}

function OrbitNode({ item, activeId, setActiveId, isPaused }: OrbitNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const angleRef = useRef<number>(item.angleOffset);
  const isHovered = activeId === item.id;
  const isAnyHovered = activeId !== null;

  const ringConfig = RING_RADII[item.ring as keyof typeof RING_RADII];

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const speedMultiplier = isHovered ? 0.05 : isAnyHovered ? 0.35 : 1;
    if (!isPaused) {
      angleRef.current += delta * item.speed * speedMultiplier;
    }

    const angle = angleRef.current;
    const time = state.clock.getElapsedTime();

    let x = Math.cos(angle) * ringConfig.rx;
    let z = Math.sin(angle) * ringConfig.rz;
    let y = item.yOffset * 0.75 + Math.sin(time * 1.5 + item.angleOffset) * 0.2;

    const cosX = Math.cos(ringConfig.tiltX);
    const sinX = Math.sin(ringConfig.tiltX);
    const cosZ = Math.cos(ringConfig.tiltZ);
    const sinZ = Math.sin(ringConfig.tiltZ);

    const y1 = y * cosX - z * sinX;
    const z1 = y * sinX + z * cosX;

    const x2 = x * cosZ - y1 * sinZ;
    const y2 = x * sinZ + y1 * cosZ;

    groupRef.current.position.set(x2, y2, z1);
  });

  return (
    <group ref={groupRef}>
      <Html
        transform
        distanceFactor={15}
        zIndexRange={[10, 0]}
        style={{
          transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: `scale(${isHovered ? 1.35 : isAnyHovered ? 0.8 : 1})`,
          opacity: isAnyHovered && !isHovered ? 0.45 : 1,
        }}
      >
        <div
          onPointerEnter={(e) => {
            e.stopPropagation();
            setActiveId(item.id);
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            setActiveId(null);
          }}
          className={`group relative flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300 backdrop-blur-md select-none ${
            isHovered
              ? "border-2 border-accent bg-navy-light/90 shadow-[0_0_25px_rgba(91,141,239,0.7)]"
              : "border border-accent/20 bg-navy/80 hover:border-accent/60 shadow-md"
          }`}
          style={{
            borderColor: isHovered ? item.color : undefined,
            boxShadow: isHovered ? `0 0 20px ${item.bgColor}` : undefined,
          }}
        >
          {/* Logo Only */}
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full p-1 transition-transform duration-300 group-hover:scale-110 sm:h-8 sm:w-8"
            style={{ backgroundColor: item.bgColor }}
          >
            {item.icon}
          </div>
        </div>
      </Html>
    </group>
  );
}

function VisualRings() {
  const ringLines = useMemo(() => {
    return Object.entries(RING_RADII).map(([key, config]) => {
      const points: THREE.Vector3[] = [];
      const segments = 64;

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2;
        const x = Math.cos(angle) * config.rx;
        const z = Math.sin(angle) * config.rz;
        const y = 0;

        const cosX = Math.cos(config.tiltX);
        const sinX = Math.sin(config.tiltX);
        const cosZ = Math.cos(config.tiltZ);
        const sinZ = Math.sin(config.tiltZ);

        const y1 = y * cosX - z * sinX;
        const z1 = y * sinX + z * cosX;

        const x2 = x * cosZ - y1 * sinZ;
        const y2 = x * sinZ + y1 * cosZ;

        points.push(new THREE.Vector3(x2, y2, z1));
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: "#5b8def",
        transparent: true,
        opacity: 0.1,
      });

      const line = new THREE.Line(geometry, material);

      return { key, line };
    });
  }, []);

  return (
    <group>
      {ringLines.map(({ key, line }) => (
        <primitive key={key} object={line} />
      ))}
    </group>
  );
}

function OrbitCore() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.35;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.18;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshBasicMaterial color="#5b8def" wireframe transparent opacity={0.3} />
    </mesh>
  );
}

function CameraRig({ isPaused }: { isPaused: boolean }) {
  useFrame((state) => {
    if (isPaused) return;
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 1.2, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function SkillsOrbitScene() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative mx-auto my-4 h-[380px] w-full max-w-5xl px-6 sm:h-[420px] md:h-[460px] md:px-12">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 44 }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#5b8def" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#a855f7" />

        <CameraRig isPaused={activeId !== null} />
        <OrbitCore />
        <VisualRings />

        {SKILL_ITEMS.map((item) => (
          <OrbitNode
            key={item.id}
            item={item}
            activeId={activeId}
            setActiveId={setActiveId}
            isPaused={false}
          />
        ))}

        <Sparkles count={35} scale={15} size={2} speed={0.35} opacity={0.35} color="#5b8def" />
      </Canvas>
    </div>
  );
}
