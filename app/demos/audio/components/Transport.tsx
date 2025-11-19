import React from 'react';
import { LedButton } from './LedButton';

interface TransportProps {
  playing: boolean;
  bpm: number;
  onPlayToggle: () => void;
  onBpmChange: (bpm: number) => void;
  onClear: () => void;
  onRandomize: () => void;
}

export const Transport: React.FC<TransportProps> = ({ playing, bpm, onPlayToggle, onBpmChange, onClear, onRandomize }) => {
  return (
    <div className="flex items-center gap-6 p-4 bg-[#18181b] rounded-xl border border-zinc-800 shadow-xl">
      {/* Play/Stop */}
      <div className="flex gap-2">
         <LedButton
            active={playing}
            onClick={onPlayToggle}
            color="green"
            label={playing ? "STOP" : "PLAY"}
            size="lg"
         />
      </div>

      {/* BPM Display */}
      <div className="flex flex-col items-center gap-1 bg-[#09090b] px-4 py-2 rounded border border-zinc-800 shadow-inner">
         <span className="text-[10px] text-zinc-500 font-bold">BPM</span>
         <div className="flex items-center gap-2">
            <button onClick={() => onBpmChange(Math.max(60, bpm - 5))} className="text-zinc-500 hover:text-white">-</button>
            <span className="text-2xl font-mono text-red-500 font-bold tabular-nums tracking-wider drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]">
               {bpm}
            </span>
            <button onClick={() => onBpmChange(Math.min(200, bpm + 5))} className="text-zinc-500 hover:text-white">+</button>
         </div>
      </div>

      <div className="w-[1px] h-12 bg-zinc-800"></div>

      {/* Actions */}
      <div className="flex gap-4">
         <LedButton
            active={false}
            onClick={onRandomize}
            color="blue"
            label="MAGIC"
            size="md"
         />
         <LedButton
            active={false}
            onClick={onClear}
            color="red"
            label="CLEAR"
            size="md"
         />
      </div>
    </div>
  );
};
