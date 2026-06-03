import React from 'react';
import { Zap, Globe2, ShieldCheck } from 'lucide-react';

export default function Benefits() {
  const items = [
    {
      icon: <Zap strokeWidth={1.5} className="w-8 h-8 text-orange-500 mb-6 group-hover:-translate-y-1 transition-transform duration-500" />,
      title: "Instant Lightning Execution",
      description: "Get paid instantly over the Lightning Network as soon as work is approved. Zero withdrawal windows.",
      colSpan: "sm:col-span-2 lg:col-span-2",
      gradient: "from-orange-500/10 via-transparent to-transparent"
    },
    {
      icon: <Globe2 strokeWidth={1.5} className="w-8 h-8 text-blue-500 mb-6 group-hover:-translate-y-1 transition-transform duration-500" />,
      title: "Stateless Setup",
      description: "No bank accounts needed. Work globally from day one.",
      colSpan: "sm:col-span-1 lg:col-span-1",
      gradient: "from-blue-500/10 via-transparent to-transparent"
    },
    {
      icon: <ShieldCheck strokeWidth={1.5} className="w-8 h-8 text-emerald-500 mb-6 group-hover:-translate-y-1 transition-transform duration-500" />,
      title: "Smart Escrow Safety",
      description: "Client funds are locked securely in escrow before a single line of code is written.",
      colSpan: "sm:col-span-1 lg:col-span-1",
      gradient: "from-emerald-500/10 via-transparent to-transparent"
    },
    {
      icon: <div className="w-8 h-8 rounded shrink-0 bg-transparent mb-6 text-zinc-400 group-hover:text-white transition-colors duration-500 border border-zinc-700/50 flex items-center justify-center"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>,
      title: "Verifiable Reputation Tracking",
      description: "Build an unshakable profile. Every completed milestone contributes to your immutable on-chain reputation stats, letting your real work do the talking.",
      colSpan: "sm:col-span-2 lg:col-span-2",
      gradient: "from-zinc-800/30 via-transparent to-transparent"
    }
  ];

  return (
    <div className="w-full flex flex-col pt-12 items-center">
       <div className="mb-16 text-center">
         <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tighter text-white drop-shadow-sm mb-4">
             Frictionless Value Exchange.
         </h2>
         <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
             Stop waiting 5 days for a wire transfer. We're replacing the legacy infrastructure with a system optimized for truth.
         </p>
       </div>
       
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full auto-rows-[minmax(280px,auto)]">
         {items.map((item, i) => (
           <div key={i} className={`relative flex flex-col justify-between overflow-hidden bg-[#0a0a0a]/50 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-zinc-800/60 shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:border-zinc-700 hover:shadow-2xl transition-all duration-500 group cursor-default ${item.colSpan}`}>
             <div className={`absolute inset-0 bg-gradient-to-br opacity-50 ${item.gradient} pointer-events-none`}></div>
             
             <div className="relative z-10">
               {item.icon}
               <h3 className="text-xl md:text-2xl font-display font-bold text-zinc-100 mb-3 tracking-tight">{item.title}</h3>
               <p className="text-zinc-400 leading-relaxed text-sm md:text-base font-light">
                 {item.description}
               </p>
             </div>
             
             {/* Decorative grid pattern inside card */}
             <div className="absolute right-0 bottom-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-500 w-full h-full bg-[linear-gradient(to_right,#FFF_1px,transparent_1px),linear-gradient(to_bottom,#FFF_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_100%_100%_at_100%_100%,#000_10%,transparent_70%)] pointer-events-none"></div>
           </div>
         ))}
       </div>
    </div>
  );
}
