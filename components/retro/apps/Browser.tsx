"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCw, Home, Search, Globe } from "lucide-react";

export function Browser() {
  const [url, setUrl] = useState("https://www.google.com");
  const [history, setHistory] = useState<string[]>(["https://www.google.com"]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayUrl, setDisplayUrl] = useState("https://www.google.com");

  const navigate = (newUrl: string) => {
    const nextHistory = history.slice(0, currentIndex + 1);
    nextHistory.push(newUrl);
    setHistory(nextHistory);
    setCurrentIndex(nextHistory.length - 1);
    setUrl(newUrl);
    setDisplayUrl(newUrl);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setUrl(history[newIndex]);
      setDisplayUrl(history[newIndex]);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setUrl(history[newIndex]);
      setDisplayUrl(history[newIndex]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let target = displayUrl;
    if (!target.startsWith("http")) {
      target = "https://" + target;
    }
    navigate(target);
  };

  return (
    <div className="flex flex-col h-full bg-[#c0c0c0]">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-1 border-b border-gray-400">
        <button onClick={goBack} disabled={currentIndex === 0} className="p-1 hover:bg-gray-300 disabled:opacity-50">
          <ArrowLeft size={16} />
        </button>
        <button onClick={goForward} disabled={currentIndex === history.length - 1} className="p-1 hover:bg-gray-300 disabled:opacity-50">
          <ArrowRight size={16} />
        </button>
        <button onClick={() => navigate(url)} className="p-1 hover:bg-gray-300">
          <RotateCw size={16} />
        </button>
        <button onClick={() => navigate("https://www.google.com")} className="p-1 hover:bg-gray-300">
          <Home size={16} />
        </button>
        <form onSubmit={handleSubmit} className="flex-1 flex gap-1">
           <input 
             className="flex-1 border border-gray-500 px-2 py-0.5 text-sm outline-none"
             value={displayUrl}
             onChange={(e) => setDisplayUrl(e.target.value)}
           />
           <button type="submit" className="px-2 bg-gray-200 border border-gray-500 text-sm">Go</button>
        </form>
      </div>
      
      {/* Content Area (Simulated) */}
      <div className="flex-1 bg-white border-t border-gray-400 relative overflow-hidden">
         <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
             <Globe size={64} className="mb-4 opacity-20" />
             <p className="text-lg">Browsing to:</p>
             <p className="font-mono font-bold text-blue-600 mt-2">{url}</p>
             <p className="text-xs mt-8 max-w-md text-center">
               (This is a simulated browser. For security reasons, actual web browsing inside this window is disabled.)
             </p>
         </div>
      </div>
    </div>
  );
}
