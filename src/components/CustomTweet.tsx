import React, { useState, useEffect } from 'react';
import { EmbeddedTweet, TweetSkeleton, TweetNotFound } from 'react-tweet';

export function CustomTweet({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    // Use the vercel app proxy as it formats the response nicely
    fetch(`https://react-tweet.vercel.app/api/tweet/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Network response cannot be resolved');
        return res.json();
      })
      .then(json => {
        if (!active) return;
        if (json.data) {
           const tweet = json.data;
           
           // Fix missing entities arrays which cause "entities is not iterable" in react-tweet
           function fixEntities(obj: any) {
             if (!obj || typeof obj !== 'object') return;
             if ('__typename' in obj && obj.__typename === 'Tweet') {
               obj.entities = obj.entities || {};
             }
             if ('entities' in obj && obj.entities && !Array.isArray(obj.entities)) {
               obj.entities.hashtags = obj.entities.hashtags || [];
               obj.entities.user_mentions = obj.entities.user_mentions || [];
               obj.entities.urls = obj.entities.urls || [];
               obj.entities.symbols = obj.entities.symbols || [];
             }
             for (const key in obj) {
               if (typeof obj[key] === 'object') {
                 fixEntities(obj[key]);
               }
             }
           }
           
           fixEntities(tweet);
           setData(tweet);
        } else {
           setError(true);
        }
      })
      .catch(() => {
        // Suppress console.error to avoid phantom error logs in the dev tools metadata
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
      
    return () => { active = false; };
  }, [id]);

  if (isLoading) return <TweetSkeleton />;
  if (error || !data) return <TweetNotFound error={new Error("Could not load tweet.")} />;
  return <div className="react-tweet-theme"><EmbeddedTweet tweet={data} /></div>;
}

