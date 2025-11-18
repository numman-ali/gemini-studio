"use client";

import { useState, useEffect } from "react";
import { RetroWindow } from "@/components/retro/RetroWindow";
import { Disc, Folder, FileText, Globe, Cpu, Gamepad, LayoutTemplate, Music, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Minesweeper } from "@/components/retro/apps/Minesweeper";
import { Notepad } from "@/components/retro/apps/Notepad";

export default function RetroPage() {
  const [time, setTime] = useState("");
  const [windows, setWindows] = useState([
    { id: "welcome", title: "Welcome.txt", isOpen: true, zIndex: 10, type: "notepad", content: "Welcome to Gemini OS v1.0.\n\nThis is a simulated environment running directly in your browser.\n\nFeel free to explore the file system." },
    { id: "minesweeper", title: "Minesweeper", isOpen: false, zIndex: 9, type: "minesweeper" },
    { id: "system", title: "System Info", isOpen: false, zIndex: 8, type: "sys", content: "CPU: Neural Quant 9000\nRAM: 128TB\nOS: Gemini/Web\nBuild: 2025.11.18" },
    { id: "trash", title: "Recycle Bin", isOpen: false, zIndex: 7, type: "folder", content: "The bin is empty." },
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
      const maxZ = Math.max(...prev.map(w => w.zIndex));
      return prev.map(w => w.id === id ? { ...w, zIndex: maxZ + 1 } : w);
    });
  };

  const toggleWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: !w.isOpen } : w));
    if (!windows.find(w => w.id === id)?.isOpen) {
      bringToFront(id);
    }
    setStartOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#008080] overflow-hidden font-mono relative select-none">
      {/* Desktop Icons */}
      <div className="p-4 grid gap-6 justify-start justify-items-center w-32 absolute top-0 left-0 bottom-10 z-0 content-start">
        <div className="flex flex-col items-center gap-1 cursor-pointer group" onDoubleClick={() => toggleWindow("welcome")}>
           <FileText className="w-10 h-10 text-white drop-shadow-md" />
           <span className="text-white text-xs bg-[#008080] group-hover:bg-[#000080] px-1 dotted-border text-center">Welcome.txt</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer group" onDoubleClick={() => toggleWindow("system")}>
           <Cpu className="w-10 h-10 text-white drop-shadow-md" />
           <span className="text-white text-xs bg-[#008080] group-hover:bg-[#000080] px-1 text-center">My Computer</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer group" onDoubleClick={() => toggleWindow("minesweeper")}>
           <Gamepad className="w-10 h-10 text-white drop-shadow-md" />
           <span className="text-white text-xs bg-[#008080] group-hover:bg-[#000080] px-1 text-center">Minesweeper</span>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer group" onDoubleClick={() => toggleWindow("trash")}>
           <Trash2 className="w-10 h-10 text-white drop-shadow-md" />
           <span className="text-white text-xs bg-[#008080] group-hover:bg-[#000080] px-1 text-center">Recycle Bin</span>
        </div>
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
          onClose={() => toggleWindow(win.id)}
          zIndex={win.zIndex}
          onFocus={() => bringToFront(win.id)}
          initialPos={{ x: 100 + (i * 40), y: 50 + (i * 40) }}
        >
          {win.type === 'minesweeper' ? (
             <Minesweeper />
          ) : win.type === 'notepad' ? (
             <Notepad />
          ) : (
             <pre className="whitespace-pre-wrap font-mono">{win.content}</pre>
          )}
        </RetroWindow>
      ))}

      {/* Taskbar */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-[#c0c0c0] border-t-2 border-white flex items-center px-1 justify-between z-50">
         <div className="flex items-center space-x-2 h-full py-1">
            <button 
              onClick={() => setStartOpen(!startOpen)}
              className={`h-full px-2 flex items-center space-x-1 border-2 font-bold ${startOpen ? 'bg-gray-400 border-t-black border-l-black border-r-white border-b-white' : 'bg-[#c0c0c0] border-t-white border-l-white border-r-black border-b-black'}`}
            >
               <div className="w-4 h-4 bg-black rounded-full relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-2 h-2 bg-red-500"></div>
                 <div className="absolute top-0 right-0 w-2 h-2 bg-green-500"></div>
                 <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-500"></div>
                 <div className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-500"></div>
               </div>
               <span>Start</span>
            </button>
            
            <div className="w-[2px] h-full bg-gray-400 mx-2 border-l border-white border-r border-gray-500"></div>
            
            {windows.filter(w => w.isOpen).map(w => (
              <button
                key={w.id}
                onClick={() => bringToFront(w.id)}
                className={`h-full px-4 border-2 truncate max-w-[150px] text-xs font-bold flex items-center ${activeId === w.id ? 'bg-gray-300 border-t-black border-l-black border-r-white border-b-white' : 'bg-[#c0c0c0] border-t-white border-l-white border-r-black border-b-black'}`}
              >
                {w.title}
              </button>
            ))}
         </div>
         
         <div className="h-[80%] px-4 bg-[#c0c0c0] border-2 border-t-gray-500 border-l-gray-500 border-r-white border-b-white flex items-center text-xs">
            {time}
         </div>
      </div>

      {/* Start Menu */}
      {startOpen && (
        <div className="absolute bottom-10 left-1 w-48 bg-[#c0c0c0] border-2 border-t-white border-l-white border-r-black border-b-black shadow-xl z-[60] flex flex-col">
           <div className="bg-[#000080] text-white px-2 py-4 font-bold tracking-widest w-8 flex items-end justify-center absolute left-0 top-0 bottom-0">
              <span className="-rotate-90 whitespace-nowrap mb-8">GEMINI 95</span>
           </div>
           <div className="pl-10 py-1 space-y-1">
              <div className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center gap-2" onClick={() => toggleWindow("minesweeper")}>
                 <Gamepad size={16} /> Games
              </div>
              <div className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center gap-2" onClick={() => toggleWindow("welcome")}>
                 <FileText size={16} /> Documents
              </div>
              <div className="border-t border-gray-500 my-1"></div>
              <Link href="/" className="hover:bg-[#000080] hover:text-white px-2 py-1 cursor-pointer flex items-center gap-2">
                 <Disc size={16} /> Shutdown
              </Link>
           </div>
        </div>
      )}
    </div>
  );
}
