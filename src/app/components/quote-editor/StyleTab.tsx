"use client";

import { QuoteData } from "../../types/quote";
import ColorPicker from "../ui/ColorPicker";
import BackgroundSelector from "../ui/BackgroundSelector";

interface StyleTabProps {
  quoteData: QuoteData;
  setQuoteData: (data: QuoteData | ((prev: QuoteData) => QuoteData)) => void;
}

export default function StyleTab({ quoteData, setQuoteData }: StyleTabProps) {
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

  return (
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
      <ColorPicker
        label="Text Color"
        value={quoteData.textColor}
        onChange={(color) =>
          setQuoteData((prev) => ({
            ...prev,
            textColor: color,
          }))
        }
      />

      {/* Background Controls */}
      <BackgroundSelector
        backgroundType={quoteData.backgroundType}
        onBackgroundTypeChange={(type) =>
          setQuoteData((prev) => ({
            ...prev,
            backgroundType: type,
          }))
        }
        backgroundColor={quoteData.backgroundColor}
        onBackgroundColorChange={(color) =>
          setQuoteData((prev) => ({
            ...prev,
            backgroundColor: color,
          }))
        }
        gradientStart={quoteData.gradientStart}
        onGradientStartChange={(color) =>
          setQuoteData((prev) => ({
            ...prev,
            gradientStart: color,
          }))
        }
        gradientEnd={quoteData.gradientEnd}
        onGradientEndChange={(color) =>
          setQuoteData((prev) => ({
            ...prev,
            gradientEnd: color,
          }))
        }
        backgroundImage={quoteData.backgroundImage}
        onBackgroundImageChange={(image) =>
          setQuoteData((prev) => ({
            ...prev,
            backgroundImage: image,
          }))
        }
        backgroundOpacity={quoteData.backgroundOpacity}
        onBackgroundOpacityChange={(opacity) =>
          setQuoteData((prev) => ({
            ...prev,
            backgroundOpacity: opacity,
          }))
        }
      />

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
  );
}
