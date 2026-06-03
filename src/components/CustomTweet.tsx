import React, { useState, useEffect } from 'react';
import { EmbeddedTweet, TweetSkeleton, TweetNotFound, enrichTweet } from 'react-tweet';

export function CustomTweet({ id }: { id: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(`https://react-tweet.vercel.app/api/tweet/${id}`)
      .then(res => res.json())
      .then(json => {
        if (!active) return;
        if (json.data) {
           const tweet = json.data;
           
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
               if (obj.entities.media === undefined) {
                 // only react-tweet cares about media, it expects it optionally.
               }
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
      .catch((e) => {
        console.error(e);
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
      
    return () => { active = false; };
  }, [id]);

  if (isLoading) return <TweetSkeleton />;
  if (error || !data) return <TweetNotFound />;
  return <div className="react-tweet-theme"><EmbeddedTweet tweet={data} /></div>;
}
