import React from 'react';
import { Zap, Globe2, ShieldCheck } from 'lucide-react';

export default function Benefits() {
  const items = [
    {
      icon: <Zap strokeWidth={1.5} className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Instant Payments",
      description: "Get paid in sats via Lightning. No delays."
    },
    {
      icon: <Globe2 strokeWidth={1.5} className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Work Without Borders",
      description: "Earn globally without needing a bank account."
    },
    {
      icon: <ShieldCheck strokeWidth={1.5} className="w-6 h-6 text-orange-500 group-hover:scale-110 transition-transform duration-300" />,
      title: "Secure by Design",
      description: "Escrow ensures fair payment for completed work."
    }
  ];

  return (
    <div className="grid sm:grid-cols-3 gap-6 md:gap-8 w-full">
      {items.map((item, i) => (
        <div key={i} className="flex flex-col items-center sm:items-start text-center sm:text-left bg-[#0a0a0a] border-white/5 backdrop-blur-md p-6 sm:p-8 rounded-[2rem] border shadow-2xl hover:border-orange-500/20 hover:bg-zinc-900/40 hover:-translate-y-1 transition-all duration-300 group cursor-default">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 border border-zinc-800 group-hover:bg-orange-500/10 group-hover:border-orange-500/30 transition-all duration-300 shadow-inner">
            {item.icon}
          </div>
          <h3 className="text-lg font-semibold text-zinc-100 mb-2">{item.title}</h3>
          <p className="text-zinc-500 leading-relaxed text-sm md:text-base font-light">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
