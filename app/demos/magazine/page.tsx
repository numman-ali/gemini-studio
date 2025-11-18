"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const articles = [
  { id: 1, title: "The Minimalist Revolution", category: "Design", time: "8 min read", color: "#ef4444" },
  { id: 2, title: "Typographic Excellence", category: "Typography", time: "6 min read", color: "#3b82f6" },
  { id: 3, title: "Grid Systems Masterclass", category: "Layout", time: "12 min read", color: "#10b981" },
  { id: 4, title: "Color Theory in Digital", category: "Theory", time: "10 min read", color: "#f59e0b" },
  { id: 5, title: "Photography Meets Code", category: "Visual", time: "7 min read", color: "#8b5cf6" },
  { id: 6, title: "Editorial Standards 2025", category: "Standards", time: "15 min read", color: "#ec4899" },
];

const features = [
  { title: "The Art of White Space", author: "Diana Hartwell", excerpt: "Exploring negative space as a design element in modern editorial layouts." },
  { title: "Dynamic Typography", author: "Marcus Chen", excerpt: "How variable fonts are reshaping the landscape of digital publishing." },
  { title: "Grid Rebellion", author: "Sofia Ramirez", excerpt: "Breaking free from traditional grid systems while maintaining visual harmony." },
];

export default function MagazinePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black font-serif overflow-x-hidden">
      <div className="container mx-auto max-w-7xl bg-white min-h-screen shadow-2xl relative">
         {/* Header */}
         <nav className="border-b-4 border-black p-6 flex justify-between items-center sticky top-0 bg-white z-50">
            <div className="text-xs font-black uppercase tracking-[0.3em]">Issue 24 • Spring 2025</div>
            <Link href="/" className="text-5xl font-black font-sans tracking-tighter hover:italic transition-all">EDITORIAL</Link>
            <div className="text-xs font-black uppercase tracking-[0.3em]">USD $24.00</div>
         </nav>

         {/* Hero Section */}
         <div className="grid md:grid-cols-12 gap-0 border-b-4 border-black">
            <div className="col-span-12 md:col-span-8 p-12 md:p-20 md:border-r-4 border-black relative bg-gradient-to-br from-white to-gray-50">
               <span className="absolute top-8 left-8 text-[12rem] leading-none font-black opacity-5 pointer-events-none select-none font-sans">01</span>

               <div className="relative z-10">
                  <div className="text-xs uppercase tracking-[0.5em] mb-6 font-sans font-bold text-red-600">Featured Story</div>

                  <h1 className="text-6xl md:text-9xl font-black leading-[0.85] mb-12 font-sans">
                     The Future<br/>of Digital<br/>Publishing
                  </h1>

                  <div className="grid md:grid-cols-2 gap-8 text-base leading-relaxed mb-12">
                     <div>
                        <p className="mb-6 first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:font-black first-letter:leading-none">
                           Fashion meets functionality in this exclusive look at the next generation of web interfaces.
                           We strip back the layers to reveal the raw beauty of semantic HTML, the elegance of CSS Grid,
                           and the power of modern JavaScript frameworks.
                        </p>
                        <p className="mb-6">
                           From the runways of Milan to the servers of Silicon Valley, the trend is clear:
                           minimalism is evolving. Typography is bolder. Layouts are more daring.
                           Colors are unapologetically vibrant.
                        </p>
                     </div>
                     <div>
                        <p className="mb-6">
                           In our exclusive interview with leading designers, we explore how AI-assisted design tools
                           are reshaping the creative process. The question isn't whether AI will replace designers—it's
                           how designers will harness AI to push creative boundaries further than ever before.
                        </p>
                        <p className="italic border-l-4 border-black pl-6 text-lg">
                           "The future of editorial design lies in the perfect balance between algorithmic precision
                           and human intuition."
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                     <span className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-bold">Design</span>
                     <span className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-bold">Technology</span>
                     <span className="px-4 py-2 bg-black text-white text-xs uppercase tracking-wider font-bold">AI</span>
                  </div>
               </div>
            </div>

            <div className="col-span-12 md:col-span-4 bg-gradient-to-br from-black to-gray-900 text-white p-12 flex flex-col justify-between relative overflow-hidden min-h-[600px]">
               <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80')] bg-cover bg-center"></div>
               <div className="relative z-10">
                  <div className="text-xs uppercase tracking-[0.3em] mb-4 opacity-70">Quote of the Issue</div>
                  <h2 className="text-3xl md:text-4xl font-bold italic mb-6 leading-tight">"Elegance is refusal. Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."</h2>
                  <p className="text-sm uppercase tracking-[0.3em] opacity-70">— Antoine de Saint-Exupéry</p>
               </div>
               <div className="relative z-10 space-y-4">
                  <div className="border-t border-white/20 pt-4">
                     <p className="text-xs uppercase tracking-wider opacity-70 mb-2">In This Issue</p>
                     <p className="text-sm">24 Features • 6 Interviews • 12 Case Studies</p>
                  </div>
                  <button className="w-full border-2 border-white py-4 hover:bg-white hover:text-black transition-all uppercase text-xs tracking-[0.3em] font-black">
                     Start Reading →
                  </button>
               </div>
            </div>
         </div>

         {/* Features Grid */}
         <div className="p-12 md:p-20 border-b-4 border-black">
            <div className="flex justify-between items-end mb-12">
               <h2 className="text-5xl font-black font-sans">Featured Articles</h2>
               <span className="text-xs uppercase tracking-[0.3em] font-bold">Page 02</span>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {features.map((feature, i) => (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1 }}
                     className="group cursor-pointer"
                  >
                     <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 mb-4 relative overflow-hidden border-2 border-black">
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
                           <div className="text-6xl font-black opacity-20">{String(i + 1).padStart(2, '0')}</div>
                        </div>
                     </div>
                     <h3 className="text-2xl font-black mb-2 group-hover:italic transition-all">{feature.title}</h3>
                     <p className="text-sm text-gray-600 mb-3">By {feature.author}</p>
                     <p className="text-sm leading-relaxed">{feature.excerpt}</p>
                  </motion.div>
               ))}
            </div>
         </div>

         {/* Article Cards */}
         <div className="grid md:grid-cols-3 border-b-4 border-black">
            {articles.map((article, i) => (
               <div
                  key={article.id}
                  onMouseEnter={() => setActiveSection(article.category)}
                  onMouseLeave={() => setActiveSection(null)}
                  className="p-8 border-r-4 last:border-r-0 border-black hover:bg-gray-50 transition-all group cursor-pointer relative overflow-hidden"
                  style={{
                     backgroundColor: activeSection === article.category ? `${article.color}10` : 'transparent'
                  }}
               >
                  <div
                     className="absolute top-0 left-0 w-2 h-full transition-all"
                     style={{ backgroundColor: article.color }}
                  ></div>

                  <div className="relative z-10">
                     <div className="text-xs uppercase tracking-[0.3em] font-bold mb-2" style={{ color: article.color }}>
                        {article.category}
                     </div>
                     <h3 className="text-2xl font-black mb-4 group-hover:translate-x-2 transition-transform">
                        {article.title}
                     </h3>
                     <div className="flex justify-between items-center text-xs uppercase tracking-wider opacity-60">
                        <span>{article.time}</span>
                        <span>→</span>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* Pull Quote Section */}
         <div className="p-12 md:p-20 bg-black text-white border-b-4 border-black">
            <div className="max-w-4xl mx-auto text-center">
               <div className="text-8xl md:text-[12rem] leading-none font-black mb-8 opacity-10">"</div>
               <p className="text-3xl md:text-5xl font-bold italic leading-tight mb-8">
                  Design is not just what it looks like and feels like. Design is how it works.
               </p>
               <p className="text-sm uppercase tracking-[0.5em] opacity-70">— Steve Jobs</p>
            </div>
         </div>

         {/* Stats Section */}
         <div className="grid grid-cols-2 md:grid-cols-4 border-b-4 border-black">
            {[
               { number: "24", label: "Issues Published" },
               { number: "156", label: "Featured Designers" },
               { number: "89K", label: "Monthly Readers" },
               { number: "12", label: "Countries" }
            ].map((stat, i) => (
               <div key={i} className="p-12 text-center border-r-4 last:border-r-0 border-black hover:bg-gray-50 transition-colors">
                  <div className="text-6xl font-black mb-4 font-sans">{stat.number}</div>
                  <div className="text-xs uppercase tracking-[0.3em] font-bold">{stat.label}</div>
               </div>
            ))}
         </div>

         {/* Footer */}
         <div className="p-12 md:p-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="grid md:grid-cols-3 gap-12">
               <div>
                  <h3 className="text-2xl font-black mb-4 font-sans">EDITORIAL</h3>
                  <p className="text-sm leading-relaxed mb-4">
                     A digital magazine exploring the intersection of design, technology, and culture.
                  </p>
                  <p className="text-xs uppercase tracking-wider opacity-60">Est. 2025</p>
               </div>
               <div>
                  <h4 className="text-sm uppercase tracking-[0.3em] font-bold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm">
                     <li><a href="#" className="hover:underline">About Us</a></li>
                     <li><a href="#" className="hover:underline">Contributors</a></li>
                     <li><a href="#" className="hover:underline">Advertise</a></li>
                     <li><a href="#" className="hover:underline">Subscribe</a></li>
                  </ul>
               </div>
               <div>
                  <h4 className="text-sm uppercase tracking-[0.3em] font-bold mb-4">Newsletter</h4>
                  <p className="text-sm mb-4">Get the latest stories delivered to your inbox.</p>
                  <div className="flex border-2 border-black">
                     <input
                        type="email"
                        placeholder="Your email"
                        className="flex-1 px-4 py-3 text-sm focus:outline-none"
                     />
                     <button className="px-6 py-3 bg-black text-white text-xs uppercase tracking-wider font-bold hover:bg-gray-800 transition-colors">
                        →
                     </button>
                  </div>
               </div>
            </div>

            <div className="mt-12 pt-8 border-t-2 border-black flex justify-between items-center text-xs uppercase tracking-wider">
               <span>© 2025 Editorial Magazine</span>
               <Link href="/" className="hover:underline font-bold">← Back to Gemini Studio</Link>
            </div>
         </div>
      </div>
    </div>
  );
}

