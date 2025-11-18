"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function AbstractPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: any[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
       init();
    };

    const init = () => {
       particles = [];
       for (let i = 0; i < 150; i++) {
          particles.push({
             x: Math.random() * canvas.width,
             y: Math.random() * canvas.height,
             vx: (Math.random() - 0.5) * 1.5,
             vy: (Math.random() - 0.5) * 1.5,
             size: Math.random() * 3 + 1,
             color: `hsl(${Math.random() * 60 + 200}, 70%, 60%)` // Blues and Purples
          });
       }
    };

    const animate = () => {
       ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trails
       ctx.fillRect(0, 0, canvas.width, canvas.height);

       particles.forEach(p => {
          // Mouse interaction (Repel)
          const dxMouse = p.x - mouse.x;
          const dyMouse = p.y - mouse.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          if (distMouse < 150) {
             const angle = Math.atan2(dyMouse, dxMouse);
             const force = (150 - distMouse) / 150;
             p.vx += Math.cos(angle) * force * 0.5;
             p.vy += Math.sin(angle) * force * 0.5;
          }

          p.x += p.vx;
          p.y += p.vy;

          // Friction
          p.vx *= 0.99;
          p.vy *= 0.99;

          // Keep moving slightly
          if (Math.abs(p.vx) < 0.5) p.vx += (Math.random() - 0.5) * 0.1;
          if (Math.abs(p.vy) < 0.5) p.vy += (Math.random() - 0.5) * 0.1;

          // Bounce
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.fill();
          
          // Connect proximity
          particles.forEach(p2 => {
             const dx = p.x - p2.x;
             const dy = p.y - p2.y;
             const dist = Math.sqrt(dx * dx + dy * dy);
             if (dist < 100) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(100, 150, 255, ${1 - dist/100})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
             }
          });
       });

       animationId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
       mouse.x = e.clientX;
       mouse.y = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    animate();

    return () => {
       window.removeEventListener('resize', resize);
       window.removeEventListener('mousemove', handleMouseMove);
       cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-hidden relative cursor-none">
       <canvas ref={canvasRef} className="absolute inset-0"></canvas>
       
       <div className="absolute top-8 left-8 z-10 mix-blend-difference text-white pointer-events-none">
          <h1 className="text-6xl font-bold mt-4">Generative<br/>Network</h1>
          <p className="mt-4 text-sm opacity-70">Move mouse to interact</p>
       </div>
       
       <Link href="/" className="fixed bottom-8 right-8 text-white z-50 mix-blend-difference font-bold uppercase tracking-widest hover:underline">
          Back to Index
       </Link>
    </div>
  );
}
