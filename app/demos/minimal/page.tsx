"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MinimalPage() {
  const [text, setText] = useState("HELVETICA");
  const [fontSize, setFontSize] = useState(150);
  const [weight, setWeight] = useState(900);
  const [spacing, setSpacing] = useState(-5);
  const [grid, setGrid] = useState(true);
  const [align, setAlign] = useState<"left" | "center" | "right">("left");

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden flex">
      {/* Sidebar Controls */}
      <div className="w-80 border-r-2 border-black p-8 flex flex-col justify-between z-10 bg-white">
         <div>
            <Link href="/" className="text-sm font-bold uppercase tracking-widest hover:underline mb-12 block">← Index</Link>
            <h2 className="text-2xl font-bold mb-8">Type Engine</h2>
            
            <div className="space-y-6">
               <div>
                  <label className="block text-xs font-bold uppercase mb-2">Content</label>
                  <input 
                     type="text" 
                     value={text} 
                     onChange={(e) => setText(e.target.value.toUpperCase())}
                     className="w-full border-2 border-black p-2 font-bold uppercase text-sm focus:outline-none focus:bg-black focus:text-white transition-colors"
                  />
               </div>
               
               <div>
                  <label className="block text-xs font-bold uppercase mb-2">Size ({fontSize}px)</label>
                  <input 
                     type="range" min="50" max="300" 
                     value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))}
                     className="w-full accent-black"
                  />
               </div>

               <div>
                  <label className="block text-xs font-bold uppercase mb-2">Weight ({weight})</label>
                  <input 
                     type="range" min="100" max="900" step="100"
                     value={weight} onChange={(e) => setWeight(Number(e.target.value))}
                     className="w-full accent-black"
                  />
               </div>

               <div>
                  <label className="block text-xs font-bold uppercase mb-2">Tracking ({spacing}px)</label>
                  <input 
                     type="range" min="-20" max="20" 
                     value={spacing} onChange={(e) => setSpacing(Number(e.target.value))}
                     className="w-full accent-black"
                  />
               </div>

               <div>
                  <label className="block text-xs font-bold uppercase mb-2">Alignment</label>
                  <div className="flex border-2 border-black">
                     {['left', 'center', 'right'].map((a) => (
                        <button 
                           key={a}
                           onClick={() => setAlign(a as any)}
                           className={`flex-1 py-2 text-xs font-bold uppercase ${align === a ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                        >
                           {a}
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>

         <div className="text-xs font-mono">
            <div className="flex justify-between border-b border-black pb-1 mb-1">
               <span>FIG. 01</span>
               <span>SWISS STYLE</span>
            </div>
            <p>Objective clarity through grid systems.</p>
         </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden bg-[#f0f0f0]">
         {grid && (
            <div className="absolute inset-0 pointer-events-none opacity-20" 
                 style={{ backgroundImage: 'linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)', backgroundSize: '50px 50px' }} 
            />
         )}
         
         <div className="absolute top-8 right-8 flex gap-4">
            <button 
               onClick={() => setGrid(!grid)}
               className={`w-4 h-4 border-2 border-black rounded-full ${grid ? 'bg-black' : 'bg-white'}`} 
            />
         </div>

         <motion.div 
            layout
            className="relative z-10 break-words max-w-full"
            style={{ 
               fontSize: `${fontSize}px`, 
               fontWeight: weight, 
               letterSpacing: `${spacing}px`,
               textAlign: align,
               lineHeight: 0.9
            }}
         >
            {text}
         </motion.div>

         {/* Dynamic Rulers */}
         <div className="absolute left-0 top-1/2 w-4 h-[1px] bg-red-500" />
         <div className="absolute right-0 top-1/2 w-4 h-[1px] bg-red-500" />
         <div className="absolute top-0 left-1/2 w-[1px] h-4 bg-red-500" />
         <div className="absolute bottom-0 left-1/2 w-[1px] h-4 bg-red-500" />
      </div>
    </div>
  );
}
