/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  Trophy, 
  Settings, 
  Search, 
  Bell, 
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X
} from 'lucide-react';
import React from 'react';

// Mock Data for the dashboard
const user = {
  name: "Alex Doe",
  avatarUrl: `https://i.pravatar.cc/150?u=alexdoe`,
  netWorth: 15450.75,
  change: 255.30,
  changePercent: 1.68
};

const creators = [
  { id: 1, name: "MrBeast", image: "https://i.pravatar.cc/150?u=mrbeast", price: 74.12, change: 5.12, changeType: 'increase' },
  { id: 2, name: "MKBHD", image: "https://i.pravatar.cc/150?u=mkbhd", price: 66.01, change: -1.20, changeType: 'decrease' },
  { id: 3, name: "PewDiePie", image: "https://i.pravatar.cc/150?u=pewdiepie", price: 45.50, change: 2.75, changeType: 'increase' },
  { id: 4, name: "CarryMinati", image: "https://i.pravatar.cc/150?u=carryminati", price: 59.30, change: -0.50, changeType: 'decrease' },
  { id: 5, name: "T-Series", image: "https://i.pravatar.cc/150?u=tseries", price: 90.80, change: 10.15, changeType: 'increase' },
  { id: 6, name: "Dude Perfect", image: "https://i.pravatar.cc/150?u=dudeperfect", price: 33.25, change: 1.05, changeType: 'increase' },
];

// --- Reusable Components ---

// UPDATED: Creator Card Component with hover effect
const CreatorCard = ({ creator }: { creator: typeof creators[0] }) => (
  <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 flex items-center justify-between hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300">
    <div className="flex items-center gap-4">
      <img src={creator.image} alt={creator.name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <h4 className="font-bold text-white">{creator.name}</h4>
        <p className="text-sm text-gray-400">
          ₹{creator.price.toFixed(2)}
        </p>
      </div>
    </div>
    <div className="text-right">
      <p className={`font-semibold ${creator.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
        {creator.changeType === 'increase' ? '+' : ''}{creator.change.toFixed(2)}%
      </p>
       <button className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-3 rounded-full transition-colors">
        Trade
      </button>
    </div>
  </div>
);

// NEW: Simple SVG Chart Mockup
const ChartMockup = () => (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none" className="opacity-30">
        <path d="M 0 45 Q 20 60, 40 40 T 80 45 T 120 50 T 160 30 L 200 25" stroke="#3b82f6" fill="transparent" strokeWidth="2" strokeLinecap="round"/>
        <defs>
            <linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
            </linearGradient>
        </defs>
        <path d="M 0 45 Q 20 60, 40 40 T 80 45 T 120 50 T 160 30 L 200 25 L 200 60 L 0 60 Z" fill="url(#chart-gradient)" />
    </svg>
);


// --- Main Views ---

const DashboardView = () => (
    <div>
        <h2 className="text-3xl font-bold text-white mb-6">Dashboard</h2>
        
        {/* UPDATED: Portfolio Summary with animated border and chart */}
        <div className="relative p-px rounded-xl bg-gradient-to-r from-blue-500/50 via-purple-500/30 to-blue-500/50 animate-pulse-slow mb-8 overflow-hidden">
             <div className="relative bg-gray-900/90 p-6 rounded-[11px]">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-gray-400 text-sm">Virtual Net Worth</p>
                        <p className="text-4xl font-bold text-white mt-1">₹{user.netWorth.toLocaleString('en-IN')}</p>
                        <div className={`flex items-center mt-2 text-sm ${user.change > 0 ? 'text-green-300' : 'text-red-300'}`}>
                            {user.change > 0 ? <ArrowUpRight size={16} className="mr-1" /> : <ArrowDownRight size={16} className="mr-1" />}
                            <span>₹{user.change.toFixed(2)} ({user.changePercent.toFixed(2)}%) Today</span>
                        </div>
                    </div>
                    <div className="w-1/3">
                        <ChartMockup />
                    </div>
                </div>
            </div>
        </div>

        {/* Market Movers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Top Gainers</h3>
                <div className="space-y-4">
                    {creators.filter(c => c.changeType === 'increase').sort((a,b) => b.change - a.change).slice(0, 3).map(creator => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            </div>
            <div>
                <h3 className="text-xl font-bold text-white mb-4">Top Losers</h3>
                <div className="space-y-4">
                    {creators.filter(c => c.changeType === 'decrease').sort((a,b) => a.change - b.change).slice(0, 3).map(creator => (
                        <CreatorCard key={creator.id} creator={creator} />
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const PortfolioView = () => (
    <div>
        <h2 className="text-3xl font-bold text-white mb-6">My Portfolio</h2>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <p className="text-center text-gray-400 py-16">Portfolio view with detailed holdings will be displayed here.</p>
        </div>
    </div>
);

const LeaderboardView = () => (
    <div>
        <h2 className="text-3xl font-bold text-white mb-6">Leaderboard</h2>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
            <p className="text-center text-gray-400 py-16">Global and friends leaderboards will be displayed here.</p>
        </div>
    </div>
);

// --- Main App Component ---

export default function HypeTradeHomePage() {
  const [activeView, setActiveView] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <DashboardView />;
      case 'Portfolio':
        return <PortfolioView />;
      case 'Leaderboard':
        return <LeaderboardView />;
      default:
        return <DashboardView />;
    }
  };

  const NavItem = ({ icon: Icon, label }: { icon: React.ElementType, label: string }) => (
    <button
      onClick={() => {
        setActiveView(label);
        setIsMobileMenuOpen(false); // Close menu on selection
      }}
      className={`flex items-center w-full gap-3 px-4 py-3 rounded-lg transition-colors ${
        activeView === label
          ? 'bg-blue-600 text-white font-semibold'
          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-gray-900 text-gray-200 font-sans min-h-screen flex">
      {/* UPDATED: Sidebar Navigation for mobile and desktop */}
      <aside className={`fixed lg:relative top-0 left-0 h-full z-50 w-64 bg-gray-900/80 backdrop-blur-md border-r border-gray-800/50 p-6 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex justify-between items-center mb-10">
            <h1 className="font-bold text-2xl text-white">HypeTrade.live</h1>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                <X size={24} />
            </button>
        </div>
        <nav className="flex flex-col gap-2">
          <NavItem icon={LayoutDashboard} label="Dashboard" />
          <NavItem icon={Wallet} label="Portfolio" />
          <NavItem icon={TrendingUp} label="Market" />
          <NavItem icon={Trophy} label="Leaderboard" />
        </nav>
        <div className="mt-auto">
          <NavItem icon={Settings} label="Settings" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0"> {/* Adjusted margin for mobile */}
        {/* Top Header */}
        <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800/50 p-4 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden text-white">
                    <Menu size={24} />
                </button>
                <div className="relative hidden sm:block">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="Search creators..." 
                        className="bg-gray-800 border border-gray-700 rounded-full w-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white">
                    <Bell size={20} />
                </button>
                <div className="flex items-center gap-2">
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full object-cover" />
                    <span className="hidden sm:inline text-sm font-medium text-white">{user.name}</span>
                    <ChevronDown size={16} className="text-gray-500" />
                </div>
            </div>
        </header>

        {/* Page Content with animation */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div key={activeView} className="animate-fade-in">
                {renderView()}
            </div>
        </main>
      </div>
    </div>
  );
}
