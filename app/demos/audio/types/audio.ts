export type InstrumentType = 'kick' | 'snare' | 'hihat' | 'clap' | 'bass' | 'lead' | 'pad' | 'fx';

export interface Track {
  id: string;
  name: string;
  type: InstrumentType;
  steps: boolean[];
  volume: number; // -60 to 0 dB
  pan: number; // -1 to 1
  mute: boolean;
  solo: boolean;
  // Basic parameters for synthesis tweaking
  params: {
    attack?: number;
    decay?: number;
    sustain?: number;
    release?: number;
    filterCutoff?: number;
    resonance?: number;
  };
}

export interface AudioEngineState {
  playing: boolean;
  bpm: number;
  currentStep: number;
  tracks: Track[];
  masterVolume: number;
  effects: {
    reverb: number; // 0-1 wet/dry
    delay: number; // 0-1 wet/dry
    distortion: number; // 0-1 amount
    filterCutoff: number; // Hz
  };
}
