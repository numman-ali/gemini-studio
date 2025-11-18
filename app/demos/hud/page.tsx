"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function HUDPage() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scans, setScans] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
     setMounted(true);
     const handleMove = (e: MouseEvent) => {
        setMouse({ x: e.clientX, y: e.clientY });
     };
     window.addEventListener('mousemove', handleMove);
     
     // Generate random scans
     const interval = setInterval(() => {
        setScans(prev => [
           { id: Date.now(), x: Math.random() * 80 + 10, y: Math.random() * 80 + 10, size: Math.random() * 40 + 20 },
           ...prev.slice(0, 4)
        ]);
     }, 2000);

     return () => {
        window.removeEventListener('mousemove', handleMove);
        clearInterval(interval);
     };
  }, []);

  // Safe distance calculation
  const getDistance = () => {
     if (!mounted || typeof window === 'undefined') return 0;
     return Math.sqrt(Math.pow(mouse.x - window.innerWidth/2, 2) + Math.pow(mouse.y - window.innerHeight/2, 2));
  };

  return (
    <div className="min-h-screen bg-black text-cyan-400 font-mono relative overflow-hidden cursor-crosshair">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-20 pointer-events-none"></div>
      
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,black_100%)] pointer-events-none z-10"></div>

      {/* Scanlines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20"></div>

      {/* Crosshair following mouse */}
      <div 
         className="fixed pointer-events-none z-50"
         style={{ left: mouse.x, top: mouse.y, transform: 'translate(-50%, -50%)' }}
      >
         <div className="relative w-20 h-20 border border-cyan-500/50 rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-cyan-500"></div>
            <div className="absolute top-0 w-px h-4 bg-cyan-500"></div>
            <div className="absolute bottom-0 w-px h-4 bg-cyan-500"></div>
            <div className="absolute left-0 h-px w-4 bg-cyan-500"></div>
            <div className="absolute right-0 h-px w-4 bg-cyan-500"></div>
            <div className="absolute -right-12 -top-4 text-[10px] bg-cyan-900/80 px-1">
               X: {mouse.x}<br/>Y: {mouse.y}
            </div>
         </div>
      </div>

      {/* Random Targets */}
      {scans.map(scan => (
         <motion.div
            key={scan.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute border border-red-500/50 rounded-sm pointer-events-none z-30"
            style={{ left: `${scan.x}%`, top: `${scan.y}%`, width: scan.size, height: scan.size }}
         >
            <div className="absolute -top-4 left-0 text-[8px] text-red-500 bg-red-900/20 px-1">UNKNOWN</div>
         </motion.div>
      ))}

      <div className="container mx-auto h-screen relative z-30 p-8 flex flex-col">
         <header className="flex justify-between items-start border-b border-cyan-900 pb-4 mb-8">
            <div className="flex gap-4">
               <Link href="/" className="border border-cyan-500/50 px-4 py-1 hover:bg-cyan-500/20 transition-colors text-xs tracking-widest">
                  SYSTEM_EXIT
               </Link>
               <div className="text-xs tracking-widest animate-pulse text-red-500 bg-red-900/20 px-2 border border-red-900">
                  WARNING: HOSTILE ENVIRONMENT
               </div>
            </div>
            <div className="text-right">
               <h1 className="text-2xl font-bold tracking-widest">MK-VII</h1>
               <p className="text-xs text-cyan-700">TACTICAL INTERFACE</p>
            </div>
         </header>

         <div className="flex-1 grid grid-cols-12 gap-8">
            {/* Left Column */}
            <div className="col-span-3 flex flex-col gap-4">
               <div className="border border-cyan-500/30 bg-cyan-900/10 p-4 flex-1 relative">
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500"></div>
                  
                  <h3 className="text-xs mb-4 border-b border-cyan-900 pb-1">DIAGNOSTICS</h3>
                  <ul className="text-xs space-y-2 opacity-70 font-bold">
                     <li className="flex justify-between"><span>CORE_TEMP</span> <span className="text-yellow-500">450K</span></li>
                     <li className="flex justify-between"><span>MEM_USAGE</span> <span>124TB</span></li>
                     <li className="flex justify-between"><span>NETWORK</span> <span className="text-green-500">SECURE</span></li>
                     <li className="flex justify-between text-red-400"><span>SHIELD</span> <span className="animate-pulse">CRITICAL</span></li>
                  </ul>
               </div>
               <div className="border border-cyan-500/30 h-32 p-4 bg-[linear-gradient(45deg,transparent_25%,rgba(6,182,212,0.1)_25%,rgba(6,182,212,0.1)_50%,transparent_50%,transparent_75%,rgba(6,182,212,0.1)_75%,rgba(6,182,212,0.1)_100%)] bg-[length:10px_10px] relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 h-1 bg-cyan-500 animate-[ping_2s_infinite] w-full"></div>
               </div>
            </div>

            {/* Center Column - Main Display */}
            <div className="col-span-6 flex items-center justify-center relative">
               {/* Concentric Circles */}
               <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-500/20 flex items-center justify-center">
                  <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                     className="w-[350px] h-[350px] rounded-full border border-dashed border-cyan-500/40"
                  ></motion.div>
                  <motion.div 
                     animate={{ rotate: -360 }}
                     transition={{ duration: 15, ease: "linear", repeat: Infinity }}
                     className="absolute w-[300px] h-[300px] rounded-full border-t-2 border-b-2 border-cyan-500/60"
                  ></motion.div>
                  <div className="absolute w-[100px] h-[100px] rounded-full bg-cyan-500/10 blur-md animate-pulse"></div>
               </div>
               
               <div className="text-center relative z-10 bg-black/80 p-4 backdrop-blur-sm border border-cyan-500/50 rounded-lg">
                  <h2 className="text-4xl font-bold mb-2 tracking-widest">LOCKED</h2>
                  <p className="text-xs text-cyan-300">DIST: {getDistance().toFixed(2)}m</p>
               </div>
            </div>

            {/* Right Column */}
            <div className="col-span-3 flex flex-col gap-4">
               <div className="border border-cyan-500/30 bg-cyan-900/10 p-4 h-48">
                  <h3 className="text-xs mb-4 border-b border-cyan-900 pb-1">WAVEFORM</h3>
                  <div className="flex items-end justify-between h-24 gap-1">
                     {[...Array(20)].map((_, i) => (
                        <motion.div 
                           key={i}
                           animate={{ height: ["10%", "80%", "30%"] }}
                           transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05, repeatType: "reverse" }}
                           className="w-full bg-cyan-500/50"
                        />
                     ))}
                  </div>
               </div>
               <div className="flex-1 border border-cyan-500/30 p-4 flex flex-col justify-end relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
                   <p className="text-xs leading-relaxed opacity-80 font-mono relative z-10">
                      &gt; INIT_SEQUENCE_START<br/>
                      &gt; UPLOADING_PACKET...<br/>
                      &gt; ERROR_CORRECTION<br/>
                      &gt; COMPLETE<br/>
                      <span className="animate-pulse">&gt; WAITING_FOR_INPUT_</span>
                   </p>
               </div>
            </div>
         </div>

         <footer className="border-t border-cyan-900 pt-4 flex justify-between text-xs opacity-50">
            <span>STARK INDUSTRIES</span>
            <span>V 4.0.2</span>
         </footer>
      </div>
    </div>
  );
}
