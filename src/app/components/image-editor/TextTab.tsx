"use client";

import { ImageData } from "../../types/image";
import { MAX_TEXT_LENGTH } from "../../constants/image";
import ColorPicker from "../ui/ColorPicker";

interface TextTabProps {
  imageData: ImageData;
  setImageData: (data: ImageData | ((prev: ImageData) => ImageData)) => void;
}

export default function TextTab({ imageData, setImageData }: TextTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Text Overlay
        </label>
        <textarea
          value={imageData.text}
          onChange={(e) => {
            const newValue = e.target.value;
            if (newValue.length <= MAX_TEXT_LENGTH) {
              setImageData((prev) => ({
                ...prev,
                text: newValue,
              }));
            }
          }}
          maxLength={MAX_TEXT_LENGTH}
          className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent resize-none bg-gray-50 text-gray-900"
          placeholder="Add text to your image..."
        />
        <div className="mt-2 flex justify-end">
          <span
            className={`text-sm ${
              imageData.text.length === MAX_TEXT_LENGTH
                ? "text-red-500"
                : "text-gray-500"
            }`}
          >
            {imageData.text.length} / {MAX_TEXT_LENGTH}
          </span>
        </div>
      </div>

      <ColorPicker
        label="Text Color"
        value={imageData.textColor}
        onChange={(color) =>
          setImageData((prev) => ({
            ...prev,
            textColor: color,
          }))
        }
      />

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
        <div className="text-sm text-gray-600 mt-1">{imageData.fontSize}</div>
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
  );
}
