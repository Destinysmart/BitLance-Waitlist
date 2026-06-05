import React, { useState, useEffect, Suspense, lazy } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CheckCircle2, Sun, Moon, Rocket, ShieldCheck, Globe, Bitcoin } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

const Benefits = lazy(() => import('./components/Benefits'));
const FinalCTA = lazy(() => import('./components/FinalCTA'));
const LaunchProgress = lazy(() => import('./components/LaunchProgress'));
const FAQ = lazy(() => import('./components/FAQ'));
const Footer = lazy(() => import('./components/Footer'));
const Testimonials = lazy(() => import('./components/Testimonials'));

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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative min-h-screen overflow-x-hidden font-sans selection:bg-orange-500/30 selection:text-orange-100 flex flex-col bg-[#000000] text-zinc-200">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-400 to-amber-500 origin-left z-[100] shadow-[0_0_10px_rgba(249,115,22,0.5)]"
        style={{ scaleX }}
      />
      <Helmet>
        <title>Bitlance - The Premier Bitcoin Freelance Marketplace | Earn Crypto</title>
        <meta name="title" content="Bitlance - The Premier Bitcoin Freelance Marketplace | Earn Crypto" />
        <meta name="description" content="Bitlance is the world's first borderless Bitcoin freelance marketplace. Hire top talent, work globally, and get paid instantly in Bitcoin (Lightning) without bank delays or high fees." />
        <meta name="keywords" content="bitcoin freelance, btc freelance marketplace, crypto freelance jobs, pay in bitcoin, earn bitcoin, borderless work, lightning network jobs, web3 marketplace, bitlance, hire freelancers with crypto" />
        <link rel="canonical" href="https://bitlance.work/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bitlance.work/" />
        <meta property="og:title" content="Bitlance - The Premier Bitcoin Freelance Marketplace | Earn Crypto" />
        <meta property="og:description" content="Bitlance is the world's first borderless Bitcoin freelance marketplace. Hire top talent, work globally, and get paid instantly in Bitcoin (Lightning) without bank delays or high fees." />
        <meta property="og:image" content="https://bitlance.work/og-dashboard.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://bitlance.work/" />
        <meta property="twitter:title" content="Bitlance - The Premier Bitcoin Freelance Marketplace | Earn Crypto" />
        <meta property="twitter:description" content="Bitlance is the world's first borderless Bitcoin freelance marketplace. Hire top talent, work globally, and get paid instantly in Bitcoin (Lightning) without bank delays or high fees." />
        <meta property="twitter:image" content="https://bitlance.work/og-dashboard.png" />
      </Helmet>
      
      <NavBar />
      
      {/* Hero Section Container */}
      <div className="relative w-full overflow-hidden flex-shrink-0 pt-24 md:pt-32">
        {/* Modern Grid Background */}
        <div className="absolute inset-0 bg-[#000000] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] z-0" />
        
        {/* Animated Background Mesh Glows */}
        <div className="absolute top-0 w-full h-[800px] overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] sm:w-[800px] h-[400px] sm:h-[600px] bg-orange-600/10 rounded-full blur-[120px] animate-blob mix-blend-screen"></div>
          <div className="absolute top-[10%] left-1/4 w-[400px] h-[400px] bg-orange-400/10 rounded-full blur-[120px] animate-blob [animation-delay:2s] mix-blend-screen opacity-70"></div>
          <div className="absolute top-[5%] right-1/4 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-[120px] animate-blob [animation-delay:4s] mix-blend-screen opacity-60"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto pb-24 sm:pb-32 px-4 sm:px-6">
          <FadeIn className="w-full">
            <Hero />
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

          <FadeIn delay={0.3} className="w-full mb-16 sm:mb-20" id="testimonials">
            <Testimonials />
          </FadeIn>

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
  const [isLightMode, setIsLightMode] = useState(true);

  useEffect(() => {
    if (isLightMode) {
      document.documentElement.classList.add('light-mode');
    } else {
      document.documentElement.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navBar = document.querySelector('nav');
      const offset = navBar ? navBar.offsetHeight : 80;
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
    <nav className="fixed top-0 left-0 right-0 z-50 w-full border-b border-white/5 bg-[#000000]/80 backdrop-blur-xl transition-colors duration-500">
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

        {/* Action Buttons */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.3 }}
           className="flex items-center gap-3"
        >
           <button 
             onClick={() => setIsLightMode(!isLightMode)} 
             className="p-2 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-all active:scale-[0.98]"
             aria-label="Toggle theme"
           >
             {isLightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
           </button>
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
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navBar = document.querySelector('nav');
      const offset = navBar ? navBar.offsetHeight : 80;
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
    <div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-16 relative z-10 mb-12">
      {/* Left Column: Copy & CTA */}
      <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full mt-10 md:mt-16">
        
        <h1 className="text-5xl sm:text-6xl md:text-[5.5rem] font-display font-extrabold tracking-tighter text-white leading-[1.05] mb-6 drop-shadow-md">
          Get Paid in <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-orange-400 via-orange-500 to-amber-500">Bitcoin</span>
          {' '}for Your Work.
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl mb-10">
          Bitlance connects freelancers and clients worldwide through secure Lightning payments and escrow-backed contracts.
        </p>

        {/* Email Capture explicitly inside Hero now */}
        <div className="w-full max-w-md lg:max-w-none flex flex-col items-center lg:items-start mb-12" id="waitlist">
           <EmailCapture />
           <Positioning />
        </div>
        
        {/* Trust Elements */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center lg:items-start gap-4 sm:gap-6 text-sm font-medium text-zinc-400">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Secure Escrow Protection</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Global Opportunities</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm">
            <Bitcoin className="w-4 h-4 text-orange-500" />
            <span>Bitcoin-Native Payments</span>
          </div>
        </div>
      </div>
      
      {/* Right Column: Floating Dashboard */}
      <div className="flex-1 w-full max-w-2xl lg:max-w-none relative perspective-[1200px] mt-10 lg:mt-0 lg:pl-10">
        {/* Background glow for the dashboard */}
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-amber-400/10 rounded-[2.5rem] blur-[80px] transform -rotate-6 scale-95" />
        
        <motion.div 
          initial={{ opacity: 0, rotateY: 10, rotateX: 10, y: 30 }}
          animate={{ opacity: 1, rotateY: -5, rotateX: 2, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full aspect-[4/5] sm:aspect-[4/3] lg:aspect-[1.1] border border-zinc-700/50 bg-[#050505]/95 backdrop-blur-3xl rounded-[2rem] shadow-[0_0_80px_rgba(249,115,22,0.15)] overflow-hidden flex transform-style-3d group"
        >
          {/* Dashboard Header */}
          <div className="absolute top-0 left-0 right-0 h-14 border-b border-white/5 bg-zinc-900/40 flex items-center px-6 justify-between backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded bg-zinc-950/80 flex items-center justify-center shrink-0 overflow-hidden border border-white/10 p-1">
                <img src="/logo.png" alt="Bitlance" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <span className="font-semibold text-zinc-200 text-sm">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-zinc-700/50"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-700/50"></div>
              <div className="w-3 h-3 rounded-full bg-zinc-700/50"></div>
            </div>
          </div>
          
          {/* Dashboard Content padding */}
          <div className="pt-20 px-6 pb-6 w-full h-full flex flex-col gap-4">
            
            {/* Top Stats */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="flex-1 p-4 sm:p-5 rounded-2xl border border-white/5 bg-zinc-900/40 shadow-inner backdrop-blur-md"
              >
                <div className="text-zinc-500 text-[10px] sm:text-xs font-semibold mb-1 uppercase tracking-widest flex items-center justify-between">
                  Earnings <Bitcoin className="w-3.5 h-3.5 text-zinc-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-baseline gap-1 font-mono tracking-tight mt-1">
                  45,000 <span className="text-xs sm:text-sm font-medium text-orange-500 font-sans tracking-normal">sats</span>
                </div>
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="flex-1 p-4 sm:p-5 rounded-2xl border border-white/5 bg-zinc-900/40 shadow-inner backdrop-blur-md"
              >
                <div className="text-zinc-500 text-[10px] sm:text-xs font-semibold mb-1 uppercase tracking-widest flex items-center justify-between">
                  Escrow <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" />
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white flex items-baseline gap-1 font-mono tracking-tight mt-1">
                  15,000 <span className="text-xs sm:text-sm font-medium text-zinc-400 font-sans tracking-normal">sats</span>
                </div>
              </motion.div>
            </div>
            
            {/* Active Contract */}
            <motion.div 
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="mt-2 flex-1 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 sm:p-6 shadow-[0_0_30px_rgba(249,115,22,0.05)] relative overflow-hidden flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl -mt-10 -mr-10"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10 w-full overflow-hidden">
                <span className="min-w-0 truncate px-2.5 py-1 rounded-md bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider">Active Contract</span>
                <span className="shrink-0 ml-2 text-zinc-400 text-xs sm:text-sm font-medium">Due in 2 days</span>
              </div>
              
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 relative z-10 truncate w-full">Full-Stack React App</h3>
              <p className="text-zinc-400 text-xs sm:text-sm mb-auto relative z-10 line-clamp-2">Build a modern, high-performance web application utilizing React, Vite, and Tailwind CSS.</p>
              
              <div className="mt-6 w-full relative z-10">
                <div className="w-full h-1.5 rounded-full bg-black/40 overflow-hidden relative">
                  <div className="h-full bg-gradient-to-r from-orange-600 to-orange-400 w-[75%] rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
                </div>
                <div className="flex justify-between mt-2.5 text-xs font-medium text-zinc-500 relative">
                  <span>Milestone 3/4</span>
                  <span className="text-orange-400">15,000 / 30,000 sats</span>
                </div>
              </div>
            </motion.div>
            
          </div>
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </motion.div>
      </div>
    </div>
  );
}

const COMMON_TYPOS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmail.co': 'gmail.com',
  'yahoot.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmal.com': 'hotmail.com',
  'oultook.com': 'outlook.com',
  'outlok.com': 'outlook.com'
};

function EmailCapture() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  
  useEffect(() => {
    if (!email || !email.includes('@')) {
      setSuggestion(null);
      return;
    }
    const parts = email.split('@');
    if (parts.length === 2 && parts[1].length > 0) {
      const domain = parts[1].toLowerCase();
      if (COMMON_TYPOS[domain]) {
        setSuggestion(`${parts[0]}@${COMMON_TYPOS[domain]}`);
      } else {
        setSuggestion(null);
      }
    } else {
      setSuggestion(null);
    }
  }, [email]);

  const emailIsInvalid = email.length > 0 && !isValidEmail(email);
  const hasTypo = !!suggestion;
  const showError = touched && email.length > 0 && (emailIsInvalid || hasTypo);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!email || !isValidEmail(email) || hasTypo) return;
    setStatus('loading');
    
    try {
      const waitlistRef = collection(db, 'waitlist');
      await addDoc(waitlistRef, {
        email: email,
        createdAt: serverTimestamp()
      });
      
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
      try {
        handleFirestoreError(error, OperationType.CREATE, 'waitlist');
      } catch (err) {
        // Fire handleFirestoreError logs it internally
      }
      alert("Something went wrong. Please try again later.");
      setStatus('idle');
    }
  };

  return (
    <div className="w-full xl:max-w-md xl:mr-auto mb-6">
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
            <div className="h-6 mt-4 flex xl:justify-start items-center w-full">
              <AnimatePresence mode="wait">
                {showError ? (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="text-sm font-medium text-red-400 text-center drop-shadow-sm"
                  >
                    {hasTypo ? (
                      <>
                        Did you mean{' '}
                        <button 
                          type="button" 
                          onClick={() => {
                            setEmail(suggestion!);
                            if (status !== 'idle') setStatus('idle');
                          }}
                          className="underline decoration-red-400/50 hover:decoration-red-400 font-bold transition-all"
                        >
                          {suggestion}
                        </button>
                        ?
                      </>
                    ) : (
                      'Please enter a valid email address'
                    )}
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
    <div className="flex flex-col sm:flex-row items-center xl:justify-start gap-4 text-sm font-medium text-zinc-400 mt-2">
      <span className="uppercase tracking-widest text-[10px] sm:text-xs opacity-70">Built for</span>
      <div className="flex flex-wrap justify-center xl:justify-start items-center gap-3">
        <span className="bg-zinc-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-zinc-300 font-medium hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Bitcoin builders</span>
        <span className="bg-zinc-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-zinc-300 font-medium hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Remote freelancers</span>
        <span className="bg-zinc-900/50 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 text-zinc-300 font-medium hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-white hover:-translate-y-0.5 transition-all cursor-default text-xs sm:text-sm">Global talent</span>
      </div>
    </div>
  );
}


