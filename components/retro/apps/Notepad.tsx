"use client";

import { useState } from "react";

export function Notepad({ initialContent }: { initialContent?: string }) {
  const [text, setText] = useState(initialContent || "Welcome to Gemini OS.\n\nFeel free to type notes here.");

  return (
    <div className="flex flex-col h-full">
       <div className="flex gap-2 mb-2 text-xs">
          <span className="cursor-pointer hover:underline">File</span>
          <span className="cursor-pointer hover:underline">Edit</span>
          <span className="cursor-pointer hover:underline">Search</span>
          <span className="cursor-pointer hover:underline">Help</span>
       </div>
       <textarea
         className="flex-1 w-full resize-none border border-gray-400 outline-none p-1 font-mono text-sm"
         value={text}
         onChange={(e) => setText(e.target.value)}
       />
    </div>
  );
}

