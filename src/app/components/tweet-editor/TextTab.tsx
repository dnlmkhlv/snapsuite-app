"use client";

import { AlignLeft, AlignCenter } from "lucide-react";
import FontSelector from "../ui/FontSelector";
import { TweetData } from "../../types/tweet";

interface TextTabProps {
  tweetData: TweetData;
  setTweetData: (data: TweetData | ((prev: TweetData) => TweetData)) => void;
}

const MAX_TWEET_LENGTH = 280;

export default function TextTab({ tweetData, setTweetData }: TextTabProps) {
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_TWEET_LENGTH) {
      setTweetData((prev) => ({
        ...prev,
        content: newContent,
      }));
    }
  };

  return (
    <div className="space-y-4">
      {/* Font Controls */}
      <div className="space-y-4">
        <FontSelector
          value={tweetData.fontFamily}
          onChange={(fontFamily) =>
            setTweetData((prev) => ({
              ...prev,
              fontFamily,
            }))
          }
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="12"
              max="32"
              value={tweetData.fontSize}
              onChange={(e) =>
                setTweetData((prev) => ({
                  ...prev,
                  fontSize: parseInt(e.target.value),
                }))
              }
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
            />
            <span className="text-sm text-gray-600 min-w-[2.5rem]">
              {tweetData.fontSize}px
            </span>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tweet Content
        </label>
        <textarea
          value={tweetData.content}
          onChange={handleContentChange}
          className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent resize-none bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
          placeholder="Enter your tweet content..."
          maxLength={MAX_TWEET_LENGTH}
        />
        <div className="mt-2 flex justify-end">
          <span
            className={`text-sm ${
              tweetData.content.length === MAX_TWEET_LENGTH
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {tweetData.content.length} / {MAX_TWEET_LENGTH}
          </span>
        </div>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() =>
            setTweetData((prev) => ({
              ...prev,
              alignment: "left",
            }))
          }
          className={`flex-1 p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
            tweetData.alignment === "left"
              ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
              : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}
        >
          <AlignLeft className="w-4 h-4" />
          Left
        </button>
        <button
          onClick={() =>
            setTweetData((prev) => ({
              ...prev,
              alignment: "center",
            }))
          }
          className={`flex-1 p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
            tweetData.alignment === "center"
              ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
              : "border-gray-200 hover:border-gray-300 text-gray-600"
          }`}
        >
          <AlignCenter className="w-4 h-4" />
          Center
        </button>
      </div>
    </div>
  );
}
