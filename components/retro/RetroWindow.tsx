"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { X, Minus, Maximize, Disc, Folder, FileText, Globe } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  zIndex: number;
  onFocus: () => void;
  initialPos?: { x: number; y: number };
}

export function RetroWindow({ id, title, children, isOpen, onClose, onMinimize, isMinimized, zIndex, onFocus, initialPos = { x: 0, y: 0 } }: WindowProps & { onMinimize?: () => void, isMinimized?: boolean }) {
  const [isMaximized, setIsMaximized] = useState(false);

  if (!isOpen) return null;

  return (
    <motion.div
      drag={!isMaximized}
      dragMomentum={false}
      onMouseDown={onFocus}
      initial={{ scale: 0.8, opacity: 0, x: initialPos.x, y: initialPos.y }}
      animate={isMaximized 
        ? { x: 0, y: 0, scale: 1, opacity: 1, width: "100%", height: "calc(100% - 40px)" } 
        : { scale: 1, opacity: 1, width: 400, height: "auto" }
      }
      exit={{ scale: 0.8, opacity: 0 }}
      style={{ 
        zIndex: isMaximized ? 60 : zIndex,
        display: isMinimized ? 'none' : 'flex'
      }}
      className={`absolute bg-[#c0c0c0] border-t-2 border-l-2 border-white border-r-2 border-b-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] font-mono text-black flex-col ${isMaximized ? 'top-0 left-0' : ''}`}
    >
      {/* Title Bar */}
      <div 
        className="h-8 bg-[#000080] px-2 flex items-center justify-between select-none cursor-default shrink-0"
        onDoubleClick={() => setIsMaximized(!isMaximized)}
      >
        <div className="text-white font-bold truncate text-sm">{title}</div>
        <div className="flex space-x-1" onMouseDown={(e) => e.stopPropagation()}>
          <button 
            onClick={(e) => { e.stopPropagation(); onMinimize?.(); }}
            className="w-5 h-5 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-black flex items-center justify-center active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
          >
            <Minus size={10} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsMaximized(!isMaximized); }}
            className="w-5 h-5 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-black flex items-center justify-center active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
          >
            <Maximize size={10} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="w-5 h-5 bg-[#c0c0c0] border-t border-l border-white border-r border-b border-black flex items-center justify-center active:border-t-black active:border-l-black active:border-r-white active:border-b-white"
          >
            <X size={12} />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-1 flex-1 flex flex-col min-h-0">
        <div className="bg-white text-black p-1 flex-1 overflow-auto font-sans text-sm border border-gray-500 inset-shadow relative">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

