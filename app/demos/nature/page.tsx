"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function FractalTree() {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const [mouse, setMouse] = useState({ x: 0, y: 0 });

   useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Resize
      const resize = () => {
         const parent = canvas.parentElement;
         if (parent) {
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
         }
      };
      window.addEventListener('resize', resize);
      resize();

      const drawTree = (startX: number, startY: number, len: number, angle: number, branchWidth: number) => {
         ctx.beginPath();
         ctx.save();
         ctx.strokeStyle = `hsl(${120 + len}, 40%, ${20 + len/3}%)`;
         ctx.fillStyle = `hsl(${120 + len}, 40%, ${20 + len/3}%)`;
         ctx.lineWidth = branchWidth;
         ctx.translate(startX, startY);
         ctx.rotate(angle * Math.PI/180);
         ctx.moveTo(0, 0);
         ctx.lineTo(0, -len);
         ctx.stroke();

         if (len < 10) {
            // Leaves
            ctx.beginPath();
            ctx.arc(0, -len, 5, 0, Math.PI/2);
            ctx.fillStyle = `hsl(${Math.random() * 60 + 80}, 70%, 60%)`; // Random green/yellow
            ctx.fill();
            ctx.restore();
            return;
         }

         // Dynamic angle based on mouse x (normalized 0-1)
         const dynamicAngle = (mouse.x / window.innerWidth) * 40 + 10;

         drawTree(0, -len, len * 0.75, angle + dynamicAngle, branchWidth * 0.7);
         drawTree(0, -len, len * 0.75, angle - dynamicAngle, branchWidth * 0.7);
         
         ctx.restore();
      };

      let frameId: number;
      const animate = () => {
         ctx.clearRect(0, 0, canvas.width, canvas.height);
         // Start tree from bottom center
         drawTree(canvas.width / 2, canvas.height, canvas.height / 4, 0, 15);
         // frameId = requestAnimationFrame(animate); // Only re-render on mouse move for performance? No, let's animate slightly
      };
      animate();

      const handleMouseMove = (e: MouseEvent) => {
         setMouse({ x: e.clientX, y: e.clientY });
         animate();
      };
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
         window.removeEventListener('mousemove', handleMouseMove);
         window.removeEventListener('resize', resize);
      };
   }, [mouse]);

   return <canvas ref={canvasRef} className="w-full h-full" />;
}

export default function NaturePage() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);

  return (
    <div ref={ref} className="min-h-[200vh] bg-[#e8f3e8] text-[#2f3e2f] font-serif overflow-hidden">
      <Link href="/" className="fixed top-8 left-8 z-50 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm hover:bg-white transition-colors">
         Back to Garden
      </Link>

      <div className="relative h-screen overflow-hidden flex items-center justify-center">
         {/* Parallax Layers */}
         <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-[#e8f3e8]"></div>
            <div className="absolute top-20 right-20 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50"></div>
         </motion.div>

         {/* Fractal Tree Container */}
         <div className="absolute inset-0 z-10 pointer-events-none opacity-60 mix-blend-multiply">
             <FractalTree />
         </div>

         <motion.div style={{ y: textY }} className="relative z-20 text-center p-8">
            <h1 className="text-8xl md:text-9xl font-light text-[#1a2f1a] mb-4 tracking-tight">
               Breathe.
            </h1>
            <p className="text-2xl md:text-3xl text-[#4a5f4a] italic">
               Move your mouse to grow.
            </p>
         </motion.div>

         {/* Foreground Leaves/Elements */}
         <div className="absolute bottom-0 left-0 w-full h-64 bg-[url('https://www.transparenttextures.com/patterns/forest.png')] opacity-20 pointer-events-none z-20"></div>
      </div>

      <div className="relative z-30 bg-[#e8f3e8] py-32 shadow-[0_-50px_100px_#e8f3e8]">
         <div className="container mx-auto px-8 max-w-3xl">
            <p className="text-3xl leading-relaxed mb-16 indent-12">
               The digital world is harsh, angular, and binary. Nature is soft, chaotic, and analog. 
               We strive to bring the imperfection of the leaf to the pixel.
            </p>
            
            <div className="grid grid-cols-2 gap-8 mb-16">
               <div className="aspect-[3/4] bg-[#dbe9db] rounded-t-[100px] relative overflow-hidden group hover:bg-[#ccebcc] transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center text-[#2f3e2f] opacity-20 text-9xl transition-transform group-hover:scale-110 duration-1000">✿</div>
               </div>
               <div className="aspect-[3/4] bg-[#cfdfcf] rounded-b-[100px] mt-16 relative overflow-hidden group hover:bg-[#bfcfbf] transition-colors">
                  <div className="absolute inset-0 flex items-center justify-center text-[#2f3e2f] opacity-20 text-9xl transition-transform group-hover:scale-110 duration-1000">⚘</div>
               </div>
            </div>
            
            <p className="text-xl leading-loose text-gray-600">
               Listen to the wind. Watch the light filter through the canopy. 
               There is no grid here. Only growth.
            </p>
         </div>
      </div>
    </div>
  );
}
