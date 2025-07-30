"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ImageData } from "../../types/image";
import { FILTERS } from "../../constants/image";

interface EffectsTabProps {
  imageData: ImageData;
  setImageData: (data: ImageData | ((prev: ImageData) => ImageData)) => void;
}

export default function EffectsTab({
  imageData,
  setImageData,
}: EffectsTabProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="space-y-2">
        <button
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
        >
          <span className="text-sm font-medium">Filters</span>
          {isFiltersOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>

        {isFiltersOpen && (
          <div className="p-4 border border-gray-200 rounded-xl bg-white">
            <div className="grid grid-cols-2 gap-3">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() =>
                    setImageData((prev) => ({
                      ...prev,
                      filter: filter.value,
                    }))
                  }
                  className={`p-3 rounded-lg border transition-all ${
                    imageData.filter === filter.value
                      ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Brightness */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Brightness
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="200"
            value={imageData.brightness}
            onChange={(e) =>
              setImageData((prev) => ({
                ...prev,
                brightness: parseInt(e.target.value),
              }))
            }
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
          />
          <span className="text-sm text-gray-600 min-w-[2.5rem]">
            {imageData.brightness}%
          </span>
        </div>
      </div>

      {/* Contrast */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contrast
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="200"
            value={imageData.contrast}
            onChange={(e) =>
              setImageData((prev) => ({
                ...prev,
                contrast: parseInt(e.target.value),
              }))
            }
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
          />
          <span className="text-sm text-gray-600 min-w-[2.5rem]">
            {imageData.contrast}%
          </span>
        </div>
      </div>

      {/* Saturation */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Saturation
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="200"
            value={imageData.saturation}
            onChange={(e) =>
              setImageData((prev) => ({
                ...prev,
                saturation: parseInt(e.target.value),
              }))
            }
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
          />
          <span className="text-sm text-gray-600 min-w-[2.5rem]">
            {imageData.saturation}%
          </span>
        </div>
      </div>

      {/* Blur */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Blur
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="10"
            step="0.5"
            value={imageData.blur}
            onChange={(e) =>
              setImageData((prev) => ({
                ...prev,
                blur: parseFloat(e.target.value),
              }))
            }
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
          />
          <span className="text-sm text-gray-600 min-w-[2.5rem]">
            {imageData.blur}px
          </span>
        </div>
      </div>
    </div>
  );
}
