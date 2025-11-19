import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone';
import { AudioEngineState, Track } from '../types/audio';

const STEP_COUNT = 16;

const INITIAL_TRACKS: Track[] = [
  { id: 'kick', name: 'KICK', type: 'kick', steps: Array(STEP_COUNT).fill(false), volume: -6, pan: 0, mute: false, solo: false, params: { decay: 0.4 } },
  { id: 'snare', name: 'SNARE', type: 'snare', steps: Array(STEP_COUNT).fill(false), volume: -8, pan: 0, mute: false, solo: false, params: { decay: 0.2 } },
  { id: 'hihat', name: 'HI-HAT', type: 'hihat', steps: Array(STEP_COUNT).fill(false), volume: -12, pan: 0, mute: false, solo: false, params: { decay: 0.1 } },
  { id: 'clap', name: 'CLAP', type: 'clap', steps: Array(STEP_COUNT).fill(false), volume: -10, pan: 0, mute: false, solo: false, params: { decay: 0.2 } },
  { id: 'bass', name: 'BASS', type: 'bass', steps: Array(STEP_COUNT).fill(false), volume: -8, pan: 0, mute: false, solo: false, params: { filterCutoff: 1000, attack: 0.01 } },
  { id: 'lead', name: 'LEAD', type: 'lead', steps: Array(STEP_COUNT).fill(false), volume: -10, pan: 0, mute: false, solo: false, params: { filterCutoff: 2000, attack: 0.1 } },
  { id: 'pad', name: 'PAD', type: 'pad', steps: Array(STEP_COUNT).fill(false), volume: -12, pan: 0, mute: false, solo: false, params: { attack: 0.5, release: 1 } },
];

// Helper to create synths
const createSynths = () => {
  const limit = new Tone.Limiter(-2).toDestination();
  const reverb = new Tone.Reverb({ decay: 2, wet: 0.2 }).connect(limit);
  const delay = new Tone.FeedbackDelay({ delayTime: "8n", feedback: 0.3, wet: 0.1 }).connect(limit);
  const dist = new Tone.Distortion({ distortion: 0.2, wet: 0 }).connect(limit);
  const filter = new Tone.Filter(20000, "lowpass").connect(dist);

  const masterBus = new Tone.Gain(1).connect(filter);

  // Analyzer
  const analyser = new Tone.Analyser("fft", 256);
  masterBus.connect(analyser);

  // Chain
  filter.connect(dist);
  dist.connect(delay);
  delay.connect(reverb);

  const instruments: Record<string, any> = {};
  const channels: Record<string, Tone.Channel> = {};

  // 1. Kick
  instruments['kick'] = new Tone.MembraneSynth({
    pitchDecay: 0.05,
    octaves: 10,
    oscillator: { type: "sine" },
    envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4, attackCurve: "exponential" }
  });

  // 2. Snare
  instruments['snare'] = new Tone.NoiseSynth({
    noise: { type: "pink" },
    envelope: { attack: 0.001, decay: 0.2, sustain: 0 }
  });

  // 3. HiHat
  instruments['hihat'] = new Tone.MetalSynth({
    envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5
  });

  // 4. Clap
  instruments['clap'] = new Tone.NoiseSynth({
    noise: { type: "white" },
    envelope: { attack: 0.001, decay: 0.3, sustain: 0 }
  });

  // 5. Bass
  instruments['bass'] = new Tone.MonoSynth({
    oscillator: { type: "sawtooth" },
    filter: { Q: 2, type: "lowpass", rolloff: -24 },
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.6, release: 2 },
    filterEnvelope: { attack: 0.001, decay: 0.1, sustain: 0.8, release: 2, baseFrequency: 50, octaves: 4 }
  });

  // 6. Lead
  instruments['lead'] = new Tone.FMSynth({
    harmonicity: 3,
    modulationIndex: 10,
    detune: 0,
    oscillator: { type: "sine" },
    envelope: { attack: 0.01, decay: 0.01, sustain: 1, release: 0.5 },
    modulation: { type: "square" },
    modulationEnvelope: { attack: 0.5, decay: 0, sustain: 1, release: 0.5 }
  });

  // 7. Pad
  instruments['pad'] = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "triangle" },
    envelope: { attack: 1, decay: 1, sustain: 1, release: 3 }
  });

  // Connect everything
  INITIAL_TRACKS.forEach(track => {
    const channel = new Tone.Channel({ volume: track.volume, pan: track.pan }).connect(masterBus);
    channels[track.id] = channel;
    instruments[track.id].connect(channel);
  });

  return { instruments, channels, effects: { reverb, delay, dist, filter, limit }, masterBus, analyser };
};

