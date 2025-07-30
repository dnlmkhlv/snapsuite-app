"use client";

import { Code, Palette, Monitor, RotateCcw } from "lucide-react";
import { CodeTabType } from "../../types/code";

interface CodeTabNavigationProps {
  activeTab: CodeTabType;
  onTabChange: (tab: CodeTabType) => void;
  onReset: () => void;
}

const TAB_CONFIG = [
  {
    id: "code" as const,
    label: "Code",
    icon: Code,
  },
  {
    id: "style" as const,
    label: "Style",
    icon: Palette,
  },
  {
    id: "window" as const,
    label: "Window",
    icon: Monitor,
  },
] as const;

export default function CodeTabNavigation({
  activeTab,
  onTabChange,
  onReset,
}: CodeTabNavigationProps) {
  return (
    <div className="flex flex-wrap items-center border-b relative z-0 gap-x-1 gap-y-2">
      {TAB_CONFIG.map((tab) => {
        const IconComponent = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-colors relative text-xs sm:text-base ${
              activeTab === tab.id
                ? "text-[#5170FF]"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <IconComponent className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
            )}
          </button>
        );
      })}
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-base text-gray-600 hover:text-gray-900 bg-transparent transition-all active:scale-90 active:opacity-70 ml-auto"
      >
        <RotateCcw className="w-4 h-4" />
        Reset
      </button>
    </div>
  );
}
