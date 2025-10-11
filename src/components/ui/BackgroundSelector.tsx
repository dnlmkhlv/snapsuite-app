"use client";

import Image from "next/image";

interface BackgroundSelectorProps {
  backgroundType: "solid" | "gradient" | "image";
  onBackgroundTypeChange: (type: "solid" | "gradient" | "image") => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  gradientStart: string;
  onGradientStartChange: (color: string) => void;
  gradientEnd: string;
  onGradientEndChange: (color: string) => void;
  backgroundImage: string | null;
  onBackgroundImageChange: (image: string | null) => void;
  backgroundOpacity: number;
  onBackgroundOpacityChange: (opacity: number) => void;
  className?: string;
}

export default function BackgroundSelector({
  backgroundType,
  onBackgroundTypeChange,
  backgroundColor,
  onBackgroundColorChange,
  gradientStart,
  onGradientStartChange,
  gradientEnd,
  onGradientEndChange,
  backgroundImage,
  onBackgroundImageChange,
  backgroundOpacity,
  onBackgroundOpacityChange,
  className = "",
}: BackgroundSelectorProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onBackgroundImageChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Custom Background Colors
      </label>
      <div className="space-y-6">
        {/* Background Type Selection */}
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => onBackgroundTypeChange("solid")}
            className={`p-3 rounded-xl border transition-all ${
              backgroundType === "solid"
                ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
          >
            Solid Color
          </button>
          <button
            onClick={() => onBackgroundTypeChange("gradient")}
            className={`p-3 rounded-xl border transition-all ${
              backgroundType === "gradient"
                ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
          >
            Gradient
          </button>
          <button
            onClick={() => onBackgroundTypeChange("image")}
            className={`p-3 rounded-xl border transition-all ${
              backgroundType === "image"
                ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                : "border-gray-200 hover:border-gray-300 text-gray-600"
            }`}
          >
            Image
          </button>
        </div>

        {/* Background Image Controls */}
        {backgroundType === "image" && (
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
            {backgroundImage && (
              <div className="flex items-center gap-4">
                <div className="relative w-full h-48 mt-4">
                  <Image
                    src={backgroundImage}
                    alt="Background Preview"
                    fill
                    className="object-cover rounded-xl border border-gray-200"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => onBackgroundImageChange(null)}
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
                  value={Math.round(backgroundOpacity * 100)}
                  onChange={(e) =>
                    onBackgroundOpacityChange(parseInt(e.target.value) / 100)
                  }
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
                />
                <span className="text-sm text-gray-600 min-w-[2.5rem]">
                  {Math.round(backgroundOpacity * 100)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Solid Color Picker */}
        {backgroundType === "solid" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={backgroundColor}
                  onChange={(e) => {
                    onBackgroundColorChange(e.target.value);
                    onGradientStartChange(e.target.value);
                    onGradientEndChange(e.target.value);
                  }}
                  className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                />
              </div>
              <div className="relative w-12 h-12">
                <div
                  className="absolute inset-0 rounded-lg border border-gray-200"
                  style={{ backgroundColor: backgroundColor }}
                />
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => {
                    onBackgroundColorChange(e.target.value);
                    onGradientStartChange(e.target.value);
                    onGradientEndChange(e.target.value);
                  }}
                  className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Gradient Color Pickers */}
        {backgroundType === "gradient" && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Color
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={gradientStart}
                    onChange={(e) => onGradientStartChange(e.target.value)}
                    className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                  />
                </div>
                <div className="relative w-12 h-12">
                  <div
                    className="absolute inset-0 rounded-lg border border-gray-200"
                    style={{ backgroundColor: gradientStart }}
                  />
                  <input
                    type="color"
                    value={gradientStart}
                    onChange={(e) => onGradientStartChange(e.target.value)}
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
                    value={gradientEnd}
                    onChange={(e) => onGradientEndChange(e.target.value)}
                    className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                  />
                </div>
                <div className="relative w-12 h-12">
                  <div
                    className="absolute inset-0 rounded-lg border border-gray-200"
                    style={{ backgroundColor: gradientEnd }}
                  />
                  <input
                    type="color"
                    value={gradientEnd}
                    onChange={(e) => onGradientEndChange(e.target.value)}
                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
