import React from 'react';

export default function Footer() {
  return (
    <footer className="relative z-10 w-full pt-16 pb-8 mt-24 border-t border-zinc-900/80 bg-[#050505]">
      {/* Subtle top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-orange-500/20 to-transparent"></div>
      
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-16">
          <div className="flex flex-col items-center md:items-start">
            <img src="/logo.png" alt="Bitlance Logo" className="h-7 w-auto mb-6 object-contain" />
            <p className="text-zinc-500 text-sm text-center md:text-left max-w-sm leading-relaxed font-light">
              The first truly borderless freelance economy. <br className="hidden sm:block" />
              Built natively on Bitcoin.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-5">
            <span className="text-zinc-100 font-semibold tracking-wide text-sm opacity-90 uppercase text-[11px] tracking-widest">Connect with us</span>
            <a 
              href="https://x.com/bitlancework" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-3 text-zinc-400 hover:text-white transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-orange-500/10 group-hover:border-orange-500/30 group-hover:text-orange-400 transition-all shadow-inner relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                <svg className="w-4 h-4 fill-current z-10" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 4.126H5.078z" />
                </svg>
              </div>
              <span className="text-sm font-medium">@bitlancework</span>
            </a>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-zinc-900 text-xs text-zinc-600">
          <p className="font-medium tracking-wide">&copy; 2026 Bitlance. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0 font-medium tracking-wide">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
