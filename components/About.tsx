"use client";

import { motion } from "framer-motion";
import { Code, Cpu, Globe, Zap } from "lucide-react";

const skills = [
  { name: "Frontend", icon: <Globe size={24} />, items: ["React", "Next.js", "Tailwind CSS", "Three.js"] },
  { name: "Backend", icon: <Cpu size={24} />, items: ["Node.js", "Python", "PostgreSQL", "Redis"] },
  { name: "DevOps", icon: <Zap size={24} />, items: ["Docker", "AWS", "CI/CD", "Git"] },
  { name: "AI/ML", icon: <Code size={24} />, items: ["TensorFlow", "OpenAI API", "LangChain", "HuggingFace"] },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">About <span className="text-gradient">Me</span></h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              I'm a passionate developer who bridges the gap between design and engineering. 
              With a background in both creative arts and computer science, I bring a unique perspective to every project.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source, 
              or sharing my knowledge through technical writing and mentoring.
            </p>
            
            <div className="flex gap-8">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-blue-400">5+</h3>
                <p className="text-gray-500 text-sm">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-purple-400">50+</h3>
                <p className="text-gray-500 text-sm">Projects Completed</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-emerald-400">20+</h3>
                <p className="text-gray-500 text-sm">Happy Clients</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {skills.map((skill, index) => (
              <div key={index} className="bg-black/40 p-6 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-colors">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center text-blue-400 mb-4">
                  {skill.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{skill.name}</h3>
                <ul className="space-y-2">
                  {skill.items.map(item => (
                    <li key={item} className="text-gray-400 text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

