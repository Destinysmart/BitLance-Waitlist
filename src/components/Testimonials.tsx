import React, { useEffect, useState } from 'react';
import { CustomTweet } from './CustomTweet';

// Highlight: Add your X (Twitter) post IDs here.
// How to get the ID: In a tweet URL like https://x.com/username/status/1234567890, the ID is 1234567890
const TWEET_IDS = [
  "2061919804462653840",
  "2060662647792546196",
  "2061920076656177321",
  "2061958274669248956",
  "2060695468833980680",
];

export default function Testimonials() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Sync react-tweet theme with our custom light-mode class
    const checkTheme = () => {
      const isLight = document.documentElement.classList.contains('light-mode');
      setTheme(isLight ? 'light' : 'dark');
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    checkTheme();

    return () => observer.disconnect();
  }, []);

  const tweetList = (
    <div className="flex gap-6 pr-6 shrink-0">
      {TWEET_IDS.map((id, index) => (
        <div key={`${id}-${index}`} className="w-[320px] sm:w-[350px] shrink-0" data-theme={theme}>
          {/* Prevent clicks from making it stop unexpectedly, or allow interaction natively */}
          <div className="w-full h-full pointer-events-auto">
            <CustomTweet id={id} />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative py-32 z-10 overflow-hidden w-screen left-1/2 -translate-x-1/2 bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
         <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tighter text-white mb-6 drop-shadow-sm">
            Loved by early <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500">Adopters.</span>
         </h2>
         <p className="text-zinc-400 text-lg md:text-xl font-light max-w-2xl mx-auto">
            Hear what freelancers and builders are saying about Bitlance as they join our waitlist.
         </p>
      </div>

      <div className="flex overflow-hidden mask-edges w-full group">
        <div className="flex w-max animate-scroll-left group-hover:[animation-play-state:paused] pb-4">
          {tweetList}
          {tweetList}
        </div>
      </div>
    </div>
  );
}
