"use client";

import { Palette } from "lucide-react";

interface Theme {
  name: string;
  backgroundColor: string;
  textColor: string;
  description: string;
}

interface ThemesProps {
  onThemeSelect: (theme: Theme) => void;
}

const themes: Theme[] = [
  {
    name: "Classic",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    description: "Clean white background with black text",
  },
  {
    name: "Dark",
    backgroundColor: "#15202b",
    textColor: "#ffffff",
    description: "Twitter-like dark theme",
  },
  {
    name: "Blue",
    backgroundColor: "#1da1f2",
    textColor: "#ffffff",
    description: "Twitter blue background",
  },
  {
    name: "Gradient",
    backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    textColor: "#ffffff",
    description: "Beautiful purple gradient",
  },
  {
    name: "Sunset",
    backgroundColor: "linear-gradient(135deg, #ff6b6b 0%, #feca57 100%)",
    textColor: "#ffffff",
    description: "Warm sunset colors",
  },
  {
    name: "Ocean",
    backgroundColor: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    textColor: "#ffffff",
    description: "Cool ocean gradient",
  },
];

export default function Themes({ onThemeSelect }: ThemesProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
        <Palette className="w-5 h-5" />
        Preset Themes
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => onThemeSelect(theme)}
            className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-left"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{
                  background: theme.backgroundColor.includes("gradient")
                    ? theme.backgroundColor
                    : theme.backgroundColor,
                }}
              />
              <span className="font-medium text-sm">{theme.name}</span>
            </div>
            <p className="text-xs text-gray-600">{theme.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
