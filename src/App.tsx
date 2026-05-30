import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const Benefits = lazy(() => import('./components/Benefits'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const LaunchProgress = lazy(() => import('./components/LaunchProgress'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));

// Reusable elegant fade-in wrapper
const FadeIn = ({ children, delay = 0, className = "", id }: { children: React.ReactNode, delay?: number, className?: string, id?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
    id={id}
  >
    {children}
  </motion.div>
);

export default function App() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-orange-500/30 selection:text-orange-100 flex flex-col bg-[#050505] text-zinc-200">
      <NavBar />
      
      {/* Hero Section Container */}
      <div className="relative w-full overflow-hidden flex-shrink-0 pt-24 sm:pt-28">
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[#050505] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
        
        {/* Core Hero Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[600px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

        <div className="relative z-10 flex flex-col items-center pb-20 sm:pb-24 px-4 sm:px-6 w-full max-w-5xl mx-auto">
          <FadeIn className="w-full flex flex-col items-center text-center">
            <Hero />
            <div id="waitlist" className="w-full max-w-lg mb-8">
              <EmailCapture />
            </div>
            <Positioning />
          </FadeIn>
        </div>
      </div>

      {/* Main Content below Hero */}
      <main className="relative z-10 flex-grow flex flex-col items-center px-4 sm:px-6 w-full max-w-5xl mx-auto">
        <Suspense fallback={<div className="h-40 w-full animate-pulse bg-zinc-900/50 rounded-2xl my-10"></div>}>
          <FadeIn delay={0.2} className="w-full mt-16 sm:mt-24" id="benefits">
            <Benefits />
          </FadeIn>
          
          <div className="w-full max-w-2xl h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16 sm:my-20"></div>

          <FadeIn delay={0.4} className="w-full mb-16 sm:mb-20" id="countdown">
            <FinalCTA />
          </FadeIn>

          <FadeIn delay={0.5} className="w-full mb-20" id="progress">
            <LaunchProgress />
          </FadeIn>

          <FadeIn delay={0.6} className="w-full mb-20" id="faq">
            <FAQ />
          </FadeIn>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

function NavBar() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
      <div className="px-5 sm:px-6 py-4 max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex items-center"
        >
          <img src="/logo.png" alt="Bitlance Logo" className="h-7 sm:h-8 w-auto object-contain [image-rendering:high-quality]" />
        </motion.div>

        {/* Desktop Nav Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          <button onClick={() => scrollTo('benefits')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Benefits</button>
          <button onClick={() => scrollTo('countdown')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Launch</button>
          <button onClick={() => scrollTo('progress')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Progress</button>
          <button onClick={() => scrollTo('faq')} className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">FAQ</button>
        </motion.div>

        {/* Waitlist Button */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.3 }}
           className="flex"
        >
           <button onClick={() => scrollTo('waitlist')} className="text-sm font-medium px-5 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-white transition-all active:scale-[0.98] shadow-sm">
             <span className="hidden sm:inline">Join Waitlist</span>
             <span className="sm:hidden">Waitlist</span>
           </button>
        </motion.div>

      </div>
    </nav>
  );
}

function Hero() {
  return (
    <div className="max-w-4xl flex flex-col items-center mt-8 md:mt-12">
      <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-[1.05] mb-6 drop-shadow-sm" style={{ letterSpacing: '-0.04em' }}>
        Work Online. <br className="hidden md:block" />
        Get Paid in <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-600">Bitcoin.</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-xl mx-auto mb-10 px-2 drop-shadow-sm">
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
      
      const confetti = (await import('canvas-confetti')).default;
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f97316', '#fbbf24', '#ffffff']
      });
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
            <div className={`relative flex items-center w-full bg-zinc-900/60 backdrop-blur-xl rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.4)] border transition-all duration-300 ${
              showError 
                ? 'border-red-500/50 focus-within:border-red-500 focus-within:shadow-[0_8px_30px_rgba(248,113,113,0.2)]' 
                : 'border-white/10 focus-within:border-orange-500/50 focus-within:shadow-[0_8px_30px_rgb(249,115,22,0.15)] bg-zinc-900/80'
            }`}>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent pl-4 sm:pl-6 pr-2 sm:pr-4 py-2.5 sm:py-3.5 outline-none text-white placeholder:text-zinc-500 font-medium text-sm sm:text-base"
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
                className="flex-shrink-0 bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 active:scale-[0.98] text-white px-6 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base rounded-full font-semibold transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 flex items-center justify-center min-w-[120px] sm:min-w-[140px] border border-orange-400/50"
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
                    className="text-sm text-zinc-500 font-medium tracking-wide text-center drop-shadow-sm"
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
    <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-medium text-zinc-400 mt-4">
      <span className="uppercase tracking-widest text-[10px] sm:text-xs opacity-70">Built for</span>
      <div className="flex flex-wrap justify-center items-center gap-3">
        <span className="bg-zinc-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-zinc-300 font-medium hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Bitcoin builders</span>
        <span className="bg-zinc-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-zinc-300 font-medium hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Remote freelancers</span>
        <span className="bg-zinc-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-zinc-300 font-medium hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Global talent</span>
      </div>
    </div>
  );
}


