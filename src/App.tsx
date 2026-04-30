import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Globe2, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

// Reusable elegant fade-in wrapper
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <div className="relative min-h-screen font-sans overflow-hidden selection:bg-orange-100 selection:text-orange-900 flex flex-col bg-gradient-to-b from-[#fafafa] via-white to-[#f5f5f5]">
      
      {/* Hero Section Container */}
      <div className="relative w-full overflow-hidden text-white flex-shrink-0">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80')" }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 z-0 bg-zinc-900/80" />
        
        {/* Core Hero Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-orange-400/20 to-transparent rounded-full blur-[100px] pointer-events-none z-0"></div>

        <NavBar />
        
        <div className="relative z-10 flex flex-col items-center pt-16 sm:pt-20 pb-20 sm:pb-24 px-4 sm:px-6 w-full max-w-5xl mx-auto">
          <FadeIn className="w-full flex flex-col items-center text-center">
            <Hero />
            <EmailCapture />
            <Positioning />
          </FadeIn>
        </div>
      </div>

      {/* Main Content below Hero */}
      <main className="relative z-10 flex-grow flex flex-col items-center px-4 sm:px-6 w-full max-w-5xl mx-auto text-zinc-900">
        <FadeIn delay={0.2} className="w-full mt-16 sm:mt-24">
          <Benefits />
        </FadeIn>
        
        <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-16 sm:my-20"></div>

        <FadeIn delay={0.4} className="w-full mb-16 sm:mb-20">
          <FinalCTA />
        </FadeIn>
      </main>

      <Footer />
    </div>
  );
}

function NavBar() {
  return (
    <nav className="relative z-20 w-full bg-white border-b border-zinc-100">
      <div className="px-6 py-5 max-w-5xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center"
        >
          <img src="/logo.png" alt="Bitlance Logo" className="h-10 w-auto object-contain [image-rendering:high-quality]" />
        </motion.div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="max-w-3xl flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[1.1] mb-5 sm:mb-6 drop-shadow-lg">
        Work Online. <br className="hidden md:block" />
        <span className="relative inline-block mt-2 text-[1.05em] drop-shadow-md">
          Get Paid in <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">Bitcoin.</span>
        </span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-zinc-300 font-light leading-relaxed max-w-xl mx-auto mb-8 sm:mb-10 px-2">
        A freelancing platform built for the Bitcoin economy. <br className="hidden md:block" />
        No banks. No borders. Just sats.
      </p>
    </div>
  );
}

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const showError = touched && email.length > 0 && !isValidEmail(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || !isValidEmail(email)) return;
    setStatus('loading');
    
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
    
    if (!scriptUrl) {
      console.error("Missing VITE_GOOGLE_SCRIPT_URL in .env");
      alert("Please configure the VITE_GOOGLE_SCRIPT_URL in your environment variables to enable email collection.");
      setStatus('idle');
      return;
    }

    try {
      await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify({ email: email })
      });
      // no-cors mode returns an opaque response, so we assume success if no exception is thrown
      setStatus('success');
      setEmail('');
      setTouched(false);
    } catch (error) {
      console.error("Failed to submit:", error);
      alert("Something went wrong. Please try again later.");
      setStatus('idle');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mb-16">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="w-full relative overflow-hidden bg-zinc-900 rounded-3xl p-8 flex flex-col items-center text-center border border-zinc-800 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] shadow-orange-500/5 backdrop-blur-sm"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.15
              }}
              className="relative w-16 h-16 rounded-2xl bg-zinc-800/50 border border-zinc-700 flex items-center justify-center mb-5 shadow-inner"
            >
              <CheckCircle2 className="w-8 h-8 text-orange-500 drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]" strokeWidth={2.5} />
            </motion.div>
            
            <h3 className="text-xl font-bold mb-2 text-white tracking-tight">Position Secured</h3>
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed px-4">
              You're officially on the waitlist. We'll be in touch as soon as early access opens.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <div className={`relative flex items-center w-full bg-white rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.4)] border transition-shadow ${
              showError 
                ? 'border-red-400 focus-within:border-red-500 focus-within:shadow-[0_8px_30px_rgba(248,113,113,0.3)]' 
                : 'border-white/20 focus-within:border-orange-400/50 focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.6)]'
            }`}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent pl-4 sm:pl-5 pr-2 sm:pr-4 py-2.5 sm:py-3 outline-none text-zinc-900 placeholder:text-zinc-500 font-medium text-sm sm:text-base lg:text-lg"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') setStatus('idle');
                }}
                onBlur={() => setTouched(true)}
                disabled={status === 'loading'}
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="flex-shrink-0 bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 active:scale-[0.98] text-white px-5 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-lg rounded-full font-medium transition-all duration-300 shadow-[0_0_30px_-5px_rgba(249,115,22,0.5)] hover:shadow-[0_0_40px_-5px_rgba(249,115,22,0.65)] hover:-translate-y-0.5 flex items-center justify-center min-w-[120px] sm:min-w-[150px]"
              >
                {status === 'loading' ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <span>Join Waitlist</span>
                )}
              </button>
            </div>
            <div className="h-6 mt-4 flex justify-center items-center">
              <AnimatePresence mode="wait">
                {showError ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm font-medium text-red-400 text-center drop-shadow-sm"
                  >
                    Please enter a valid email address
                  </motion.p>
                ) : (
                  <motion.p
                    key="normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-zinc-300 font-medium tracking-wide text-center drop-shadow-sm"
                  >
                    Early access for freelancers and Bitcoin-native companies.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Positioning() {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-medium text-zinc-300">
      <span className="uppercase tracking-widest text-xs opacity-90">Built for</span>
      <div className="flex flex-wrap justify-center items-center gap-3">
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 text-white font-semibold hover:border-orange-400 hover:bg-orange-500/20 hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Bitcoin builders</span>
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 text-white font-semibold hover:border-orange-400 hover:bg-orange-500/20 hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Remote freelancers</span>
        <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 text-white font-semibold hover:border-orange-400 hover:bg-orange-500/20 hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Global talent</span>
      </div>
    </div>
  );
}

