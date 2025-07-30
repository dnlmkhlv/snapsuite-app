"use client";

import { Upload } from "lucide-react";
import { ImageData } from "../../types/image";

interface ImagePreviewProps {
  imageData: ImageData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ImagePreview({
  imageData,
  previewRef,
}: ImagePreviewProps) {
  return (
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
                display: "block",
              }}
            />
            {imageData.text && (
              <div
                className="absolute left-0 right-0 p-6"
                style={{
                  top:
                    imageData.textPosition === "top"
                      ? 0
                      : imageData.textPosition === "center"
                        ? "50%"
                        : "auto",
                  bottom: imageData.textPosition === "bottom" ? 0 : "auto",
                  left: 0,
                  right: 0,
                  transform:
                    imageData.textPosition === "center"
                      ? "translateY(-50%)"
                      : "none",
                  position: "absolute",
                  textAlign: "center",
                  pointerEvents: "none",
                }}
              >
                <div
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
}
