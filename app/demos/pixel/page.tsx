"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { SnakeGame } from "@/components/pixel/SnakeGame";

export default function PixelPage() {
  const [mode, setMode] = useState<'menu' | 'game' | 'paint'>('menu');
  const [pixels, setPixels] = useState<string[]>(Array(64).fill('#000000'));
  const [selectedColor, setSelectedColor] = useState('#ff0000');

  const paintPixel = (index: number) => {
     const newPixels = [...pixels];
     newPixels[index] = selectedColor;
     setPixels(newPixels);
  };

  return (
    <div className="min-h-screen bg-[#2c2137] text-white font-mono image-pixelated relative overflow-hidden flex flex-col">
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
      
      <div className="container mx-auto px-4 py-8 relative z-10 flex-1 flex flex-col">
        <header className="flex justify-between items-center mb-8 border-b-4 border-white pb-4">
           <Link href="/" className="text-2xl uppercase hover:text-yellow-400 cursor-pointer">
             &lt; EXIT
           </Link>
           <div className="text-right">
              <p>CREDITS: 00</p>
              <p>HIGH SCORE: 999999</p>
           </div>
        </header>

        <div className="flex-1 flex items-center justify-center">
           {mode === 'menu' && (
              <div className="flex flex-col items-center justify-center text-center">
                 <div className="w-32 h-32 bg-red-500 mb-8 animate-bounce shadow-[8px_8px_0_0_rgba(0,0,0,0.5)] relative">
                    <div className="absolute top-4 left-4 w-4 h-4 bg-white"></div>
                    <div className="absolute top-4 right-4 w-4 h-4 bg-white"></div>
                    <div className="absolute bottom-4 left-4 w-24 h-4 bg-black"></div>
                 </div>
                 
                 <h1 className="text-6xl md:text-8xl mb-8 text-yellow-400 drop-shadow-[4px_4px_0_#ff0000]">
                    PIXEL WORLD
                 </h1>
                 
                 <div className="flex gap-8">
                    <button 
                      onClick={() => setMode('game')}
                      className="bg-blue-500 text-white text-2xl px-8 py-4 border-4 border-white hover:bg-blue-400 hover:translate-y-1 active:translate-y-2 shadow-[0_8px_0_#1e3a8a] active:shadow-none transition-all"
                    >
                       PLAY SNAKE
                    </button>
                    <button 
                      onClick={() => setMode('paint')}
                      className="bg-green-500 text-white text-2xl px-8 py-4 border-4 border-white hover:bg-green-400 hover:translate-y-1 active:translate-y-2 shadow-[0_8px_0_#15803d] active:shadow-none transition-all"
                    >
                       PIXEL PAINT
                    </button>
                 </div>
              </div>
           )}

           {mode === 'game' && <SnakeGame />}

           {mode === 'paint' && (
              <div className="flex flex-col items-center">
                 <div className="mb-4 flex gap-2">
                    {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#00ffff', '#ff00ff', '#ffffff', '#000000'].map(c => (
                       <button 
                          key={c}
                          onClick={() => setSelectedColor(c)}
                          className={`w-8 h-8 border-2 border-white ${selectedColor === c ? 'scale-125' : ''}`}
                          style={{ backgroundColor: c }}
                       />
                    ))}
                 </div>
                 <div className="grid grid-cols-8 gap-1 border-4 border-white p-1 bg-black">
                    {pixels.map((color, i) => (
                       <div 
                          key={i}
                          onClick={() => paintPixel(i)}
                          className="w-8 h-8 cursor-pointer hover:opacity-80"
                          style={{ backgroundColor: color }}
                       />
                    ))}
                 </div>
                 <button 
                   onClick={() => setMode('menu')}
                   className="mt-8 text-sm hover:text-yellow-400"
                 >
                    &lt; BACK TO MENU
                 </button>
              </div>
           )}
        </div>
      </div>

      <style jsx global>{`
        .image-pixelated {
          image-rendering: pixelated;
        }
      `}</style>
    </div>
  );
}
