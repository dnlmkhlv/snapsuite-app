"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  Download,
  CheckCircle,
  Upload,
  Palette,
  Type,
  User,
  AlignLeft,
  AlignCenter,
  Layers,
} from "lucide-react";
import Themes from "../components/Themes";
import Templates from "../components/Templates";
import Header from "../components/Header";
import { TweetTemplate } from "../utils/storage";

interface TweetData {
  content: string;
  username: string;
  fullName: string;
  verified: boolean;
  profilePhoto: string | null;
  textColor: string;
  fontFamily: string;
  backgroundColor: string;
  alignment: "left" | "center";
  gradientStart: string;
  gradientEnd: string;
}

const fontOptions = [
  { value: "Inter", label: "Inter", className: "font-inter" },
  { value: "Roboto", label: "Roboto", className: "font-roboto" },
  { value: "Open Sans", label: "Open Sans", className: "font-open-sans" },
  { value: "Lato", label: "Lato", className: "font-lato" },
  { value: "Poppins", label: "Poppins", className: "font-poppins" },
  { value: "Montserrat", label: "Montserrat", className: "font-montserrat" },
];

const VerifiedBadge = () => (
  <svg
    viewBox="0 0 22 22"
    aria-label="Verified account"
    className="w-full h-full"
    fill="currentColor"
  >
    <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
  </svg>
);

