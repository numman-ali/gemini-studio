"use client";

import { useState, useEffect, useRef } from "react";

export function Terminal() {
  const [history, setHistory] = useState<string[]>(["Gemini OS Terminal [Version 1.0.0]", "(c) 2025 Gemini Corp. All rights reserved.", ""]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const cmd = input.trim();
      let output: string[] = [`C:\\> ${cmd}`];

      switch (cmd.toLowerCase()) {
        case "help":
          output.push("Available commands:", "  help    - Show this help message", "  clear   - Clear the terminal screen", "  ver     - Show OS version", "  ls      - List directory contents", "  whoami  - Display current user");
          break;
        case "clear":
        case "cls":
          setHistory([]);
          setInput("");
          return;
        case "ver":
          output.push("Gemini OS [Version 1.0.0]");
          break;
        case "ls":
        case "dir":
          output.push(" Volume in drive C is System", " Directory of C:\\", "", "11/18/2025  10:00 AM    <DIR>          .", "11/18/2025  10:00 AM    <DIR>          ..", "11/18/2025  10:00 AM             1,024 Welcome.txt", "11/18/2025  10:05 AM               512 System.log");
          break;
        case "whoami":
          output.push("guest");
          break;
        case "":
          break;
        default:
          output.push(`'${cmd}' is not recognized as an internal or external command.`);
      }
      
      setHistory(prev => [...prev, ...output]);
      setInput("");
    }
  };

  return (
    <div className="bg-black text-gray-300 font-mono p-2 h-full text-sm overflow-auto" onClick={() => document.getElementById("term-input")?.focus()}>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap break-words">{line}</div>
      ))}
      <div className="flex">
        <span>C:\&gt;</span>
        <input
          id="term-input"
          className="bg-transparent border-none outline-none flex-1 ml-1 text-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          autoComplete="off"
        />
      </div>
      <div ref={bottomRef} />
    </div>
  );
}
