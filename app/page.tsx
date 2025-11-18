"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { demos } from "@/lib/demos";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main ref={containerRef} className="min-h-screen bg-[#030303] text-white selection:bg-white selection:text-black relative overflow-hidden">
      {/* Noise Grain Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none z-50 mix-blend-overlay"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-between p-4 md:p-8 lg:p-12 sticky top-0 z-0">
        <header className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="text-xs font-mono text-neutral-500 tracking-widest mb-2">EST. 2025</span>
            <h1 className="text-xl font-bold tracking-tighter">GEMINI STUDIO</h1>
          </div>
          <div className="text-right">
             <p className="text-xs font-mono text-neutral-500 tracking-widest mb-1">GEMINI 3 PRO ACTIVE</p>
             <div className="flex items-center justify-end gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold">ONLINE</span>
             </div>
          </div>
        </header>

        <div className="relative z-10">
          <h2 className="text-[12vw] leading-[0.85] font-black tracking-tighter mix-blend-difference">
            BUILT WITH<br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2E72FF] via-[#8F52FF] to-[#FF6B6B]">GEMINI 3</span><br/>
            PRO
          </h2>
        </div>

        <div className="grid grid-cols-12 gap-4 text-sm font-medium text-neutral-400 border-t border-neutral-900 pt-6">
           <div className="col-span-6 md:col-span-3">
              (CAPABILITIES)
              <ul className="mt-2 text-neutral-600 font-mono space-y-1">
                 <li>Generative UI</li>
                 <li>Full-Stack Engineering</li>
                 <li>Creative Reasoning</li>
              </ul>
           </div>
           <div className="col-span-6 md:col-span-3">
              (STACK)
              <ul className="mt-2 text-neutral-600 font-mono space-y-1">
                 <li>Powered by Gemini 3 Pro</li>
                 <li>Next.js / React</li>
                 <li>WebGL / Three.js</li>
              </ul>
           </div>
           <div className="col-span-12 md:col-span-6 text-right flex items-end justify-end">
              <p className="max-w-xs text-neutral-500 normal-case">
                 A studio showcasing the raw capabilities of Gemini 3 Pro. Pushing the boundaries of generative code, logic, and design.
              </p>
           </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="relative z-10 bg-[#030303] min-h-screen border-t border-neutral-900">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {demos.map((demo, i) => (
               <Link key={demo.id} href={`/demos/${demo.id}`} className="group relative block border-b md:border-r border-neutral-900 aspect-[4/5] overflow-hidden cursor-none">
                  {/* Background Color Reveal */}
                  <div 
                     className="absolute inset-0 transition-transform duration-700 ease-out translate-y-full group-hover:translate-y-0"
                     style={{ backgroundColor: demo.color }} // Note: Hex colors work best here, Tailwind classes might need adjustment if not mapped
                  />
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                     <div className="flex justify-between items-start overflow-hidden">
                        <span className="text-xs font-mono text-neutral-500 group-hover:text-black transition-colors duration-500">
                           {String(i + 1).padStart(3, '0')}
                        </span>
                        <ArrowUpRight className="w-6 h-6 text-neutral-500 group-hover:text-black transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                     </div>

                     <div>
                        <motion.h3 
                           className="text-4xl font-bold tracking-tight mb-2 text-white group-hover:text-black mix-blend-difference transition-colors duration-500"
                           initial={{ y: 20, opacity: 0 }}
                           whileInView={{ y: 0, opacity: 1 }}
                           transition={{ delay: 0.1 }}
                        >
                           {demo.name}
                        </motion.h3>
                        <p className="text-sm font-mono text-neutral-500 group-hover:text-black/70 transition-colors duration-500 uppercase tracking-widest">
                           {demo.desc}
                        </p>
                     </div>
                  </div>

                  {/* Hover Image/Effect (Optional, could serve fallback) */}
                  <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
               </Link>
            ))}
         </div>
         
         {/* Footer */}
         <div className="p-8 lg:p-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-end">
            <div className="text-[10vw] leading-none font-black tracking-tighter text-neutral-900 select-none">
               GEMINI
            </div>
            <div className="flex gap-8 text-sm font-bold mb-2 md:mb-4">
               <a href="https://github.com/numman-ali/gemini-studio" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-500 transition-colors">GITHUB</a>
               <a href="https://github.com/numman-ali" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-500 transition-colors">AUTHOR</a>
               <a href="/contact" className="hover:text-neutral-500 transition-colors">CONTACT</a>
            </div>
         </div>
      </section>
    </main>
  );
}
