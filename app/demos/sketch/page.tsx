"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Eraser, Pen, Trash2, Download } from "lucide-react";

export default function SketchPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Set canvas size
    const parent = canvas.parentElement;
    if (parent) {
       canvas.width = parent.clientWidth;
       canvas.height = parent.clientHeight;
       // Fill white
       ctx.fillStyle = "white";
       ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const handleResize = () => {
       if (parent) {
         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
         canvas.width = parent.clientWidth;
         canvas.height = parent.clientHeight;
         ctx.putImageData(imageData, 0, 0);
       }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const { offsetX, offsetY } = getCoordinates(e, canvas);
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { offsetX, offsetY } = getCoordinates(e, canvas);
    
    ctx.lineTo(offsetX, offsetY);
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? 20 : lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.closePath();
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      return {
        offsetX: e.touches[0].clientX - rect.left,
        offsetY: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        offsetX: (e as React.MouseEvent).nativeEvent.offsetX,
        offsetY: (e as React.MouseEvent).nativeEvent.offsetY
      };
    }
  };

  const clearCanvas = () => {
     const canvas = canvasRef.current;
     if (!canvas) return;
     const ctx = canvas.getContext("2d");
     if (!ctx) return;
     ctx.fillStyle = "white";
     ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadCanvas = () => {
     const canvas = canvasRef.current;
     if (!canvas) return;
     const link = document.createElement('a');
     link.download = 'sketch.png';
     link.href = canvas.toDataURL();
     link.click();
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans overflow-hidden relative">
      {/* Paper Texture */}
      <svg className="absolute inset-0 w-full h-full opacity-50 pointer-events-none z-0">
         <filter id="paper">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
            <feDiffuseLighting in="noise" lightingColor="white" surfaceScale="2">
               <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
         </filter>
         <rect width="100%" height="100%" filter="url(#paper)" />
      </svg>

      <div className="relative z-10 container mx-auto px-8 py-8 h-screen flex flex-col">
         <header className="flex justify-between items-center mb-8 shrink-0">
            <Link href="/" className="text-2xl font-handwriting hover:underline decoration-wavy decoration-2">
               ← Index
            </Link>
            <div className="flex gap-4 items-center">
               <div className="font-handwriting text-xl">Tools:</div>
               <button onClick={() => setTool('pen')} className={`p-2 rounded-full border-2 border-black ${tool === 'pen' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                  <Pen size={20} />
               </button>
               <button onClick={() => setTool('eraser')} className={`p-2 rounded-full border-2 border-black ${tool === 'eraser' ? 'bg-black text-white' : 'hover:bg-gray-100'}`}>
                  <Eraser size={20} />
               </button>
               <input 
                  type="color" 
                  value={color} 
                  onChange={(e) => setColor(e.target.value)}
                  className="w-10 h-10 border-2 border-black rounded-full overflow-hidden cursor-pointer"
               />
               <input 
                  type="range" 
                  min="1" max="20" 
                  value={lineWidth} 
                  onChange={(e) => setLineWidth(parseInt(e.target.value))}
                  className="w-24 accent-black"
               />
               <div className="w-px h-8 bg-black mx-2"></div>
               <button onClick={clearCanvas} className="p-2 rounded-full border-2 border-black hover:bg-red-100 text-red-600">
                  <Trash2 size={20} />
               </button>
               <button onClick={downloadCanvas} className="p-2 rounded-full border-2 border-black hover:bg-green-100 text-green-600">
                  <Download size={20} />
               </button>
            </div>
         </header>

         <main className="flex-1 relative flex gap-8 pb-8 min-h-0">
            <div className="w-1/3 shrink-0 flex flex-col justify-center">
               <h1 className="text-7xl md:text-8xl font-black mb-8 tracking-tighter relative inline-block">
                  Rough
                  <svg className="absolute -bottom-4 left-0 w-full h-6" viewBox="0 0 200 20">
                     <path d="M0 10 Q 50 20 100 10 T 200 10" fill="none" stroke="red" strokeWidth="4" />
                  </svg>
               </h1>
               <h1 className="text-7xl md:text-8xl font-black mb-12 tracking-tighter">
                  Drafts.
               </h1>
               
               <p className="text-2xl font-handwriting leading-relaxed mb-12 -rotate-1">
                  Sometimes the unfinished idea is more powerful than the polished product.
                  Embrace the messy lines.
               </p>
            </div>

            <div className="flex-1 relative h-full">
               <motion.div 
                 className="w-full h-full border-4 border-black bg-white shadow-xl relative overflow-hidden cursor-crosshair"
                 initial={{ rotate: 1 }}
                 whileHover={{ rotate: 0 }}
               >
                  <canvas 
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="absolute inset-0 w-full h-full touch-none"
                  />
               </motion.div>
               
               {/* Hand drawn arrow */}
               <svg className="absolute -bottom-10 -left-10 w-32 h-32 text-black pointer-events-none" viewBox="0 0 100 100">
                  <path d="M80 10 Q 50 50 20 80 M 20 80 L 40 70 M 20 80 L 30 60" fill="none" stroke="currentColor" strokeWidth="2" />
               </svg>
            </div>
         </main>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
        .font-handwriting {
          font-family: 'Patrick Hand', cursive;
        }
      `}</style>
    </div>
  );
}
