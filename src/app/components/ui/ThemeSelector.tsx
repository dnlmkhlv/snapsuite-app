"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Theme {
  name: string;
  gradientStart: string;
  gradientEnd: string;
}

interface ThemeSelectorProps {
  onThemeSelect: (theme: Theme) => void;
  themes?: Theme[];
  className?: string;
}

const defaultThemes: Theme[] = [
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

export default function ThemeSelector({
  onThemeSelect,
  themes = defaultThemes,
  className = "",
}: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
      >
        <span className="text-sm font-medium">Background Theme</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="mt-3 p-4 border border-gray-200 rounded-xl bg-white space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.name}
                onClick={() => {
                  onThemeSelect(theme);
                  setIsOpen(false);
                }}
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
                      theme.gradientStart === "#ffffff" ? "#000000" : "#ffffff",
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
  );
}