export const useAudioEngine = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [state, setState] = useState<AudioEngineState>({
    playing: false,
    bpm: 120,
    currentStep: 0,
    tracks: INITIAL_TRACKS,
    masterVolume: 0,
    effects: { reverb: 0.2, delay: 0.1, distortion: 0, filterCutoff: 20000 }
  });

  const engineRef = useRef<{
    instruments: Record<string, any>;
    channels: Record<string, Tone.Channel>;
    effects: any;
    masterBus: Tone.Gain;
    analyser: Tone.Analyser;
    seq: Tone.Sequence | null;
  } | null>(null);

  const scale = {
    bass: ['C2', 'F2', 'G2', 'Bb2'],
    lead: ['C4', 'Eb4', 'G4', 'Bb4'],
    pad: [['C3', 'Eb3', 'G3'], ['F3', 'Ab3', 'C4'], ['G3', 'Bb3', 'D4'], ['Bb3', 'D4', 'F4']]
  };

  useEffect(() => {
    const { instruments, channels, effects, masterBus, analyser } = createSynths();
    engineRef.current = { instruments, channels, effects, masterBus, analyser, seq: null };
    setIsLoaded(true);

    return () => {
      Object.values(instruments).forEach(i => i.dispose());
      Object.values(channels).forEach(c => c.dispose());
      Object.values(effects).forEach((e: any) => e.dispose());
      masterBus.dispose();
      analyser.dispose();
    };
  }, []);

  useEffect(() => {
    Tone.Transport.bpm.value = state.bpm;
  }, [state.bpm]);

  useEffect(() => {
    if (!engineRef.current) return;
    const { reverb, delay, dist, filter } = engineRef.current.effects;
    reverb.wet.value = state.effects.reverb;
    delay.wet.value = state.effects.delay;
    dist.distortion = state.effects.distortion;
    dist.wet.value = state.effects.distortion > 0 ? 0.5 : 0;
    filter.frequency.value = state.effects.filterCutoff;
  }, [state.effects]);

  useEffect(() => {
    if (!engineRef.current) return;
    state.tracks.forEach(track => {
      const channel = engineRef.current!.channels[track.id];
      if (channel) {
        channel.volume.value = track.volume;
        channel.mute = track.mute;
        channel.solo = track.solo;
      }
    });
  }, [state.tracks]);

  const togglePlay = async () => {
    await Tone.start();

    if (state.playing) {
      Tone.Transport.stop();
      setState(s => ({ ...s, playing: false, currentStep: 0 }));
    } else {
      Tone.Transport.start();
      setState(s => ({ ...s, playing: true }));
    }
  };

  const tracksRef = useRef(state.tracks);
  useEffect(() => {
    tracksRef.current = state.tracks;
  }, [state.tracks]);

  useEffect(() => {
    if (!isLoaded || !engineRef.current) return;

    const seq = new Tone.Sequence((time, col) => {
      Tone.Draw.schedule(() => {
        setState(s => ({ ...s, currentStep: col }));
      }, time);

      tracksRef.current.forEach((track) => {
        if (track.steps[col]) {
           const inst = engineRef.current!.instruments[track.id];
           if (inst) {
             if (track.type === 'kick') inst.triggerAttackRelease("C1", "8n", time);
             else if (track.type === 'snare') inst.triggerAttackRelease("16n", time);
             else if (track.type === 'hihat') inst.triggerAttackRelease("32n", time, 0.6 + Math.random() * 0.2);
             else if (track.type === 'clap') inst.triggerAttackRelease("16n", time);
             else if (track.type === 'bass') inst.triggerAttackRelease(scale.bass[col % scale.bass.length], "8n", time);
             else if (track.type === 'lead') inst.triggerAttackRelease(scale.lead[col % scale.lead.length], "16n", time);
             else if (track.type === 'pad') inst.triggerAttackRelease(scale.pad[Math.floor(col / 4) % scale.pad.length], "8n", time);
           }
        }
      });
    }, [...Array(STEP_COUNT).keys()], "16n");

    engineRef.current.seq = seq;
    seq.start(0);

    return () => {
      seq.dispose();
    }
  }, [isLoaded]);


  const toggleStep = (trackId: string, step: number) => {
    setState(s => ({
      ...s,
      tracks: s.tracks.map(t =>
        t.id === trackId
          ? { ...t, steps: t.steps.map((val, i) => i === step ? !val : val) }
          : t
      )
    }));
  };

  const setVolume = (trackId: string, val: number) => {
    setState(s => ({
      ...s,
      tracks: s.tracks.map(t => t.id === trackId ? { ...t, volume: val } : t)
    }));
  };

  const toggleMute = (trackId: string) => {
    setState(s => ({
      ...s,
      tracks: s.tracks.map(t => t.id === trackId ? { ...t, mute: !t.mute } : t)
    }));
  };

  const toggleSolo = (trackId: string) => {
    setState(s => ({
      ...s,
      tracks: s.tracks.map(t => t.id === trackId ? { ...t, solo: !t.solo } : t)
    }));
  };

  const setEffect = (effect: keyof AudioEngineState['effects'], val: number) => {
    setState(s => ({
      ...s,
      effects: { ...s.effects, [effect]: val }
    }));
  };

  const randomize = () => {
    setState(s => ({
      ...s,
      tracks: s.tracks.map(t => {
        const newSteps = [...t.steps];

        // Smart Randomization based on Instrument Type
        if (t.type === 'kick') {
            // Four-on-the-floor or broken beat
            if (Math.random() > 0.5) {
               // 4/4
               newSteps.fill(false);
               [0, 4, 8, 12].forEach(i => newSteps[i] = true);
               // Add ghost notes
               if (Math.random() > 0.5) newSteps[14] = true;
            } else {
               // Break
               newSteps.fill(false);
               [0, 10].forEach(i => newSteps[i] = true);
               if (Math.random() > 0.5) newSteps[7] = true;
            }
        } else if (t.type === 'snare' || t.type === 'clap') {
            // Backbeat
            newSteps.fill(false);
            [4, 12].forEach(i => newSteps[i] = true);
            // Ghost notes
            if (Math.random() > 0.7) newSteps[15] = true;
            if (Math.random() > 0.7) newSteps[9] = true;
        } else if (t.type === 'hihat') {
            // 16ths or 8ths
            newSteps.fill(false);
            for (let i = 0; i < 16; i++) {
               if (Math.random() > 0.3) newSteps[i] = true; // Dense
            }
        } else {
             // Synths - Random sparse
             newSteps.fill(false);
             for (let i = 0; i < 16; i++) {
                if (Math.random() > 0.85) newSteps[i] = true;
             }
        }

        return { ...t, steps: newSteps };
      })
    }));
  };

  const clear = () => {
    setState(s => ({
      ...s,
      tracks: s.tracks.map(t => ({
        ...t,
        steps: t.steps.map(() => false)
      }))
    }));
  };

  return {
    state,
    actions: {
      togglePlay,
      setBpm: (bpm: number) => setState(s => ({ ...s, bpm })),
      toggleStep,
      setVolume,
      toggleMute,
      toggleSolo,
      setEffect,
      randomize,
      clear
    },
    analyser: engineRef.current?.analyser
  };
};
