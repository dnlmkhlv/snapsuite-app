"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

interface StyleTabProps {
  tweetData: TweetData;
  setTweetData: (data: TweetData | ((prev: TweetData) => TweetData)) => void;
  handleThemeSelect: (theme: any) => void;
}

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

export default function StyleTab({
  tweetData,
  setTweetData,
  handleThemeSelect,
}: StyleTabProps) {
  const [isTextColorsOpen, setIsTextColorsOpen] = useState(false);
  const [isBackgroundThemesOpen, setIsBackgroundThemesOpen] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
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
  };

  return (
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
          onClick={() => setIsBackgroundThemesOpen(!isBackgroundThemesOpen)}
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
                  onChange={handleFileUpload}
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

      {/* Watermark Option */}
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
  );
}
