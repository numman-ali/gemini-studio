import React, { useState, useEffect, useRef } from 'react';

interface FaderProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (val: number) => void;
  label?: string;
  height?: number;
}

export const Fader: React.FC<FaderProps> = ({ value, min = 0, max = 100, onChange, label, height = 150 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const getValueFromClientY = (clientY: number) => {
    if (!trackRef.current) return value;
    const rect = trackRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    // 0 at top, height at bottom.
    // Usually fader max is at top.
    // So 0px = max, height = min
    const percent = 1 - (relativeY / rect.height);
    const newValue = min + (percent * (max - min));
    return Math.max(min, Math.min(max, newValue));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    onChange(getValueFromClientY(e.clientY));
    document.body.style.cursor = 'ns-resize';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

    const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    onChange(getValueFromClientY(e.touches[0].clientY));
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    onChange(getValueFromClientY(e.clientY));
  };

  const handleTouchMove = (e: TouchEvent) => {
    // e.preventDefault(); // can block scrolling
    onChange(getValueFromClientY(e.touches[0].clientY));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = 'default';
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleMouseUp);
  };

  useEffect(() => {
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleMouseUp);
      };
  }, []);

  // Visual Position
  const percent = (value - min) / (max - min);

  return (
    <div className="flex flex-col items-center gap-2 select-none h-full">
      <div
        ref={trackRef}
        className="relative w-8 bg-zinc-900 rounded-full border border-zinc-800 shadow-inner cursor-ns-resize"
        style={{ height }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Track Line */}
        <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-1 bg-zinc-800 rounded-full"></div>

        {/* Handle */}
        <div
            className="absolute left-0 w-full h-12 rounded-md bg-gradient-to-b from-zinc-600 to-zinc-800 shadow-[0_4px_6px_rgba(0,0,0,0.5)] border-t border-zinc-500 flex items-center justify-center"
            style={{
                bottom: `${percent * 100}%`,
                transform: 'translateY(50%)', // Center handle on the value point
                marginBottom: 0 // Override
            }}
        >
            <div className="w-full h-[2px] bg-black/50"></div>
        </div>
      </div>
      {label && <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-widest">{label}</span>}
    </div>
  );
};
