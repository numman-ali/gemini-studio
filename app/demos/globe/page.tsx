"use client";

import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

function DataPoints() {
   const points = useMemo(() => {
      const p = [];
      for (let i = 0; i < 200; i++) {
         const lat = (Math.random() - 0.5) * Math.PI;
         const lon = Math.random() * Math.PI * 2;
         const r = 1.02;
         p.push({
            pos: new THREE.Vector3(
               r * Math.cos(lat) * Math.cos(lon),
               r * Math.sin(lat),
               r * Math.cos(lat) * Math.sin(lon)
            ),
            val: Math.random()
         });
      }
      return p;
   }, []);

   return (
      <group>
         {points.map((pt, i) => (
            <mesh key={i} position={pt.pos} lookAt={() => new THREE.Vector3(0,0,0)}>
               <boxGeometry args={[0.02, 0.02, 0.02 + pt.val * 0.2]} />
               <meshBasicMaterial color={`hsl(${200 + pt.val * 60}, 100%, 50%)`} />
            </mesh>
         ))}
      </group>
   );
}

export default function GlobePage() {
  return (
    <div className="h-screen w-full bg-[#0c4a6e] text-white relative overflow-hidden">
       <div className="absolute top-8 left-8 z-10">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-cyan-300">← Index</Link>
          <h1 className="text-4xl font-bold mt-4">Global Data</h1>
          <div className="flex gap-4 mt-4 text-xs font-mono text-cyan-200">
             <div>NODES: 200</div>
             <div>LATENCY: 12ms</div>
             <div>STATUS: LIVE</div>
          </div>
       </div>

       <Canvas className="absolute inset-0" camera={{ position: [0, 0, 3.5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          
          <group>
             <Sphere args={[1, 64, 64]}>
                <meshStandardMaterial 
                   color="#0284c7" 
                   roughness={0.7} 
                   metalness={0.1}
                   wireframe={false}
                />
             </Sphere>
             <Sphere args={[1.001, 32, 32]}>
                <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.1} />
             </Sphere>
             <DataPoints />
          </group>
          
          <OrbitControls autoRotate autoRotateSpeed={0.5} enableZoom={false} />
       </Canvas>
    </div>
  );
}

