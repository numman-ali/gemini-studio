"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Menu, MoreHorizontal } from "lucide-react";

export default function NeumorphismPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
       interval = setInterval(() => {
          setProgress(p => (p >= 100 ? 0 : p + 0.5));
       }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-[#e0e5ec] text-[#4a4a4a] flex items-center justify-center p-8 selection:bg-gray-300">
      <Link href="/" className="fixed top-8 left-8 px-6 py-3 rounded-full bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198),-9px_-9px_16px_rgba(255,255,255,0.5)] hover:shadow-[inset_9px_9px_16px_rgb(163,177,198),inset_-9px_-9px_16px_rgba(255,255,255,0.5)] transition-all font-bold text-sm uppercase tracking-wider z-50 text-gray-500">
         Back
      </Link>

      <div className="w-full max-w-sm">
        <div className="rounded-[3rem] bg-[#e0e5ec] shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] p-8 relative">
           {/* Top Controls */}
           <div className="flex justify-between mb-8 text-gray-400">
              <button className="w-12 h-12 rounded-full bg-[#e0e5ec] shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] flex items-center justify-center active:scale-95 transition-all">
                 <Menu size={20} />
              </button>
              <div className="uppercase text-xs font-bold tracking-widest pt-4">Playing Now</div>
              <button className="w-12 h-12 rounded-full bg-[#e0e5ec] shadow-[5px_5px_10px_#bebebe,-5px_-5px_10px_#ffffff] hover:shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] flex items-center justify-center active:scale-95 transition-all">
                 <MoreHorizontal size={20} />
              </button>
           </div>

           {/* Album Art */}
           <div className="w-64 h-64 mx-auto mb-8 rounded-full bg-[#e0e5ec] shadow-[9px_9px_16px_rgb(163,177,198),-9px_-9px_16px_rgba(255,255,255,0.5)] flex items-center justify-center relative border-[8px] border-[#e0e5ec]">
              <div className={`w-full h-full rounded-full overflow-hidden ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}>
                 <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-[#e0e5ec] shadow-inner"></div>
                 </div>
              </div>
              <div className="absolute w-6 h-6 rounded-full bg-[#e0e5ec] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[inset_2px_2px_5px_#bebebe,inset_-2px_-2px_5px_#ffffff]"></div>
           </div>
           
           <h2 className="text-2xl font-bold text-center mb-1 text-gray-600">Glass Animals</h2>
           <p className="text-center text-gray-400 mb-8 text-sm">Heat Waves</p>

           {/* Progress */}
           <div className="mb-2 flex justify-between text-xs text-gray-400 font-bold">
              <span>{Math.floor(progress / 100 * 3.5)}:{Math.floor((progress / 100 * 210) % 60).toString().padStart(2, '0')}</span>
              <span>3:30</span>
           </div>
           <div className="h-4 rounded-full bg-[#e0e5ec] shadow-[inset_5px_5px_10px_#bebebe,inset_-5px_-5px_10px_#ffffff] relative mb-10 overflow-hidden cursor-pointer" onClick={() => setProgress(Math.random() * 100)}>
              <div className="absolute top-0 left-0 bottom-0 bg-blue-400 rounded-full" style={{ width: `${progress}%` }}></div>
           </div>

           {/* Controls */}
           <div className="flex justify-center items-center gap-8">
              <button className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center text-gray-500 active:scale-95 transition-all">
                 <SkipBack size={24} fill="currentColor" />
              </button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-20 h-20 rounded-full bg-[#e0e5ec] flex items-center justify-center text-blue-500 active:scale-95 transition-all ${isPlaying ? 'shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff]' : 'shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff]'}`}
              >
                 {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
              </button>
              <button className="w-16 h-16 rounded-full bg-[#e0e5ec] shadow-[6px_6px_12px_#bebebe,-6px_-6px_12px_#ffffff] hover:shadow-[inset_6px_6px_12px_#bebebe,inset_-6px_-6px_12px_#ffffff] flex items-center justify-center text-gray-500 active:scale-95 transition-all">
                 <SkipForward size={24} fill="currentColor" />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
