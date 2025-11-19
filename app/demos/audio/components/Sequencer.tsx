import React from 'react';
import { Track } from '../types/audio';
import { TrackRow } from './TrackRow';

interface SequencerProps {
  tracks: Track[];
  currentStep: number;
  onToggleStep: (trackId: string, step: number) => void;
  onToggleMute: (trackId: string) => void;
}

export const Sequencer: React.FC<SequencerProps> = ({ tracks, currentStep, onToggleStep, onToggleMute }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-[#09090b] rounded-xl border border-zinc-800 shadow-2xl">
       <div className="flex justify-between mb-2 px-2">
          <h3 className="text-xs font-bold text-zinc-500 tracking-widest">SEQUENCER</h3>
          <div className="flex gap-1">
             {[...Array(4)].map((_, i) => (
                <div key={i} className="w-2 h-2 rounded-full bg-zinc-800"></div>
             ))}
          </div>
       </div>
       <div className="flex flex-col gap-1">
          {tracks.map(track => (
             <TrackRow
                key={track.id}
                track={track}
                currentStep={currentStep}
                onToggleStep={(step) => onToggleStep(track.id, step)}
                onMute={() => onToggleMute(track.id)}
             />
          ))}
       </div>
    </div>
  );
};
