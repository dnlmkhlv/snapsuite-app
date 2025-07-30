"use client";

import { Quote, Palette, User, RotateCcw } from "lucide-react";
import { QuoteTabType } from "../../types/quote";

interface QuoteTabNavigationProps {
  activeTab: QuoteTabType;
  onTabChange: (tab: QuoteTabType) => void;
  onReset: () => void;
}

const TAB_CONFIG = [
  {
    id: "content" as const,
    label: "Content",
    icon: Quote,
  },
  {
    id: "style" as const,
    label: "Style",
    icon: Palette,
  },
  {
    id: "author" as const,
    label: "Author",
    icon: User,
  },
] as const;

export default function QuoteTabNavigation({
  activeTab,
  onTabChange,
  onReset,
}: QuoteTabNavigationProps) {
  return (
    <div className="flex items-center border-b relative z-0 gap-x-1 gap-y-2 overflow-x-auto">
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
