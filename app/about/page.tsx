"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <Navbar />

      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-12">About This Project</h1>

          <div className="prose prose-invert prose-lg prose-headings:font-display prose-a:text-blue-400 hover:prose-a:text-blue-300 max-w-none">
            <p className="text-2xl text-gray-300 leading-relaxed mb-8">
              Gemini Studio is a showcase of what's possible when you combine Google Gemini AI with modern web technologies.
              This collection of 24 interactive demos demonstrates the creative potential and technical capabilities
              achievable through AI-assisted development.
            </p>

            <div className="grid md:grid-cols-2 gap-12 my-16">
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">The Vision</h3>
                <p className="text-gray-400">
                  This project explores the intersection of artificial intelligence and creative coding. Each demo
                  represents a unique experiment in interactive design, from 3D graphics and physics simulations to
                  audio synthesis and data visualization. The goal is to push the boundaries of what can be built
                  with AI assistance while maintaining high code quality and performance.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6 text-white">Built With AI</h3>
                <p className="text-gray-400">
                  Every component, interaction, and visual effect in Gemini Studio was developed with the assistance
                  of Google Gemini AI. This project serves as a testament to how AI can accelerate development,
                  inspire creativity, and help bring ambitious ideas to life through intelligent code generation
                  and problem-solving.
                </p>
              </div>
            </div>

            <hr className="border-white/10 my-16" />

            <h3 className="text-3xl font-bold mb-8">Technology Stack</h3>
            <div className="space-y-8">
               {[
                 {
                   category: "Framework & Core",
                   techs: "Next.js 15, React 19, TypeScript",
                   desc: "Modern web framework with server-side rendering and optimized performance."
                 },
                 {
                   category: "3D Graphics & Animation",
                   techs: "Three.js, React Three Fiber, Framer Motion",
                   desc: "Powerful libraries for creating immersive 3D scenes and smooth animations."
                 },
                 {
                   category: "Physics & Audio",
                   techs: "Matter.js, Tone.js",
                   desc: "Realistic physics simulations and browser-based audio synthesis."
                 },
                 {
                   category: "Styling & UI",
                   techs: "Tailwind CSS, Custom Components",
                   desc: "Utility-first CSS framework with custom-designed interactive components."
                 }
               ].map((item, i) => (
                 <div key={i} className="border-l-2 border-blue-500 pl-6">
                    <h4 className="text-xl font-bold text-white mb-2">{item.category}</h4>
                    <p className="text-blue-400 font-mono text-sm mb-2">{item.techs}</p>
                    <p className="text-gray-400 text-base">{item.desc}</p>
                 </div>
               ))}
            </div>

            <hr className="border-white/10 my-16" />

            <div className="bg-gradient-to-br from-blue-950/30 to-purple-950/30 border border-blue-500/20 rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-4">Open Source</h3>
              <p className="text-gray-300 mb-4">
                Gemini Studio is open source and available under the MIT License. Feel free to explore the code,
                learn from the implementations, and use it as inspiration for your own projects.
              </p>
              <a
                href="https://github.com/numman-ali/gemini-studio"
                className="inline-block text-blue-400 hover:text-blue-300 font-mono text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

