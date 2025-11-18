"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 relative overflow-hidden">
      <Navbar />
      
       <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-b from-blue-900/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="container-width relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold font-display mb-8">Get In Touch</h1>
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Have questions about the project? Interested in contributing? Found a bug or have a feature request?
              We'd love to hear from you!
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-blue-400">
                   <Mail size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-bold mb-1">GitHub</h3>
                   <a href="https://github.com/numman-ali/gemini-studio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Open an Issue</a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-purple-400">
                   <Send size={24} />
                </div>
                <div>
                   <h3 className="text-lg font-bold mb-1">Contribute</h3>
                   <p className="text-gray-400">Check out our <a href="https://github.com/numman-ali/gemini-studio/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">Contributing Guide</a></p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.2 }}
             className="bg-white/[0.02] border border-white/10 p-8 md:p-10 rounded-3xl backdrop-blur-sm"
          >
             <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">First Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="John" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400">Last Name</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Doe" />
                   </div>
                </div>
                
                <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-400">Email</label>
                   <input type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="john@example.com" />
                </div>

                <div className="space-y-2">
                   <label className="text-sm font-medium text-gray-400">Message</label>
                   <textarea className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors h-40 resize-none" placeholder="Tell us about your idea or question..." />
                </div>

                <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group">
                   Send Message <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}

