"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, PieChart, Activity, Users, DollarSign, Briefcase } from "lucide-react";

const buzzwords = ["Synergy", "Paradigm Shift", "Disruptive", "Holistic", "Leverage", "Touchbase", "Bandwidth", "Circle Back"];

export default function CorporatePage() {
  const [chartData, setChartData] = useState([40, 60, 45, 70, 50]);
  const [synergy, setSynergy] = useState(85);
  const [buzzword, setBuzzword] = useState(buzzwords[0]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
     const interval = setInterval(() => {
        setChartData(prev => prev.map(v => Math.max(10, Math.min(90, v + (Math.random() - 0.5) * 20))));
        setSynergy(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 5)));
     }, 1000);
     return () => clearInterval(interval);
  }, []);

  const generateReport = () => {
     setGenerating(true);
     let i = 0;
     const interval = setInterval(() => {
        setBuzzword(buzzwords[i % buzzwords.length]);
        i++;
     }, 100);
     
     setTimeout(() => {
        clearInterval(interval);
        setBuzzword(buzzwords[Math.floor(Math.random() * buzzwords.length)]);
        setGenerating(false);
     }, 2000);
  };

  return (
    <div className="min-h-screen bg-blue-900 text-white font-sans relative overflow-hidden selection:bg-yellow-400 selection:text-black p-4 md:p-8">
      {/* Memphis Shapes Background */}
      <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-yellow-400 z-0"></div>
      <div className="absolute bottom-40 right-20 w-0 h-0 border-l-[50px] border-l-transparent border-t-[100px] border-t-pink-500 border-r-[50px] border-r-transparent z-0 rotate-12"></div>
      <div className="absolute top-1/2 left-1/2 w-full h-8 bg-white -translate-x-1/2 rotate-45 z-0"></div>
      
      <nav className="relative z-10 flex justify-between items-center p-6 bg-white text-black border-b-8 border-black shadow-[8px_8px_0_rgba(0,0,0,0.2)]">
         <Link href="/" className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
            Corp<span className="text-blue-600">Inc.</span>
         </Link>
         <div className="hidden md:flex gap-8 font-bold">
            <span className="cursor-pointer hover:text-blue-600 flex items-center gap-2"><Briefcase size={16}/> Solutions</span>
            <span className="cursor-pointer hover:text-blue-600 flex items-center gap-2"><Users size={16}/> Synergy</span>
         </div>
         <button className="bg-black text-white px-6 py-2 font-bold hover:bg-blue-600 transition-colors shadow-[4px_4px_0_rgba(0,0,0,0.2)] active:translate-y-1 active:shadow-none">
            Contact Sales
         </button>
      </nav>

      <main className="relative z-10 container mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         
         {/* Synergy Metric */}
         <div className="bg-white text-black p-8 border-4 border-black shadow-[12px_12px_0_rgba(0,0,0,1)]">
            <h3 className="font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
               <Activity className="text-blue-600" /> Synergy Level
            </h3>
            <div className="text-6xl font-black mb-4">{Math.floor(synergy)}%</div>
            <div className="w-full bg-gray-200 h-4 border-2 border-black rounded-full overflow-hidden">
               <motion.div 
                  className="h-full bg-blue-600"
                  animate={{ width: `${synergy}%` }}
               />
            </div>
         </div>

         {/* Dynamic Chart */}
         <div className="bg-white text-black p-8 border-4 border-black shadow-[12px_12px_0_rgba(0,0,0,1)] col-span-1 lg:col-span-2">
            <h3 className="font-bold uppercase tracking-widest mb-8 flex items-center gap-2">
               <BarChart className="text-pink-500" /> Q3 Performance
            </h3>
            <div className="flex items-end justify-between h-40 gap-4">
               {chartData.map((h, i) => (
                  <motion.div 
                     key={i}
                     className="w-full bg-blue-500 border-2 border-black relative group"
                     animate={{ height: `${h}%` }}
                  >
                     <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {Math.floor(h)}%
                     </div>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Buzzword Generator */}
         <div className="bg-yellow-400 text-black p-8 border-4 border-black shadow-[12px_12px_0_rgba(0,0,0,1)] flex flex-col justify-center items-center text-center">
            <h3 className="font-bold uppercase tracking-widest mb-4">Value Add</h3>
            <div className="text-3xl font-black mb-8 min-h-[3rem]">
               {buzzword}
            </div>
            <button 
               onClick={generateReport}
               disabled={generating}
               className="bg-white px-8 py-4 font-bold border-4 border-black hover:bg-black hover:text-white transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0_black]"
            >
               {generating ? "Ideating..." : "Generate Value"}
            </button>
         </div>

         {/* Marketing Copy */}
         <div className="bg-pink-500 text-white p-8 border-4 border-black shadow-[12px_12px_0_rgba(0,0,0,1)] lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-4">
               We leverage agile frameworks.
            </h1>
            <p className="text-xl leading-relaxed font-bold opacity-90">
               Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
            </p>
         </div>

      </main>
    </div>
  );
}
