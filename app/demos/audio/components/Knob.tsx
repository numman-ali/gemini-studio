import React, { useState, useEffect, useRef } from 'react';

interface KnobProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  label?: string;
  size?: number;
}

export const Knob: React.FC<KnobProps> = ({ value, min = 0, max = 100, onChange, label, size = 64 }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Use refs for drag state to avoid stale closures in event listeners
  const dragStartRef = useRef({ y: 0, value: 0 });

  // Calculate rotation based on value (-135deg to +135deg)
  const percent = (value - min) / (max - min);
  const angle = -135 + (percent * 270);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartRef.current = { y: e.clientY, value: value };
    document.body.style.cursor = 'ns-resize';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    dragStartRef.current = { y: e.touches[0].clientY, value: value };
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const deltaY = dragStartRef.current.y - e.clientY;
    updateValue(deltaY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    const deltaY = dragStartRef.current.y - e.touches[0].clientY;
    updateValue(deltaY);
  };

  const updateValue = (deltaY: number) => {
    // Sensitivity: 150px = full range
    const range = max - min;
    const deltaValue = (deltaY / 150) * range;
    let newValue = dragStartRef.current.value + deltaValue;
    newValue = Math.max(min, Math.min(max, newValue));
    onChange(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleMouseUp);
  };

  // Cleanup listeners if component unmounts while dragging
  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <div
        className="relative rounded-full bg-zinc-800 shadow-lg border border-zinc-700 cursor-ns-resize group"
        style={{ width: size, height: size }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Outer Ring/Tick Marks */}
        <div className="absolute inset-0 rounded-full border-2 border-zinc-600 opacity-20 pointer-events-none"></div>

        {/* Knob Body */}
        <div
            className="absolute inset-1 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-inner flex items-center justify-center transition-transform duration-75 ease-out"
            style={{ transform: `rotate(${angle}deg)` }}
        >
           {/* Indicator Line */}
           <div className="w-1 h-1/2 bg-zinc-900 absolute top-0 origin-bottom flex justify-center pt-1">
               <div className={`w-1 h-3 rounded-full ${percent > 0.8 ? 'bg-pink-500 shadow-[0_0_5px_#ec4899]' : 'bg-cyan-400 shadow-[0_0_5px_#22d3ee]'}`}></div>
           </div>
        </div>
      </div>
      {label && <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{label}</span>}
    </div>
  );
};
