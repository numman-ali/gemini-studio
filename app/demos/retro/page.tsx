"use client";

import { useState, useEffect } from "react";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { Disc, FileText, Cpu, Gamepad, Terminal as TerminalIcon, Globe, Palette, Trash2 } from "lucide-react";
import Link from "next/link";
import { Minesweeper } from "@/components/retro/apps/Minesweeper";
import { Notepad } from "@/components/retro/apps/Notepad";
import { Terminal } from "@/components/retro/apps/Terminal";
import { Browser } from "@/components/retro/apps/Browser";
import { Paint } from "@/components/retro/apps/Paint";

type WindowType = 'notepad' | 'minesweeper' | 'sys' | 'folder' | 'terminal' | 'browser' | 'paint';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  type: WindowType;
  content?: string;
}

export default function RetroPage() {
  const [time, setTime] = useState("");
  const [windows, setWindows] = useState<WindowState[]>([
    { id: "welcome", title: "Welcome.txt", isOpen: true, isMinimized: false, zIndex: 10, type: "notepad", content: "Welcome to Gemini OS v1.0.\n\nThis is a simulated environment running directly in your browser.\n\nFeel free to explore the file system." },
    { id: "system", title: "System Info", isOpen: false, isMinimized: false, zIndex: 8, type: "sys", content: "CPU: Neural Quant 9000\nRAM: 128TB\nOS: Gemini/Web\nBuild: 2025.11.18" },
    { id: "trash", title: "Recycle Bin", isOpen: false, isMinimized: false, zIndex: 7, type: "folder", content: "The bin is empty." },
  ]);
  const [activeId, setActiveId] = useState("welcome");
  const [startOpen, setStartOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const bringToFront = (id: string) => {
    setActiveId(id);
    setWindows(prev => {
      const maxZ = Math.max(0, ...prev.map(w => w.zIndex));
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const openApp = (type: WindowType, title?: string, id?: string) => {
    const finalId = id || type + "-" + Date.now();
    const existing = windows.find(w => w.id === finalId);

    if (existing) {
      if (existing.isMinimized) {
        setWindows(prev => prev.map(w => w.id === finalId ? { ...w, isMinimized: false } : w));
      }
      bringToFront(finalId);
      return;
    }

    // New window
    const newWindow: WindowState = {
      id: finalId,
      title: title || type.charAt(0).toUpperCase() + type.slice(1),
      isOpen: true,
      isMinimized: false,
      zIndex: Math.max(0, ...windows.map(w => w.zIndex)) + 1,
      type: type
    };
    setWindows(prev => [...prev, newWindow]);
    setActiveId(finalId);
    setStartOpen(false);
  };

  const closeWindow = (id: string) => {
    // Actually close/remove for dynamic apps, or just hide for persistent system apps if desired.
    // For now, "closing" means setting isOpen=false (which unmounts in RetroWindow if we didn't change it, 
    // but we changed it to use isMinimized. 
    // Wait, if I set isOpen=false, RetroWindow returns null, so state is reset.
    // We want that for "Close".
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false, isMinimized: false } : w));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    setActiveId(""); // No active window
  };

  const toggleFromTaskbar = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (!win) return;

    if (win.isMinimized) {
      // Restore
      setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: false } : w));
      bringToFront(id);
    } else if (activeId === id) {
      // Minimize
      minimizeWindow(id);
    } else {
      // Focus
      bringToFront(id);
    }
  };

  // Render content based on type
  const renderContent = (win: WindowState) => {
    switch (win.type) {
      case 'minesweeper': return <Minesweeper />;
      case 'notepad': return <Notepad initialContent={win.content} />;
      case 'terminal': return <Terminal />;
      case 'browser': return <Browser />;
      case 'paint': return <Paint />;
      default: return <pre className="whitespace-pre-wrap font-mono p-2">{win.content}</pre>;
    }
  };

  return (
    <div className="min-h-screen bg-[#008080] overflow-hidden font-mono relative select-none">
      {/* Desktop Icons */}
      <div className="p-4 grid gap-6 justify-start justify-items-center w-32 absolute top-0 left-0 bottom-10 z-0 content-start">
        <DesktopIcon icon={<FileText className="w-10 h-10 text-white drop-shadow-md" />} label="Welcome.txt" onDoubleClick={() => openApp('notepad', 'Welcome.txt', 'welcome')} />
        <DesktopIcon icon={<Cpu className="w-10 h-10 text-white drop-shadow-md" />} label="My Computer" onDoubleClick={() => openApp('sys', 'System Info', 'system')} />
        <DesktopIcon icon={<Globe className="w-10 h-10 text-white drop-shadow-md" />} label="Internet" onDoubleClick={() => openApp('browser', 'Internet Explorer')} />
        <DesktopIcon icon={<TerminalIcon className="w-10 h-10 text-white drop-shadow-md" />} label="Terminal" onDoubleClick={() => openApp('terminal', 'Command Prompt')} />
        <DesktopIcon icon={<Palette className="w-10 h-10 text-white drop-shadow-md" />} label="Paint" onDoubleClick={() => openApp('paint', 'Paint')} />
        <DesktopIcon icon={<Gamepad className="w-10 h-10 text-white drop-shadow-md" />} label="Minesweeper" onDoubleClick={() => openApp('minesweeper', 'Minesweeper')} />
        <DesktopIcon icon={<Trash2 className="w-10 h-10 text-white drop-shadow-md" />} label="Recycle Bin" onDoubleClick={() => openApp('folder', 'Recycle Bin', 'trash')} />
        
        <Link href="/" className="flex flex-col items-center gap-1 cursor-pointer group mt-auto">
           <Disc className="w-10 h-10 text-white drop-shadow-md" />
           <span className="text-white text-xs bg-[#008080] group-hover:bg-[#000080] px-1 text-center">Shutdown</span>
        </Link>
      </div>

      {/* Windows */}
      {windows.map((win, i) => (
        <RetroWindow
          key={win.id}
          id={win.id}
          title={win.title}
          isOpen={win.isOpen}
          isMinimized={win.isMinimized}
          onClose={() => closeWindow(win.id)}
          onMinimize={() => minimizeWindow(win.id)}
          zIndex={win.zIndex}
          onFocus={() => bringToFront(win.id)}
          initialPos={{ x: 100 + (i * 30), y: 50 + (i * 30) }}
        >
          {renderContent(win)}
        </RetroWindow>
      ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 justify-between z-[1000]">
         <div className="flex items-center space-x-2 h-full py-1 overflow-hidden flex-1">
            <button 
              onClick={() => setStartOpen(!startOpen)}
              className={`h-full px-2 flex items-center space-x-1 border-2 font-bold shrink-0 ${startOpen ? 'bg-gray-400 border-t-black border-l-black border-r-white border-b-white' : 'bg-[#c0c0c0] border-t-white border-l-white border-r-black border-b-black'}`}
            >
               <div className="w-4 h-4 bg-black rounded-full relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-2 h-2 bg-red-500"></div>
                 <div className="absolute top-0 right-0 w-2 h-2 bg-green-500"></div>
                 <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500"></div>
                 <div className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-500"></div>
               </div>
               <span className="hidden sm:inline">Start</span>
            </button>
            
            <div className="w-[2px] h-full bg-gray-400 mx-1 border-l border-white border-r border-gray-500 shrink-0"></div>
            
            <div className="flex items-center space-x-1 overflow-x-auto h-full no-scrollbar">
              {windows.filter(w => w.isOpen).map(w => (
                <button
                  key={w.id}
                  onClick={() => toggleFromTaskbar(w.id)}
                  className={`h-full px-2 border-2 max-w-[150px] min-w-[100px] text-xs font-bold flex items-center gap-2 truncate ${activeId === w.id && !w.isMinimized ? 'bg-gray-300 border-t-black border-l-black border-r-white border-b-white' : 'bg-[#c0c0c0] border-t-white border-l-white border-r-black border-b-black'}`}
                >
                  <WindowIcon type={w.type} />
                  <span className="truncate">{w.title}</span>
                </button>
              ))}
            </div>
         </div>
         
         <div className="h-[80%] px-2 sm:px-4 bg-[#c0c0c0] border-2 border-t-gray-500 border-l-gray-500 border-r-white border-b-white flex items-center text-xs shrink-0 ml-2">
            {time}
         </div>
      </div>

      {/* Start Menu */}
      {startOpen && (
        <div className="absolute bottom-10 left-1 w-64 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black shadow-xl z-[2000] flex">
           <div className="bg-[#000080] text-white w-8 flex items-end justify-center py-2 relative">
              <span className="-rotate-90 whitespace-nowrap absolute bottom-8 font-bold tracking-widest text-lg">GEMINI 95</span>
           </div>
           <div className="flex-1 py-1">
              <StartMenuItem icon={<Globe size={20} />} label="Internet" onClick={() => openApp('browser')} />
              <StartMenuItem icon={<TerminalIcon size={20} />} label="Terminal" onClick={() => openApp('terminal')} />
              <StartMenuItem icon={<Palette size={20} />} label="Paint" onClick={() => openApp('paint')} />
              <StartMenuItem icon={<Gamepad size={20} />} label="Minesweeper" onClick={() => openApp('minesweeper')} />
              <StartMenuItem icon={<FileText size={20} />} label="Notepad" onClick={() => openApp('notepad')} />
              <div className="border-t border-gray-500 my-1 mx-1"></div>
              <StartMenuItem icon={<Cpu size={20} />} label="System Info" onClick={() => openApp('sys', 'System Info', 'system')} />
              <div className="border-t border-gray-500 my-1 mx-1"></div>
              <Link href="/" className="hover:bg-[#000080] hover:text-white px-3 py-2 cursor-pointer flex items-center gap-3">
                 <Disc size={20} /> Shutdown
              </Link>
           </div>
        </div>
      )}
      
      {/* Overlay to close start menu */}
      {startOpen && (
        <div className="fixed inset-0 z-[1500]" onClick={() => setStartOpen(false)} />
      )}
    </div>
  );
}

function DesktopIcon({ icon, label, onDoubleClick }: { icon: React.ReactNode, label: string, onDoubleClick: () => void }) {
  return (
    <div className="flex flex-col items-center gap-1 cursor-pointer group active:opacity-50" onDoubleClick={onDoubleClick}>
       {icon}
       <span className="text-white text-xs bg-[#008080] group-hover:bg-[#000080] px-1 dotted-border text-center line-clamp-2">{label}</span>
    </div>
  )
}

function StartMenuItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div className="hover:bg-[#000080] hover:text-white px-3 py-2 cursor-pointer flex items-center gap-3" onClick={onClick}>
       {icon} <span className="text-sm">{label}</span>
    </div>
  )
}

function WindowIcon({ type }: { type: WindowType }) {
  switch (type) {
    case 'notepad': return <FileText size={14} />;
    case 'minesweeper': return <Gamepad size={14} />;
    case 'terminal': return <TerminalIcon size={14} />;
    case 'browser': return <Globe size={14} />;
    case 'paint': return <Palette size={14} />;
    case 'sys': return <Cpu size={14} />;
    default: return <FileText size={14} />;
  }
}