"use client";

import { useState } from "react";
import Link from "next/link";
import { useAudioEngine } from "./hooks/useAudioEngine";
import { Transport } from "./components/Transport";
import { Sequencer } from "./components/Sequencer";
import { Mixer } from "./components/Mixer";
import { MasterFX } from "./components/MasterFX";
import { Visualizer } from "./components/Visualizer";
import { LedButton } from "./components/LedButton";

export default function AudioPage() {
  const { state, actions, analyser } = useAudioEngine();
  const [activeTab, setActiveTab] = useState<'sequencer' | 'mixer' | 'fx'>('sequencer');

  return (
    <div className="min-h-screen bg-[#101012] text-zinc-300 flex flex-col items-center p-4 md:p-8 font-sans selection:bg-pink-500/30">
       <Link href="/" className="absolute top-4 left-4 md:top-8 md:left-8 text-[10px] font-bold uppercase tracking-widest hover:text-pink-500 transition-colors z-50">← Index</Link>

       <div className="max-w-6xl w-full flex flex-col gap-6 mt-8 md:mt-0">

          {/* Header / Top Rack */}
          <div className="flex flex-col md:flex-row gap-6 items-end md:items-stretch justify-between">
             <div className="flex flex-col gap-2 flex-1 w-full">
                <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 drop-shadow-[0_2px_10px_rgba(236,72,153,0.5)]">
                   STUDIO ONE
                </h1>
                <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Professional Groove Workstation</p>
             </div>

             <div className="w-full md:w-96">
                 <Visualizer analyser={analyser ?? null} />
             </div>
          </div>

          {/* Transport */}
          <Transport
             playing={state.playing}
             bpm={state.bpm}
             onPlayToggle={actions.togglePlay}
             onBpmChange={actions.setBpm}
             onClear={actions.clear}
             onRandomize={actions.randomize}
          />

          {/* Mobile Tabs */}
          <div className="md:hidden flex gap-2 w-full p-1 bg-zinc-900 rounded-lg border border-zinc-800">
             {(['sequencer', 'mixer', 'fx'] as const).map(tab => (
                <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded ${activeTab === tab ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500'}`}
                >
                   {tab}
                </button>
             ))}
          </div>

          {/* Main Workspace */}
          <div className="flex flex-col lg:flex-row gap-6">

             {/* Sequencer Section */}
             <div className={`flex-1 flex flex-col gap-4 ${activeTab !== 'sequencer' ? 'hidden md:flex' : ''}`}>
                <Sequencer
                   tracks={state.tracks}
                   currentStep={state.currentStep}
                   onToggleStep={actions.toggleStep}
                   onToggleMute={actions.toggleMute}
                />
             </div>

             {/* Mixer & FX Rack */}
             <div className={`flex flex-col gap-6 lg:w-auto ${activeTab === 'sequencer' ? 'hidden md:flex' : ''}`}>

                <div className={`${activeTab !== 'mixer' ? 'hidden md:block' : ''}`}>
                   <Mixer
                      tracks={state.tracks}
                      onVolumeChange={actions.setVolume}
                      onToggleMute={actions.toggleMute}
                      onToggleSolo={actions.toggleSolo}
                   />
                </div>

                <div className={`${activeTab !== 'fx' ? 'hidden md:block' : ''}`}>
                   <MasterFX
                      effects={state.effects}
                      onChange={actions.setEffect}
                   />
                </div>

             </div>
          </div>
       </div>
    </div>
  );
}
