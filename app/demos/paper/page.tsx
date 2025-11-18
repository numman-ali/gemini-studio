import Link from "next/link";

export default function PaperPage() {
  return (
    <div className="min-h-screen bg-[#f4e4bc] text-[#4a3b2a] font-serif overflow-hidden relative" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cream-paper.png")' }}>
      
      <div className="container mx-auto px-8 py-12 max-w-4xl relative z-10">
         <Link href="/" className="inline-block mb-12 -rotate-2 bg-white p-4 shadow-lg hover:rotate-0 transition-transform duration-300 cursor-pointer border border-gray-200">
            <span className="font-bold uppercase tracking-widest text-sm">← Back to Index</span>
         </Link>

         <div className="bg-white p-8 md:p-16 shadow-[10px_10px_0_rgba(0,0,0,0.1)] rotate-1 transform-origin-top-left relative mb-16">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-red-500 rounded-full opacity-80 mix-blend-multiply"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500 rounded-full opacity-80 mix-blend-multiply"></div>
            
            <h1 className="text-6xl md:text-8xl font-black uppercase mb-6 relative z-10 mix-blend-hard-light">
               Cut<br/>Out.
            </h1>
            <p className="text-2xl font-light italic relative z-10 leading-relaxed">
               "Digital collage is the art of reassembling the fragmented reality of the internet."
            </p>
         </div>

         <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-[#2a2a2a] text-[#f4e4bc] p-8 -rotate-3 shadow-xl relative">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-12 bg-[#e0d0a0] opacity-80"></div>
               <h2 className="text-3xl font-bold uppercase mb-4 border-b border-[#f4e4bc] pb-2">Texture</h2>
               <p className="text-sm leading-7">
                  Adding noise, grain, and subtle imperfections brings warmth to the cold screen. 
                  We simulate the tactile in a world of glass.
               </p>
            </div>

            <div className="bg-[#e85d04] text-white p-8 rotate-2 shadow-xl relative top-12">
               <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-12 bg-[#e0d0a0] opacity-80"></div>
               <h2 className="text-3xl font-bold uppercase mb-4 border-b border-white pb-2">Layers</h2>
               <p className="text-sm leading-7">
                  Depth is created not by shadows alone, but by the physical stacking of elements.
                  Paper on paper. Idea on idea.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}

