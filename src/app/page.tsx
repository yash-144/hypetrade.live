"use client";

import { useState, useEffect, useRef } from 'react';
import { BarChart, Users, Zap, ShieldCheck, Gamepad2, Award, Twitter, Instagram, DiscAlbum, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Typed from 'typed.js';

// --- NEW HERO SECTION COMPONENT ---
const HeroSection = () => {
  // Reverted to two separate refs for independent animations
  const typeXRef = useRef(null);
  const typeYRef = useRef(null);

  useEffect(() => {
    // Options for the first line of text
    const optionsX = {
      strings: ['Hype.', 'Buzz.', 'Clout.', 'Trend.', 'Fame.', 'Heat.'],
      typeSpeed: 80,
      backSpeed: 60,
      backDelay: 2000,
      loop: true,
      shuffle: true,
    };

    // Options for the second line of text
    const optionsY = {
      strings: ['Momentum.', 'Spikes.', 'Noise.', 'Energy.', 'Growth.'],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 2200,
      startDelay: 300, // Stagger the start to prevent conflicts
      loop: true,
      shuffle: true,
    };

    // Initialize two separate, stable Typed instances
    const typedX = new Typed(typeXRef.current, optionsX);
    const typedY = new Typed(typeYRef.current, optionsY);

    return () => {
      // Destroy both instances during cleanup
      typedX.destroy();
      typedY.destroy();
    };
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/80 to-black"></div>
        <div
          className="absolute inset-0 bg-grid-pattern"
          style={{ '--grid-size': '30px', '--grid-color': 'rgba(255, 255, 255, 0.05)' } as React.CSSProperties}
        ></div>
        <div
          className="absolute inset-0 bg-grid-pattern-glow"
          style={{ '--grid-size': '240px', '--grid-color': 'rgba(0, 150, 255, 0.1)' } as React.CSSProperties}
        ></div>
      </div>

      <div className="relative z-10 text-center px-4">
        {/* Reverted to two separate h1 elements for independent animation */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter">
          Trade the <span ref={typeXRef} className="text-blue-400"></span>
        </h1>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tighter mt-2">
          Track Viral <span ref={typeYRef} className="text-green-400"></span>
        </h1>

        {/* Subheading */}
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
          Experience the world&apos;s first virtual simulator where you can trade the rising popularity of your favorite influencers.
        </p>

        {/* Mock UI Elements */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 animate-fade-in-slow">
          {/* Trending Creators */}
          <div className="flex items-center -space-x-4">
            <Image className="w-12 h-12 rounded-full ring-2 ring-gray-800 object-cover" src="https://i.pravatar.cc/150?u=mrbeast" alt="MrBeast" width={48} height={48} />
            <Image className="w-12 h-12 rounded-full ring-2 ring-gray-800 object-cover" src="https://i.pravatar.cc/150?u=mkbhd" alt="MKBHD" width={48} height={48} />
            <Image className="w-12 h-12 rounded-full ring-2 ring-gray-800 object-cover" src="https://i.pravatar.cc/150?u=pewdiepie" alt="PewDiePie" width={48} height={48} />
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold ring-2 ring-gray-800">+50</div>
          </div>
          {/* Chart Preview */}
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
            <span className="text-green-400">▲</span>
            <div className="w-20 h-8 bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2080%2032%22><path%20d=%22M0%2020L10%2015L20%2025L30%2020L40%2022L50%2010L60%2015L70%205L80%2010%22%20fill=%22none%22%20stroke=%22%2334D399%22%20stroke-width=%222%22/></svg>')] bg-no-repeat bg-center"></div>
          </div>
          {/* Buy/Sell Buttons */}
          <div className="flex gap-3">
            <button className="bg-green-500/10 border border-green-500/30 text-green-400 font-bold py-2 px-6 rounded-lg hover:bg-green-500/20 transition-colors">Buy</button>
            <button className="bg-red-500/10 border border-red-500/30 text-red-400 font-bold py-2 px-6 rounded-lg hover:bg-red-500/20 transition-colors">Sell</button>
          </div>
        </div>
      </div>
    </section>
  );
};


// Corrected the hook to use 'as const' for proper type inference.
const useScrollAnimation = <T extends HTMLElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (element) observer.unobserve(element);
      }
    }, { threshold: 0.1, ...options });

    if (element) observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return [ref, isVisible] as const;
};


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { href: "/market", label: "Market" },
    { href: "#features", label: "Features" },
    { href: "#demo", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/30 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-white">
          HypeTrade.live
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-4">
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full text-sm transition-transform transform hover:scale-105">
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <div className={`md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors text-lg" onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105" onClick={() => setIsMenuOpen(false)}>
            Join Waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
};

const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
  <div className="relative p-px rounded-lg bg-gradient-to-b from-blue-500/50 to-gray-800/10 shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="absolute inset-0 rounded-lg bg-gradient-to-b from-blue-500/20 to-gray-900/10 opacity-20 hover:opacity-100 transition-opacity duration-500 animate-pulse-slow"></div>
    <div className="relative bg-gray-900/95 backdrop-blur-sm p-6 rounded-[7px] h-full">
      <div className="flex items-center gap-4 mb-3">
        {icon}
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      <p className="text-gray-400">{children}</p>
    </div>
  </div>
);

const FaqItem = ({ q, a, isOpen, onToggle }: { q: string, a: string, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="py-4 border-b border-gray-700/50">
      <dt>
        <button onClick={onToggle} className="flex items-center justify-between w-full text-left">
          <span className="font-semibold text-white">{q}</span>
          <ChevronDown
            className={`transform transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-180' : ''}`}
            size={20}
          />
        </button>
      </dt>
      <dd
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 pt-4' : 'max-h-0'}`}
      >
        <p className="text-gray-400 pb-2">{a}</p>
      </dd>
    </div>
  );
};

