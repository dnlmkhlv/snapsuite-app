import { useState } from "react";
import { TweetData } from "../types/tweet";
import { DEFAULT_TWEET_DATA } from "../constants/tweet";

export function useTweetData() {
  const [tweetData, setTweetData] = useState<TweetData>(DEFAULT_TWEET_DATA);

  const resetTweetData = () => {
    setTweetData(DEFAULT_TWEET_DATA);
  };

  return {
    tweetData,
    setTweetData,
    resetTweetData,
  };
}
