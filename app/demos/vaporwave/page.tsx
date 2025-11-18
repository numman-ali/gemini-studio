"use client";

import Link from "next/link";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, MeshDistortMaterial, Float } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Scanline } from "@react-three/postprocessing";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Statue() {
  // Using a simple geometry as a placeholder for a bust to ensure stability without external assets
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
       mesh.current.rotation.y = Math.sin(state.clock.elapsedTime / 2) * 0.5;
       mesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <mesh ref={mesh} scale={2}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <MeshDistortMaterial 
         color="#ff00ff" 
         roughness={0.1} 
         metalness={1} 
         distort={0.4} 
         speed={2} 
      />
    </mesh>
  );
}

function GridFloor() {
   const ref = useRef<THREE.Mesh>(null);
   useFrame((state) => {
      if (ref.current) {
         // Infinite scroll effect
         ref.current.position.z = (state.clock.elapsedTime * 2) % 2;
      }
   });

   return (
      <group position={[0, -2, 0]}>
         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
            <planeGeometry args={[50, 50, 50, 50]} />
            <meshBasicMaterial color="#2c003e" wireframe />
         </mesh>
         <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
            <gridHelper args={[50, 50, 0xff00ff, 0x00ffff]} />
         </mesh>
      </group>
   );
}

function Scene() {
   return (
      <>
         <ambientLight intensity={0.5} />
         <directionalLight position={[10, 10, 5]} intensity={2} color="#00ffff" />
         <pointLight position={[-10, -10, -5]} intensity={2} color="#ff00ff" />
         
         <Statue />
         <GridFloor />
         
         <EffectComposer>
            <Bloom luminanceThreshold={0} mipmapBlur intensity={0.5} radius={0.8} />
            <ChromaticAberration offset={[0.002, 0.002]} />
            <Scanline density={2} opacity={0.5} />
         </EffectComposer>
      </>
   );
}

export default function VaporwavePage() {
  return (
    <div className="min-h-screen bg-[#1a0b2e] text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
         <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
               <Scene />
            </Suspense>
            <OrbitControls enableZoom={false} />
         </Canvas>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col min-h-screen pointer-events-none">
         <header className="flex justify-between items-center mb-12 pointer-events-auto">
            <Link href="/" className="text-2xl font-bold text-cyan-400 italic hover:text-pink-500 transition-colors drop-shadow-[2px_2px_0_rgba(255,0,255,0.5)]">
               GEMINI 98
            </Link>
            <div className="text-pink-500 font-mono text-xs">SYSTEM ONLINE</div>
         </header>

         <div className="mt-auto text-center pointer-events-auto">
            <h1 className="text-6xl md:text-9xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)] mb-4">
               AESTHETIC
            </h1>
            <p className="text-xl text-cyan-200 uppercase tracking-[0.5em] mb-8">
               Virtual Reality Experience
            </p>
            <div className="inline-block bg-black/50 backdrop-blur-md border border-pink-500/50 p-4 rounded text-sm font-mono text-pink-300">
               <p>Now Playing: Macintosh Plus - 420</p>
               <div className="w-full bg-cyan-900/50 h-1 mt-2 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-pink-500 animate-pulse"></div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
