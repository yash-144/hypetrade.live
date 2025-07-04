// Add this at the very top of the file to enable client-side interactivity
"use client";

import { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, CheckCircle, Flame, Sparkles, ChevronDown, Bell, User } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import React from 'react';

// --- DATA (Simulating fetch from /data/creators.ts) ---
const allCreators = [
  { id: 1, name: "MrBeast", image: "https://i.pravatar.cc/150?u=mrbeast", price: 74.12, change: 5.12, changeType: 'increase' as const, tag: '🔥 Trending', priceHistory: [{v: 40}, {v: 50}, {v: 45}, {v: 60}, {v: 55}, {v: 70}, {v: 74}] },
  { id: 2, name: "MKBHD", image: "https://i.pravatar.cc/150?u=mkbhd", price: 66.01, change: -1.20, changeType: 'decrease' as const, tag: null, priceHistory: [{v: 70}, {v: 68}, {v: 72}, {v: 65}, {v: 68}, {v: 67}, {v: 66}] },
  { id: 3, name: "PewDiePie", image: "https://i.pravatar.cc/150?u=pewdiepie", price: 45.50, change: 2.75, changeType: 'increase' as const, tag: null, priceHistory: [{v: 42}, {v: 40}, {v: 44}, {v: 43}, {v: 42}, {v: 44}, {v: 45}] },
  { id: 4, name: "CarryMinati", image: "https://i.pravatar.cc/150?u=carryminati", price: 59.30, change: -0.50, changeType: 'decrease' as const, tag: '🔥 Trending', priceHistory: [{v: 65}, {v: 62}, {v: 63}, {v: 60}, {v: 61}, {v: 60}, {v: 59}] },
  { id: 5, name: "T-Series", image: "https://i.pravatar.cc/150?u=tseries", price: 90.80, change: 10.15, changeType: 'increase' as const, tag: '✨ New', priceHistory: [{v: 70}, {v: 75}, {v: 78}, {v: 82}, {v: 85}, {v: 88}, {v: 90}] },
  { id: 6, name: "Dude Perfect", image: "https://i.pravatar.cc/150?u=dudeperfect", price: 33.25, change: 1.05, changeType: 'increase' as const, tag: null, priceHistory: [{v: 30}, {v: 31}, {v: 32}, {v: 31}, {v: 32}, {v: 33}] },
  { id: 7, name: "Emma Chamberlain", image: "https://i.pravatar.cc/150?u=emma", price: 25.50, change: -2.30, changeType: 'decrease' as const, tag: null, priceHistory: [{v: 28}, {v: 27}, {v: 26}, {v: 27}, {v: 26}, {v: 25}, {v: 25}] },
  { id: 8, name: "Ninja", image: "https://i.pravatar.cc/150?u=ninja", price: 18.90, change: 0.45, changeType: 'increase' as const, tag: null, priceHistory: [{v: 18}, {v: 19}, {v: 18.5}, {v: 18.7}, {v: 18.6}, {v: 18.8}, {v: 18.9}] },
];

type Creator = typeof allCreators[0];
type SortOption = 'trending' | 'price' | 'change';

// --- REUSABLE UI COMPONENTS (/components/) ---

const Header = () => (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <a href="/" className="text-3xl font-extrabold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                HypeTrade
            </span>
            <span className="text-cyan-400">.live</span>
        </a>
        <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
                <Bell size={22} />
            </button>
            <button className="flex items-center gap-2 text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                <User size={18} />
                <span className="text-sm font-medium">Login</span>
            </button>
        </div>
    </header>
);

