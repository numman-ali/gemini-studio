import Link from "next/link";

export default function MagazinePage() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-black font-serif overflow-x-hidden">
      <div className="container mx-auto max-w-6xl bg-white min-h-screen shadow-2xl">
         <nav className="border-b border-black p-4 flex justify-between items-center sticky top-0 bg-white z-50">
            <div className="text-xs font-bold uppercase tracking-widest">Issue 24 • Spring 2025</div>
            <Link href="/" className="text-4xl font-bold font-sans tracking-tighter">VOGUE.DEV</Link>
            <div className="text-xs font-bold uppercase tracking-widest">USD $24.00</div>
         </nav>

         <div className="grid md:grid-cols-12 gap-0 border-b border-black">
            <div className="col-span-12 md:col-span-8 p-12 md:p-20 md:border-r border-black relative">
               <span className="absolute top-4 left-4 text-[10rem] leading-none font-bold opacity-5 pointer-events-none select-none">01</span>
               
               <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-12 font-sans">
                  The Future<br/>of Code<br/>is Here.
               </h1>
               
               <div className="columns-2 gap-8 text-sm leading-relaxed text-justify">
                  <p className="mb-4 first-letter:text-5xl first-letter:float-left first-letter:mr-2 first-letter:font-bold">
                     Fashion meets functionality in this exclusive look at the next generation of web interfaces. 
                     We strip back the layers to reveal the raw beauty of semantic HTML.
                  </p>
                  <p>
                     From the runways of Milan to the servers of Silicon Valley, the trend is clear: 
                     Minimalism is out, Maximalism is in. Prepare your retina displays for an assault of color.
                  </p>
               </div>
            </div>
            
            <div className="col-span-12 md:col-span-4 bg-black text-white p-12 flex flex-col justify-between relative overflow-hidden">
               <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale"></div>
               <div className="relative z-10">
                  <h2 className="text-2xl font-bold italic mb-4 font-serif">"Elegance is refusal."</h2>
                  <p className="text-xs uppercase tracking-widest">— Coco Chanel</p>
               </div>
               <button className="relative z-10 w-full border border-white py-4 hover:bg-white hover:text-black transition-colors uppercase text-xs tracking-widest font-bold">
                  Read Feature
               </button>
            </div>
         </div>

         <div className="grid grid-cols-3 h-64 divide-x divide-black border-b border-black">
            {[1, 2, 3].map((i) => (
               <div key={i} className="p-8 flex flex-col justify-between hover:bg-gray-50 transition-colors group cursor-pointer">
                  <div className="w-full h-32 bg-gray-200 mb-4 grayscale group-hover:grayscale-0 transition-all"></div>
                  <h3 className="font-bold uppercase text-sm tracking-wider">Article 0{i}</h3>
               </div>
            ))}
         </div>
      </div>
    </div>
  );
}

