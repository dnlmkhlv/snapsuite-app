"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Upload,
  Palette,
  Type,
  User,
  AlignLeft,
  AlignCenter,
  Layers,
  Settings,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import Themes from "../components/Themes";
import Templates from "../components/Templates";
import { TweetTemplate } from "../utils/storage";
import EditorLayout from "../components/EditorLayout";

interface TweetData {
  content: string;
  username: string;
  fullName: string;
  verified: boolean;
  profilePhoto: string | null;
  nameColor: string;
  usernameColor: string;
  contentColor: string;
  verifiedColor: string;
  fontFamily: string;
  fontSize: number;
  cardTheme: "light" | "dark";
  backgroundColor: string;
  alignment: "left" | "center";
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

const MAX_TWEET_LENGTH = 280;

const fontOptions = [
  { value: "Inter", label: "Inter", className: "font-inter" },
  { value: "Roboto", label: "Roboto", className: "font-roboto" },
  { value: "Open Sans", label: "Open Sans", className: "font-open-sans" },
  { value: "Lato", label: "Lato", className: "font-lato" },
  { value: "Poppins", label: "Poppins", className: "font-poppins" },
  { value: "Montserrat", label: "Montserrat", className: "font-montserrat" },
];

const themes = [
  {
    name: "Minimal",
    gradientStart: "#ffffff",
    gradientEnd: "#ffffff",
  },
  {
    name: "Dark",
    gradientStart: "#1E293B",
    gradientEnd: "#0F172A",
  },
  {
    name: "Ocean",
    gradientStart: "#0EA5E9",
    gradientEnd: "#2563EB",
  },
  {
    name: "Sunset",
    gradientStart: "#F97316",
    gradientEnd: "#DB2777",
  },
  {
    name: "Forest",
    gradientStart: "#22C55E",
    gradientEnd: "#15803D",
  },
  {
    name: "Purple Haze",
    gradientStart: "#A855F7",
    gradientEnd: "#6366F1",
  },
  {
    name: "Northern Lights",
    gradientStart: "#4C1D95",
    gradientEnd: "#10B981",
  },
  {
    name: "Cotton Candy",
    gradientStart: "#EC4899",
    gradientEnd: "#8B5CF6",
  },
  {
    name: "Deep Ocean",
    gradientStart: "#1E40AF",
    gradientEnd: "#0F766E",
  },
  {
    name: "Golden Hour",
    gradientStart: "#D97706",
    gradientEnd: "#7C2D12",
  },
  {
    name: "Midnight",
    gradientStart: "#312E81",
    gradientEnd: "#831843",
  },
  {
    name: "Emerald Dream",
    gradientStart: "#065F46",
    gradientEnd: "#0D9488",
  },
];

const borderStyles = [
  { value: "solid", label: "Solid" },
  { value: "dashed", label: "Dashed" },
  { value: "dotted", label: "Dotted" },
  { value: "double", label: "Double" },
] as const;

const DEFAULT_TWEET_DATA: TweetData = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  username: "johndoe",
  fullName: "John Doe",
  verified: false,
  profilePhoto: null,
  nameColor: "#000000",
  usernameColor: "#4B5563", // gray-600
  contentColor: "#000000",
  verifiedColor: "#1D9BF0",
  fontFamily: "Inter",
  cardTheme: "light",
  backgroundColor: "#ffffff",
  alignment: "left",
  gradientStart: "#ffffff",
  gradientEnd: "#ffffff",
  showBorder: false,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#e5e7eb", // gray-200
  backgroundType: "gradient",
  aspectRatio: "4/5",
  borderRadius: 12,
  fontSize: 16,
  backgroundImage: null,
  backgroundOpacity: 1,
  showWatermark: true,
};

const VerifiedBadge = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 22 22"
    aria-label="Verified account"
    className="w-full h-full"
    fill={color}
  >
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
  </svg>
);

