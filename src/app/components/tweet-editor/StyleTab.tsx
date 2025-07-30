"use client";

import ColorPicker from "../ui/ColorPicker";
import ThemeSelector from "../ui/ThemeSelector";
import BackgroundSelector from "../ui/BackgroundSelector";
import { TweetData, Theme } from "../../types/tweet";

interface StyleTabProps {
  tweetData: TweetData;
  setTweetData: (data: TweetData | ((prev: TweetData) => TweetData)) => void;
  handleThemeSelect: (theme: Theme) => void;
}

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

      {/* Text Colors */}
      <div className="space-y-4">
        <ColorPicker
          label="Name Color"
          value={tweetData.nameColor}
          onChange={(color) =>
            setTweetData((prev) => ({
              ...prev,
              nameColor: color,
            }))
          }
        />
        <ColorPicker
          label="Username Color"
          value={tweetData.usernameColor}
          onChange={(color) =>
            setTweetData((prev) => ({
              ...prev,
              usernameColor: color,
            }))
          }
        />
        <ColorPicker
          label="Content Color"
          value={tweetData.contentColor}
          onChange={(color) =>
            setTweetData((prev) => ({
              ...prev,
              contentColor: color,
            }))
          }
        />
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
      <ThemeSelector onThemeSelect={handleThemeSelect} />

      {/* Custom Background Colors */}
      <BackgroundSelector
        backgroundType={tweetData.backgroundType}
        onBackgroundTypeChange={(type) =>
          setTweetData((prev) => ({
            ...prev,
            backgroundType: type,
          }))
        }
        backgroundColor={tweetData.backgroundColor}
        onBackgroundColorChange={(color) =>
          setTweetData((prev) => ({
            ...prev,
            backgroundColor: color,
          }))
        }
        gradientStart={tweetData.gradientStart}
        onGradientStartChange={(color) =>
          setTweetData((prev) => ({
            ...prev,
            gradientStart: color,
          }))
        }
        gradientEnd={tweetData.gradientEnd}
        onGradientEndChange={(color) =>
          setTweetData((prev) => ({
            ...prev,
            gradientEnd: color,
          }))
        }
        backgroundImage={tweetData.backgroundImage}
        onBackgroundImageChange={(image) =>
          setTweetData((prev) => ({
            ...prev,
            backgroundImage: image,
          }))
        }
        backgroundOpacity={tweetData.backgroundOpacity}
        onBackgroundOpacityChange={(opacity) =>
          setTweetData((prev) => ({
            ...prev,
            backgroundOpacity: opacity,
          }))
        }
      />

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
