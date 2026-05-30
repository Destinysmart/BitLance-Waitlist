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
              The simplest Bitcoin freelancing platform, <br className="hidden sm:block" />
              built to accelerate Bitcoin adoption.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-12 md:gap-20">
            <div className="flex flex-col items-center sm:items-start gap-5">
              <span className="text-zinc-100 font-semibold tracking-wide text-sm opacity-90 uppercase text-[11px] tracking-widest">Spread the word</span>
              <div className="flex items-center gap-4">
                <a 
                  href="https://twitter.com/intent/tweet?text=Join%20the%20Bitlance%20waitlist!%20The%20simplest%20Bitcoin%20freelancing%20platform%2C%20built%20to%20accelerate%20Bitcoin%20adoption.&url=https://waitlist.bitlance.work" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 active:scale-95 text-zinc-400 hover:text-white transition-all shadow-inner relative overflow-hidden"
                  title="Share on X"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                  <svg className="w-4 h-4 fill-current z-10" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.007 4.126H5.078z" />
                  </svg>
                </a>
                <a 
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://waitlist.bitlance.work" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-[#0077b5]/20 hover:border-[#0077b5]/50 active:scale-95 text-zinc-400 hover:text-[#0077b5] transition-all shadow-inner relative overflow-hidden"
                  title="Share on LinkedIn"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                  <svg className="w-4 h-4 fill-current z-10" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://t.me/share/url?url=https://waitlist.bitlance.work&text=Join%20the%20Bitlance%20waitlist!%20The%20simplest%20Bitcoin%20freelancing%20platform%2C%20built%20to%20accelerate%20Bitcoin%20adoption." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-[#229ED9]/20 hover:border-[#229ED9]/50 active:scale-95 text-zinc-400 hover:text-[#229ED9] transition-all shadow-inner relative overflow-hidden"
                  title="Share on Telegram"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
                  <svg className="w-5 h-5 fill-current z-10 pr-0.5 pt-0.5" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.892-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div className="flex flex-col items-center sm:items-start gap-5">
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
