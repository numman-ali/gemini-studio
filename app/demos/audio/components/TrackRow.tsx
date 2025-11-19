import React from 'react';
import { Track } from '../types/audio';
import { LedButton } from './LedButton';
import { Knob } from './Knob';

interface TrackRowProps {
  track: Track;
  onToggleStep: (step: number) => void;
  currentStep: number;
  onMute: () => void;
}

export const TrackRow: React.FC<TrackRowProps> = ({ track, onToggleStep, currentStep, onMute }) => {
  // Map track types to colors
  const colorMap: Record<string, 'red' | 'green' | 'blue' | 'yellow' | 'pink' | 'cyan'> = {
    kick: 'red',
    snare: 'yellow',
    hihat: 'cyan',
    clap: 'pink',
    bass: 'blue',
    lead: 'green',
    pad: 'pink'
  };

  const color = colorMap[track.type] || 'pink';

  return (
    <div className="flex items-center gap-2 bg-[#18181b] p-1 rounded-lg border border-white/5">
      {/* Track Info / Controls */}
      <div className="w-24 flex flex-col items-start gap-1 pl-2">
         <span className={`text-[10px] font-bold tracking-widest uppercase ${track.mute ? 'text-gray-600' : 'text-gray-300'}`}>{track.name}</span>
         <button
            onClick={onMute}
            className={`text-[9px] px-1 rounded border ${track.mute ? 'bg-red-900/50 border-red-800 text-red-200' : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:text-white'}`}
         >
            {track.mute ? 'MUTED' : 'MUTE'}
         </button>
      </div>

      {/* Steps */}
      <div className="flex-1 grid grid-cols-16 gap-1">
         {track.steps.map((active, i) => (
            <button
               key={i}
               onClick={() => onToggleStep(i)}
               className={`
                  relative h-8 rounded-[2px] transition-all duration-75
                  ${active
                      ? `bg-${color}-500 shadow-[0_0_8px_var(--color-${color}-500)]`
                      : 'bg-[#27272a] hover:bg-[#3f3f46]'}
                  ${i % 4 === 0 ? 'border-l border-white/10' : ''}
                  ${i === currentStep ? 'brightness-150 scale-95' : ''}
               `}
            >
                {active && (
                   <div className={`absolute inset-0 bg-${color}-400 opacity-50 blur-[2px]`}></div>
                )}
            </button>
         ))}
      </div>
    </div>
  );
};
