"use client";

import { useState, useRef, useEffect } from "react";

export function Paint() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="bg-[#c0c0c0] border-b border-gray-500 p-1 flex items-center gap-2">
         <div className="flex gap-1">
            {['#000000', '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ffffff'].map(c => (
              <button 
                key={c}
                className={`w-6 h-6 border-2 ${color === c ? 'border-black' : 'border-gray-400 inset-shadow'}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
         </div>
         <div className="w-[1px] h-6 bg-gray-500 mx-2"></div>
         <div className="flex items-center gap-1 text-xs">
            <span>Size:</span>
            <input 
              type="range" 
              min="1" 
              max="20" 
              value={brushSize} 
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-20"
            />
         </div>
         <button onClick={clearCanvas} className="ml-auto px-2 py-0.5 text-xs border border-gray-500 bg-gray-200 active:bg-gray-300">
            Clear
         </button>
      </div>
      
      {/* Canvas */}
      <div className="flex-1 bg-gray-400 overflow-hidden relative cursor-crosshair">
         <canvas 
           ref={canvasRef}
           onMouseDown={startDrawing}
           onMouseMove={draw}
           onMouseUp={stopDrawing}
           onMouseLeave={stopDrawing}
           className="bg-white block"
         />
      </div>
    </div>
  );
}
