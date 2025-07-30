"use client";

import { useRef } from "react";
import { ImageData } from "../../types/image";

interface ImageTabProps {
  imageData: ImageData;
  setImageData: (data: ImageData | ((prev: ImageData) => ImageData)) => void;
}

export default function ImageTab({ imageData, setImageData }: ImageTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  return (
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
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="px-3 py-2 text-xs font-medium text-red-600 bg-transparent border border-red-200 rounded-lg hover:bg-red-50 transition-all w-fit"
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
