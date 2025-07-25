"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Palette,
  Type,
  Upload,
  Image as ImageIcon,
  Layout,
  Sliders,
  RotateCcw,
} from "lucide-react";
import EditorLayout from "../components/EditorLayout";

interface ImageData {
  image: string | null;
  imageFileName?: string;
  text: string;
  textColor: string;
  fontSize: string;
  textPosition: "top" | "center" | "bottom";
  filter: string;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
}

const DEFAULT_IMAGE_DATA: ImageData = {
  image: null,
  imageFileName: undefined,
  text: "",
  textColor: "#ffffff",
  fontSize: "24px",
  textPosition: "bottom",
  filter: "none",
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
};

export default function Images() {
  const [activeTab, setActiveTab] = useState<"image" | "text" | "effects">(
    "image"
  );
  const [imageData, setImageData] = useState<ImageData>(DEFAULT_IMAGE_DATA);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageData((prev) => ({
          ...prev,
          image: e.target?.result as string,
          imageFileName: file.name,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `image-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const filters = [
    { name: "None", value: "none" },
    { name: "Grayscale", value: "grayscale(100%)" },
    { name: "Sepia", value: "sepia(100%)" },
    { name: "Vintage", value: "sepia(50%) contrast(85%) brightness(90%)" },
    { name: "Dramatic", value: "contrast(120%) saturate(110%)" },
    { name: "Cool", value: "saturate(80%) hue-rotate(20deg)" },
    { name: "Warm", value: "saturate(120%) hue-rotate(-10deg)" },
  ];

  const toolsPanel = (
    <>
      {/* Reset Button */}
      <div className="absolute right-4 h-[57px] flex items-center">
        <button
          onClick={() => setImageData(DEFAULT_IMAGE_DATA)}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-transparent flex items-center gap-2 transition-all active:scale-90 active:opacity-70"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("image")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "image"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Image
          {activeTab === "image" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("text")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "text"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Type className="w-4 h-4" />
          Text
          {activeTab === "text" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("effects")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "effects"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Sliders className="w-4 h-4" />
          Effects
          {activeTab === "effects" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "image" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5170FF] file:text-white hover:file:bg-[#4060EE] text-gray-900"
              />
              {imageData.image && (
                <div className="flex items-center gap-4 mt-4">
                  <img
                    src={imageData.image}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                  />
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-500 break-all max-w-[10rem]">
                      {imageData.imageFileName}
                    </span>
                    <button
                      onClick={() => {
                        setImageData((prev) => ({
                          ...prev,
                          image: null,
                          imageFileName: undefined,
                        }));
                        if (fileInputRef.current)
                          fileInputRef.current.value = "";
                      }}
                      className="px-3 py-2 text-xs font-medium text-red-600 bg-transparent border border-red-200 rounded-lg hover:bg-red-50 transition-all w-fit"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filters.map((filter) => (
                  <button
                    key={filter.name}
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
          </div>
        )}

        {activeTab === "text" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Overlay
              </label>
              <textarea
                value={imageData.text}
                onChange={(e) =>
                  setImageData((prev) => ({
                    ...prev,
                    text: e.target.value,
                  }))
                }
                className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent resize-none bg-gray-50"
                placeholder="Add text to your image..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={imageData.textColor}
                  onChange={(e) =>
                    setImageData((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
                />
                <div className="w-12 h-12 relative">
                  <input
                    type="color"
                    value={imageData.textColor}
                    onChange={(e) =>
                      setImageData((prev) => ({
                        ...prev,
                        textColor: e.target.value,
                      }))
                    }
                    className="absolute inset-0 rounded-lg cursor-pointer opacity-0"
                  />
                  <div
                    className="w-full h-full rounded-lg border border-gray-200"
                    style={{ backgroundColor: imageData.textColor }}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Size
              </label>
              <input
                type="range"
                min="12"
                max="72"
                value={parseInt(imageData.fontSize)}
                onChange={(e) =>
                  setImageData((prev) => ({
                    ...prev,
                    fontSize: `${e.target.value}px`,
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
              />
              <div className="text-sm text-gray-600 mt-1">
                {imageData.fontSize}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Position
              </label>
              <div className="grid grid-cols-3 gap-3">
                {["top", "center", "bottom"].map((position) => (
                  <button
                    key={position}
                    onClick={() =>
                      setImageData((prev) => ({
                        ...prev,
                        textPosition: position as "top" | "center" | "bottom",
                      }))
                    }
                    className={`p-3 rounded-lg border transition-all ${
                      imageData.textPosition === position
                        ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "effects" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brightness
              </label>
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
              />
              <div className="text-sm text-gray-600 mt-1">
                {imageData.brightness}%
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contrast
              </label>
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
              />
              <div className="text-sm text-gray-600 mt-1">
                {imageData.contrast}%
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Saturation
              </label>
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
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
              />
              <div className="text-sm text-gray-600 mt-1">
                {imageData.saturation}%
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Blur
              </label>
              <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={imageData.blur}
                onChange={(e) =>
                  setImageData((prev) => ({
                    ...prev,
                    blur: parseFloat(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
              />
              <div className="text-sm text-gray-600 mt-1">
                {imageData.blur}px
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );

  const preview = (
    <div
      ref={previewRef}
      className="max-w-2xl mx-auto aspect-video bg-gray-100 rounded-2xl shadow-lg overflow-hidden"
    >
      <div className="relative w-full h-full">
        {imageData.image ? (
          <>
            <img
              src={imageData.image}
              alt="Preview"
              className="w-full h-full object-cover"
              style={{
                filter: `${imageData.filter} brightness(${imageData.brightness}%) contrast(${imageData.contrast}%) saturate(${imageData.saturation}%) blur(${imageData.blur}px)`,
              }}
            />
            {imageData.text && (
              <div
                className={`absolute left-0 right-0 p-6 ${
                  imageData.textPosition === "top"
                    ? "top-0"
                    : imageData.textPosition === "center"
                      ? "top-1/2 -translate-y-1/2"
                      : "bottom-0"
                }`}
              >
                <div
                  className="text-center"
                  style={{
                    color: imageData.textColor,
                    fontSize: imageData.fontSize,
                    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  }}
                >
                  {imageData.text}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400 flex flex-col items-center gap-2">
              <Upload className="w-8 h-8" />
              <span>Upload an image to get started</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <EditorLayout
      toolsPanel={toolsPanel}
      preview={preview}
      onDownload={downloadImage}
    />
  );
}
