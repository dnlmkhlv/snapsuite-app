"use client";

import { useRef } from "react";
import { User } from "lucide-react";
import { TweetData } from "../../types/tweet";
import { getFontClassName } from "../../utils/fonts";
import VerifiedBadge from "../ui/VerifiedBadge";

interface TweetPreviewProps {
  tweetData: TweetData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function TweetPreview({
  tweetData,
  previewRef,
}: TweetPreviewProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = previewRef || internalRef;

  const getBackgroundStyle = () => {
    if (tweetData.backgroundType === "gradient") {
      return {
        backgroundImage: `linear-gradient(to bottom right, ${tweetData.gradientStart}, ${tweetData.gradientEnd})`,
      };
    } else if (
      tweetData.backgroundType === "image" &&
      tweetData.backgroundImage
    ) {
      return {
        backgroundImage: `url(${tweetData.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: tweetData.backgroundOpacity,
      };
    } else {
      return {
        backgroundColor: tweetData.backgroundColor,
      };
    }
  };

  const getCardStyle = () => {
    if (!tweetData.showBorder) return {};

    return {
      borderStyle: tweetData.borderStyle,
      borderWidth: `${tweetData.borderWidth}px`,
      borderColor: tweetData.borderColor,
      borderRadius: `${tweetData.borderRadius}px`,
    };
  };

  return (
    <div className="p-4">
      <div
        className={`mx-auto border border-gray-200 ${
          tweetData.aspectRatio === "16/9" || tweetData.aspectRatio === "3/2"
            ? "max-w-3xl"
            : "max-w-md"
        }`}
      >
        <div
          ref={ref}
          className="overflow-hidden relative"
          style={{ aspectRatio: tweetData.aspectRatio }}
        >
          <div className="w-full h-full" style={getBackgroundStyle()}>
            <div className="flex items-center justify-center w-full h-full p-8">
              <div
                className={`w-full ${
                  tweetData.cardTheme === "light"
                    ? `bg-white ${tweetData.showBorder ? "border border-gray-200 rounded-xl" : ""}`
                    : `bg-gray-900 ${tweetData.showBorder ? "border border-gray-800 rounded-xl" : ""}`
                }`}
                style={getCardStyle()}
              >
                <div className="p-6">
                  <div
                    className={`flex flex-col ${
                      tweetData.alignment === "center"
                        ? "items-center text-center"
                        : "items-start text-left"
                    }`}
                  >
                    <div className="flex gap-3 mb-4">
                      {tweetData.profilePhoto ? (
                        <img
                          src={tweetData.profilePhoto}
                          alt="Profile"
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div
                          className={`w-12 h-12 rounded-full ${
                            tweetData.cardTheme === "light"
                              ? "bg-gray-200"
                              : "bg-gray-700"
                          } flex items-center justify-center`}
                        >
                          <User
                            className={`w-6 h-6 ${
                              tweetData.cardTheme === "light"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          />
                        </div>
                      )}
                      <div className="flex flex-col">
                        <div className="flex items-center">
                          <span
                            className={`font-bold ${getFontClassName(tweetData.fontFamily)}`}
                            style={{
                              color: tweetData.nameColor,
                              lineHeight: "1.2em",
                            }}
                          >
                            {tweetData.fullName}
                          </span>
                          {tweetData.verified && (
                            <div className="w-5 h-5 ml-1">
                              <VerifiedBadge color={tweetData.verifiedColor} />
                            </div>
                          )}
                        </div>
                        <span
                          className={getFontClassName(tweetData.fontFamily)}
                          style={{
                            color: tweetData.usernameColor,
                            lineHeight: "1.2em",
                          }}
                        >
                          @{tweetData.username}
                        </span>
                      </div>
                    </div>
                    <div
                      className={`whitespace-pre-wrap ${getFontClassName(tweetData.fontFamily)}`}
                      style={{
                        color: tweetData.contentColor,
                        fontSize: `${tweetData.fontSize}px`,
                      }}
                    >
                      {tweetData.content}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Watermark */}
          {tweetData.showWatermark && (
            <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none">
              <span className="text-gray-400/70 text-sm">
                Created with SnapSuite
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
