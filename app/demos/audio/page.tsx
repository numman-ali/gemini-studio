"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

export default function AudioPage() {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [grid, setGrid] = useState(Array(4).fill(null).map(() => Array(16).fill(false)));
  const seqRef = useRef<Tone.Sequence>(null);
  const synthsRef = useRef<Tone.Synth[]>([]);

  const rows = ['C5', 'G4', 'E4', 'C4'];

  useEffect(() => {
    synthsRef.current = [
       new Tone.Synth().toDestination(),
       new Tone.Synth().toDestination(),
       new Tone.Synth().toDestination(),
       new Tone.Synth().toDestination()
    ];

    return () => {
       synthsRef.current.forEach(s => s.dispose());
    };
  }, []);

  useEffect(() => {
     Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const toggleCell = (row: number, col: number) => {
     const newGrid = [...grid];
     newGrid[row][col] = !newGrid[row][col];
     setGrid(newGrid);
  };

  const togglePlay = async () => {
     await Tone.start();
     
     if (!playing) {
        const seq = new Tone.Sequence((time, col) => {
           grid.forEach((row, rowIdx) => {
              if (row[col]) {
                 synthsRef.current[rowIdx].triggerAttackRelease(rows[rowIdx], "8n", time);
              }
           });
           // Visual feedback could go here
        }, [...Array(16).keys()], "16n");
        
        seq.start(0);
        Tone.Transport.start();
        seqRef.current = seq;
        setPlaying(true);
     } else {
        Tone.Transport.stop();
        if (seqRef.current) seqRef.current.dispose();
        setPlaying(false);
     }
  };

  return (
    <div className="min-h-screen bg-[#18181b] text-white flex flex-col items-center justify-center p-8">
       <Link href="/" className="absolute top-8 left-8 text-xs font-bold uppercase tracking-widest hover:text-pink-500">← Index</Link>
       
       <div className="max-w-4xl w-full bg-[#27272a] p-8 rounded-3xl shadow-2xl border border-white/5">
          <header className="flex justify-between items-center mb-8">
             <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">SYNTH WAVE</h1>
             <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                   <span className="text-xs font-bold text-gray-400">BPM</span>
                   <input 
                      type="number" 
                      value={bpm} 
                      onChange={(e) => setBpm(Number(e.target.value))}
                      className="w-16 bg-black border border-gray-700 rounded px-2 py-1 text-center font-mono text-sm"
                   />
                </div>
                <button 
                   onClick={togglePlay}
                   className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${playing ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                >
                   {playing ? '■' : '▶'}
                </button>
             </div>
          </header>

          <div className="grid gap-2 mb-8">
             {grid.map((row, i) => (
                <div key={i} className="flex gap-2">
                   <div className="w-12 flex items-center justify-end pr-4 text-xs font-mono text-gray-500">{rows[i]}</div>
                   {row.map((active, j) => (
                      <button
                         key={j}
                         onClick={() => toggleCell(i, j)}
                         className={`flex-1 aspect-square rounded-sm transition-all duration-100 ${active ? 'bg-pink-500 shadow-[0_0_10px_#ec4899]' : 'bg-[#3f3f46] hover:bg-[#52525b]'}`}
                         style={{ transitionDelay: `${j * 10}ms` }}
                      />
                   ))}
                </div>
             ))}
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 font-mono">
             <span>OSCILLATOR: SAWTOOTH</span>
             <span>ENVELOPE: ADSR</span>
             <span>FILTER: LOWPASS</span>
          </div>
       </div>
    </div>
  );
}

