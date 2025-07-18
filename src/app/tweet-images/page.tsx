"use client";

import { useState, useRef } from "react";
import html2canvas from "html2canvas";
import {
  CheckCircle,
  Upload,
  Palette,
  Type,
  User,
  AlignLeft,
  AlignCenter,
  Layers,
  Settings,
  Image as ImageIcon,
} from "lucide-react";
import Themes from "../components/Themes";
import Templates from "../components/Templates";
import { TweetTemplate } from "../utils/storage";
import EditorLayout from "../components/EditorLayout";

interface TweetData {
  content: string;
  username: string;
  fullName: string;
  verified: boolean;
  profilePhoto: string | null;
  textColor: string;
  fontFamily: string;
  cardTheme: "light" | "dark";
  backgroundColor: string;
  alignment: "left" | "center";
  gradientStart: string;
  gradientEnd: string;
}

const MAX_TWEET_LENGTH = 280;

const fontOptions = [
  { value: "Inter", label: "Inter", className: "font-inter" },
  { value: "Roboto", label: "Roboto", className: "font-roboto" },
  { value: "Open Sans", label: "Open Sans", className: "font-open-sans" },
  { value: "Lato", label: "Lato", className: "font-lato" },
  { value: "Poppins", label: "Poppins", className: "font-poppins" },
  { value: "Montserrat", label: "Montserrat", className: "font-montserrat" },
];

