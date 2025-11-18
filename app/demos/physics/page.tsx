"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

export default function PhysicsPage() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>(null);
  const [gravity, setGravity] = useState(1);

  useEffect(() => {
    if (!sceneRef.current) return;

    const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      MouseConstraint = Matter.MouseConstraint,
      Mouse = Matter.Mouse,
      World = Matter.World,
      Bodies = Matter.Bodies,
      Composite = Matter.Composite;

    const engine = Engine.create();
    engineRef.current = engine;
    
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false,
        background: '#0f172a',
        pixelRatio: window.devicePixelRatio
      }
    });

    // Boundaries
    const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 60, { isStatic: true, render: { fillStyle: '#334155' } });
    const leftWall = Bodies.rectangle(0, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true, render: { fillStyle: '#334155' } });
    const rightWall = Bodies.rectangle(window.innerWidth, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true, render: { fillStyle: '#334155' } });

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    const handleResize = () => {
       render.canvas.width = window.innerWidth;
       render.canvas.height = window.innerHeight;
       Matter.Body.setPosition(ground, Matter.Vector.create(window.innerWidth / 2, window.innerHeight));
       Matter.Body.setPosition(rightWall, Matter.Vector.create(window.innerWidth, window.innerHeight / 2));
    };
    window.addEventListener('resize', handleResize);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const addShape = (type: 'box' | 'circle' | 'polygon') => {
     if (!engineRef.current) return;
     const x = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
     const y = 50;
     let body;
     const color = `hsl(${Math.random() * 360}, 70%, 60%)`;

     if (type === 'box') {
        body = Matter.Bodies.rectangle(x, y, 50, 50, { render: { fillStyle: color } });
     } else if (type === 'circle') {
        body = Matter.Bodies.circle(x, y, 25, { render: { fillStyle: color } });
     } else {
        body = Matter.Bodies.polygon(x, y, 5, 30, { render: { fillStyle: color } });
     }
     
     Matter.Composite.add(engineRef.current.world, body);
  };

  const updateGravity = (val: number) => {
     setGravity(val);
     if (engineRef.current) {
        engineRef.current.gravity.y = val;
     }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] overflow-hidden relative">
       <div ref={sceneRef} className="absolute inset-0" />
       
       <div className="absolute top-8 left-8 z-10 bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 text-white w-64">
          <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-cyan-400 mb-6 block">← Index</Link>
          <h1 className="text-2xl font-bold mb-6">Physics Lab</h1>
          
          <div className="space-y-4">
             <div className="grid grid-cols-3 gap-2">
                <button onClick={() => addShape('box')} className="bg-blue-600 p-2 rounded hover:bg-blue-500 text-xs font-bold">BOX</button>
                <button onClick={() => addShape('circle')} className="bg-purple-600 p-2 rounded hover:bg-purple-500 text-xs font-bold">BALL</button>
                <button onClick={() => addShape('polygon')} className="bg-pink-600 p-2 rounded hover:bg-pink-500 text-xs font-bold">POLY</button>
             </div>
             
             <div>
                <label className="text-xs font-bold mb-2 block">Gravity ({gravity})</label>
                <input 
                   type="range" min="-2" max="2" step="0.1" 
                   value={gravity} onChange={(e) => updateGravity(Number(e.target.value))}
                   className="w-full accent-cyan-400"
                />
             </div>
             
             <button 
               onClick={() => { if (engineRef.current) Matter.Composite.clear(engineRef.current.world, false, true); }}
               className="w-full border border-red-500 text-red-500 hover:bg-red-500 hover:text-white p-2 rounded text-xs font-bold transition-colors"
             >
                CLEAR WORLD
             </button>
          </div>
       </div>
    </div>
  );
}

