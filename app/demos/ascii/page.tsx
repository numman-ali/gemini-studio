"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AsciiPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let animationFrameId: number;

    const chars = "Ñ@#W$9876543210?!abc;:+=-,._                    ";

    const processFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const pre = preRef.current;

      if (video && canvas && pre && streaming) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const w = 120; // Width in chars
          const h = 60;  // Height in chars
          canvas.width = w;
          canvas.height = h;
          
          ctx.drawImage(video, 0, 0, w, h);
          const imageData = ctx.getImageData(0, 0, w, h);
          const data = imageData.data;
          
          let asciiStr = "";
          for (let i = 0; i < h; i++) {
            for (let j = 0; j < w; j++) {
               const offset = (i * w + j) * 4;
               const r = data[offset];
               const g = data[offset + 1];
               const b = data[offset + 2];
               const avg = (r + g + b) / 3;
               const charIndex = Math.floor((avg / 255) * (chars.length - 1));
               asciiStr += chars[charIndex];
            }
            asciiStr += "\n";
          }
          pre.textContent = asciiStr;
        }
      }
      animationFrameId = requestAnimationFrame(processFrame);
    };

    if (streaming) {
       processFrame();
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [streaming]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
      }
    } catch (err) {
      setError("Camera access denied or not available. Simulating feed...");
      // Fallback simulation could go here
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col items-center justify-center overflow-hidden p-4">
      <Link href="/" className="fixed top-4 left-4 z-50 bg-white text-black px-2 py-1 hover:bg-gray-200">
         &lt; EXIT
      </Link>

      <div className="relative border border-white/20 p-2 max-w-full overflow-hidden">
         <video ref={videoRef} className="hidden" playsInline muted />
         <canvas ref={canvasRef} className="hidden" />
         
         <pre 
           ref={preRef} 
           className="text-[8px] md:text-[10px] leading-[8px] md:leading-[10px] whitespace-pre font-bold text-green-500"
         >
            {streaming ? "Initializing..." : "Waiting for signal..."}
         </pre>

         {!streaming && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
               <div className="text-center">
                  <h1 className="text-2xl mb-4">ASCII_VISION_SYSTEM</h1>
                  <button 
                    onClick={startCamera}
                    className="border border-green-500 text-green-500 px-6 py-2 hover:bg-green-500 hover:text-black transition-colors"
                  >
                     ACTIVATE CAMERA
                  </button>
                  {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}
               </div>
            </div>
         )}
      </div>
    </div>
  );
}

