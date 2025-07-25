"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Palette,
  Type,
  User,
  AlignLeft,
  AlignCenter,
  Quote,
  ChevronUp,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import EditorLayout from "../components/EditorLayout";

interface QuoteData {
  content: string;
  author: string;
  role: string;
  alignment: "left" | "center";
  gradientStart: string;
  gradientEnd: string;
  textColor: string;
  fontFamily: string;
  backgroundType: "solid" | "gradient" | "image";
  backgroundColor: string;
  showWatermark: boolean;
  aspectRatio: "4/5" | "1/1" | "16/9" | "3/2";
  fontSize: number;
  backgroundImage: string | null;
}

const fontOptions = [
  { value: "Inter", label: "Inter", className: "font-inter" },
  { value: "Roboto", label: "Roboto", className: "font-roboto" },
  { value: "Open Sans", label: "Open Sans", className: "font-open-sans" },
  { value: "Lato", label: "Lato", className: "font-lato" },
  { value: "Poppins", label: "Poppins", className: "font-poppins" },
  { value: "Montserrat", label: "Montserrat", className: "font-montserrat" },
];

const DEFAULT_QUOTE_DATA: QuoteData = {
  content: "The only way to do great work is to love what you do.",
  author: "Steve Jobs",
  role: "Co-founder of Apple Inc.",
  alignment: "center",
  gradientStart: "#4F46E5",
  gradientEnd: "#9333EA",
  textColor: "#ffffff",
  fontFamily: "Inter",
  backgroundType: "gradient",
  backgroundColor: "#111827",
  showWatermark: false,
  aspectRatio: "4/5",
  fontSize: 24,
  backgroundImage: null,
};

