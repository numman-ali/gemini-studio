import React, { useRef, useEffect } from 'react';
import * as Tone from 'tone';

interface VisualizerProps {
  analyser: Tone.Analyser | null;
}

export const Visualizer: React.FC<VisualizerProps> = ({ analyser }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let animationId: number;

    const draw = () => {
      if (!canvasRef.current || !analyser) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Get data
      const values = analyser.getValue();
      // values is Float32Array of dB values (usually -100 to 0) or waveform (-1 to 1) depending on type.
      // We used "fft" in hook with 256 size. So it returns frequency data in dB.

      ctx.fillStyle = '#09090b'; // Screen BG
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 20) {
          ctx.moveTo(i, 0);
          ctx.lineTo(i, canvas.height);
      }
      for (let i = 0; i < canvas.height; i += 20) {
          ctx.moveTo(0, i);
          ctx.lineTo(canvas.width, i);
      }
      ctx.stroke();

      if (!values || values.length === 0) {
          animationId = requestAnimationFrame(draw);
          return;
      }

      const barWidth = canvas.width / values.length;

      // Draw Frequency Bars
      ctx.fillStyle = '#ec4899'; // Pink
      // Gradient
      const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
      gradient.addColorStop(0, '#ec4899');
      gradient.addColorStop(1, '#a855f7');
      ctx.fillStyle = gradient;

      (values as Float32Array).forEach((v, i) => {
          // v is in dB, roughly -100 to 0.
          // Map to height.
          const height = Math.max(0, (v + 100) * 2); // crude mapping
          const x = i * barWidth;
          const y = canvas.height - height;

          ctx.fillRect(x, y, barWidth - 1, height);
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [analyser]);

  return (
    <div className="relative w-full h-32 bg-black rounded-lg overflow-hidden border border-zinc-800 shadow-inner">
       <div className="absolute top-2 left-2 text-[10px] font-mono text-pink-500 animate-pulse">VISUALIZER_MODE: FFT</div>
       <canvas
          ref={canvasRef}
          width={600}
          height={128}
          className="w-full h-full"
       />
       {/* Screen Glare */}
       <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
    </div>
  );
};
