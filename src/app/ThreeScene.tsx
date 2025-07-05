"use client";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky } from "@react-three/drei";
import { Physics, useBox, usePlane } from "@react-three/cannon";

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -0.5, 0],
  }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial color="#222" />
    </mesh>
  );
}

function Obstacle({ position }: { position: [number, number, number] }) {
  const [ref] = useBox(() => ({ mass: 0, position }));
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#f59e42" />
    </mesh>
  );
}

function Car() {
  const [chassisRef, api] = useBox(() => ({
    mass: 500,
    position: [0, 1, 0],
    args: [2, 1, 4],
  }));

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w") api.velocity.set(0, 0, -10);
      if (e.key === "ArrowDown" || e.key === "s") api.velocity.set(0, 0, 10);
      if (e.key === "ArrowLeft" || e.key === "a") api.velocity.set(-10, 0, 0);
      if (e.key === "ArrowRight" || e.key === "d") api.velocity.set(10, 0, 0);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [api.velocity]);

  return (
    <mesh ref={chassisRef} castShadow>
      <boxGeometry args={[2, 1, 4]} />
      <meshStandardMaterial color="#ff4444" />
    </mesh>
  );
}

export default function ThreeScene() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Canvas shadows camera={{ position: [0, 10, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} castShadow />
        <Sky sunPosition={[100, 20, 100]} />
        <Physics>
          <Ground />
          <Car />
          <Obstacle position={[5, 1, -5]} />
          <Obstacle position={[-5, 1, -10]} />
        </Physics>
        <OrbitControls />
      </Canvas>
    </div>
  );
} 