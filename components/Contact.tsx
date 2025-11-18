"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10" />
       
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Let's work <br /><span className="text-gradient">together</span></h2>
              <p className="text-gray-400 mb-8">
                I'm currently available for freelance projects and open to new opportunities. 
                If you have a project in mind or just want to say hi, feel free to reach out.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 text-blue-400">
                    <Mail size={20} />
                  </div>
                  hello@alex.dev
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 text-purple-400">
                    <Phone size={20} />
                  </div>
                  +1 (555) 123-4567
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mr-4 text-emerald-400">
                    <MapPin size={20} />
                  </div>
                  San Francisco, CA
                </div>
              </div>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea 
                  className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors h-32 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-600/20"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

