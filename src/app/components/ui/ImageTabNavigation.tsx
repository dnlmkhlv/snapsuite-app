"use client";

import {
  Type,
  Upload,
  Image as ImageIcon,
  Palette,
  RotateCcw,
} from "lucide-react";
import { ImageTabType } from "../../types/image";

interface ImageTabNavigationProps {
  activeTab: ImageTabType;
  onTabChange: (tab: ImageTabType) => void;
  onReset: () => void;
}

const TAB_CONFIG = [
  {
    id: "image" as const,
    label: "Image",
    icon: ImageIcon,
  },
  {
    id: "text" as const,
    label: "Text",
    icon: Type,
  },
  {
    id: "effects" as const,
    label: "Effects",
    icon: Palette,
  },
] as const;

export default function ImageTabNavigation({
  activeTab,
  onTabChange,
  onReset,
}: ImageTabNavigationProps) {
  return (
    <>
      {/* Reset Button */}
      <div className="absolute right-4 h-[57px] flex items-center">
        <button
          onClick={onReset}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-transparent flex items-center gap-2 transition-all active:scale-90 active:opacity-70"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b">
        {TAB_CONFIG.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
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
      </div>
    </>
  );
}