function Benefits() {
  const items = [
    {
      icon: <Zap strokeWidth={1.5} className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Instant Payments",
      description: "Get paid in sats via Lightning. No delays."
    },
    {
      icon: <Globe2 strokeWidth={1.5} className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Work Without Borders",
      description: "Earn globally without needing a bank account."
    },
    {
      icon: <ShieldCheck strokeWidth={1.5} className="w-7 h-7 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Secure by Design",
      description: "Escrow ensures fair payment for completed work."
    }
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-6 md:gap-8 w-full">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left bg-white/70 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border border-zinc-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] hover:-translate-y-1.5 transition-all duration-300 group cursor-default">
          <div className="w-14 h-14 rounded-2xl bg-orange-50/80 flex items-center justify-center mb-6 border border-orange-100/50 group-hover:bg-orange-100 group-hover:scale-105 transition-all duration-300">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-2">{item.title}</h3>
          <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

function FinalCTA() {
  const [endTime] = useState(() => Date.now() + 30 * 24 * 60 * 60 * 1000);
  const [timeLeft, setTimeLeft] = useState(30 * 24 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.floor((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const days = Math.floor(timeLeft / (24 * 60 * 60));
  const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
  const seconds = Math.floor(timeLeft % 60);

  const timeUnits = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds }
  ];

  return (
    <div className="relative overflow-hidden flex flex-col items-center text-center bg-white p-8 sm:p-12 md:p-16 rounded-[2rem] md:rounded-[2.5rem] border border-zinc-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.04)] w-full">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-orange-50/30 pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        <h2 className="text-sm md:text-base font-semibold tracking-widest text-orange-500 mb-8 uppercase">
          Mainnet Launch In
        </h2>
        
        <div className="flex w-full justify-center gap-3 sm:gap-6 md:gap-8">
          {timeUnits.map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-zinc-900 rounded-2xl shadow-xl flex items-center justify-center mb-3 md:mb-4 border border-zinc-800 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={unit.value}
                    initial={{ y: 20, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ y: -20, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                    className="absolute text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tabular-nums tracking-tighter"
                  >
                    {unit.value.toString().padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-zinc-500 uppercase tracking-widest">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative z-10 w-full py-8 mt-12 border-t border-zinc-100">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-sm text-zinc-400">
        <p>&copy; 2026 Bitlance. All rights reserved.</p>
        <a href="https://x.com/bitlancework" target="_blank" rel="noopener noreferrer" className="mt-4 sm:mt-0 hover:text-zinc-700 transition-colors">
          @bitlancework
        </a>
      </div>
    </footer>
  );
}