export default function HypeTradeLandingPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqData = [
    { q: "Is this real money trading?", a: "No. HypeTrade is a simulation platform for entertainment only. No real money is exchanged or earned." },
    { q: "Is this legal?", a: "HypeTrade does not involve gambling, crypto, or financial assets. It simulates market behavior using public data and user interaction in a closed virtual system." },
    { q: "Will creators get paid?", a: "Currently, no. But we plan to explore reward systems for creators in the future, within safe and ethical guidelines." },
    { q: "Can I lose money?", a: "No. There’s no financial risk — it's a completely virtual experience." },
    { q: "Will this involve real money in the future?", a: "HypeTrade is currently a simulation platform. We plan to explore real-world integrations responsibly, and only in regions where such features are fully legal and regulated." }
  ];

  const [howItWorksRef, howItWorksIsVisible] = useScrollAnimation<HTMLElement>();
  const [marketRef, marketIsVisible] = useScrollAnimation<HTMLElement>();
  const [whyRef, whyIsVisible] = useScrollAnimation<HTMLElement>();
  const [peekRef, peekIsVisible] = useScrollAnimation<HTMLElement>();
  const [ctaRef, ctaIsVisible] = useScrollAnimation<HTMLElement>();
  const [teamRef, teamIsVisible] = useScrollAnimation<HTMLElement>();
  const [faqRef, faqIsVisible] = useScrollAnimation<HTMLElement>();

  const animationClasses = (isVisible: boolean) =>
    `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (
    <div className="bg-black text-gray-200 font-sans">
      <style jsx global>{`
        .bg-grid-pattern {
            background-image: linear-gradient(var(--grid-color) 1px, transparent 1px), linear-gradient(to right, var(--grid-color) 1px, transparent 1px);
            background-size: var(--grid-size) var(--grid-size);
            animation: bg-scroll 20s linear infinite;
        }
        .bg-grid-pattern-glow {
            background-image: radial-gradient(circle at center, var(--grid-color) 0, transparent 40%);
            background-size: var(--grid-size) var(--grid-size);
            animation: bg-scroll 30s linear infinite;
        }
        @keyframes bg-scroll {
            to { background-position: var(--grid-size) var(--grid-size); }
        }
        .animate-fade-in-slow {
            animation: fade-in 1.5s ease-out forwards;
            opacity: 0;
            animation-delay: 0.5s;
        }
        @keyframes fade-in {
            to { opacity: 1; }
        }
        .typed-cursor {
            color: #60a5fa;
            font-weight: 200; /* Make cursor thinner */
        }
      `}</style>
      <Header />

      <HeroSection />

      <div className="bg-black relative z-10">
        <main className="container mx-auto px-6 py-12 md:px-12">
          <hr className="border-gray-800/50" />
          <section id="demo" ref={howItWorksRef} className={`py-20 md:py-28 text-center scroll-mt-20 ${animationClasses(howItWorksIsVisible)}`}>
            <h2 className="text-4xl font-bold text-white mb-12">How Does HypeTrade Work?</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="bg-blue-600/20 p-4 rounded-full mb-4 border border-blue-500/30">
                  <Users className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore Creators</h3>
                <p className="text-gray-400">Discover trending YouTubers and personalities across the internet.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600/20 p-4 rounded-full mb-4 border border-blue-500/30">
                  <BarChart className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Trade Virtual Shares</h3>
                <p className="text-gray-400">Use in-game credits to simulate buying and selling shares tied to real-time social signals.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-blue-600/20 p-4 rounded-full mb-4 border border-blue-500/30">
                  <Zap className="text-blue-400" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Watch the Trends</h3>
                <p className="text-gray-400">Creator share values move based on app demand and public metrics like view growth or subscriber count.</p>
              </div>
            </div>
            <p className="mt-12 bg-gray-800/60 border border-yellow-500/30 text-yellow-300/80 text-sm p-4 rounded-lg max-w-2xl mx-auto">
              🧠 Note: All activity is simulated for entertainment and educational use only.
            </p>
          </section>
          <hr className="border-gray-800/50" />
          <section ref={marketRef} className={`py-20 md:py-28 ${animationClasses(marketIsVisible)}`}>
            <h2 className="text-4xl font-bold text-white text-center mb-12">Who’s Gaining Hype Right Now?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 text-center">
                <p className="font-bold text-white text-lg">MrBeast</p>
                <p className="text-2xl font-mono text-green-400 mt-1">₹72.41</p>
                <p className="text-sm text-green-400 font-semibold">▲ 3.2%</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 text-center">
                <p className="font-bold text-white text-lg">Mythpat</p>
                <p className="text-2xl font-mono text-red-400 mt-1">₹39.10</p>
                <p className="text-sm text-red-400 font-semibold">▼ 1.8%</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 text-center">
                <p className="font-bold text-white text-lg">CarryMinati</p>
                <p className="text-2xl font-mono text-green-400 mt-1">₹58.99</p>
                <p className="text-sm text-green-400 font-semibold">▲ 5.1%</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 text-center">
                <p className="font-bold text-white text-lg">MKBHD</p>
                <p className="text-2xl font-mono text-green-400 mt-1">₹65.70</p>
                <p className="text-sm text-green-400 font-semibold">▲ 2.5%</p>
              </div>
            </div>
            <p className="text-center text-gray-500 mt-6 text-sm">📈 These are fictional, demo values. No real money involved.</p>
          </section>
          <hr className="border-gray-800/50" />
          <section id="features" ref={whyRef} className={`py-20 md:py-28 scroll-mt-20 ${animationClasses(whyIsVisible)}`}>
            <h2 className="text-4xl font-bold text-white text-center mb-12">Built for Fans Who Love Creators & Competition</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <FeatureCard icon={<BarChart className="text-blue-400" size={24} />} title="Simulated Creator Market">
                Watch virtual prices rise or fall based on real-time social metrics and app sentiment.
              </FeatureCard>
              <FeatureCard icon={<Gamepad2 className="text-blue-400" size={24} />} title="Skill-Based Strategy Game">
                Make smart trades based on timing, trends, and instinct — all in a safe, virtual economy.
              </FeatureCard>
              <FeatureCard icon={<ShieldCheck className="text-blue-400" size={24} />} title="Zero Risk Environment">
                No real money. No crypto. Just a data-driven entertainment experience.
              </FeatureCard>
              <FeatureCard icon={<Award className="text-blue-400" size={24} />} title="Leaderboard Bragging Rights">
                Track your net virtual worth and climb the ranks against friends and fans.
              </FeatureCard>
            </div>
          </section>
          <hr className="border-gray-800/50" />
          <section ref={peekRef} className={`py-20 md:py-28 text-center ${animationClasses(peekIsVisible)}`}>
            <h2 className="text-4xl font-bold text-white mb-12">Get a Sneak Peek</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg h-80 flex items-center justify-center"><p className="text-gray-500">Creator Market Mockup</p></div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg h-80 flex items-center justify-center"><p className="text-gray-500">Trade Screen Mockup</p></div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg h-80 flex items-center justify-center"><p className="text-gray-500">User Portfolio Mockup</p></div>
              <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg h-80 flex items-center justify-center"><p className="text-gray-500">Leaderboard Mockup</p></div>
            </div>
            <p className="text-gray-500 text-sm mt-8">Designs shown are part of a prototype and subject to change before public release.</p>
          </section>
          <hr className="border-gray-800/50" />
          <section id="waitlist" ref={ctaRef} className={`py-20 md:py-28 text-center bg-blue-900/20 rounded-xl my-16 scroll-mt-20 ${animationClasses(ctaIsVisible)}`}>
            <h2 className="text-4xl font-bold text-white">Ready to Trade the Hype?</h2>
            <p className="text-gray-300 mt-4 max-w-xl mx-auto">Sign up to get early access and updates as the platform evolves.</p>
            <div className="mt-8 flex justify-center">
              <a href="#waitlist-form" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
                Join the Waitlist
              </a>
            </div>
          </section>
          <hr className="border-gray-800/50" />
          <section ref={teamRef} className={`py-20 md:py-28 max-w-3xl mx-auto text-center ${animationClasses(teamIsVisible)}`}>
            <h2 className="text-4xl font-bold text-white mb-6">Who’s Behind HypeTrade?</h2>
            <p className="text-lg text-gray-300">
              &quot;We&apos;re building a fun, data-powered platform that gamifies the creator economy — responsibly.&quot;
            </p>
            <p className="mt-6 text-gray-400">
              We’re building a safe, fair, and transparent creator economy — starting with virtual trading today, and laying the groundwork for real-world growth tomorrow.
            </p>
          </section>
          <hr className="border-gray-800/50" />
          <section id="faq" ref={faqRef} className={`py-20 md:py-28 max-w-3xl mx-auto scroll-mt-20 ${animationClasses(faqIsVisible)}`}>
            <h2 className="text-4xl font-bold text-white text-center mb-12">Frequently Asked Questions</h2>
            <dl>
              {faqData.map((faq, index) => (
                <FaqItem
                  key={index}
                  q={faq.q}
                  a={faq.a}
                  isOpen={openFaqIndex === index}
                  onToggle={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                />
              ))}
            </dl>
          </section>
        </main>
      </div>
      <footer className="bg-black relative z-10 border-t border-gray-800/50">
        <div className="container mx-auto px-6 py-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg text-white">HypeTrade.live</p>
              <p className="text-gray-400 text-sm mt-1">Contact: <a href="mailto:hypetrade.preview@gmail.com" className="hover:text-blue-400">hypetrade.preview@gmail.com</a></p>
            </div>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><DiscAlbum size={24} /></a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800/50 flex flex-col md:flex-row justify-between items-center text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} HypeTrade. All Rights Reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-gray-200">Terms of Use</a>
              <a href="#" className="hover:text-gray-200">Privacy Policy</a>
              <a href="#" className="hover:text-gray-200">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
};