import Link from "next/link";

export default function GothicPage() {
  return (
    <div className="min-h-screen bg-[#1a0f0f] text-[#8a0909] font-serif flex flex-col items-center p-8 selection:bg-red-900 selection:text-white">
       <Link href="/" className="absolute top-8 left-8 text-xs uppercase tracking-[0.3em] hover:text-white transition-colors z-50">
         Return
       </Link>

       <div className="border-[20px] border-double border-[#4a0404] p-12 max-w-3xl w-full relative mt-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#1a0f0f] border-4 border-[#4a0404] rotate-45"></div>
          
          <div className="text-center mb-16">
             <h1 className="text-7xl md:text-9xl mb-4 font-black tracking-tight mix-blend-difference text-[#ff0000] opacity-80" style={{ fontFamily: 'Impact, fantasy' }}>
                MORTALIS
             </h1>
             <p className="text-xl italic text-gray-500 tracking-widest border-t border-b border-[#4a0404] py-4 inline-block">
                Est. MMXXV
             </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 text-justify leading-loose text-gray-400">
             <p>
                <span className="text-6xl float-left mr-4 text-[#8a0909] font-black">L</span>orem ipsum dolor sit amet, consectetur adipiscing elit. 
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
             </p>
             <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident.
             </p>
          </div>

          <div className="mt-16 text-center">
             <button className="px-12 py-4 border border-[#8a0909] text-[#8a0909] hover:bg-[#8a0909] hover:text-black transition-all duration-500 uppercase tracking-[0.5em] text-xs">
                Enter Crypt
             </button>
          </div>
       </div>
    </div>
  );
}

