import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function FinalCTA() {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    setTimeLeft(0);
  }, []);

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
    <div className="relative overflow-hidden flex flex-col items-center justify-center p-10 sm:p-16 md:p-20 rounded-[2.5rem] bg-[#0a0a0a] border border-zinc-900 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] w-full group">
      {/* Ambient glowing orb behind timer */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-orange-500/5 rounded-full blur-[80px] pointer-events-none transition-opacity duration-1000 group-hover:bg-orange-500/10"></div>
      
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
        <h2 className="text-xs md:text-sm font-semibold tracking-[0.2em] text-orange-500/80 mb-10 sm:mb-12 uppercase flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
          Mainnet Launch In
        </h2>
        
        <div className="flex w-full justify-center gap-2 sm:gap-6 md:gap-8 lg:gap-10">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center">
                <div className="w-14 h-16 sm:w-20 sm:h-24 md:w-24 md:h-28 bg-zinc-900/60 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 sm:mb-5 border border-zinc-800/80 relative overflow-hidden shadow-inner group/card hover:border-orange-500/30 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={unit.value}
                      initial={{ y: 20, opacity: 0, scale: 0.8 }}
                      animate={{ y: 0, opacity: 1, scale: 1 }}
                      exit={{ y: -20, opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                      className="absolute text-3xl sm:text-5xl md:text-6xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 tabular-nums"
                    >
                      {unit.value.toString().padStart(2, '0')}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <span className="text-[9px] sm:text-xs font-semibold text-zinc-500 uppercase tracking-widest">{unit.label}</span>
              </div>
              {index < timeUnits.length - 1 && (
                <div className="text-2xl sm:text-4xl text-zinc-800 font-bold mt-4 sm:mt-6 hidden sm:block">:</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
