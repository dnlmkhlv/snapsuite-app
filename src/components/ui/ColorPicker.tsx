"use client";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export default function ColorPicker({
  label,
  value,
  onChange,
  className = "",
}: ColorPickerProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
        />
        <div className="w-12 h-12 relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
          />
          <div
            className="w-full h-full rounded-xl border border-gray-200"
            style={{ backgroundColor: value }}
          />
        </div>
      </div>
    </div>
  );
}
