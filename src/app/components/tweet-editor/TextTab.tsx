"use client";

import { useState } from "react";
import { AlignLeft, AlignCenter, ChevronDown, ChevronUp } from "lucide-react";

interface TweetData {
  content: string;
  fontFamily: string;
  fontSize: number;
  alignment: "left" | "center";
  username: string;
  fullName: string;
  verified: boolean;
  profilePhoto: string | null;
  nameColor: string;
  usernameColor: string;
  contentColor: string;
  verifiedColor: string;
  cardTheme: "light" | "dark";
  backgroundColor: string;
  gradientStart: string;
  gradientEnd: string;
  showBorder: boolean;
  borderStyle: "solid" | "dashed" | "dotted" | "double";
  borderWidth: number;
  borderColor: string;
  backgroundType: "solid" | "gradient" | "image";
  backgroundImage: string | null;
  backgroundOpacity: number;
  aspectRatio: "4/5" | "1/1" | "16/9" | "3/2";
  borderRadius: number;
  showWatermark: boolean;
}

interface TextTabProps {
  tweetData: TweetData;
  setTweetData: (data: TweetData | ((prev: TweetData) => TweetData)) => void;
}

const fontOptions = [
  { value: "Inter", label: "Inter", className: "font-inter" },
  { value: "Roboto", label: "Roboto", className: "font-roboto" },
  { value: "Open Sans", label: "Open Sans", className: "font-open-sans" },
  { value: "Lato", label: "Lato", className: "font-lato" },
  { value: "Poppins", label: "Poppins", className: "font-poppins" },
  { value: "Montserrat", label: "Montserrat", className: "font-montserrat" },
];

const MAX_TWEET_LENGTH = 280;

export default function TextTab({ tweetData, setTweetData }: TextTabProps) {
  const [isFontFamilyOpen, setIsFontFamilyOpen] = useState(false);

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
        <button
          onClick={() => setIsFontFamilyOpen(!isFontFamilyOpen)}
          className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
        >
          <span className="text-sm font-medium">Font Family</span>
          {isFontFamilyOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {isFontFamilyOpen && (
          <div className="p-4 border border-gray-200 rounded-xl bg-white space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {fontOptions.map((font) => (
                <button
                  key={font.value}
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      fontFamily: font.value,
                    }))
                  }
                  className={`p-2 rounded-xl border transition-all ${
                    font.className
                  } ${
                    tweetData.fontFamily === font.value
                      ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {font.label}
                </button>
              ))}
            </div>
          </div>
        )}

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
