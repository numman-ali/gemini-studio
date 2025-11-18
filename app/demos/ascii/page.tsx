"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Camera, CameraOff, Download, Palette, Settings, Info } from "lucide-react";

export default function AsciiPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charSet, setCharSet] = useState<'dense' | 'minimal' | 'blocks'>('dense');
  const [resolution, setResolution] = useState<'low' | 'medium' | 'high'>('medium');
  const [colorMode, setColorMode] = useState<'green' | 'white' | 'rainbow'>('green');
  const [showInstructions, setShowInstructions] = useState(true);

  const charSets = {
    dense: "Ñ@#W$9876543210?!abc;:+=-,._                    ",
    minimal: "@%#*+=-:. ",
    blocks: "█▓▒░ "
  };

  const resolutions = {
    low: { w: 80, h: 40 },
    medium: { w: 120, h: 60 },
    high: { w: 160, h: 80 }
  };

  useEffect(() => {
    let animationFrameId: number;

    const processFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const pre = preRef.current;

      if (video && canvas && pre && streaming) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const chars = charSets[charSet];
          const { w, h } = resolutions[resolution];

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
  }, [streaming, charSet, resolution]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreaming(true);
        setError(null);
        setShowInstructions(false);
      }
    } catch (err) {
      setError("Camera access denied. Please allow camera permissions and try again.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setStreaming(false);
    }
  };

  const captureSnapshot = () => {
    if (preRef.current) {
      const text = preRef.current.textContent || "";
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ascii-capture-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  const getColorClass = () => {
    switch(colorMode) {
      case 'green': return 'text-green-500';
      case 'white': return 'text-white';
      case 'rainbow': return 'text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500';
      default: return 'text-green-500';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono overflow-hidden">
      {/* Header */}
      <header className="border-b border-white/20 p-4 flex justify-between items-center bg-black/50 backdrop-blur">
        <div>
          <h1 className="text-xl font-bold">ASCII VISION CONVERTER</h1>
          <p className="text-xs text-gray-500">Real-time Webcam to Text Renderer</p>
        </div>
        <Link href="/" className="bg-white text-black px-4 py-2 hover:bg-gray-200 transition-colors text-sm font-bold">
          EXIT
        </Link>
      </header>

      <div className="grid lg:grid-cols-[1fr_300px] h-[calc(100vh-73px)]">
        {/* Main Display Area */}
        <div className="relative flex items-center justify-center p-4 overflow-auto bg-black">
          <video ref={videoRef} className="hidden" playsInline muted />
          <canvas ref={canvasRef} className="hidden" />

          {!streaming && showInstructions && (
            <div className="max-w-2xl text-center space-y-6 p-8">
              <div className="text-6xl mb-4">📹➜📝</div>
              <h2 className="text-3xl font-bold">How This Works</h2>
              <div className="text-left space-y-4 text-gray-400">
                <p>1. <strong className="text-white">Click "Start Camera"</strong> to access your webcam</p>
                <p>2. <strong className="text-white">Grant permission</strong> when your browser asks</p>
                <p>3. <strong className="text-white">Watch live video</strong> convert to ASCII art in real-time</p>
                <p>4. <strong className="text-white">Adjust settings</strong> to change character sets, resolution, and colors</p>
                <p>5. <strong className="text-white">Download snapshots</strong> of your ASCII art as text files</p>
              </div>
              <div className="mt-8 p-4 border border-yellow-500/30 bg-yellow-500/10 rounded">
                <p className="text-yellow-500 text-sm">
                  <Info className="inline w-4 h-4 mr-2" />
                  Your camera feed never leaves your device. All processing happens locally in your browser.
                </p>
              </div>
            </div>
          )}

          {streaming && (
            <pre
              ref={preRef}
              className={`text-[6px] sm:text-[8px] md:text-[10px] leading-[6px] sm:leading-[8px] md:leading-[10px] whitespace-pre font-bold ${getColorClass()} select-all`}
              style={{ fontFamily: 'monospace' }}
            >
              Initializing camera feed...
            </pre>
          )}

          {!streaming && !showInstructions && (
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">📹</div>
              <p className="text-gray-500">Camera stopped</p>
              <p className="text-sm text-gray-600">Click "Start Camera" to resume</p>
            </div>
          )}
        </div>

        {/* Control Panel */}
        <div className="border-l border-white/20 bg-zinc-950 p-6 overflow-auto">
          <div className="space-y-6">
            {/* Camera Controls */}
            <div>
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Camera className="w-4 h-4" />
                CAMERA CONTROL
              </h3>
              <div className="space-y-2">
                {!streaming ? (
                  <button
                    onClick={startCamera}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                    Start Camera
                  </button>
                ) : (
                  <button
                    onClick={stopCamera}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <CameraOff className="w-4 h-4" />
                    Stop Camera
                  </button>
                )}

                <button
                  onClick={captureSnapshot}
                  disabled={!streaming}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white px-4 py-3 font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Snapshot
                </button>
              </div>
              {error && (
                <p className="text-red-500 text-xs mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded">{error}</p>
              )}
            </div>

            {/* Character Set */}
            <div>
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Settings className="w-4 h-4" />
                CHARACTER SET
              </h3>
              <div className="space-y-2">
                {(['dense', 'minimal', 'blocks'] as const).map((set) => (
                  <button
                    key={set}
                    onClick={() => setCharSet(set)}
                    className={`w-full px-4 py-2 text-left font-bold text-sm border transition-colors ${
                      charSet === set
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white border-white/20 hover:border-white/40'
                    }`}
                  >
                    {set.toUpperCase()}
                    <div className="text-xs opacity-60 mt-1 font-mono">
                      {charSets[set].substring(0, 20)}...
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Resolution */}
            <div>
              <h3 className="text-sm font-bold mb-3">RESOLUTION</h3>
              <div className="space-y-2">
                {(['low', 'medium', 'high'] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`w-full px-4 py-2 text-left font-bold text-sm border transition-colors ${
                      resolution === res
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white border-white/20 hover:border-white/40'
                    }`}
                  >
                    {res.toUpperCase()}
                    <div className="text-xs opacity-60 mt-1">
                      {resolutions[res].w}x{resolutions[res].h} chars
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Mode */}
            <div>
              <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                COLOR MODE
              </h3>
              <div className="space-y-2">
                {(['green', 'white', 'rainbow'] as const).map((color) => (
                  <button
                    key={color}
                    onClick={() => setColorMode(color)}
                    className={`w-full px-4 py-2 text-left font-bold text-sm border transition-colors ${
                      colorMode === color
                        ? 'bg-white text-black border-white'
                        : 'bg-transparent text-white border-white/20 hover:border-white/40'
                    }`}
                  >
                    {color.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Info */}
            <div className="pt-4 border-t border-white/20">
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="w-full px-4 py-2 text-left font-bold text-sm border border-white/20 hover:border-white/40 transition-colors flex items-center gap-2"
              >
                <Info className="w-4 h-4" />
                {showInstructions ? 'Hide' : 'Show'} Instructions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

