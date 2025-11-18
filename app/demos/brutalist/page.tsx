"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BrutalistPage() {
  const [news, setNews] = useState<string[]>([]);

  useEffect(() => {
     const headlines = [
        "SYSTEM UPDATE REQUIRED",
        "DATA LEAK DETECTED IN SECTOR 7",
        "KERNEL PANIC: REBOOT IMMINENT",
        "USER_ID: 849230 VERIFIED",
        "MEMORY OVERFLOW AT 0x0004",
        "BANDWIDTH EXCEEDED LIMITS",
        "ENCRYPTION PROTOCOL: FAILED",
        "NULL POINTER EXCEPTION",
        "STACK TRACE DUMPING...",
        "BINARY SEQUENCE INITIATED"
     ];

     const interval = setInterval(() => {
        setNews(prev => [headlines[Math.floor(Math.random() * headlines.length)], ...prev].slice(0, 20));
     }, 800);

     return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden flex flex-col">
      {/* Header */}
      <header className="border-b-4 border-black p-4 md:p-8 flex justify-between items-start sticky top-0 bg-[#f0f0f0] z-50">
        <h1 className="text-6xl md:text-8xl font-black font-sans uppercase leading-[0.8] tracking-tighter">
          RAW<br/>DATA
        </h1>
        <Link href="/" className="bg-black text-white text-xl font-bold px-6 py-3 hover:bg-red-600 transition-colors uppercase border-4 border-transparent hover:border-black">
          Exit
        </Link>
      </header>

      {/* Marquee */}
      <div className="border-b-4 border-black bg-yellow-400 overflow-hidden py-4">
        <motion.div 
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
          className="whitespace-nowrap text-4xl font-bold uppercase"
        >
          Function over form • Brutal honesty • Raw aesthetics • No shadow • No gradient • Just content • 
          Function over form • Brutal honesty • Raw aesthetics • No shadow • No gradient • Just content • 
        </motion.div>
      </div>

      <div className="flex-1 grid md:grid-cols-2">
         {/* Live Feed */}
         <div className="border-b-4 md:border-b-0 md:border-r-4 border-black p-8 overflow-hidden bg-white">
            <h2 className="text-4xl font-black uppercase mb-8 border-b-4 border-black pb-4">Live Feed</h2>
            <div className="font-mono space-y-2 font-bold text-sm md:text-base">
               {news.map((item, i) => (
                  <div key={i} className="border-b border-gray-300 pb-1">
                     <span className="mr-4">{new Date().toLocaleTimeString()}</span>
                     {item}
                  </div>
               ))}
            </div>
         </div>

         {/* Interaction Area */}
         <div className="p-8 bg-blue-600 text-white flex flex-col justify-between">
            <div>
               <h2 className="text-6xl font-black uppercase mb-4">Manifesto</h2>
               <p className="text-xl font-bold leading-tight mb-8">
                 WE REJECT THE SMOOTH. WE REJECT THE BLUR. WE EMBRACE THE HARD EDGE.
               </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <button className="bg-white text-black border-4 border-black p-8 text-2xl font-black hover:bg-black hover:text-white transition-colors uppercase shadow-[8px_8px_0_black] active:shadow-none active:translate-x-2 active:translate-y-2">
                  YES
               </button>
               <button className="bg-black text-white border-4 border-white p-8 text-2xl font-black hover:bg-white hover:text-black transition-colors uppercase shadow-[8px_8px_0_white] active:shadow-none active:translate-x-2 active:translate-y-2">
                  NO
               </button>
            </div>
         </div>
      </div>

      <footer className="p-8 bg-black text-white text-center border-t-4 border-black">
         <p className="text-xl font-bold uppercase">
            © 2025 GEMINI DESIGN SYSTEMS. ALL RIGHTS RESERVED.
         </p>
      </footer>
    </div>
  );
}