export default function Quotes() {
  const [activeTab, setActiveTab] = useState<"content" | "style" | "author">(
    "content"
  );
  const [isFontFamilyOpen, setIsFontFamilyOpen] = useState(false);
  const [quoteData, setQuoteData] = useState<QuoteData>(DEFAULT_QUOTE_DATA);
  const MAX_QUOTE_LENGTH = 280;

  const previewRef = useRef<HTMLDivElement>(null);

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
      link.download = `quote-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setQuoteData((prev) => ({
          ...prev,
          backgroundImage: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const toolsPanel = (
    <>
      {/* Reset Button */}
      <div className="absolute right-4 h-[57px] flex items-center">
        <button
          onClick={() => setQuoteData(DEFAULT_QUOTE_DATA)}
          className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-transparent flex items-center gap-2 transition-all active:scale-90 active:opacity-70"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "content"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Quote className="w-4 h-4" />
          Content
          {activeTab === "content" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "style"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Palette className="w-4 h-4" />
          Style
          {activeTab === "style" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("author")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
            activeTab === "author"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <User className="w-4 h-4" />
          Author
          {activeTab === "author" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "content" && (
          <div className="space-y-4">
            {/* Font Controls */}
            <div className="space-y-4">
              <button
                onClick={() => setIsFontFamilyOpen(!isFontFamilyOpen)}
                className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              >
                <span className="text-sm font-medium">Font Family</span>
                {isFontFamilyOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {isFontFamilyOpen && (
                <div className="p-4 border border-gray-200 rounded-xl bg-white space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {fontOptions.map((font) => (
                      <button
                        key={font.value}
                        onClick={() =>
                          setQuoteData((prev) => ({
                            ...prev,
                            fontFamily: font.value,
                          }))
                        }
                        className={`p-2 rounded-xl border transition-all ${
                          font.className
                        } ${
                          quoteData.fontFamily === font.value
                            ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        {font.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="16"
                    max="48"
                    value={quoteData.fontSize}
                    onChange={(e) =>
                      setQuoteData((prev) => ({
                        ...prev,
                        fontSize: parseInt(e.target.value),
                      }))
                    }
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5170FF]"
                  />
                  <span className="text-sm text-gray-600 min-w-[2.5rem]">
                    {quoteData.fontSize}px
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quote
              </label>
              <textarea
                value={quoteData.content}
                onChange={(e) =>
                  setQuoteData((prev) => ({ ...prev, content: e.target.value }))
                }
                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent resize-none bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                placeholder="Enter your quote..."
                maxLength={MAX_QUOTE_LENGTH}
              />
              <div className="mt-2 flex justify-end">
                <span
                  className={`text-sm ${quoteData.content.length === MAX_QUOTE_LENGTH ? "text-red-500" : "text-gray-500"}`}
                >
                  {quoteData.content.length} / {MAX_QUOTE_LENGTH}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setQuoteData((prev) => ({
                    ...prev,
                    alignment: "left",
                  }))
                }
                className={`flex-1 p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                  quoteData.alignment === "left"
                    ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <AlignLeft className="w-4 h-4" />
                Left
              </button>
              <button
                onClick={() =>
                  setQuoteData((prev) => ({
                    ...prev,
                    alignment: "center",
                  }))
                }
                className={`flex-1 p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                  quoteData.alignment === "center"
                    ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <AlignCenter className="w-4 h-4" />
                Center
              </button>
            </div>
          </div>
        )}

        {activeTab === "style" && (
          <div className="space-y-8">
            {/* Image Ratio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Image Ratio
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() =>
                    setQuoteData((prev) => ({
                      ...prev,
                      aspectRatio: "4/5",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    quoteData.aspectRatio === "4/5"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  4:5
                </button>
                <button
                  onClick={() =>
                    setQuoteData((prev) => ({
                      ...prev,
                      aspectRatio: "1/1",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    quoteData.aspectRatio === "1/1"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  1:1
                </button>
                <button
                  onClick={() =>
                    setQuoteData((prev) => ({
                      ...prev,
                      aspectRatio: "16/9",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    quoteData.aspectRatio === "16/9"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  16:9
                </button>
                <button
                  onClick={() =>
                    setQuoteData((prev) => ({
                      ...prev,
                      aspectRatio: "3/2",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    quoteData.aspectRatio === "3/2"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  3:2
                </button>
              </div>
            </div>

            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={quoteData.textColor}
                    onChange={(e) =>
                      setQuoteData((prev) => ({
                        ...prev,
                        textColor: e.target.value,
                      }))
                    }
                    className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                  />
                </div>
                <div className="relative w-12 h-12">
                  <div
                    className="absolute inset-0 rounded-lg border border-gray-200"
                    style={{ backgroundColor: quoteData.textColor }}
                  />
                  <input
                    type="color"
                    value={quoteData.textColor}
                    onChange={(e) =>
                      setQuoteData((prev) => ({
                        ...prev,
                        textColor: e.target.value,
                      }))
                    }
                    className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>

            {/* Background Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Background Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() =>
                    setQuoteData((prev) => ({
                      ...prev,
                      backgroundType: "solid",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    quoteData.backgroundType === "solid"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Solid
                </button>
                <button
                  onClick={() =>
                    setQuoteData((prev) => ({
                      ...prev,
                      backgroundType: "gradient",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    quoteData.backgroundType === "gradient"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Gradient
                </button>
                <button
                  onClick={() =>
                    setQuoteData((prev) => ({
                      ...prev,
                      backgroundType: "image",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    quoteData.backgroundType === "image"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  Image
                </button>
              </div>
            </div>

            {quoteData.backgroundType === "solid" ? (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Background Color
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={quoteData.backgroundColor}
                      onChange={(e) =>
                        setQuoteData((prev) => ({
                          ...prev,
                          backgroundColor: e.target.value,
                          gradientStart: e.target.value,
                          gradientEnd: e.target.value,
                        }))
                      }
                      className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                    />
                  </div>
                  <div className="relative w-12 h-12">
                    <div
                      className="absolute inset-0 rounded-lg border border-gray-200"
                      style={{ backgroundColor: quoteData.backgroundColor }}
                    />
                    <input
                      type="color"
                      value={quoteData.backgroundColor}
                      onChange={(e) =>
                        setQuoteData((prev) => ({
                          ...prev,
                          backgroundColor: e.target.value,
                          gradientStart: e.target.value,
                          gradientEnd: e.target.value,
                        }))
                      }
                      className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                    />
                  </div>
                </div>
              </div>
            ) : quoteData.backgroundType === "gradient" ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Color
                  </label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={quoteData.gradientStart}
                        onChange={(e) =>
                          setQuoteData((prev) => ({
                            ...prev,
                            gradientStart: e.target.value,
                          }))
                        }
                        className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                      />
                    </div>
                    <div className="relative w-12 h-12">
                      <div
                        className="absolute inset-0 rounded-lg border border-gray-200"
                        style={{ backgroundColor: quoteData.gradientStart }}
                      />
                      <input
                        type="color"
                        value={quoteData.gradientStart}
                        onChange={(e) =>
                          setQuoteData((prev) => ({
                            ...prev,
                            gradientStart: e.target.value,
                          }))
                        }
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
                        value={quoteData.gradientEnd}
                        onChange={(e) =>
                          setQuoteData((prev) => ({
                            ...prev,
                            gradientEnd: e.target.value,
                          }))
                        }
                        className="w-full h-12 px-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                      />
                    </div>
                    <div className="relative w-12 h-12">
                      <div
                        className="absolute inset-0 rounded-lg border border-gray-200"
                        style={{ backgroundColor: quoteData.gradientEnd }}
                      />
                      <input
                        type="color"
                        value={quoteData.gradientEnd}
                        onChange={(e) =>
                          setQuoteData((prev) => ({
                            ...prev,
                            gradientEnd: e.target.value,
                          }))
                        }
                        className="absolute inset-0 w-full h-full cursor-pointer opacity-0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : quoteData.backgroundType === "image" ? (
              <div className="space-y-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5170FF] file:text-white hover:file:bg-[#4060EE] text-gray-900"
                  />
                </div>
                {quoteData.backgroundImage && (
                  <div className="flex items-center gap-4">
                    <img
                      src={quoteData.backgroundImage}
                      alt="Background Preview"
                      className="w-full max-h-48 object-cover rounded-xl border border-gray-200 mt-4"
                    />
                    <button
                      onClick={() =>
                        setQuoteData((prev) => ({
                          ...prev,
                          backgroundImage: null,
                        }))
                      }
                      className="px-3 py-2 text-xs font-medium text-red-600 bg-transparent border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            ) : null}

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
                checked={quoteData.showWatermark}
                onChange={(e) =>
                  setQuoteData((prev) => ({
                    ...prev,
                    showWatermark: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#5170FF] border-gray-300 rounded focus:ring-[#5170FF]"
              />
            </div>
          </div>
        )}

        {activeTab === "author" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Author Name
              </label>
              <input
                type="text"
                value={quoteData.author}
                onChange={(e) =>
                  setQuoteData((prev) => ({
                    ...prev,
                    author: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
                placeholder="Enter author's name..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role/Title
              </label>
              <input
                type="text"
                value={quoteData.role}
                onChange={(e) =>
                  setQuoteData((prev) => ({
                    ...prev,
                    role: e.target.value,
                  }))
                }
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
                placeholder="Enter author's role or title..."
              />
            </div>
          </div>
        )}
      </div>
    </>
  );

  const preview = (
    <div
      ref={previewRef}
      className={`max-w-2xl mx-auto rounded-2xl shadow-lg overflow-hidden ${
        quoteData.aspectRatio === "4/5"
          ? "aspect-[4/5]"
          : quoteData.aspectRatio === "1/1"
            ? "aspect-[1/1]"
            : quoteData.aspectRatio === "16/9"
              ? "aspect-[16/9]"
              : "aspect-[3/2]"
      }`}
    >
      <div
        className="w-full h-full flex items-center justify-center p-12"
        style={
          quoteData.backgroundType === "gradient"
            ? {
                background: `linear-gradient(to bottom right, ${quoteData.gradientStart}, ${quoteData.gradientEnd})`,
              }
            : quoteData.backgroundType === "image" && quoteData.backgroundImage
              ? {
                  backgroundImage: `url(${quoteData.backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : {
                  background: quoteData.backgroundColor,
                }
        }
      >
        <div
          className={`w-full flex flex-col ${
            quoteData.alignment === "center"
              ? "items-center text-center"
              : "items-start text-left"
          }`}
        >
          <div
            className="text-6xl mb-8 opacity-20"
            style={{ color: quoteData.textColor }}
          >
            "
          </div>
          <div
            className={`mb-8 ${
              fontOptions.find((f) => f.value === quoteData.fontFamily)
                ?.className || "font-inter"
            }`}
            style={{
              color: quoteData.textColor,
              fontSize: `${quoteData.fontSize}px`,
            }}
          >
            {quoteData.content}
          </div>
          <div className="space-y-1">
            <div
              className={`font-bold ${
                fontOptions.find((f) => f.value === quoteData.fontFamily)
                  ?.className || "font-inter"
              }`}
              style={{ color: quoteData.textColor }}
            >
              {quoteData.author}
            </div>
            {quoteData.role && (
              <div
                className={`text-sm opacity-80 ${
                  fontOptions.find((f) => f.value === quoteData.fontFamily)
                    ?.className || "font-inter"
                }`}
                style={{ color: quoteData.textColor }}
              >
                {quoteData.role}
              </div>
            )}
          </div>
          {quoteData.showWatermark && (
            <div
              className="mt-8 text-xs"
              style={{ color: quoteData.textColor, opacity: 0.5 }}
            >
              Created with SnapSuite
            </div>
          )}
        </div>
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
