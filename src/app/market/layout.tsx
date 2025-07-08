import React from 'react';
import Link from 'next/link';
import { Bell, User, LogIn } from 'lucide-react';
import { getSession } from '@/lib/session'; // This is safe here

// --- SERVER COMPONENTS (Correctly placed in a Server Component file) ---

const Header = async () => {
    const session = await getSession();

    return (
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
            <Link href="/" className="text-3xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                    HypeTrade
                </span>
                <span className="text-cyan-400">.live</span>
            </Link>
            <div className="flex items-center gap-4">
                <button className="text-gray-400 hover:text-white transition-colors">
                    <Bell size={22} />
                </button>
                {session ? (
                    <Link href="/portfolio" className="flex items-center gap-2 text-white bg-white/5 p-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors" aria-label="My Portfolio">
                        <User size={18} />
                    </Link>
                ) : (
                    <Link href="/login" className="flex items-center gap-2 text-white bg-white/5 px-3 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors">
                        <LogIn size={18} />
                        <span className="text-sm font-medium">Login</span>
                    </Link>
                )}
            </div>
        </header>
    );
};

const Ticker = () => {
    const topMovers = [
        { id: 1, name: "MrBeast", change: 5.12, changeType: 'increase' as const },
        { id: 4, name: "CarryMinati", change: -0.50, changeType: 'decrease' as const },
        { id: 5, name: "T-Series", change: 10.15, changeType: 'increase' as const },
        { id: 2, name: "MKBHD", change: -1.20, changeType: 'decrease' as const },
    ];

    return (
        <div className="bg-black/50 py-2.5 overflow-hidden border-y border-white/10">
            <div className="flex animate-ticker-scroll whitespace-nowrap" style={{ animation: 'ticker-scroll 40s linear infinite' }}>
                <p className="text-sm text-gray-400 mx-4 font-semibold">📊 Top Movers Today:</p>
                {[...topMovers, ...topMovers, ...topMovers].map((c, index) => (
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
};


// --- The Layout Itself ---

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-900 text-gray-200 font-sans min-h-screen bg-gradient-to-b from-gray-900 via-black to-blue-900/20">
        <Header />
        <Ticker />
        {children}
    </div>
  )
}
