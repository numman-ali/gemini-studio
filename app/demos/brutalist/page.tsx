"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BrutalistPage() {
  const [activePrinciple, setActivePrinciple] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submittedData, setSubmittedData] = useState<any[]>([]);
  const [dataMetrics, setDataMetrics] = useState({ users: 1247, requests: 89234, errors: 42 });

  const principles = [
    {
      title: "FUNCTIONALITY FIRST",
      desc: "Every element serves a purpose. No decorative bloat. If it doesn't function, it doesn't exist.",
      color: "bg-red-600"
    },
    {
      title: "VISIBLE STRUCTURE",
      desc: "The construction is the aesthetic. Borders, grids, boxes—all exposed. HTML is the material.",
      color: "bg-blue-600"
    },
    {
      title: "HONESTY OF MATERIALS",
      desc: "Digital materials used as-is. No skeuomorphism. A button looks like a button, a link like a link.",
      color: "bg-yellow-400 text-black"
    },
    {
      title: "ASYMMETRIC LAYOUTS",
      desc: "Reject perfect balance. Embrace dynamic tension. Left-align. Break the grid intentionally.",
      color: "bg-black text-white"
    },
    {
      title: "TYPOGRAPHY AS STRUCTURE",
      desc: "Giant headlines. System fonts. Bold weights. Text isn't decoration—it's architecture.",
      color: "bg-green-600"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setDataMetrics(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        requests: prev.requests + Math.floor(Math.random() * 100),
        errors: prev.errors + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setSubmittedData(prev => [{
        ...formData,
        timestamp: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      }, ...prev].slice(0, 10));
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      {/* Header */}
      <header className="border-b-8 border-black p-4 md:p-8 flex justify-between items-start sticky top-0 bg-[#f0f0f0] z-50">
        <div>
          <h1 className="text-6xl md:text-9xl font-black font-sans uppercase leading-[0.75] tracking-tighter">
            BRUTAL<br/>ISM
          </h1>
          <p className="text-sm md:text-base font-bold uppercase mt-2 tracking-widest">Web Design Manifesto</p>
        </div>
        <Link href="/" className="bg-black text-white text-lg md:text-xl font-black px-6 py-3 hover:bg-red-600 transition-colors uppercase border-4 border-black hover:border-red-600">
          ← EXIT
        </Link>
      </header>

      {/* Marquee */}
      <div className="border-b-4 border-black bg-yellow-400 overflow-hidden py-4">
        <motion.div
          animate={{ x: ["0%", "-100%"] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="whitespace-nowrap text-2xl md:text-4xl font-black uppercase"
        >
          FUNCTION OVER FORM • RAW STRUCTURE • NO ORNAMENTATION • VISIBLE GRIDS • HONEST MATERIALS • ASYMMETRIC TENSION •
          FUNCTION OVER FORM • RAW STRUCTURE • NO ORNAMENTATION • VISIBLE GRIDS • HONEST MATERIALS • ASYMMETRIC TENSION •
        </motion.div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-3 border-b-4 border-black">
        <div className="border-r-4 border-black p-6 bg-white">
          <div className="text-5xl md:text-7xl font-black tabular-nums">{dataMetrics.users.toLocaleString()}</div>
          <div className="text-xs md:text-sm font-bold uppercase mt-2 tracking-widest">Active Users</div>
        </div>
        <div className="border-r-4 border-black p-6 bg-black text-white">
          <div className="text-5xl md:text-7xl font-black tabular-nums">{dataMetrics.requests.toLocaleString()}</div>
          <div className="text-xs md:text-sm font-bold uppercase mt-2 tracking-widest">API Requests</div>
        </div>
        <div className="p-6 bg-red-600 text-white">
          <div className="text-5xl md:text-7xl font-black tabular-nums">{dataMetrics.errors}</div>
          <div className="text-xs md:text-sm font-bold uppercase mt-2 tracking-widest">System Errors</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-2">
        {/* Left Column - Principles */}
        <div className="border-b-4 md:border-b-0 md:border-r-4 border-black">
          {/* Principle Tabs */}
          <div className="flex border-b-4 border-black overflow-x-auto">
            {principles.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePrinciple(i)}
                className={`px-6 py-4 font-black text-xs md:text-sm uppercase whitespace-nowrap border-r-4 border-black transition-colors ${
                  activePrinciple === i ? 'bg-black text-white' : 'bg-white hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Active Principle */}
          <div className={`p-8 md:p-12 min-h-[400px] flex flex-col justify-center ${principles[activePrinciple].color}`}>
            <motion.div
              key={activePrinciple}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-4xl md:text-6xl font-black uppercase mb-6 leading-tight">
                {principles[activePrinciple].title}
              </h2>
              <p className="text-lg md:text-2xl font-bold leading-tight max-w-lg">
                {principles[activePrinciple].desc}
              </p>
            </motion.div>
          </div>

          {/* Typography Showcase */}
          <div className="border-t-4 border-black p-8 bg-white">
            <h3 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Typography Scale</h3>
            <div className="space-y-4">
              <div className="text-6xl font-black leading-none">H1</div>
              <div className="text-4xl font-black leading-none">H2</div>
              <div className="text-2xl font-black leading-none">H3</div>
              <div className="text-xl font-bold">Body Bold</div>
              <div className="text-base font-bold">Body Regular</div>
              <div className="text-sm font-bold uppercase tracking-widest">Small Caps</div>
            </div>
          </div>
        </div>

        {/* Right Column - Interactive Form & Data */}
        <div className="flex flex-col">
          {/* Form */}
          <div className="p-8 bg-blue-600 text-white border-b-4 border-black">
            <h3 className="text-4xl md:text-5xl font-black uppercase mb-6">Submit Data</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-4 bg-white text-black border-4 border-black font-bold text-lg focus:outline-none focus:border-yellow-400"
                  placeholder="YOUR NAME"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-4 bg-white text-black border-4 border-black font-bold text-lg focus:outline-none focus:border-yellow-400"
                  placeholder="YOUR@EMAIL.COM"
                />
              </div>
              <div>
                <label className="block text-sm font-black uppercase tracking-widest mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 bg-white text-black border-4 border-black font-bold text-lg focus:outline-none focus:border-yellow-400 resize-none"
                  rows={4}
                  placeholder="YOUR MESSAGE HERE..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 text-black border-4 border-black p-4 text-2xl font-black uppercase hover:bg-black hover:text-white transition-colors shadow-[8px_8px_0_black] active:shadow-none active:translate-x-2 active:translate-y-2"
              >
                → SUBMIT
              </button>
            </form>
          </div>

          {/* Submitted Data Log */}
          <div className="p-8 bg-black text-green-400 flex-1 overflow-auto">
            <h3 className="text-2xl font-black uppercase mb-4 font-mono">SUBMISSION LOG</h3>
            <div className="font-mono text-xs md:text-sm space-y-3">
              {submittedData.length === 0 ? (
                <div className="text-gray-600 font-bold">NO SUBMISSIONS YET...</div>
              ) : (
                submittedData.map((item) => (
                  <div key={item.id} className="border-l-4 border-green-400 pl-4 pb-3">
                    <div className="font-black text-white">ID: {item.id.toUpperCase()}</div>
                    <div>NAME: {item.name}</div>
                    <div>EMAIL: {item.email}</div>
                    {item.message && <div>MSG: {item.message}</div>}
                    <div className="text-gray-500 text-xs mt-1">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Color Palette */}
          <div className="border-t-4 border-black grid grid-cols-5">
            <div className="bg-white border-r-4 border-black h-20"></div>
            <div className="bg-black border-r-4 border-black h-20"></div>
            <div className="bg-red-600 border-r-4 border-black h-20"></div>
            <div className="bg-blue-600 border-r-4 border-black h-20"></div>
            <div className="bg-yellow-400 h-20"></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-8 border-black p-8 md:p-12 bg-white">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-2xl font-black uppercase mb-4">Philosophy</h4>
            <p className="font-bold text-sm leading-relaxed">
              Brutalism rejects digital decoration. It exposes the raw structure of the web—HTML, CSS, the DOM itself.
              Borders replace shadows. System fonts replace custom typefaces. The interface is the skeleton.
            </p>
          </div>
          <div>
            <h4 className="text-2xl font-black uppercase mb-4">Principles</h4>
            <ul className="space-y-2 font-bold text-sm">
              <li className="border-l-4 border-black pl-4">NO GRADIENTS</li>
              <li className="border-l-4 border-black pl-4">NO ROUNDED CORNERS</li>
              <li className="border-l-4 border-black pl-4">NO SUBTLE SHADOWS</li>
              <li className="border-l-4 border-black pl-4">HARD EDGES ONLY</li>
              <li className="border-l-4 border-black pl-4">VISIBLE STRUCTURE</li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl font-black uppercase mb-4">Credits</h4>
            <p className="font-bold text-sm">
              BUILT WITH GEMINI AI<br/>
              © 2025 GEMINI STUDIO<br/>
              ALL STRUCTURE EXPOSED<br/>
              <Link href="/" className="underline hover:bg-black hover:text-white">RETURN HOME</Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
