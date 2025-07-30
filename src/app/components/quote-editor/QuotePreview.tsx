"use client";

import { QuoteData } from "../../types/quote";
import { getQuoteFontClassName } from "../../utils/fonts";

interface QuotePreviewProps {
  quoteData: QuoteData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function QuotePreview({
  quoteData,
  previewRef,
}: QuotePreviewProps) {
  const getBackgroundStyle = () => {
    switch (quoteData.backgroundType) {
      case "gradient":
        return {
          background: `linear-gradient(to bottom right, ${quoteData.gradientStart}, ${quoteData.gradientEnd})`,
        };
      case "image":
        return quoteData.backgroundImage
          ? {
              backgroundImage: `url(${quoteData.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: quoteData.backgroundOpacity / 100,
            }
          : { background: quoteData.backgroundColor };
      default:
        return { background: quoteData.backgroundColor };
    }
  };

  return (
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
      <div className="w-full h-full flex items-center justify-center p-12 relative">
        {/* Background overlay for image opacity, only if image is set */}
        {quoteData.backgroundType === "image" && quoteData.backgroundImage ? (
          <div
            className="absolute inset-0 z-0 rounded-2xl"
            style={{
              backgroundImage: `url(${quoteData.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: quoteData.backgroundOpacity / 100,
            }}
          />
        ) : (
          <div
            className="absolute inset-0 z-0 rounded-2xl"
            style={getBackgroundStyle()}
          />
        )}
        {/* Foreground content */}
        <div
          className="relative z-10 w-full flex flex-col "
          style={{
            alignItems:
              quoteData.alignment === "center" ? "center" : "flex-start",
            textAlign: quoteData.alignment === "center" ? "center" : "left",
          }}
        >
          <div
            className="text-6xl mb-8 opacity-20"
            style={{ color: quoteData.textColor }}
          >
            "
          </div>
          <div
            className={`mb-8 ${getQuoteFontClassName(quoteData.fontFamily)}`}
            style={{
              color: quoteData.textColor,
              fontSize: `${quoteData.fontSize}px`,
            }}
          >
            {quoteData.content}
          </div>
          <div className="space-y-1">
            <div
              className={`font-bold ${getQuoteFontClassName(quoteData.fontFamily)}`}
              style={{ color: quoteData.textColor }}
            >
              {quoteData.author}
            </div>
            {quoteData.role && (
              <div
                className={`text-sm opacity-80 ${getQuoteFontClassName(quoteData.fontFamily)}`}
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
}
