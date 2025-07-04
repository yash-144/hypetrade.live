"use client";

import { useState, useEffect, useRef } from 'react';
import { ArrowRight, BarChart, Users, Zap, ShieldCheck, Gamepad2, Award, Twitter, Instagram, DiscAlbum, ChevronDown, Menu, X } from 'lucide-react';

// Corrected the hook to use 'as const' for proper type inference, resolving the TypeScript error.
const useScrollAnimation = <T extends HTMLElement>(options?: IntersectionObserverInit) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (element) {
          observer.unobserve(element);
        }
      }
    }, { threshold: 0.1, ...options });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options]);

  return [ref, isVisible] as const;
};


// Responsive Header Component
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "market", label: "Market" },
    { href: "#features", label: "Features" },
    { href: "#demo", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 md:px-12 py-4 flex justify-between items-center">
        <a href="#" className="font-bold text-xl text-white">
          HypeTrade.live
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href="#waitlist" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full text-sm transition-transform transform hover:scale-105">
            Join Waitlist
          </a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-md transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <nav className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-gray-300 hover:text-white transition-colors text-lg" onClick={() => setIsMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <a href="#waitlist" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105" onClick={() => setIsMenuOpen(false)}>
            Join Waitlist
          </a>
        </nav>
      </div>
    </header>
  );
};


// Sleek, animated gradient card component
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

// FIXED: Reverted to a faster max-height transition for smoother and more reliable animation
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

  const [heroRef, heroIsVisible] = useScrollAnimation<HTMLElement>();
  const [howItWorksRef, howItWorksIsVisible] = useScrollAnimation<HTMLElement>();
  const [marketRef, marketIsVisible] = useScrollAnimation<HTMLElement>();
  const [whyRef, whyIsVisible] = useScrollAnimation<HTMLElement>();
  const [peekRef, peekIsVisible] = useScrollAnimation<HTMLElement>();
  const [ctaRef, ctaIsVisible] = useScrollAnimation<HTMLElement>();
  const [teamRef, teamIsVisible] = useScrollAnimation<HTMLElement>();
  const [faqRef, faqIsVisible] = useScrollAnimation<HTMLElement>();

  // Helper for animation classes
  const animationClasses = (isVisible: boolean) =>
    `transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

  return (

    <div className="bg-gray-900 text-gray-200 font-sans overflow-x-hidden">
      <Header />

      <main className="container mx-auto px-6 py-12 md:px-12 pt-28 md:pt-32">

        <section ref={heroRef} className={`text-center py-20 md:py-32 ${animationClasses(heroIsVisible)}`}>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight">
            Trade the Hype. Track Viral Momentum.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mt-6 max-w-3xl mx-auto">
            Experience the world’s first virtual simulator where you can trade the rising (or falling) popularity of your favorite influencers.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#waitlist" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 flex items-center justify-center gap-2">
              Join the Waitlist <ArrowRight size={20} />
            </a>
            <a href="#demo" className="bg-gray-700/50 hover:bg-gray-700 border border-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
              Try the Demo (Free)
            </a>
          </div>
          <p className="mt-8 text-gray-500 text-sm font-semibold tracking-wider">
            “No money. Just hype. All skill.”
          </p>
          <p className="text-xs text-gray-600 mt-16 max-w-4xl mx-auto">
            HypeTrade is currently a virtual simulation platform. In the future, we aim to responsibly evolve into a real-value trading ecosystem for creators — with legal and regulatory compliance at its core.
          </p>
        </section>

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

      <footer className="bg-gray-900/50 border-t border-gray-800/50">
        <div className="container mx-auto px-6 py-8 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <p className="font-bold text-lg text-white">HypeTrade.live</p>
              <p className="text-gray-400 text-sm mt-1">Contact: <a href="mailto:hello@hypetrade.live" className="hover:text-blue-400">hello@hypetrade.live</a></p>
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
  );
}
