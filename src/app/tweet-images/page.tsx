"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import { Palette, Type, User, RotateCcw } from "lucide-react";
import EditorLayout from "../components/EditorLayout";
import TextTab from "../components/tweet-editor/TextTab";
import StyleTab from "../components/tweet-editor/StyleTab";
import ProfileTab from "../components/tweet-editor/ProfileTab";

interface TweetData {
  content: string;
  username: string;
  fullName: string;
  verified: boolean;
  profilePhoto: string | null;
  nameColor: string;
  usernameColor: string;
  contentColor: string;
  verifiedColor: string;
  fontFamily: string;
  fontSize: number;
  cardTheme: "light" | "dark";
  backgroundColor: string;
  alignment: "left" | "center";
  gradientStart: string;
  gradientEnd: string;
  showBorder: boolean;
  borderStyle: "solid" | "dashed" | "dotted" | "double";
  borderWidth: number;
  borderColor: string;
  backgroundType: "solid" | "gradient" | "image";
  backgroundImage: string | null;
  backgroundOpacity: number;
  aspectRatio: "4/5" | "1/1" | "16/9" | "3/2";
  borderRadius: number;
  showWatermark: boolean;
}

const DEFAULT_TWEET_DATA: TweetData = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  username: "johndoe",
  fullName: "John Doe",
  verified: false,
  profilePhoto: null,
  nameColor: "#000000",
  usernameColor: "#4B5563", // gray-600
  contentColor: "#000000",
  verifiedColor: "#1D9BF0",
  fontFamily: "Inter",
  cardTheme: "light",
  backgroundColor: "#ffffff",
  alignment: "left",
  gradientStart: "#ffffff",
  gradientEnd: "#ffffff",
  showBorder: false,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#e5e7eb", // gray-200
  backgroundType: "gradient",
  aspectRatio: "4/5",
  borderRadius: 12,
  fontSize: 16,
  backgroundImage: null,
  backgroundOpacity: 1,
  showWatermark: true,
};

const VerifiedBadge = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 22 22"
    aria-label="Verified account"
    className="w-full h-full"
    fill={color}
  >
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
  </svg>
);

export default function TweetImages() {
  const [tweetData, setTweetData] = useState<TweetData>(DEFAULT_TWEET_DATA);

  const [activeTab, setActiveTab] = useState<"text" | "style" | "profile">(
    "text"
  );
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
      // Add style rule for proper image rendering
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule(
        "body > div:last-child img { display: inline-block; }"
      );

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        scale: 2,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `tweet-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Clean up the added style
      document.head.removeChild(style);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleThemeSelect = (theme: any) => {
    setTweetData((prev) => ({
      ...prev,
      gradientStart: theme.gradientStart,
      gradientEnd: theme.gradientEnd,
      backgroundType: "gradient", // Always switch to gradient mode when selecting a theme
      cardTheme: prev.cardTheme, // Preserve the current card theme
    }));
  };

  const getFontClassName = (fontFamily: string) => {
    const fontMap: { [key: string]: string } = {
      Inter: "font-inter",
      Roboto: "font-roboto",
      "Open Sans": "font-open-sans",
      Lato: "font-lato",
      Poppins: "font-poppins",
      Montserrat: "font-montserrat",
    };
    return fontMap[fontFamily] || "font-inter";
  };

  const toolsPanel = (
    <>
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center border-b relative z-0 gap-x-1 gap-y-2">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-colors relative text-xs sm:text-base ${
            activeTab === "text"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Type className="w-4 h-4" />
          Text
          {activeTab === "text" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("style")}
          className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-colors relative text-xs sm:text-base ${
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
          onClick={() => setActiveTab("profile")}
          className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-colors relative text-xs sm:text-base ${
            activeTab === "profile"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <User className="w-4 h-4" />
          Profile
          {activeTab === "profile" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() => setTweetData(DEFAULT_TWEET_DATA)}
          className="flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-base text-gray-600 hover:text-gray-900 bg-transparent transition-all active:scale-90 active:opacity-70 ml-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "text" && (
          <TextTab tweetData={tweetData} setTweetData={setTweetData} />
        )}

        {activeTab === "style" && (
          <StyleTab
            tweetData={tweetData}
            setTweetData={setTweetData}
            handleThemeSelect={handleThemeSelect}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab tweetData={tweetData} setTweetData={setTweetData} />
        )}
      </div>
    </>
  );

  const preview = (
    <div className="p-4">
      <div
        className={`mx-auto border border-gray-200 ${
          tweetData.aspectRatio === "16/9" || tweetData.aspectRatio === "3/2"
            ? "max-w-3xl"
            : "max-w-md"
        }`}
      >
        <div
          ref={previewRef}
          className="overflow-hidden relative"
          style={{ aspectRatio: tweetData.aspectRatio }}
        >
          <div
            className="w-full h-full"
            style={{
              ...(tweetData.backgroundType === "gradient"
                ? {
                    backgroundImage: `linear-gradient(to bottom right, ${tweetData.gradientStart}, ${tweetData.gradientEnd})`,
                  }
                : tweetData.backgroundType === "image" &&
                    tweetData.backgroundImage
                  ? {
                      backgroundImage: `url(${tweetData.backgroundImage})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      opacity: tweetData.backgroundOpacity,
                    }
                  : {
                      backgroundColor: tweetData.backgroundColor,
                    }),
            }}
          >
            <div className="flex items-center justify-center w-full h-full p-8">
              <div
                className={`w-full ${
                  tweetData.cardTheme === "light"
                    ? `bg-white ${tweetData.showBorder ? "border border-gray-200 rounded-xl" : ""}`
                    : `bg-gray-900 ${tweetData.showBorder ? "border border-gray-800 rounded-xl" : ""}`
                }`}
                style={
                  tweetData.showBorder
                    ? {
                        borderStyle: tweetData.borderStyle,
                        borderWidth: `${tweetData.borderWidth}px`,
                        borderColor: tweetData.borderColor,
                        borderRadius: `${tweetData.borderRadius}px`,
                      }
                    : {}
                }
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
                          className={`${getFontClassName(tweetData.fontFamily)}`}
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
              <span className="text-gray-400/70 text-sm">snapsuite.app</span>
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