const themes = [
  {
    name: "Ocean",
    gradientStart: "#0EA5E9",
    gradientEnd: "#2563EB",
  },
  {
    name: "Sunset",
    gradientStart: "#F97316",
    gradientEnd: "#DB2777",
  },
  {
    name: "Forest",
    gradientStart: "#22C55E",
    gradientEnd: "#15803D",
  },
  {
    name: "Midnight",
    gradientStart: "#1E293B",
    gradientEnd: "#0F172A",
  },
  {
    name: "Purple Haze",
    gradientStart: "#A855F7",
    gradientEnd: "#6366F1",
  },
  {
    name: "Minimal",
    gradientStart: "#ffffff",
    gradientEnd: "#ffffff",
  },
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
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    username: "johndoe",
    fullName: "John Doe",
    verified: false,
    profilePhoto: null,
    textColor: "#000000",
    fontFamily: "Inter",
    cardTheme: "light",
    backgroundColor: "#ffffff",
    alignment: "center",
    gradientStart: "#ffffff",
    gradientEnd: "#ffffff",
  });

  const [activeTab, setActiveTab] = useState<"text" | "style" | "profile">(
    "text"
  );
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

  const handleThemeSelect = (theme: (typeof themes)[0]) => {
    setTweetData((prev) => ({
      ...prev,
      gradientStart: theme.gradientStart,
      gradientEnd: theme.gradientEnd,
      cardTheme: prev.cardTheme,
    }));
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_TWEET_LENGTH) {
      setTweetData((prev) => ({
        ...prev,
        content: newContent,
      }));
    }
  };

  const toolsPanel = (
    <>
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("text")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
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
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
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
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
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
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "text" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tweet Content
              </label>
              <textarea
                value={tweetData.content}
                onChange={handleContentChange}
                className="w-full h-48 p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent resize-none bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                placeholder="Enter your tweet content..."
                maxLength={MAX_TWEET_LENGTH}
              />
              <div className="mt-2 flex justify-end">
                <span
                  className={`text-sm ${
                    tweetData.content.length === MAX_TWEET_LENGTH
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {tweetData.content.length} / {MAX_TWEET_LENGTH}
                </span>
              </div>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setTweetData((prev) => ({
                    ...prev,
                    alignment: "left",
                  }))
                }
                className={`flex-1 p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                  tweetData.alignment === "left"
                    ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                    : "border-gray-200 hover:border-gray-300 text-gray-600"
                }`}
              >
                <AlignLeft className="w-4 h-4" />
                Left
              </button>
              <button
                onClick={() =>
                  setTweetData((prev) => ({
                    ...prev,
                    alignment: "center",
                  }))
                }
                className={`flex-1 p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
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
        )}

        {activeTab === "style" && (
          <div className="space-y-8">
            {/* Card Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Card Theme
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      cardTheme: "light",
                      textColor: "#000000",
                    }))
                  }
                  className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                    tweetData.cardTheme === "light"
                      ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <div className="w-5 h-5 rounded bg-white border border-gray-200" />
                  Light
                </button>
                <button
                  onClick={() =>
                    setTweetData((prev) => ({
                      ...prev,
                      cardTheme: "dark",
                      textColor: "#ffffff",
                    }))
                  }
                  className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 ${
                    tweetData.cardTheme === "dark"
                      ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  <div className="w-5 h-5 rounded bg-gray-900" />
                  Dark
                </button>
              </div>
            </div>

            {/* Background Theme */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Background Theme
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeSelect(theme)}
                    className="relative p-3 rounded-xl border transition-all hover:border-[#5170FF] group overflow-hidden"
                  >
                    <div
                      className="absolute inset-0 opacity-90 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.gradientStart}, ${theme.gradientEnd})`,
                      }}
                    />
                    <span
                      className="relative font-medium text-sm"
                      style={{
                        color:
                          theme.gradientStart === "#ffffff"
                            ? "#000000"
                            : "#ffffff",
                      }}
                    >
                      {theme.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Background Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Custom Background Colors
              </label>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Color
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={tweetData.gradientStart}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            gradientStart: e.target.value,
                          }))
                        }
                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
                      />
                      <div className="w-12 h-12 relative">
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
                          style={{ backgroundColor: tweetData.gradientStart }}
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Color
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={tweetData.gradientEnd}
                        onChange={(e) =>
                          setTweetData((prev) => ({
                            ...prev,
                            gradientEnd: e.target.value,
                          }))
                        }
                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
                      />
                      <div className="w-12 h-12 relative">
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
                          style={{ backgroundColor: tweetData.gradientEnd }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={tweetData.textColor}
                      onChange={(e) =>
                        setTweetData((prev) => ({
                          ...prev,
                          textColor: e.target.value,
                        }))
                      }
                      className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
                    />
                    <div className="w-12 h-12 relative">
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
              </div>
            </div>

            {/* Font Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
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
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    } ${font.className}`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="space-y-6">
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
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
              />
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5170FF] file:text-white hover:file:bg-[#4060EE]"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );

  const preview = (
    <div
      ref={previewRef}
      className="max-w-md mx-auto aspect-[4/5] bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(to bottom right, ${tweetData.gradientStart}, ${tweetData.gradientEnd})`,
        }}
      >
        <div className="flex items-center justify-center w-full h-full p-6">
          <div
            className={`w-full max-w-md rounded-xl p-6 ${
              tweetData.cardTheme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          >
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
                  <div className="flex items-center gap-1">
                    <span
                      className={`font-bold ${
                        fontOptions.find(
                          (f) => f.value === tweetData.fontFamily
                        )?.className || "font-inter"
                      }`}
                      style={{
                        color:
                          tweetData.cardTheme === "light"
                            ? "#000000"
                            : "#ffffff",
                      }}
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
                    className={`${
                      tweetData.cardTheme === "light"
                        ? "text-gray-500"
                        : "text-gray-400"
                    } ${
                      fontOptions.find((f) => f.value === tweetData.fontFamily)
                        ?.className || "font-inter"
                    }`}
                  >
                    @{tweetData.username}
                  </span>
                </div>
              </div>
              <div
                className={`whitespace-pre-wrap ${
                  fontOptions.find((f) => f.value === tweetData.fontFamily)
                    ?.className || "font-inter"
                }`}
                style={{
                  color:
                    tweetData.cardTheme === "light" ? "#000000" : "#ffffff",
                }}
              >
                {tweetData.content}
              </div>
            </div>
          </div>
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
