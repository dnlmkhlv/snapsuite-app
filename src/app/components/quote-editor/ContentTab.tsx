"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlignLeft, AlignCenter } from "lucide-react";
import { QuoteData } from "../../types/quote";
import { FONT_OPTIONS, MAX_QUOTE_LENGTH } from "../../constants/quote";
import FontSelector from "../ui/FontSelector";

interface ContentTabProps {
  quoteData: QuoteData;
  setQuoteData: (data: QuoteData | ((prev: QuoteData) => QuoteData)) => void;
}

export default function ContentTab({
  quoteData,
  setQuoteData,
}: ContentTabProps) {
  return (
    <div className="space-y-4">
      {/* Font Controls */}
      <div className="space-y-4">
        <FontSelector
          value={quoteData.fontFamily}
          onChange={(fontFamily) =>
            setQuoteData((prev) => ({
              ...prev,
              fontFamily,
            }))
          }
        />

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
            className={`text-sm ${
              quoteData.content.length === MAX_QUOTE_LENGTH
                ? "text-red-500"
                : "text-gray-500"
            }`}
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
  );
}
