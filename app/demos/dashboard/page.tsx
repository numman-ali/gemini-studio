"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { RefreshCcw, ArrowUpRight, ArrowDownRight, Wallet, TrendingUp, Activity } from "lucide-react";

export default function DashboardPage() {
  const [prices, setPrices] = useState([
     { name: "Bitcoin", symbol: "BTC", price: 64231.45, change: 2.4 },
     { name: "Ethereum", symbol: "ETH", price: 3452.12, change: -1.2 },
     { name: "Solana", symbol: "SOL", price: 145.67, change: 5.8 },
     { name: "Cardano", symbol: "ADA", price: 0.45, change: 0.5 },
  ]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
     // Generate initial chart data
     const initialData = Array(20).fill(0).map(() => Math.random() * 100);
     setChartData(initialData);

     const interval = setInterval(() => {
        // Update prices
        setPrices(prev => prev.map(coin => ({
           ...coin,
           price: coin.price * (1 + (Math.random() - 0.5) * 0.002),
           change: coin.change + (Math.random() - 0.5) * 0.1
        })));

        // Update chart
        setChartData(prev => [...prev.slice(1), Math.random() * 100]);
     }, 2000);

     return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans p-4 md:p-8 selection:bg-blue-500 transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
         {/* Top Bar */}
         <header className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
               <Link href="/" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold hover:bg-blue-500 transition-colors">
                  G
               </Link>
               <h1 className="text-xl font-bold text-gray-300">FinTech<span className="text-blue-500">Pro</span></h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-400">
               <span className="flex items-center gap-2"><Activity size={16} className="animate-pulse text-green-500" /> System Operational</span>
               <div className="w-8 h-8 bg-gray-700 rounded-full overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-tr from-blue-400 to-purple-500"></div>
               </div>
            </div>
         </header>

         {/* Main Grid */}
         <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Sidebar */}
            <div className="hidden md:block md:col-span-2 space-y-2">
               {['Dashboard', 'Analytics', 'Wallets', 'Transactions', 'Exchange', 'Settings'].map((item, i) => (
                  <div key={item} className={`p-3 rounded-lg cursor-pointer text-sm font-medium flex items-center gap-3 transition-all ${i === 0 ? 'bg-blue-600/10 text-blue-400 border-l-2 border-blue-500' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                     {i === 0 && <TrendingUp size={16} />}
                     {i === 2 && <Wallet size={16} />}
                     {item}
                  </div>
               ))}
            </div>

            {/* Center Content */}
            <div className="col-span-12 md:col-span-7 space-y-6">
               {/* Balance Card */}
               <div className="bg-[#1e293b] rounded-2xl p-8 relative overflow-hidden border border-white/5 shadow-xl group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity group-hover:opacity-70"></div>
                  <p className="text-gray-400 text-sm mb-2 flex items-center gap-2">Total Balance <RefreshCcw size={12} className="cursor-pointer hover:rotate-180 transition-transform" /></p>
                  <h2 className="text-4xl font-bold mb-6 font-mono tracking-tight">${prices[0].price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                  <div className="flex gap-4">
                     <button className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 active:scale-95">Deposit</button>
                     <button className="bg-[#334155] hover:bg-[#475569] px-6 py-2 rounded-lg font-bold text-sm transition-all hover:scale-105 active:scale-95">Withdraw</button>
                  </div>
               </div>

               {/* Live Chart */}
               <div className="bg-[#1e293b] rounded-2xl p-6 h-72 flex flex-col border border-white/5">
                  <div className="flex justify-between mb-4">
                     <h3 className="font-bold">Live Market</h3>
                     <span className="text-xs text-green-400 flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live</span>
                  </div>
                  <div className="flex-1 flex items-end justify-between gap-1 relative">
                      {/* Grid lines */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                         <div className="border-b border-white w-full"></div>
                         <div className="border-b border-white w-full"></div>
                         <div className="border-b border-white w-full"></div>
                         <div className="border-b border-white w-full"></div>
                      </div>

                     {chartData.map((h, i) => (
                        <motion.div 
                          key={i}
                          layoutId={`bar-${i}`}
                          animate={{ height: `${h}%` }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500 rounded-t-sm relative group cursor-pointer"
                        >
                           <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 border border-white/10">
                              Vol: {Math.floor(h * 100)}
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* Live Ticker */}
               <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/5">
                  <h3 className="font-bold mb-4">Market Overview</h3>
                  <div className="space-y-4">
                     {prices.map((coin) => (
                        <div key={coin.symbol} className="flex justify-between items-center p-3 hover:bg-white/5 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-white/5">
                           <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${coin.change > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                 {coin.symbol[0]}
                              </div>
                              <div>
                                 <p className="font-bold text-sm">{coin.name}</p>
                                 <p className="text-xs text-gray-500">{coin.symbol}</p>
                              </div>
                           </div>
                           <div className="text-right">
                              <p className="font-mono font-bold">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                              <p className={`text-xs flex items-center justify-end gap-1 ${coin.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                 {coin.change > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                                 {Math.abs(coin.change).toFixed(2)}%
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-12 md:col-span-3 space-y-6">
               <div className="bg-[#1e293b] rounded-2xl p-6 border border-white/5">
                  <h3 className="font-bold mb-4">My Cards</h3>
                  <div className="aspect-video bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl p-4 flex flex-col justify-between shadow-lg mb-4 relative overflow-hidden hover:scale-105 transition-transform duration-300">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                     <div className="flex justify-between relative z-10">
                        <span className="font-bold italic">VISA</span>
                        <span className="opacity-80">Debit</span>
                     </div>
                     <div className="relative z-10">
                        <p className="font-mono text-sm mb-1 tracking-widest">**** **** **** 4242</p>
                        <p className="text-xs opacity-80 uppercase">Alex Developer</p>
                     </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm text-gray-400">Card Limit</span>
                     <span className="text-sm font-bold">$5,000 / $10,000</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: "50%" }}
                       transition={{ duration: 1, delay: 0.5 }}
                       className="bg-blue-500 h-full"
                     />
                  </div>
               </div>

               <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-2xl p-6 text-center">
                  <h3 className="font-bold text-lg mb-2">Premium Plan</h3>
                  <p className="text-sm text-blue-200 mb-6">Get access to advanced trading tools and lower fees.</p>
                  <button className="w-full bg-white text-blue-600 py-3 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                     Upgrade Now
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
