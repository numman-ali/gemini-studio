"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const commands = {
  help: "Available commands: about, projects, contact, clear, exit, hack, status, ls",
  about: "Identity: Gemini Protocol\nStatus: Online\nMission: Digital Domination",
  projects: "Scanning database...\n> Project Alpha [CLASSIFIED]\n> Neural Net V2 [ACTIVE]\n> Void Walker [COMPLETE]",
  contact: "Encrypted Channel Open.\nSignal Frequency: 443Hz",
  status: "System Integrity: 100%\nFirewall: ACTIVE\nTrace: 0%",
  ls: "bin\nusr\netc\nhome\nvar\ntmp",
  exit: "Terminating session..."
};

export default function CyberpunkPage() {
  const [history, setHistory] = useState<string[]>(["Initializing Gemini OS...", "Connection Established.", "Type 'help' for instructions."]);
  const [input, setInput] = useState("");
  const [isHacking, setIsHacking] = useState(false);
  const [hackCode, setHackCode] = useState("");
  const [hackInput, setHackInput] = useState("");
  const [hackAttempts, setHackAttempts] = useState(5);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Matrix Rain Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    const handleResize = () => {
       canvas.width = window.innerWidth;
       canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isHacking]);

  const startHack = () => {
     const code = Math.floor(Math.random() * 9000 + 1000).toString();
     setHackCode(code);
     setIsHacking(true);
     setHackInput("");
     setHackAttempts(5);
     setHistory(prev => [...prev, "> INITIATING HACK SEQUENCE...", "> TARGET LOCKED: MAINFRAME", "> DECRYPT 4-DIGIT PASSCODE", `> ATTEMPTS REMAINING: 5`]);
  };

  const handleHackInput = (e: React.FormEvent) => {
     e.preventDefault();
     const guess = hackInput.trim();
     
     if (guess === hackCode) {
        setHistory(prev => [...prev, `> INPUT: ${guess}`, "> ACCESS GRANTED.", "> DOWNLOADING PAYLOAD...", "> 100% COMPLETE."]);
        setIsHacking(false);
     } else {
        const nextAttempts = hackAttempts - 1;
        let feedback = "> ACCESS DENIED.";
        if (nextAttempts > 0) {
           let correctPos = 0;
           let correctNum = 0;
           for (let i = 0; i < 4; i++) {
              if (guess[i] === hackCode[i]) correctPos++;
              else if (hackCode.includes(guess[i])) correctNum++;
           }
           feedback += ` MATCHES: ${correctPos} POS, ${correctNum} NUM.`;
           setHistory(prev => [...prev, `> INPUT: ${guess}`, feedback, `> ATTEMPTS REMAINING: ${nextAttempts}`]);
           setHackAttempts(nextAttempts);
           setHackInput("");
        } else {
           setHistory(prev => [...prev, `> INPUT: ${guess}`, "> LOCKOUT IMMINENT.", "> TERMINATING CONNECTION..."]);
           setIsHacking(false);
        }
     }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.toLowerCase().trim();
    
    if (cmd === 'clear') {
      setHistory([]);
    } else if (cmd === 'exit') {
      window.location.href = '/';
    } else if (cmd === 'hack') {
      startHack();
    } else if (cmd in commands) {
      setHistory(prev => [...prev, `> ${input}`, commands[cmd as keyof typeof commands]]);
    } else {
      setHistory(prev => [...prev, `> ${input}`, `Command not found: ${cmd}`]);
    }
    setInput("");
  };

  return (
    <div className="min-h-screen bg-black text-[#0F0] font-mono relative overflow-hidden selection:bg-[#0F0] selection:text-black">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-20 pointer-events-none" />
      
      <div className="relative z-10 p-4 md:p-16 max-w-4xl mx-auto min-h-screen flex flex-col">
        <div className="border border-[#0F0] p-6 bg-black/90 shadow-[0_0_20px_rgba(0,255,0,0.2)] flex-1 flex flex-col relative overflow-hidden">
           {/* Scanline overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20 opacity-20"></div>

           <div className="mb-4 border-b border-[#0F0]/30 pb-2 flex justify-between items-end relative z-30">
              <h1 className="text-2xl font-bold font-mono animate-pulse">GEMINI_TERMINAL_V3</h1>
              <span className="text-xs">SECURE_CONNECTION</span>
           </div>

           <div className="flex-1 overflow-y-auto mb-4 space-y-2 custom-scrollbar relative z-30 min-h-[300px]">
              {history.map((line, i) => (
                 <div key={i} className="whitespace-pre-wrap break-words animate-in fade-in duration-300">{line}</div>
              ))}
              <div ref={bottomRef} />
           </div>

           {isHacking ? (
              <form onSubmit={handleHackInput} className="flex gap-2 relative z-30 border-t border-[#0F0]/30 pt-4">
                 <span className="text-[#0F0] animate-pulse">ENTER_PASSCODE_</span>
                 <input 
                   autoFocus
                   type="text" 
                   maxLength={4}
                   value={hackInput}
                   onChange={(e) => setHackInput(e.target.value.replace(/[^0-9]/g, ''))}
                   className="bg-transparent border-none outline-none text-[#0F0] w-full placeholder-[#0F0]/30"
                   placeholder="####"
                 />
              </form>
           ) : (
              <form onSubmit={handleCommand} className="flex gap-2 relative z-30 border-t border-[#0F0]/30 pt-4">
                 <span className="text-[#0F0]">{">"}</span>
                 <input 
                   autoFocus
                   type="text" 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   className="bg-transparent border-none outline-none text-[#0F0] w-full placeholder-[#0F0]/30"
                   placeholder="Enter command..."
                 />
              </form>
           )}
        </div>
        
        <div className="mt-8 text-center relative z-30">
           <Link href="/" className="text-xs hover:bg-[#0F0] hover:text-black px-4 py-2 border border-[#0F0] transition-colors uppercase tracking-widest">
              Disconnect
           </Link>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { bg: #000; }
        .custom-scrollbar::-webkit-scrollbar-thumb { bg: #0F0; }
      `}</style>
    </div>
  );
}
