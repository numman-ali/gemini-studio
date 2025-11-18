"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Text } from "@react-three/drei";
import * as THREE from "three";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function SpinningShape(props: any) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.2;
      mesh.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh
        {...props}
        ref={mesh}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.2 : 1}
      >
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={hovered ? "#ff0055" : "#4400ff"} wireframe />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <SpinningShape position={[-3, 0, 0]} />
      <SpinningShape position={[3, 0, 0]} />
      <SpinningShape position={[0, 3, 0]} />
      <SpinningShape position={[0, -3, 0]} />
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Text
          position={[0, 0, 0]}
          fontSize={1.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
        >
          THE VOID
        </Text>
      </Float>
      
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
    </>
  );
}

export default function ThreeDPage() {
  return (
    <div className="h-screen w-full bg-black relative">
      <div className="absolute top-8 left-8 z-10">
        <Link href="/" className="text-white flex items-center gap-2 hover:opacity-70 transition-opacity">
          <ArrowLeft /> Back to Reality
        </Link>
      </div>
      
      <div className="absolute bottom-8 left-8 text-white/50 text-sm z-10 pointer-events-none">
         Interactive WebGL Experience • Drag to Rotate • Hover shapes
      </div>

      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Scene />
      </Canvas>
    </div>
  );
}

