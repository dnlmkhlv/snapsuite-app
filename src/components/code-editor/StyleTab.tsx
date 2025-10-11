"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CodeData, Theme } from "../../types/code";
import { BACKGROUND_THEMES, THEME_OPTIONS } from "../../constants/code";
import ThemeSelector from "../ui/ThemeSelector";
import BackgroundSelector from "../ui/BackgroundSelector";

interface StyleTabProps {
  codeData: CodeData;
  setCodeData: (data: CodeData | ((prev: CodeData) => CodeData)) => void;
}

export default function StyleTab({ codeData, setCodeData }: StyleTabProps) {
  const [isThemesOpen, setIsThemesOpen] = useState(false);

  const handleBackgroundThemeSelect = (theme: Theme) => {
    setCodeData((prev) => ({
      ...prev,
      backgroundType: "gradient",
      gradientStart: theme.gradientStart,
      gradientEnd: theme.gradientEnd,
    }));
  };

  return (
    <div className="space-y-6">
      {/* Background Theme */}
      <ThemeSelector
        onThemeSelect={handleBackgroundThemeSelect}
        themes={BACKGROUND_THEMES}
      />

      {/* Custom Background Colors */}
      <BackgroundSelector
        backgroundType={codeData.backgroundType}
        onBackgroundTypeChange={(type) =>
          setCodeData((prev) => ({
            ...prev,
            backgroundType: type,
          }))
        }
        backgroundColor={codeData.backgroundColor}
        onBackgroundColorChange={(color) =>
          setCodeData((prev) => ({
            ...prev,
            backgroundColor: color,
          }))
        }
        gradientStart={codeData.gradientStart}
        onGradientStartChange={(color) =>
          setCodeData((prev) => ({
            ...prev,
            gradientStart: color,
          }))
        }
        gradientEnd={codeData.gradientEnd}
        onGradientEndChange={(color) =>
          setCodeData((prev) => ({
            ...prev,
            gradientEnd: color,
          }))
        }
        backgroundImage={codeData.backgroundImage}
        onBackgroundImageChange={(image) =>
          setCodeData((prev) => ({
            ...prev,
            backgroundImage: image,
          }))
        }
        backgroundOpacity={codeData.backgroundOpacity}
        onBackgroundOpacityChange={(opacity) =>
          setCodeData((prev) => ({
            ...prev,
            backgroundOpacity: opacity,
          }))
        }
      />

      {/* Code Theme */}
      <div className="space-y-2">
        <button
          onClick={() => setIsThemesOpen(!isThemesOpen)}
          className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
        >
          <span className="text-sm font-medium">Code Theme</span>
          {isThemesOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {isThemesOpen && (
          <div className="mt-3 p-4 border border-gray-200 rounded-xl bg-white">
            <div className="grid grid-cols-2 gap-3">
              {THEME_OPTIONS.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() =>
                    setCodeData((prev) => ({
                      ...prev,
                      theme: theme.value,
                    }))
                  }
                  className={`p-3 rounded-lg border transition-all ${
                    codeData.theme === theme.value
                      ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>
        )}
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
          checked={codeData.showWatermark}
          onChange={(e) =>
            setCodeData((prev) => ({
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
