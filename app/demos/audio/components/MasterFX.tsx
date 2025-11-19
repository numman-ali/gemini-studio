import React from 'react';
import { Knob } from './Knob';

interface MasterFXProps {
  effects: {
    reverb: number;
    delay: number;
    distortion: number;
    filterCutoff: number;
  };
  onChange: (effect: 'reverb' | 'delay' | 'distortion' | 'filterCutoff', val: number) => void;
}

export const MasterFX: React.FC<MasterFXProps> = ({ effects, onChange }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-[#18181b] rounded-xl border border-zinc-800 shadow-xl">
       <div className="flex justify-between items-center border-b border-zinc-800 pb-2 mb-2">
          <h3 className="text-xs font-bold text-zinc-500 tracking-widest">MASTER FX</h3>
          <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_#ef4444]"></div>
       </div>

       <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <Knob
             label="REVERB"
             value={effects.reverb}
             min={0}
             max={1}
             onChange={(val) => onChange('reverb', val)}
             size={48}
          />
          <Knob
             label="DELAY"
             value={effects.delay}
             min={0}
             max={1}
             onChange={(val) => onChange('delay', val)}
             size={48}
          />
          <Knob
             label="GRIT"
             value={effects.distortion}
             min={0}
             max={1}
             onChange={(val) => onChange('distortion', val)}
             size={48}
          />
          <Knob
             label="FILTER"
             value={effects.filterCutoff}
             min={20}
             max={20000}
             onChange={(val) => onChange('filterCutoff', val)}
             size={48}
          />
       </div>
    </div>
  );
};
