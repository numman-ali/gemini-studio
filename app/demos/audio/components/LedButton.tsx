import React from 'react';

interface LedButtonProps {
  active: boolean;
  onClick: () => void;
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'pink' | 'cyan';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const colors = {
  red: 'bg-red-500 shadow-[0_0_10px_#ef4444]',
  green: 'bg-green-500 shadow-[0_0_10px_#22c55e]',
  blue: 'bg-blue-500 shadow-[0_0_10px_#3b82f6]',
  yellow: 'bg-yellow-500 shadow-[0_0_10px_#eab308]',
  pink: 'bg-pink-500 shadow-[0_0_10px_#ec4899]',
  cyan: 'bg-cyan-500 shadow-[0_0_10px_#06b6d4]',
};

const sizes = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16'
};

export const LedButton: React.FC<LedButtonProps> = ({ active, onClick, color = 'pink', label, size = 'md', className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative group flex flex-col items-center gap-1 outline-none
        ${className}
      `}
    >
      <div className={`
        ${sizes[size]} rounded-md transition-all duration-100 border-b-4 active:border-b-0 active:translate-y-1
        ${active
            ? `bg-zinc-700 border-zinc-800`
            : 'bg-zinc-800 border-zinc-950 hover:bg-zinc-700'}
      `}>
        {/* The LED */}
        <div className={`
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 rounded-sm transition-all duration-75
            ${active ? colors[color] + ' opacity-100' : 'bg-zinc-900 opacity-50'}
        `}></div>
      </div>
      {label && <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">{label}</span>}
    </button>
  );
};