export default function TweetImages() {
  const [tweetData, setTweetData] = useState<TweetData>(DEFAULT_TWEET_DATA);

  const [activeTab, setActiveTab] = useState<"text" | "style" | "profile">(
    "text"
  );
  const previewRef = useRef<HTMLDivElement>(null);
  const [isTextColorsOpen, setIsTextColorsOpen] = useState(false);
  const [isBackgroundThemesOpen, setIsBackgroundThemesOpen] = useState(false);
  const [isFontFamilyOpen, setIsFontFamilyOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTweetData((prev) => ({
          ...prev,
          profilePhoto: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getBackgroundForExport = (background: string) => {
    if (background.includes("gradient")) {
      const matches = background.match(/#[a-fA-F0-9]{6}/g);
      return matches ? matches[0] : "#ffffff";
    }
    return background;
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
      // Add style rule for proper image rendering
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule(
        "body > div:last-child img { display: inline-block; }"
      );

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        scale: 2,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `tweet-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Clean up the added style
      document.head.removeChild(style);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleThemeSelect = (theme: (typeof themes)[0]) => {
    setTweetData((prev) => ({
      ...prev,
      gradientStart: theme.gradientStart,
      gradientEnd: theme.gradientEnd,
      backgroundType: "gradient", // Always switch to gradient mode when selecting a theme
      cardTheme: prev.cardTheme, // Preserve the current card theme
    }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_TWEET_LENGTH) {
      setTweetData((prev) => ({
        ...prev,
        content: newContent,
      }));
    }
  };

  const ColorPicker = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (color: string) => void;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
        />
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-12 rounded-lg cursor-pointer"
        />
      </div>
    </div>
  );

  const toolsPanel = (
    <>
      {/* Reset Button */}
      <div className="absolute right-4 h-[57px] flex items-center">
        <button
          onClick={() => setTweetData(DEFAULT_TWEET_DATA)}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-transparent flex items-center gap-2 transition-all active:scale-90 active:opacity-70"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "text"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Type className="w-4 h-4" />
          Text
          {activeTab === "text" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "style"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Palette className="w-4 h-4" />
          Style
          {activeTab === "style" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "profile"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <User className="w-4 h-4" />
          Profile
          {activeTab === "profile" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "text" && (
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
        )}

        {activeTab === "style" && (
          <div className="space-y-8">
            {/* Card Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Card Theme
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      cardTheme: "light",
                      nameColor: "#000000",
                      usernameColor: "#536471",
                      contentColor: "#000000",
                      backgroundType: "gradient",
                      backgroundColor: "#ffffff",
                      gradientStart: "#ffffff",
                      gradientEnd: "#ffffff",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    tweetData.cardTheme === "light"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Light
                </button>
                <button
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      cardTheme: "dark",
                      nameColor: "#ffffff",
                      usernameColor: "#8B98A5",
                      contentColor: "#ffffff",
                      backgroundType: "solid",
                      backgroundColor: "#111827",
                      gradientStart: "#111827",
                      gradientEnd: "#111827",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    tweetData.cardTheme === "dark"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>

            {/* Image Ratio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Image Ratio
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      aspectRatio: "4/5",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    tweetData.aspectRatio === "4/5"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  4:5
                </button>
                <button
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      aspectRatio: "1/1",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    tweetData.aspectRatio === "1/1"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  1:1
                </button>
                <button
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      aspectRatio: "16/9",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    tweetData.aspectRatio === "16/9"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  16:9
                </button>
                <button
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      aspectRatio: "3/2",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    tweetData.aspectRatio === "3/2"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  3:2
                </button>
              </div>
            </div>

            {/* Text Colors Dropdown */}
            <div className="space-y-2">
              <button
                onClick={() => setIsTextColorsOpen(!isTextColorsOpen)}
                className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              >
                <span className="text-sm font-medium">Text Colors</span>
                {isTextColorsOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {isTextColorsOpen && (
                <div className="p-4 border border-gray-200 rounded-xl bg-white space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name Color
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={tweetData.nameColor}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            nameColor: e.target.value,
                          }))
                        }
                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                      />
                      <div className="w-12 h-12 relative">
                        <input
                          type="color"
                          value={tweetData.nameColor}
                          onChange={(e) =>
                            setTweetData((prev) => ({
                              ...prev,
                              nameColor: e.target.value,
                            }))
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div
                          className="w-full h-full rounded-xl border border-gray-200"
                          style={{ backgroundColor: tweetData.nameColor }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username Color
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={tweetData.usernameColor}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            usernameColor: e.target.value,
                          }))
                        }
                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                      />
                      <div className="w-12 h-12 relative">
                        <input
                          type="color"
                          value={tweetData.usernameColor}
                          onChange={(e) =>
                            setTweetData((prev) => ({
                              ...prev,
                              usernameColor: e.target.value,
                            }))
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div
                          className="w-full h-full rounded-xl border border-gray-200"
                          style={{ backgroundColor: tweetData.usernameColor }}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Content Color
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={tweetData.contentColor}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            contentColor: e.target.value,
                          }))
                        }
                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                      />
                      <div className="w-12 h-12 relative">
                        <input
                          type="color"
                          value={tweetData.contentColor}
                          onChange={(e) =>
                            setTweetData((prev) => ({
                              ...prev,
                              contentColor: e.target.value,
                            }))
                          }
                          className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div
                          className="w-full h-full rounded-xl border border-gray-200"
                          style={{ backgroundColor: tweetData.contentColor }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Border Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700">
                  Card Border
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={tweetData.showBorder}
                    onChange={(e) =>
                      setTweetData((prev) => ({
                        ...prev,
                        showBorder: e.target.checked,
                      }))
                    }
                    className="w-4 h-4 text-[#5170FF] border-gray-300 rounded focus:ring-[#5170FF]"
                  />
                  <span className="text-sm text-gray-600">Show border</span>
                </div>
              </div>

              {tweetData.showBorder && (
                <div className="space-y-4 pt-2">
                  {/* Border Style */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Style
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {borderStyles.map((style) => (
                        <button
                          key={style.value}
                          onClick={() =>
                            setTweetData((prev) => ({
                              ...prev,
                              borderStyle: style.value,
                            }))
                          }
                          className={`p-2 rounded-lg border text-sm transition-all ${
                            tweetData.borderStyle === style.value
                              ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                              : "border-gray-200 hover:border-gray-300 text-gray-600"
                          }`}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Border Width */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Thickness
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={tweetData.borderWidth}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            borderWidth: parseInt(e.target.value),
                          }))
                        }
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
                      />
                      <span className="text-sm text-gray-600 min-w-[2.5rem]">
                        {tweetData.borderWidth}px
                      </span>
                    </div>
                  </div>

                  {/* Border Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={tweetData.borderColor}
                          onChange={(e) =>
                            setTweetData((prev) => ({
                              ...prev,
                              borderColor: e.target.value,
                            }))
                          }
                          className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                        />
                      </div>
                      <div className="relative w-12 h-12">
                        <div
                          className="absolute inset-0 rounded-lg border border-gray-200"
                          style={{ backgroundColor: tweetData.borderColor }}
                        />
                        <input
                          type="color"
                          value={tweetData.borderColor}
                          onChange={(e) =>
                            setTweetData((prev) => ({
                              ...prev,
                              borderColor: e.target.value,
                            }))
                          }
                          className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Border Radius */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Corner Radius
                    </label>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="32"
                        value={tweetData.borderRadius}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            borderRadius: parseInt(e.target.value),
                          }))
                        }
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
                      />
                      <span className="text-sm text-gray-600 min-w-[2.5rem]">
                        {tweetData.borderRadius}px
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Background Theme */}
            <div className="space-y-2">
              <button
                onClick={() =>
                  setIsBackgroundThemesOpen(!isBackgroundThemesOpen)
                }
                className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              >
                <span className="text-sm font-medium">Background Theme</span>
                {isBackgroundThemesOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {isBackgroundThemesOpen && (
                <div className="mt-3 p-4 border border-gray-200 rounded-xl bg-white space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() => handleThemeSelect(theme)}
                        className="relative p-3 rounded-xl border transition-all hover:border-[#5170FF] group overflow-hidden"
                      >
                        <div
                          className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity"
                          style={{
                            background: `linear-gradient(to bottom right, ${theme.gradientStart}, ${theme.gradientEnd})`,
                          }}
                        />
                        <span
                          className="relative font-medium text-sm"
                          style={{
                            color:
                              theme.gradientStart === "#ffffff"
                                ? "#000000"
                                : "#ffffff",
                          }}
                        >
                          {theme.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Custom Background Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Custom Background Colors
              </label>
              <div className="space-y-6">
                {/* Background Type Selection */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() =>
                      setTweetData((prev) => ({
                        ...prev,
                        backgroundType: "solid",
                      }))
                    }
                    className={`p-3 rounded-xl border transition-all ${
                      tweetData.backgroundType === "solid"
                        ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    Solid Color
                  </button>
                  <button
                    onClick={() =>
                      setTweetData((prev) => ({
                        ...prev,
                        backgroundType: "gradient",
                      }))
                    }
                    className={`p-3 rounded-xl border transition-all ${
                      tweetData.backgroundType === "gradient"
                        ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    Gradient
                  </button>
                  <button
                    onClick={() =>
                      setTweetData((prev) => ({
                        ...prev,
                        backgroundType: "image",
                      }))
                    }
                    className={`p-3 rounded-xl border transition-all ${
                      tweetData.backgroundType === "image"
                        ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    Image
                  </button>
                </div>

                {/* Background Image Controls */}
                {tweetData.backgroundType === "image" && (
                  <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setTweetData((prev) => ({
                                ...prev,
                                backgroundImage: e.target?.result as string,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5170FF] file:text-white hover:file:bg-[#4060EE] text-gray-900"
                      />
                    </div>
                    {tweetData.backgroundImage && (
                      <div className="flex items-center gap-4">
                        <img
                          src={tweetData.backgroundImage}
                          alt="Background Preview"
                          className="w-full max-h-48 object-cover rounded-xl border border-gray-200 mt-4"
                        />
                        <button
                          onClick={() =>
                            setTweetData((prev) => ({
                              ...prev,
                              backgroundImage: null,
                            }))
                          }
                          className="px-3 py-2 text-xs font-medium text-red-600 bg-transparent border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Opacity
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={tweetData.backgroundOpacity * 100}
                          onChange={(e) =>
                            setTweetData((prev) => ({
                              ...prev,
                              backgroundOpacity: parseInt(e.target.value) / 100,
                            }))
                          }
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
                        />
                        <span className="text-sm text-gray-600 min-w-[2.5rem]">
                          {Math.round(tweetData.backgroundOpacity * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Solid Color Picker */}
                {tweetData.backgroundType === "solid" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <div className="flex gap-3">
                      <div className="relative flex-1">
                        <input
                          type="text"
                          value={tweetData.backgroundColor}
                          onChange={(e) =>
                            setTweetData((prev) => ({
                              ...prev,
                              backgroundColor: e.target.value,
                              gradientStart: e.target.value,
                              gradientEnd: e.target.value,
                            }))
                          }
                          className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                        />
                      </div>
                      <div className="relative w-12 h-12">
                        <div
                          className="absolute inset-0 rounded-lg border border-gray-200"
                          style={{ backgroundColor: tweetData.backgroundColor }}
                        />
                        <input
                          type="color"
                          value={tweetData.backgroundColor}
                          onChange={(e) =>
                            setTweetData((prev) => ({
                              ...prev,
                              backgroundColor: e.target.value,
                              gradientStart: e.target.value,
                              gradientEnd: e.target.value,
                            }))
                          }
                          className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Gradient Color Pickers */}
                {tweetData.backgroundType === "gradient" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Color
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={tweetData.gradientStart}
                            onChange={(e) =>
                              setTweetData((prev) => ({
                                ...prev,
                                gradientStart: e.target.value,
                              }))
                            }
                            className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                          />
                        </div>
                        <div className="relative w-12 h-12">
                          <div
                            className="absolute inset-0 rounded-lg border border-gray-200"
                            style={{ backgroundColor: tweetData.gradientStart }}
                          />
                          <input
                            type="color"
                            value={tweetData.gradientStart}
                            onChange={(e) =>
                              setTweetData((prev) => ({
                                ...prev,
                                gradientStart: e.target.value,
                              }))
                            }
                            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Color
                      </label>
                      <div className="flex gap-3">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            value={tweetData.gradientEnd}
                            onChange={(e) =>
                              setTweetData((prev) => ({
                                ...prev,
                                gradientEnd: e.target.value,
                              }))
                            }
                            className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                          />
                        </div>
                        <div className="relative w-12 h-12">
                          <div
                            className="absolute inset-0 rounded-lg border border-gray-200"
                            style={{ backgroundColor: tweetData.gradientEnd }}
                          />
                          <input
                            type="color"
                            value={tweetData.gradientEnd}
                            onChange={(e) =>
                              setTweetData((prev) => ({
                                ...prev,
                                gradientEnd: e.target.value,
                              }))
                            }
                            className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Watermark Option (moved to bottom) */}
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="watermark"
              >
                Show Watermark
              </label>
              <input
                type="checkbox"
                id="watermark"
                checked={tweetData.showWatermark || false}
                onChange={(e) =>
                  setTweetData((prev) => ({
                    ...prev,
                    showWatermark: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#5170FF] border-gray-300 rounded focus:ring-[#5170FF]"
              />
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={tweetData.fullName}
                onChange={(e) =>
                  setTweetData((prev) => ({
                    ...prev,
                    fullName: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={tweetData.username}
                onChange={(e) =>
                  setTweetData((prev) => ({
                    ...prev,
                    username: e.target.value.replace("@", ""),
                  }))
                }
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="verified"
                checked={tweetData.verified || false}
                onChange={(e) =>
                  setTweetData((prev) => ({
                    ...prev,
                    verified: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#5170FF] border-gray-300 rounded focus:ring-[#5170FF]"
              />
              <label
                htmlFor="verified"
                className="text-sm font-medium text-gray-700 flex items-center gap-2"
              >
                Show Verified Badge
              </label>
            </div>
            {tweetData.verified && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Badge Color
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={tweetData.verifiedColor}
                    onChange={(e) =>
                      setTweetData((prev) => ({
                        ...prev,
                        verifiedColor: e.target.value,
                      }))
                    }
                    className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                  />
                  <div className="w-12 h-12 relative">
                    <input
                      type="color"
                      value={tweetData.verifiedColor}
                      onChange={(e) =>
                        setTweetData((prev) => ({
                          ...prev,
                          verifiedColor: e.target.value,
                        }))
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer z-10"
                    />
                    <div
                      className="w-full h-full rounded-xl border border-gray-200"
                      style={{ backgroundColor: tweetData.verifiedColor }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5170FF] file:text-white hover:file:bg-[#4060EE] text-gray-900"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );

  const preview = (
    <div className="p-4">
      <div
        className={`mx-auto border border-gray-200 ${
          tweetData.aspectRatio === "16/9" || tweetData.aspectRatio === "3/2"
            ? "max-w-3xl"
            : "max-w-md"
        }`}
      >
        <div
          ref={previewRef}
          className="overflow-hidden relative"
          style={{ aspectRatio: tweetData.aspectRatio }}
        >
          <div
            className="w-full h-full"
            style={{
              ...(tweetData.backgroundType === "gradient"
                ? {
                    backgroundImage: `linear-gradient(to bottom right, ${tweetData.gradientStart}, ${tweetData.gradientEnd})`,
                  }
                : tweetData.backgroundType === "image" &&
                    tweetData.backgroundImage
                  ? {
                      backgroundImage: `url(${tweetData.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: tweetData.backgroundOpacity,
                    }
                  : {
                      backgroundColor: tweetData.backgroundColor,
                    }),
            }}
          >
            <div className="flex items-center justify-center w-full h-full p-8">
              <div
                className={`w-full ${
                  tweetData.cardTheme === "light"
                    ? `bg-white ${tweetData.showBorder ? "border border-gray-200 rounded-xl" : ""}`
                    : `bg-gray-900 ${tweetData.showBorder ? "border border-gray-800 rounded-xl" : ""}`
                }`}
                style={
                  tweetData.showBorder
                    ? {
                        borderStyle: tweetData.borderStyle,
                        borderWidth: `${tweetData.borderWidth}px`,
                        borderColor: tweetData.borderColor,
                        borderRadius: `${tweetData.borderRadius}px`,
                      }
                    : {}
                }
              >
                <div className="p-6">
                  <div
                    className={`flex flex-col ${
                      tweetData.alignment === "center"
                        ? "items-center text-center"
                        : "items-start text-left"
                    }`}
                  >
                    <div className="flex gap-3 mb-4">
                      {tweetData.profilePhoto ? (
                        <img
                          src={tweetData.profilePhoto}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full ${
                            tweetData.cardTheme === "light"
                              ? "bg-gray-200"
                              : "bg-gray-700"
                          } flex items-center justify-center`}
                        >
                          <User
                            className={`w-6 h-6 ${
                              tweetData.cardTheme === "light"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span
                            className={`font-bold ${
                              fontOptions.find(
                                (f) => f.value === tweetData.fontFamily
                              )?.className || "font-inter"
                            }`}
                            style={{
                              color: tweetData.nameColor,
                              lineHeight: "1.2em",
                            }}
                          >
                            {tweetData.fullName}
                          </span>
                          {tweetData.verified && (
                            <div className="w-5 h-5 ml-1">
                              <VerifiedBadge color={tweetData.verifiedColor} />
                            </div>
                          )}
                        </div>
                        <span
                          className={`${
                            fontOptions.find(
                              (f) => f.value === tweetData.fontFamily
                            )?.className || "font-inter"
                          }`}
                          style={{
                            color: tweetData.usernameColor,
                            lineHeight: "1.2em",
                          }}
                        >
                          @{tweetData.username}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`whitespace-pre-wrap ${
                        fontOptions.find(
                          (f) => f.value === tweetData.fontFamily
                        )?.className || "font-inter"
                      }`}
                      style={{
                        color: tweetData.contentColor,
                        fontSize: `${tweetData.fontSize}px`,
                      }}
                    >
                      {tweetData.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Watermark */}
          {tweetData.showWatermark && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
              <span className="text-gray-400/70 text-sm">snapsuite.app</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <EditorLayout
      toolsPanel={toolsPanel}
      preview={preview}
      onDownload={downloadImage}
    />
  );
}
