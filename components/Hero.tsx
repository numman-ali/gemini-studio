"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
            Available for freelance work
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Building digital <br />
            <span className="text-gradient">experiences</span> that matter.
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-lg">
            I'm Alex, a full-stack developer passionate about crafting beautiful, high-performance interfaces and robust backend systems.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="#projects"
              className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              View Projects <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="#contact"
              className="px-8 py-4 border border-white/20 rounded-full font-bold flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              Contact Me
            </Link>
          </div>

          <div className="mt-12 flex items-center gap-6 text-gray-400">
            <Link href="#" className="hover:text-white transition-colors"><Github size={24} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><Twitter size={24} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><Linkedin size={24} /></Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 bg-gradient-to-tr from-gray-800 to-gray-900 rounded-2xl p-6 border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex">
                <span className="text-purple-400 mr-2">const</span>
                <span className="text-yellow-400">developer</span>
                <span className="text-white mx-2">=</span>
                <span className="text-white">{`{`}</span>
              </div>
              <div className="pl-4">
                <span className="text-blue-400">name:</span> <span className="text-green-400">"Alex"</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">skills:</span> <span className="text-white">[</span>
                <span className="text-green-400">"React"</span>, <span className="text-green-400">"Node"</span>, <span className="text-green-400">"AI"</span>
                <span className="text-white">]</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">hardWorker:</span> <span className="text-orange-400">true</span>,
              </div>
              <div className="pl-4">
                <span className="text-blue-400">hireable:</span> <span className="text-blue-400">function</span>() <span className="text-white">{`{`}</span>
              </div>
              <div className="pl-8">
                <span className="text-purple-400">return</span> <span className="text-orange-400">true</span>;
              </div>
              <div className="pl-4 text-white">{`}`}</div>
              <div className="text-white">{`};`}</div>
            </div>
          </div>
          
          {/* Decorative shapes */}
          <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl" />
        </motion.div>
      </div>
    </section>
  );
}

