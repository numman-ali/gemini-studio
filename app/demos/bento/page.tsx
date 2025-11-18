import Link from "next/link";
import { LayoutGrid, Battery, Wifi, Signal, Calendar, Clock, Music, Mail } from "lucide-react";

export default function BentoPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-black font-sans p-8 md:p-16 flex items-center justify-center">
      <Link href="/" className="fixed top-8 left-8 w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center hover:scale-105 transition-transform">
         <LayoutGrid size={20} />
      </Link>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
         {/* Profile Card */}
         <div className="col-span-1 md:col-span-2 row-span-2 bg-white rounded-[3rem] p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
            <div className="relative z-10">
               <div className="w-24 h-24 bg-gray-200 rounded-full mb-6 overflow-hidden">
                   <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80" alt="Profile" className="w-full h-full object-cover" />
               </div>
               <h1 className="text-4xl font-bold mb-2">Alex Dev</h1>
               <p className="text-gray-500 text-lg">Product Designer &<br/>Creative Developer</p>
            </div>
            <div className="flex gap-4">
               <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center">
                  <Mail size={20} />
               </div>
               <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <Wifi size={20} />
               </div>
            </div>
         </div>

         {/* Map/Location */}
         <div className="col-span-1 md:col-span-2 bg-green-100 rounded-[3rem] p-8 relative overflow-hidden group cursor-pointer">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold shadow-sm">
               San Francisco, CA
            </div>
         </div>

         {/* Music Player */}
         <div className="col-span-1 bg-[#ff2d55] text-white rounded-[3rem] p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
            <div className="absolute right-8 top-8 animate-pulse">
               <Music size={24} />
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl mb-auto backdrop-blur-sm"></div>
            <div>
               <h3 className="font-bold text-lg leading-tight">Midnight<br/>City</h3>
               <p className="text-white/70 text-sm">M83</p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-black/20 h-1 rounded-full mt-4 overflow-hidden">
               <div className="bg-white w-2/3 h-full rounded-full"></div>
            </div>
         </div>

         {/* Calendar */}
         <div className="col-span-1 bg-white rounded-[3rem] p-6 flex flex-col items-center justify-center shadow-sm text-center">
            <p className="text-red-500 font-bold uppercase text-sm mb-2">Tuesday</p>
            <h2 className="text-6xl font-light mb-2">18</h2>
            <div className="flex gap-1 justify-center mt-2">
               <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
               <div className="w-2 h-2 bg-black rounded-full"></div>
               <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
         </div>

         {/* Stats */}
         <div className="col-span-1 md:col-span-2 bg-black text-white rounded-[3rem] p-8 flex items-center justify-between shadow-sm">
            <div>
               <h3 className="text-gray-400 text-sm uppercase font-bold mb-1">Activity</h3>
               <div className="text-5xl font-bold">8,432</div>
               <div className="text-sm text-gray-500 mt-1">Steps today</div>
            </div>
            <div className="h-32 w-32 rounded-full border-8 border-gray-800 border-t-green-500 rotate-45"></div>
         </div>
         
         {/* Toggle Toggles */}
         <div className="col-span-1 bg-white rounded-[3rem] p-4 grid grid-cols-2 gap-4">
            <div className="bg-blue-500 rounded-2xl flex items-center justify-center text-white">
               <Wifi />
            </div>
            <div className="bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
               <Battery />
            </div>
            <div className="bg-gray-100 rounded-2xl flex items-center justify-center text-gray-500">
               <Signal />
            </div>
            <div className="bg-green-500 rounded-2xl flex items-center justify-center text-white">
               <Clock />
            </div>
         </div>
      </div>
    </div>
  );
}

