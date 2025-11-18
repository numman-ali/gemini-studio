"use client";

import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "FinDash",
    category: "SaaS Product",
    description: "A comprehensive financial analytics dashboard allowing users to track expenses, visualize trends, and forecast future spending using machine learning models.",
    stack: ["Next.js", "TypeScript", "Python", "D3.js"],
    year: "2024"
  },
  {
    title: "Lumina",
    category: "E-Commerce",
    description: "A high-performance headless e-commerce storefront built for a fashion brand, featuring real-time inventory management and 3D product previews.",
    stack: ["React", "Shopify API", "Three.js", "Tailwind"],
    year: "2023"
  },
  {
    title: "TaskFlow",
    category: "Productivity",
    description: "Collaborative project management tool designed for remote teams, with real-time updates, video conferencing integration, and automated workflows.",
    stack: ["Vue.js", "Firebase", "WebRTC", "Node.js"],
    year: "2023"
  },
  {
    title: "Echo",
    category: "Social Media",
    description: "A decentralized social networking protocol proof-of-concept focusing on user privacy and data ownership.",
    stack: ["Solidity", "Next.js", "IPFS", "GraphQL"],
    year: "2022"
  }
];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20">
      <Navbar />
      
      <div className="container-width">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-display mb-6">Selected Works</h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-20">
             A collection of projects that define my journey in software engineering and design.
          </p>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group border-t border-white/10 py-12 hover:bg-white/[0.02] transition-colors"
              >
                <div className="grid md:grid-cols-12 gap-8 items-start">
                   <div className="md:col-span-2">
                      <span className="font-mono text-sm text-gray-500">{project.year}</span>
                   </div>
                   <div className="md:col-span-6">
                      <h3 className="text-3xl font-bold mb-4 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                      <p className="text-gray-400 text-lg leading-relaxed mb-6">{project.description}</p>
                      <div className="flex flex-wrap gap-3">
                        {project.stack.map(tech => (
                          <span key={tech} className="text-sm px-3 py-1 rounded-full border border-white/10 bg-white/5 text-gray-300">
                            {tech}
                          </span>
                        ))}
                      </div>
                   </div>
                   <div className="md:col-span-4 flex md:justify-end gap-4 items-start pt-2">
                      <Link href="#" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors">
                        <ExternalLink size={20} />
                      </Link>
                      <Link href="#" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-colors">
                        <Github size={20} />
                      </Link>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}

