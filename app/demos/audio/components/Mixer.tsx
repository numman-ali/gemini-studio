import React from 'react';
import { Track } from '../types/audio';
import { Fader } from './Fader';
import { LedButton } from './LedButton';

interface MixerProps {
  tracks: Track[];
  onVolumeChange: (trackId: string, val: number) => void;
  onToggleMute: (trackId: string) => void;
  onToggleSolo: (trackId: string) => void;
}

export const Mixer: React.FC<MixerProps> = ({ tracks, onVolumeChange, onToggleMute, onToggleSolo }) => {
  return (
    <div className="flex gap-2 p-4 bg-[#18181b] rounded-xl border border-zinc-800 shadow-xl overflow-x-auto">
       {tracks.map(track => (
          <div key={track.id} className="flex flex-col items-center gap-4 min-w-[60px] bg-[#27272a] py-4 rounded border border-white/5">
             <span className="text-[10px] font-bold text-zinc-500 -rotate-90 translate-y-2 w-12 text-center whitespace-nowrap">{track.name}</span>

             <div className="flex-1 py-2">
                <Fader
                   value={track.volume}
                   min={-60}
                   max={0}
                   onChange={(val) => onVolumeChange(track.id, val)}
                   height={120}
                />
             </div>

             <div className="flex flex-col gap-2">
                <LedButton
                   active={track.mute}
                   onClick={() => onToggleMute(track.id)}
                   color="red"
                   label="M"
                   size="sm"
                />
                <LedButton
                   active={track.solo}
                   onClick={() => onToggleSolo(track.id)}
                   color="yellow"
                   label="S"
                   size="sm"
                />
             </div>
          </div>
       ))}
    </div>
  );
};
