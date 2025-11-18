"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function GlitchPage() {
  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden relative">
       <Link href="/" className="fixed top-4 left-4 z-50 mix-blend-exclusion bg-white text-black px-2 font-bold hover:invert">
          ESCAPE
       </Link>

       <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
             <h1 className="text-9xl font-black text-white relative z-10 mix-blend-difference glitch-text" data-text="CORRUPT">
                CORRUPT
             </h1>
             <h1 className="text-9xl font-black text-red-500 absolute top-0 left-0 -ml-2 opacity-70 animate-pulse">
                CORRUPT
             </h1>
             <h1 className="text-9xl font-black text-blue-500 absolute top-0 left-0 ml-2 opacity-70 animate-pulse delay-75">
                CORRUPT
             </h1>
          </div>
       </div>

       {/* Random Glitch Blocks */}
       {[...Array(20)].map((_, i) => (
          <div 
             key={i}
             className="absolute bg-white pointer-events-none"
             style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 200}px`,
                height: `${Math.random() * 10}px`,
                opacity: Math.random() * 0.5,
                animation: `glitch-anim ${Math.random() * 2 + 0.5}s infinite linear alternate-reverse`
             }}
          ></div>
       ))}

       <div className="absolute bottom-10 left-10 max-w-md">
          <p className="text-sm bg-white text-black inline-block px-1 mb-2">SYSTEM FAILURE</p>
          <p className="leading-none text-xs opacity-70">
             0x000000F4 (0x00000003, 0x89F2D100, 0x89F2D274, 0x805D2978)
             <br/>
             BEGINNING DUMP OF PHYSICAL MEMORY
             <br/>
             PHYSICAL MEMORY DUMP COMPLETE.
          </p>
       </div>

       <style jsx>{`
          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
          }
          .glitch-text::before {
            left: 2px;
            text-shadow: -1px 0 #ff00c1;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim 5s infinite linear alternate-reverse;
          }
          .glitch-text::after {
            left: -2px;
            text-shadow: -1px 0 #00fff9;
            clip: rect(44px, 450px, 56px, 0);
            animation: glitch-anim2 5s infinite linear alternate-reverse;
          }
          @keyframes glitch-anim {
            0% { clip: rect(14px, 9999px, 12px, 0); }
            20% { clip: rect(81px, 9999px, 22px, 0); }
            40% { clip: rect(6px, 9999px, 95px, 0); }
            60% { clip: rect(55px, 9999px, 33px, 0); }
            80% { clip: rect(28px, 9999px, 11px, 0); }
            100% { clip: rect(67px, 9999px, 76px, 0); }
          }
          @keyframes glitch-anim2 {
            0% { clip: rect(65px, 9999px, 87px, 0); }
            20% { clip: rect(12px, 9999px, 5px, 0); }
            40% { clip: rect(89px, 9999px, 18px, 0); }
            60% { clip: rect(3px, 9999px, 64px, 0); }
            80% { clip: rect(44px, 9999px, 42px, 0); }
            100% { clip: rect(26px, 9999px, 91px, 0); }
          }
       `}</style>
    </div>
  );
}

