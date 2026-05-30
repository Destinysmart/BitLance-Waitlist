import React from 'react';
import { motion } from 'motion/react';
import { Rocket, CheckCircle2, LoaderCircle, Zap } from 'lucide-react';

export default function LaunchProgress() {
  const items = [
    { title: "Marketplace Component", status: "completed" },
    { title: "Escrow Protection", status: "completed" },
    { title: "Bitcoin Payments", status: "completed" },
    { title: "Messaging", status: "completed" },
    { title: "Freelancer Profiles", status: "completed" },
    { title: "Dispute Resolution", status: "progress" },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-zinc-950/40 backdrop-blur-3xl rounded-[2.5rem] border border-zinc-800/60 p-8 md:p-16 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]">
      {/* Background glow & particles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1/2 bg-gradient-to-b from-orange-500/5 to-transparent blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 drop-shadow-sm flex items-center justify-center gap-3 flex-wrap"
          >
            <Rocket className="w-8 h-8 md:w-10 md:h-10 text-orange-500" /> Mainnet Launch Progress
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light"
          >
            Bitlance is nearly ready. We're putting the final touches on a Bitcoin-native freelance marketplace.
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-3xl mb-20 relative">
          <div className="flex justify-between items-end mb-4 px-1">
            <span className="text-zinc-400 font-medium tracking-wide text-sm md:text-base uppercase">Launch Readiness</span>
            <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500 font-mono tracking-tight drop-shadow-[0_0_12px_rgba(249,115,22,0.4)]">95% Complete</span>
          </div>
          
          <div className="relative h-3 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/80 shadow-inner">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "95%" }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 via-orange-500 to-amber-400 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.6)]"
            >
              {/* Shimmer line */}
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg]"
              />
            </motion.div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-5xl mb-16">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i }}
              className={`relative bg-zinc-950/40 backdrop-blur-md p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-1 ${
                item.status === 'completed' 
                  ? 'border-zinc-800/60 hover:border-zinc-700 hover:bg-zinc-900/60' 
                  : 'border-orange-500/30 hover:border-orange-500/50 hover:bg-orange-500/5 shadow-[0_0_30px_rgba(249,115,22,0.05)]'
              }`}
            >
              <div className="flex items-center gap-4">
                {item.status === 'completed' ? (
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-zinc-500" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                    <LoaderCircle className="w-5 h-5 text-orange-500 animate-spin" />
                  </div>
                )}
                <div className="flex-1 text-left">
                  <h4 className={`text-sm md:text-base font-medium tracking-wide ${item.status === 'completed' ? 'text-zinc-300' : 'text-orange-400'}`}>
                    {item.title}
                  </h4>
                  {item.status === 'progress' && (
                    <span className="text-[10px] md:text-xs text-orange-500/80 uppercase tracking-widest font-bold flex items-center gap-1.5 mt-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                      In Progress
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="text-center px-6 py-10 rounded-3xl bg-zinc-950/50 border border-zinc-800/60 backdrop-blur-sm w-full max-w-3xl flex flex-col items-center">
          <Zap className="w-6 h-6 text-orange-500/80 mb-5" />
          <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400 mb-4 tracking-tight leading-snug">
            Building the future of Bitcoin freelancing.
          </h3>
          <p className="text-zinc-500 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase">
            Stay tuned for launch.
          </p>
        </div>
      </div>
    </div>
  );
}
