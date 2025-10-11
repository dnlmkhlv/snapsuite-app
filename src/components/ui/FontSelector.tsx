"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FontOption {
  value: string;
  label: string;
  className: string;
}

interface FontSelectorProps {
  value: string;
  onChange: (fontFamily: string) => void;
  options?: FontOption[];
  className?: string;
}

const defaultFontOptions: FontOption[] = [
  { value: "Inter", label: "Inter", className: "font-inter" },
  { value: "Roboto", label: "Roboto", className: "font-roboto" },
  { value: "Open Sans", label: "Open Sans", className: "font-open-sans" },
  { value: "Lato", label: "Lato", className: "font-lato" },
  { value: "Poppins", label: "Poppins", className: "font-poppins" },
  { value: "Montserrat", label: "Montserrat", className: "font-montserrat" },
];

export default function FontSelector({
  value,
  onChange,
  options = defaultFontOptions,
  className = "",
}: FontSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
      >
        <span className="text-sm font-medium">Font Family</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 border border-gray-200 rounded-xl bg-white space-y-4 mt-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {options.map((font) => (
              <button
                key={font.value}
                onClick={() => {
                  onChange(font.value);
                  setIsOpen(false);
                }}
                className={`p-2 rounded-xl border transition-all ${
                  font.className
                } ${
                  value === font.value
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
    </div>
  );
}
