"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "AI Sass Dashboard",
    description: "A comprehensive analytics dashboard powered by AI to predict user trends and behaviors.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Tailwind"],
    links: { demo: "#", repo: "#" },
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "E-Commerce Platform",
    description: "Modern shopping experience with real-time inventory, secure payments, and an intuitive UI.",
    tags: ["React", "Node.js", "Stripe", "PostgreSQL"],
    links: { demo: "#", repo: "#" },
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Task Management App",
    description: "Collaborative tool for teams to organize, track, and manage workflows efficiently.",
    tags: ["Vue", "Firebase", "Tailwind", "Pinia"],
    links: { demo: "#", repo: "#" },
    color: "from-orange-500 to-red-500"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A selection of projects that showcase my technical skills and creative problem-solving abilities.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-colors"
            >
              <div className={`h-48 bg-gradient-to-br ${project.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center`}>
                 <div className="bg-black/20 p-4 rounded-full backdrop-blur-sm">
                    {/* Placeholder for project image */}
                    <span className="font-bold text-white text-xl tracking-widest">PROJECT {index + 1}</span>
                 </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm line-clamp-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                  <Link href={project.links.demo} className="flex items-center text-sm font-medium text-white hover:text-blue-400 transition-colors">
                    <ExternalLink size={16} className="mr-2" /> Live Demo
                  </Link>
                  <Link href={project.links.repo} className="flex items-center text-sm font-medium text-gray-400 hover:text-white transition-colors">
                    <Github size={16} className="mr-2" /> Code
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

