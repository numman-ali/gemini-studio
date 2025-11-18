"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function FractalPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: -0.5, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const render = () => {
       const w = canvas.width;
       const h = canvas.height;
       const imgData = ctx.createImageData(w, h);
       const data = imgData.data;

       for (let x = 0; x < w; x++) {
          for (let y = 0; y < h; y++) {
             let a = (x - w / 2) / (0.5 * zoom * w) + pan.x;
             let b = (y - h / 2) / (0.5 * zoom * h) + pan.y;
             
             let ca = a;
             let cb = b;
             
             let n = 0;
             while (n < 100) {
                let aa = a * a - b * b;
                let bb = 2 * a * b;
                a = aa + ca;
                b = bb + cb;
                if (a * a + b * b > 16) break;
                n++;
             }

             const pix = (x + y * w) * 4;
             if (n === 100) {
                data[pix] = 0;
                data[pix + 1] = 0;
                data[pix + 2] = 0;
                data[pix + 3] = 255;
             } else {
                // Color palette
                data[pix] = n * 10;     // R
                data[pix + 1] = n * 5;  // G
                data[pix + 2] = n * 2;  // B
                data[pix + 3] = 255;
             }
          }
       }
       ctx.putImageData(imgData, 0, 0);
    };

    const resize = () => {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
       render();
    };
    
    window.addEventListener('resize', resize);
    resize();

    return () => {
       window.removeEventListener('resize', resize);
    };
  }, [zoom, pan]);

  const handleWheel = (e: React.WheelEvent) => {
     const scale = e.deltaY > 0 ? 0.9 : 1.1;
     setZoom(z => z * scale);
  };

  return (
    <div className="min-h-screen bg-black overflow-hidden relative" onWheel={handleWheel}>
       <canvas ref={canvasRef} className="absolute inset-0" />
       
       <div className="absolute top-8 left-8 z-10 bg-black/50 backdrop-blur text-green-500 p-6 border border-green-900 rounded-lg font-mono">
          <Link href="/" className="text-xs hover:underline mb-4 block">← INDEX</Link>
          <h1 className="text-xl font-bold mb-2">MANDELBROT SET</h1>
          <div className="text-xs space-y-1">
             <p>ZOOM: {zoom.toFixed(2)}x</p>
             <p>POS: {pan.x.toFixed(4)}, {pan.y.toFixed(4)}</p>
             <p className="mt-4 text-white/50">SCROLL TO ZOOM</p>
          </div>
       </div>
    </div>
  );
}

