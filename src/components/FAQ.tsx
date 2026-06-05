import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CircleHelp, ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "Where do I apply for work?", a: "Go to Job Feed, open a job, and click Apply Now. Submit your proposal with your experience, pricing, and cover note." },
    { q: "How do I know if a client replied?", a: "Proposal updates appear in your dashboard and active conversations appear in Messages." },
    { q: "When should I start working?", a: "Only begin work once the milestone shows Funded Escrow." },
    { q: "What is escrow?", a: "Escrow securely holds client funds before work begins and releases them after approval." },
    { q: "How do I submit completed work?", a: "Open the contract milestone and submit your delivery with notes, links, or files." },
    { q: "What if the client requests revisions?", a: "Update the work and resubmit through the same milestone." },
    { q: "How do I communicate with clients?", a: "Use Messages to chat, share files, and discuss project requirements." },
    { q: "Where can I track my Bitcoin earnings?", a: "Use the Earnings section to view released sats, escrow balances, fees, and transaction history." },
    { q: "Can I work with clients from any country?", a: "Yes. Bitlance is designed for global hiring and Bitcoin payments." },
    { q: "Are payments made in Bitcoin?", a: "Yes. Earnings are paid and tracked in sats." },
    { q: "What happens if there is a dispute?", a: "Disputes can be reviewed using contract history, milestone submissions, and communication records." },
    { q: "Is Bitlance free to join?", a: "Yes. Creating an account and applying for work is free." }
  ];

  return (
    <div className="w-full relative z-10 py-16 bg-[#0a0a0a] text-white rounded-[2.5rem] md:rounded-[3rem] border border-zinc-900 shadow-2xl overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center mb-16 px-6 relative z-10"
      >
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 shadow-xl border border-zinc-800 flex items-center justify-center relative group">
            <div className="absolute inset-0 bg-orange-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-md"></div>
            <CircleHelp className="w-7 h-7 text-orange-500 z-10" />
          </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-6 drop-shadow-sm">
          Frequently Asked Questions
        </h2>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
          Everything you need to know before joining the future of Bitcoin freelancing.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 px-6 relative z-10">
        {/* Left Column (Sticky info panel) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          className="lg:w-1/3"
        >
          <div className="sticky top-24 bg-zinc-900/60 backdrop-blur-xl rounded-[2rem] p-8 md:p-10 border border-zinc-800 shadow-[0_0_40px_rgba(249,115,22,0.05)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600"></div>
            <div className="absolute -inset-1 bg-gradient-to-b from-orange-500/10 to-transparent blur-xl pointer-events-none"></div>
            <div className="relative z-10 text-center lg:text-left">
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">Still Have Questions?</h3>
              <p className="text-zinc-400 leading-relaxed mb-8 text-sm md:text-base">
                We're building Bitlance in public. Join the waitlist today and be among the first freelancers and clients to access the platform at launch.
              </p>
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500 text-white font-semibold py-4 px-6 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-0.5 transition-all duration-300 border border-orange-400/50"
              >
                Join the Waitlist
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right Column (FAQ accordion list) */}
        <div className="lg:w-2/3 flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 * (index % 5), ease: "easeOut" }}
              key={index} 
              className={`bg-zinc-900/40 backdrop-blur-sm border transition-all duration-300 rounded-2xl overflow-hidden group ${
                openIndex === index 
                  ? 'border-orange-500/50 bg-orange-500/5 shadow-[0_0_30px_rgba(249,115,22,0.08)]' 
                  : 'border-zinc-800/80 hover:border-zinc-700/80 hover:bg-zinc-900/80 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-orange-500/5 cursor-pointer'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none"
              >
                <span className={`text-base md:text-lg font-semibold tracking-wide pr-8 transition-colors duration-300 ${openIndex === index ? 'text-white' : 'text-zinc-300 group-hover:text-zinc-100'}`}>
                  {faq.q}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                  openIndex === index ? 'bg-orange-500 text-white' : 'bg-zinc-800/80 text-zinc-400 group-hover:bg-zinc-700 group-hover:text-zinc-300'
                }`}>
                  <ChevronDown strokeWidth={2.5} className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 md:p-8 pt-0 text-zinc-400 text-sm md:text-base leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