const Ticker = () => (
    <div className="bg-black/50 py-2.5 overflow-hidden border-y border-white/10">
        {/* FIXED: Animation is now applied directly via inline style to bypass config issues */}
        <div 
            className="flex whitespace-nowrap"
            style={{ animation: 'ticker-scroll 40s linear infinite' }}
        >
            <p className="text-sm text-gray-400 mx-4 font-semibold">📊 Top Movers Today:</p>
            {[...allCreators, ...allCreators].map((c, index) => (
                <span key={`${c.id}-${index}`} className="text-sm mx-4">
                    <span className="font-semibold text-white">{c.name}</span>
                    <span className={`ml-2 font-bold ${c.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                        {c.changeType === 'increase' ? '▲' : '▼'} {c.change}%
                    </span>
                </span>
            ))}
        </div>
    </div>
);

const CreatorCard = ({ creator }: { creator: Creator }) => {
  const isIncrease = creator.changeType === 'increase';
  const sparklineColor = isIncrease ? '#22c55e' : '#ef4444';

  return (
    <div className="relative group p-px rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-cyan-400/50 transition-all duration-300 transform-gpu hover:-translate-y-1">
        <div className="relative bg-black/60 backdrop-blur-xl rounded-[15px] p-5 h-full flex flex-col text-center">
            {creator.tag && (
                <div className="absolute top-4 right-4 bg-white/10 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                    {creator.tag.includes('🔥') ? <Flame size={12} className="text-orange-400" /> : <Sparkles size={12} className="text-yellow-300" />}
                    {creator.tag.split(' ')[0]}
                </div>
            )}
            
            <div className="flex flex-col items-center">
                <img src={creator.image} alt={creator.name} className="w-20 h-20 rounded-full object-cover ring-2 ring-white/10 mb-3" />
                <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-xl">{creator.name}</h3>
                    <CheckCircle size={16} className="text-blue-400" />
                </div>
            </div>

            <div className="my-4 flex-grow h-16">
                 <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={creator.priceHistory} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={`gradient-${creator.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={sparklineColor} stopOpacity={0.4}/>
                                <stop offset="100%" stopColor={sparklineColor} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Line type="monotone" dataKey="v" stroke={sparklineColor} strokeWidth={2.5} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-between mt-2">
                <div>
                    <p className="text-sm text-gray-400 text-left">Current Price</p>
                    <p className={`text-3xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}>
                        ₹{creator.price.toFixed(2)}
                    </p>
                </div>
                <div className="relative group/tooltip">
                    <div className={`px-2.5 py-1 rounded-md text-sm font-semibold text-white bg-white/5`}>
                        <div className={`absolute inset-0 rounded-md ${isIncrease ? 'bg-green-500/20' : 'bg-red-500/20'}`}></div>
                        <div className="relative flex items-center gap-1">
                            {isIncrease ? <ArrowUpRight size={14} className="text-green-400" /> : <ArrowDownRight size={14} className="text-red-400" />}
                            <span>{creator.change.toFixed(2)}%</span>
                        </div>
                    </div>
                     <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max px-3 py-1.5 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none">
                        Based on buy/sell volume + social growth
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-800"></div>
                    </div>
                </div>
            </div>
            
            <div className="mt-6">
                <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 group-hover:scale-105">
                    Trade
                </button>
            </div>
        </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT (/app/market/page.tsx) ---

export default function MarketPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('trending');

  const filteredAndSortedCreators = [...allCreators]
    .sort((a, b) => {
        switch (sortOption) {
            case 'price':
                return b.price - a.price;
            case 'change':
                return b.change - a.change;
            case 'trending':
                return b.change - a.change;
            default:
                return 0;
        }
    })
    .filter(creator =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="bg-gray-900 text-gray-200 font-sans min-h-screen bg-gradient-to-b from-gray-900 via-black to-blue-900/20">
        {/* FIXED: Injected CSS keyframes directly into the component */}
        <style jsx global>{`
            @keyframes ticker-scroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
        `}</style>
        <Header />
        <Ticker />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12 lg:mb-16">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">Creator Hype Market</h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
                Buy and sell creator popularity like stocks — powered by real-time hype.
            </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
            <div className="relative w-full sm:w-80">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search by creator name..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full w-full pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
            </div>
            <div className="relative">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="appearance-none bg-white/5 border border-white/10 rounded-full px-5 py-2.5 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10"
                >
                    <option value="trending">Sort by: Trending</option>
                    <option value="price">Sort by: Price</option>
                    <option value="change">Sort by: Change</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
        </div>

        {filteredAndSortedCreators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {filteredAndSortedCreators.map(creator => (
                    <CreatorCard key={creator.id} creator={creator} />
                ))}
            </div>
        ) : (
            <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No creators found.</p>
            </div>
        )}
        
        <div className="text-center mt-20 lg:mt-24 py-16 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white">Ready to Join the Hype?</h2>
            <p className="mt-3 text-gray-400 max-w-xl mx-auto">Create your virtual trading portfolio and climb the leaderboard.</p>
            <button className="mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 text-lg">
                Sign Up Now
            </button>
        </div>
      </main>
    </div>
  );
}
