"use client";

import { Float } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

function SignalForm() {
  const group = useRef<Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.1;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.45}>
      <group ref={group} rotation={[0.16, -0.35, 0]}>
        <mesh>
          <icosahedronGeometry args={[1.28, 3]} />
          <meshStandardMaterial color="#17202b" metalness={0.76} roughness={0.24} />
        </mesh>
        <mesh scale={1.55}>
          <icosahedronGeometry args={[1.28, 2]} />
          <meshBasicMaterial color="#3b82f6" transparent opacity={0.16} wireframe />
        </mesh>
        {[
          [-1.55, 0.7, 0.2], [1.42, 0.58, 0.15], [-0.78, -1.42, 0.62], [0.94, -1.26, -0.32], [0.08, 1.6, -0.46],
        ].map(([x, y, z], index) => (
          <group position={[x, y, z]} key={`${x}-${y}-${z}`}>
            <mesh>
              <sphereGeometry args={[index % 2 ? 0.12 : 0.18, 24, 24]} />
              <meshStandardMaterial color="#9cc5ff" emissive="#2563eb" emissiveIntensity={0.78} />
            </mesh>
            <mesh position={[-x / 2, -y / 2, -z / 2]} rotation={[0.2, 0.45, 0]}>
              <boxGeometry args={[0.018, Math.hypot(x, y, z), 0.018]} />
              <meshBasicMaterial color="#3b82f6" transparent opacity={0.42} />
            </mesh>
          </group>
        ))}
      </group>
    </Float>
  );
}

export default function SignalCanvas() {
  return (
    <Canvas aria-hidden camera={{ position: [0, 0, 5.1], fov: 40 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 3, 4]} intensity={2.3} color="#e7edf5" />
      <pointLight position={[-3, -2, 1]} intensity={1.2} color="#2563eb" />
      <SignalForm />
    </Canvas>
  );
}