export default function TweetImages() {
  const [tweetData, setTweetData] = useState<TweetData>({
    content:
      "Just launched my new app! 🚀\n\nExcited to share this with everyone. The journey has been incredible and I can't wait to see where it goes next.\n\n#Tech #Innovation #Startup",
    username: "@username",
    fullName: "Alex Hormozi",
    verified: false,
    profilePhoto: null,
    textColor: "#000000",
    fontFamily: "Inter",
    backgroundColor: "#ffffff",
    alignment: "center",
    gradientStart: "#ffffff",
    gradientEnd: "#ffffff",
  });

  const previewRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTweetData((prev) => ({
          ...prev,
          profilePhoto: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const getBackgroundForExport = (background: string) => {
    if (background.includes("gradient")) {
      const matches = background.match(/#[a-fA-F0-9]{6}/g);
      return matches ? matches[0] : "#ffffff";
    }
    return background;
  };

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 1,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `snap-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const handleThemeSelect = (theme: {
    backgroundColor: string;
    textColor: string;
  }) => {
    setTweetData((prev) => ({
      ...prev,
      backgroundColor: theme.backgroundColor,
      textColor: theme.textColor,
    }));
  };

  const handleLoadTemplate = (template: TweetTemplate) => {
    setTweetData({
      content: template.content,
      username: template.username,
      fullName: template.fullName,
      verified: template.verified,
      profilePhoto: template.profilePhoto,
      fontFamily: template.fontFamily,
      backgroundColor: template.backgroundColor,
      textColor: template.textColor,
      alignment: "center",
      gradientStart: template.gradientStart,
      gradientEnd: template.gradientEnd,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid lg:grid-cols-2 min-h-[calc(100vh-12rem)]">
            {/* Controls Panel - Scrollable */}
            <div className="relative flex flex-col border-r border-gray-100">
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 bg-white p-8 pb-6 border-b border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                  <Palette className="w-6 h-6 text-[#5170FF]" />
                  Customize Your Tweet
                </h2>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-8 pt-6">
                <div className="space-y-8">
                  {/* Profile Information */}
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={tweetData.fullName}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                        placeholder="Enter your full name"
                      />
                    </div>

                    {/* Username */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                        <User className="w-4 h-4 text-[#5170FF]" />
                        Username
                      </label>
                      <input
                        type="text"
                        value={tweetData.username}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            username: e.target.value.replace("@", ""),
                          }))
                        }
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                        placeholder="Enter username without @"
                      />
                    </div>

                    {/* Verified Badge */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="verified"
                        checked={tweetData.verified}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            verified: e.target.checked,
                          }))
                        }
                        className="w-4 h-4 text-[#5170FF] border-gray-300 rounded focus:ring-[#5170FF]"
                      />
                      <label
                        htmlFor="verified"
                        className="text-sm font-medium text-gray-700 flex items-center gap-2"
                      >
                        Show Verified Badge
                        <CheckCircle className="w-4 h-4 text-[#5170FF]" />
                      </label>
                    </div>

                    {/* Profile Photo */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Profile Photo
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5170FF] file:text-white hover:file:bg-[#4060EE]"
                      />
                    </div>

                    {/* Tweet Content */}
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tweet Content
                      </label>
                      <textarea
                        value={tweetData.content}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        className="w-full h-32 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent resize-none bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                        placeholder="Enter your tweet content..."
                      />
                    </div>

                    {/* Additional Settings */}
                    <div className="space-y-6">
                      {/* Font Family */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Type className="w-4 h-4 text-[#5170FF]" />
                          Font Style
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {fontOptions.map((font) => (
                            <button
                              key={font.value}
                              onClick={() =>
                                setTweetData((prev) => ({
                                  ...prev,
                                  fontFamily: font.value,
                                }))
                              }
                              className={`p-3 rounded-lg border transition-all ${
                                tweetData.fontFamily === font.value
                                  ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                                  : "border-gray-200 hover:border-gray-300 text-gray-600 hover:bg-gray-50"
                              } ${font.className}`}
                            >
                              {font.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Text Color */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Palette className="w-4 h-4 text-[#5170FF]" />
                          Text Color
                        </label>
                        <div className="flex gap-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={tweetData.textColor}
                              onChange={(e) =>
                                setTweetData((prev) => ({
                                  ...prev,
                                  textColor: e.target.value,
                                }))
                              }
                              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                              placeholder="#000000"
                            />
                          </div>
                          <div className="w-16 h-16 relative">
                            <input
                              type="color"
                              value={tweetData.textColor}
                              onChange={(e) =>
                                setTweetData((prev) => ({
                                  ...prev,
                                  textColor: e.target.value,
                                }))
                              }
                              className="absolute inset-0 rounded-lg cursor-pointer opacity-0"
                            />
                            <div
                              className="w-full h-full rounded-lg border border-gray-200"
                              style={{ backgroundColor: tweetData.textColor }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Background Gradient */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <Layers className="w-4 h-4 text-[#5170FF]" />
                          Background Gradient
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs text-gray-500 mb-2">
                              Start Color
                            </label>
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={tweetData.gradientStart}
                                  onChange={(e) =>
                                    setTweetData((prev) => ({
                                      ...prev,
                                      gradientStart: e.target.value,
                                    }))
                                  }
                                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                                  placeholder="#ffffff"
                                />
                              </div>
                              <div className="w-16 h-16 relative">
                                <input
                                  type="color"
                                  value={tweetData.gradientStart}
                                  onChange={(e) =>
                                    setTweetData((prev) => ({
                                      ...prev,
                                      gradientStart: e.target.value,
                                    }))
                                  }
                                  className="absolute inset-0 rounded-lg cursor-pointer opacity-0"
                                />
                                <div
                                  className="w-full h-full rounded-lg border border-gray-200"
                                  style={{
                                    backgroundColor: tweetData.gradientStart,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs text-gray-500 mb-2">
                              End Color
                            </label>
                            <div className="flex gap-3">
                              <div className="flex-1">
                                <input
                                  type="text"
                                  value={tweetData.gradientEnd}
                                  onChange={(e) =>
                                    setTweetData((prev) => ({
                                      ...prev,
                                      gradientEnd: e.target.value,
                                    }))
                                  }
                                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                                  placeholder="#ffffff"
                                />
                              </div>
                              <div className="w-16 h-16 relative">
                                <input
                                  type="color"
                                  value={tweetData.gradientEnd}
                                  onChange={(e) =>
                                    setTweetData((prev) => ({
                                      ...prev,
                                      gradientEnd: e.target.value,
                                    }))
                                  }
                                  className="absolute inset-0 rounded-lg cursor-pointer opacity-0"
                                />
                                <div
                                  className="w-full h-full rounded-lg border border-gray-200"
                                  style={{
                                    backgroundColor: tweetData.gradientEnd,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Alignment */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                          <AlignLeft className="w-4 h-4 text-[#5170FF]" />
                          Content Alignment
                        </label>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              setTweetData((prev) => ({
                                ...prev,
                                alignment: "left",
                              }))
                            }
                            className={`flex-1 p-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                              tweetData.alignment === "left"
                                ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                            }`}
                          >
                            <AlignLeft className="w-4 h-4" />
                            Left
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setTweetData((prev) => ({
                                ...prev,
                                alignment: "center",
                              }))
                            }
                            className={`flex-1 p-4 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                              tweetData.alignment === "center"
                                ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                                : "border-gray-200 hover:border-gray-300 text-gray-600"
                            }`}
                          >
                            <AlignCenter className="w-4 h-4" />
                            Center
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Theme Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Choose Theme
                  </h3>
                  <Themes onThemeSelect={handleThemeSelect} />
                </div>

                {/* Template Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Templates
                  </h3>
                  <Templates
                    currentData={tweetData}
                    onLoadTemplate={handleLoadTemplate}
                  />
                </div>
              </div>
            </div>

            {/* Preview Panel - Fixed */}
            <div className="bg-gray-50">
              <div className="lg:sticky lg:top-0 p-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Preview
                </h2>
                <div className="relative">
                  {/* Visual Preview (scaled for UI) */}
                  <div className="w-full aspect-[4/5] bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div
                      className="w-full h-full"
                      style={{ aspectRatio: "1080/1350" }}
                    >
                      <div
                        className="w-full h-full"
                        style={{
                          background: `linear-gradient(to bottom right, ${tweetData.gradientStart}, ${tweetData.gradientEnd})`,
                        }}
                      >
                        <div className="flex items-center justify-center w-full h-full">
                          <div className="w-full max-w-lg p-8">
                            {/* Preview Content */}
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
                                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                                    <User className="w-6 h-6 text-gray-400" />
                                  </div>
                                )}
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1">
                                    <span
                                      className={`font-bold ${
                                        fontOptions.find(
                                          (f) =>
                                            f.value === tweetData.fontFamily
                                        )?.className || "font-inter"
                                      }`}
                                      style={{ color: tweetData.textColor }}
                                    >
                                      {tweetData.fullName}
                                    </span>
                                    {tweetData.verified && (
                                      <div className="w-5 h-5 flex-shrink-0">
                                        <img
                                          src="/verified-check.png"
                                          alt="Verified account"
                                          className="w-full h-full object-contain"
                                        />
                                      </div>
                                    )}
                                  </div>
                                  <span
                                    className={`text-gray-500 ${
                                      fontOptions.find(
                                        (f) => f.value === tweetData.fontFamily
                                      )?.className || "font-inter"
                                    }`}
                                  >
                                    @{tweetData.username}
                                  </span>
                                </div>
                              </div>
                              <div
                                className={`whitespace-pre-wrap ${
                                  fontOptions.find(
                                    (f) => f.value === tweetData.fontFamily
                                  )?.className || "font-inter"
                                }`}
                                style={{ color: tweetData.textColor }}
                              >
                                {tweetData.content}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden Export Element */}
                  <div
                    ref={previewRef}
                    data-preview="true"
                    style={{
                      position: "fixed",
                      top: "-9999px",
                      left: "-9999px",
                      width: "1080px",
                      height: "1350px",
                      padding: "0",
                      margin: "0",
                      background: `linear-gradient(to bottom right, ${tweetData.gradientStart}, ${tweetData.gradientEnd})`,
                    }}
                  >
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="w-full max-w-[960px] p-28">
                        <div
                          className={`flex flex-col ${
                            tweetData.alignment === "center"
                              ? "items-center text-center"
                              : "items-start text-left"
                          }`}
                        >
                          <div className="flex items-center gap-7 mb-10">
                            {tweetData.profilePhoto ? (
                              <img
                                src={tweetData.profilePhoto}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                                <User className="w-12 h-12 text-gray-400" />
                              </div>
                            )}
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center">
                                <span
                                  className={`text-[48px] font-bold ${
                                    fontOptions.find(
                                      (f) => f.value === tweetData.fontFamily
                                    )?.className || "font-inter"
                                  }`}
                                  style={{ color: tweetData.textColor }}
                                >
                                  {tweetData.fullName}
                                </span>
                                {tweetData.verified && (
                                  <div className="w-5 h-5 flex-shrink-0 ml-1">
                                    <img
                                      src="/verified-check.png"
                                      alt="Verified account"
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                )}
                              </div>
                              <span
                                className={`text-[32px] text-gray-500 ${
                                  fontOptions.find(
                                    (f) => f.value === tweetData.fontFamily
                                  )?.className || "font-inter"
                                }`}
                              >
                                @{tweetData.username}
                              </span>
                            </div>
                          </div>
                          <div
                            className={`whitespace-pre-wrap text-[36px] leading-[1.5] ${
                              fontOptions.find(
                                (f) => f.value === tweetData.fontFamily
                              )?.className || "font-inter"
                            }`}
                            style={{ color: tweetData.textColor }}
                          >
                            {tweetData.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadImage}
                  className="mt-6 w-full flex items-center justify-center gap-2 bg-[#5170FF] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#5170FF]/90 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
