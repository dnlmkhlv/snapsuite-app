"use client";

import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import {
  Palette,
  Code,
  Monitor,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from "lucide-react";
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import python from "highlight.js/lib/languages/python";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import ruby from "highlight.js/lib/languages/ruby";
import php from "highlight.js/lib/languages/php";
import sql from "highlight.js/lib/languages/sql";
import shell from "highlight.js/lib/languages/shell";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";
import yaml from "highlight.js/lib/languages/yaml";
import kotlin from "highlight.js/lib/languages/kotlin";
import swift from "highlight.js/lib/languages/swift";
import markdown from "highlight.js/lib/languages/markdown";
import EditorLayout from "../components/EditorLayout";

// Register languages
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("python", python);
hljs.registerLanguage("java", java);
hljs.registerLanguage("cpp", cpp);
hljs.registerLanguage("csharp", csharp);
hljs.registerLanguage("go", go);
hljs.registerLanguage("rust", rust);
hljs.registerLanguage("ruby", ruby);
hljs.registerLanguage("php", php);
hljs.registerLanguage("sql", sql);
hljs.registerLanguage("shell", shell);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("kotlin", kotlin);
hljs.registerLanguage("swift", swift);
hljs.registerLanguage("markdown", markdown);

type ThemeColors = {
  name: string;
  background: string;
  text: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  operator: string;
  variable: string;
};

type EditorThemes = {
  [key: string]: ThemeColors;
};

const editorThemes: EditorThemes = {
  "github-dark": {
    name: "GitHub Dark",
    background: "#0d1117",
    text: "#c9d1d9",
    comment: "#8b949e",
    keyword: "#ff7b72",
    string: "#a5d6ff",
    number: "#79c0ff",
    function: "#d2a8ff",
    operator: "#ff7b72",
    variable: "#ffa657",
  },
  "github-light": {
    name: "GitHub Light",
    background: "#ffffff",
    text: "#24292f",
    comment: "#6e7781",
    keyword: "#cf222e",
    string: "#0a3069",
    number: "#0550ae",
    function: "#8250df",
    operator: "#cf222e",
    variable: "#953800",
  },
  monokai: {
    name: "Monokai",
    background: "#272822",
    text: "#f8f8f2",
    comment: "#75715e",
    keyword: "#f92672",
    string: "#e6db74",
    number: "#ae81ff",
    function: "#66d9ef",
    operator: "#f92672",
    variable: "#fd971f",
  },
  dracula: {
    name: "Dracula",
    background: "#282a36",
    text: "#f8f8f2",
    comment: "#6272a4",
    keyword: "#ff79c6",
    string: "#f1fa8c",
    number: "#bd93f9",
    function: "#50fa7b",
    operator: "#ff79c6",
    variable: "#ffb86c",
  },
  nord: {
    name: "Nord",
    background: "#2e3440",
    text: "#d8dee9",
    comment: "#4c566a",
    keyword: "#81a1c1",
    string: "#a3be8c",
    number: "#b48ead",
    function: "#88c0d0",
    operator: "#81a1c1",
    variable: "#d8dee9",
  },
  "one-dark": {
    name: "One Dark",
    background: "#282c34",
    text: "#abb2bf",
    comment: "#5c6370",
    keyword: "#c678dd",
    string: "#98c379",
    number: "#d19a66",
    function: "#61afef",
    operator: "#56b6c2",
    variable: "#e06c75",
  },
};

const themeOptions = Object.entries(editorThemes).map(([value, theme]) => ({
  value,
  label: theme.name,
}));

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "sql", label: "SQL" },
  { value: "shell", label: "Shell/Bash" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "markdown", label: "Markdown" },
];

const themes = [
  {
    name: "Minimal",
    gradientStart: "#ffffff",
    gradientEnd: "#ffffff",
  },
  {
    name: "Dark",
    gradientStart: "#1E293B",
    gradientEnd: "#0F172A",
  },
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
    name: "Purple Haze",
    gradientStart: "#A855F7",
    gradientEnd: "#6366F1",
  },
];

interface CodeData {
  content: string;
  language: string;
  theme: string;
  showLineNumbers: boolean;
  windowStyle: "mac" | "windows" | "none";
  windowTitle: string;
  backgroundColor: string;
  backgroundType: "solid" | "gradient" | "image";
  gradientStart: string;
  gradientEnd: string;
  backgroundImage: string | null;
  backgroundOpacity: number;
  showWatermark: boolean;
}

export default function CodeSnippets() {
  const [activeTab, setActiveTab] = useState<"code" | "style" | "window">(
    "code"
  );
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);
  const [isBackgroundThemesOpen, setIsBackgroundThemesOpen] = useState(false);
  const [isThemesOpen, setIsThemesOpen] = useState(false);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [codeData, setCodeData] = useState<CodeData>({
    content: 'function hello() {\n  console.log("Hello, World!");\n}',
    language: "javascript",
    theme: "nord",
    showLineNumbers: true,
    windowStyle: "mac",
    windowTitle: "script.js",
    backgroundColor: "#F97316",
    backgroundType: "gradient",
    gradientStart: "#F97316",
    gradientEnd: "#DB2777",
    backgroundImage: null,
    backgroundOpacity: 1,
    showWatermark: false,
  });

  const getBackgroundStyle = () => {
    switch (codeData.backgroundType) {
      case "gradient":
        return {
          backgroundImage: `linear-gradient(to bottom right, ${codeData.gradientStart}, ${codeData.gradientEnd})`,
        };
      case "image":
        return codeData.backgroundImage
          ? {
              backgroundImage: `url(${codeData.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: codeData.backgroundOpacity,
            }
          : { backgroundColor: codeData.backgroundColor };
      default:
        return { backgroundColor: codeData.backgroundColor };
    }
  };

  const previewRef = useRef<HTMLDivElement>(null);
  const [codeHeight, setCodeHeight] = useState<number | undefined>(undefined);
  const codeBlockRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
      // Add style rule for proper image rendering
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule(
        "body > div:last-child { transform-origin: 0 0; }"
      );
      style.sheet?.insertRule(
        "body > div:last-child img { display: inline-block; }"
      );

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `code-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Clean up the added style
      document.head.removeChild(style);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const toolsPanel = (
    <>
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center border-b relative z-0 gap-x-1 gap-y-2">
        <button
          onClick={() => setActiveTab("code")}
          className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-colors relative text-xs sm:text-base ${
            activeTab === "code"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Code className="w-4 h-4" />
          Code
          {activeTab === "code" && (
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
          onClick={() => setActiveTab("window")}
          className={`flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium transition-colors relative text-xs sm:text-base ${
            activeTab === "window"
              ? "text-[#5170FF]"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <Monitor className="w-4 h-4" />
          Window
          {activeTab === "window" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
          )}
        </button>
        <button
          onClick={() =>
            setCodeData({
              content: 'function hello() {\n  console.log("Hello, World!");\n}',
              language: "javascript",
              theme: "nord",
              showLineNumbers: true,
              windowStyle: "mac",
              windowTitle: "script.js",
              backgroundColor: "#F97316",
              backgroundType: "gradient",
              gradientStart: "#F97316",
              gradientEnd: "#DB2777",
              backgroundImage: null,
              backgroundOpacity: 1,
              showWatermark: false,
            })
          }
          className="flex items-center gap-2 px-3 sm:px-6 py-3 sm:py-4 font-medium text-xs sm:text-base text-gray-600 hover:text-gray-900 bg-transparent transition-all active:scale-90 active:opacity-70 ml-auto"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "code" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Code
              </label>
              <div className="relative border border-gray-200 rounded-xl focus-within:ring-2 focus-within:ring-[#5170FF] focus-within:border-transparent hover:border-gray-300 transition-all bg-gray-50">
                <div
                  ref={lineNumbersRef}
                  className="absolute top-0 left-0 p-4 select-none text-right overflow-hidden border-r border-gray-200"
                  style={{
                    height: "100%",
                    width: "3.5rem",
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                  }}
                >
                  {codeData.content.split("\n").map((_, i) => (
                    <div
                      key={i}
                      className="text-gray-400 font-mono text-sm leading-6 pr-2"
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
                <textarea
                  value={codeData.content}
                  onChange={(e) =>
                    setCodeData((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Tab") {
                      e.preventDefault();

                      const textarea = e.currentTarget;
                      const start = textarea.selectionStart;
                      const end = textarea.selectionEnd;
                      const spaces = "  "; // 2 spaces for indentation

                      const newContent =
                        codeData.content.substring(0, start) +
                        spaces +
                        codeData.content.substring(end);

                      setCodeData((prev) => ({
                        ...prev,
                        content: newContent,
                      }));

                      // Keep reference to the textarea and set cursor position after state update
                      setTimeout(() => {
                        textarea.focus();
                        textarea.selectionStart = start + spaces.length;
                        textarea.selectionEnd = start + spaces.length;
                      }, 0);
                    }
                  }}
                  onScroll={(e) => {
                    if (lineNumbersRef.current) {
                      lineNumbersRef.current.scrollTop =
                        e.currentTarget.scrollTop;
                    }
                  }}
                  className="w-full h-48 p-4 pl-14 border-none focus:ring-0 resize-none bg-transparent text-gray-900 placeholder:text-gray-400 font-mono text-sm leading-6 overflow-auto"
                  style={{
                    whiteSpace: "pre",
                    scrollbarWidth: "thin",
                    scrollbarColor: "#CBD5E1 transparent",
                  }}
                  placeholder="Enter your code..."
                  spellCheck={false}
                />
              </div>
            </div>
            <div className="space-y-2">
              <button
                onClick={() => setIsLanguagesOpen(!isLanguagesOpen)}
                className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              >
                <span className="text-sm font-medium">Language</span>
                {isLanguagesOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {isLanguagesOpen && (
                <div className="p-4 border border-gray-200 rounded-xl bg-white">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() =>
                          setCodeData((prev) => ({
                            ...prev,
                            language: lang.value,
                          }))
                        }
                        className={`p-3 rounded-lg border transition-all ${
                          codeData.language === lang.value
                            ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "style" && (
          <div className="space-y-6">
            {/* Background Theme */}
            <div className="space-y-2">
              <button
                onClick={() =>
                  setIsBackgroundThemesOpen(!isBackgroundThemesOpen)
                }
                className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              >
                <span className="text-sm font-medium">Background Theme</span>
                {isBackgroundThemesOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {isBackgroundThemesOpen && (
                <div className="mt-3 p-4 border border-gray-200 rounded-xl bg-white space-y-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {themes.map((theme) => (
                      <button
                        key={theme.name}
                        onClick={() =>
                          setCodeData((prev) => ({
                            ...prev,
                            backgroundType: "gradient",
                            gradientStart: theme.gradientStart,
                            gradientEnd: theme.gradientEnd,
                          }))
                        }
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
              )}
            </div>

            {/* Custom Background Colors */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Custom Background Colors
              </label>
              <div className="space-y-6">
                {/* Background Type Selection */}
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() =>
                      setCodeData((prev) => ({
                        ...prev,
                        backgroundType: "solid",
                      }))
                    }
                    className={`p-3 rounded-xl border transition-all ${
                      codeData.backgroundType === "solid"
                        ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    Solid Color
                  </button>
                  <button
                    onClick={() =>
                      setCodeData((prev) => ({
                        ...prev,
                        backgroundType: "gradient",
                      }))
                    }
                    className={`p-3 rounded-xl border transition-all ${
                      codeData.backgroundType === "gradient"
                        ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    Gradient
                  </button>
                  <button
                    onClick={() =>
                      setCodeData((prev) => ({
                        ...prev,
                        backgroundType: "image",
                      }))
                    }
                    className={`p-3 rounded-xl border transition-all ${
                      codeData.backgroundType === "image"
                        ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                        : "border-gray-200 hover:border-gray-300 text-gray-600"
                    }`}
                  >
                    Image
                  </button>
                </div>

                {/* Solid Color Picker */}
                {codeData.backgroundType === "solid" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background Color
                    </label>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={codeData.backgroundColor}
                        onChange={(e) =>
                          setCodeData((prev) => ({
                            ...prev,
                            backgroundColor: e.target.value,
                            gradientStart: e.target.value,
                            gradientEnd: e.target.value,
                          }))
                        }
                        className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                      />
                      <div className="w-12 h-12 relative">
                        <input
                          type="color"
                          value={codeData.backgroundColor}
                          onChange={(e) =>
                            setCodeData((prev) => ({
                              ...prev,
                              backgroundColor: e.target.value,
                              gradientStart: e.target.value,
                              gradientEnd: e.target.value,
                            }))
                          }
                          className="absolute inset-0 rounded-lg cursor-pointer opacity-0"
                        />
                        <div
                          className="w-full h-full rounded-lg border border-gray-200"
                          style={{ backgroundColor: codeData.backgroundColor }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Gradient Color Pickers */}
                {codeData.backgroundType === "gradient" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Color
                      </label>
                      <div className="flex gap-3">
                        <input
                          type="text"
                          value={codeData.gradientStart}
                          onChange={(e) =>
                            setCodeData((prev) => ({
                              ...prev,
                              gradientStart: e.target.value,
                            }))
                          }
                          className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                        />
                        <div className="w-12 h-12 relative">
                          <input
                            type="color"
                            value={codeData.gradientStart}
                            onChange={(e) =>
                              setCodeData((prev) => ({
                                ...prev,
                                gradientStart: e.target.value,
                              }))
                            }
                            className="absolute inset-0 rounded-lg cursor-pointer opacity-0"
                          />
                          <div
                            className="w-full h-full rounded-lg border border-gray-200"
                            style={{ backgroundColor: codeData.gradientStart }}
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
                          value={codeData.gradientEnd}
                          onChange={(e) =>
                            setCodeData((prev) => ({
                              ...prev,
                              gradientEnd: e.target.value,
                            }))
                          }
                          className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
                        />
                        <div className="w-12 h-12 relative">
                          <input
                            type="color"
                            value={codeData.gradientEnd}
                            onChange={(e) =>
                              setCodeData((prev) => ({
                                ...prev,
                                gradientEnd: e.target.value,
                              }))
                            }
                            className="absolute inset-0 rounded-lg cursor-pointer opacity-0"
                          />
                          <div
                            className="w-full h-full rounded-lg border border-gray-200"
                            style={{ backgroundColor: codeData.gradientEnd }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Image Upload and Opacity */}
                {codeData.backgroundType === "image" && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Background Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setCodeData((prev) => ({
                                ...prev,
                                backgroundImage: e.target?.result as string,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5170FF] file:text-white hover:file:bg-[#4060EE]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Opacity
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={codeData.backgroundOpacity}
                        onChange={(e) =>
                          setCodeData((prev) => ({
                            ...prev,
                            backgroundOpacity: parseFloat(e.target.value),
                          }))
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Code Theme */}
            <div className="space-y-2">
              <button
                onClick={() => setIsThemesOpen(!isThemesOpen)}
                className="flex items-center justify-between w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              >
                <span className="text-sm font-medium">Code Theme</span>
                {isThemesOpen ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {isThemesOpen && (
                <div className="mt-3 p-4 border border-gray-200 rounded-xl bg-white">
                  <div className="grid grid-cols-2 gap-3">
                    {themeOptions.map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() =>
                          setCodeData((prev) => ({
                            ...prev,
                            theme: theme.value,
                          }))
                        }
                        className={`p-3 rounded-lg border transition-all ${
                          codeData.theme === theme.value
                            ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                        }`}
                      >
                        {theme.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Watermark Option (bottom) */}
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="watermark"
              >
                Show Watermark
              </label>
              <input
                type="checkbox"
                id="watermark"
                checked={codeData.showWatermark}
                onChange={(e) =>
                  setCodeData((prev) => ({
                    ...prev,
                    showWatermark: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#5170FF] border-gray-300 rounded focus:ring-[#5170FF]"
              />
            </div>
          </div>
        )}

        {activeTab === "window" && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Window Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() =>
                    setCodeData((prev) => ({
                      ...prev,
                      windowStyle: "mac",
                    }))
                  }
                  className={`p-3 rounded-lg border transition-all ${
                    codeData.windowStyle === "mac"
                      ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  macOS
                </button>
                <button
                  onClick={() =>
                    setCodeData((prev) => ({
                      ...prev,
                      windowStyle: "windows",
                    }))
                  }
                  className={`p-3 rounded-lg border transition-all ${
                    codeData.windowStyle === "windows"
                      ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  Windows
                </button>
                <button
                  onClick={() =>
                    setCodeData((prev) => ({
                      ...prev,
                      windowStyle: "none",
                    }))
                  }
                  className={`p-3 rounded-lg border transition-all ${
                    codeData.windowStyle === "none"
                      ? "border-[#5170FF] bg-[#5170FF]/5 text-[#5170FF]"
                      : "border-gray-200 hover:border-gray-300 text-gray-600"
                  }`}
                >
                  None
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Window Title
              </label>
              <input
                type="text"
                value={codeData.windowTitle}
                onChange={(e) =>
                  setCodeData((prev) => ({
                    ...prev,
                    windowTitle: e.target.value,
                  }))
                }
                placeholder="Enter file name"
                className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="lineNumbers"
                checked={codeData.showLineNumbers}
                onChange={(e) =>
                  setCodeData((prev) => ({
                    ...prev,
                    showLineNumbers: e.target.checked,
                  }))
                }
                className="w-4 h-4 text-[#5170FF] border-gray-300 rounded focus:ring-[#5170FF]"
              />
              <label
                htmlFor="lineNumbers"
                className="text-sm font-medium text-gray-700"
              >
                Show Line Numbers
              </label>
            </div>
          </div>
        )}
      </div>
    </>
  );

  // Function to highlight code
  const getHighlightedCode = () => {
    if (!codeData.content) return "";
    try {
      const highlighted = hljs.highlight(codeData.content, {
        language: codeData.language,
      }).value;
      return highlighted;
    } catch (error) {
      return codeData.content;
    }
  };

  // Update highlighting when content or language changes
  useEffect(() => {
    hljs.highlightAll();
  }, [codeData.content, codeData.language]);

  useEffect(() => {
    if (codeBlockRef.current) {
      setCodeHeight(codeBlockRef.current.scrollHeight);
    }
  }, [codeData.content, codeData.showLineNumbers, codeData.language]);

  const preview = (
    <div className="p-4">
      <div
        ref={previewRef}
        className="mx-auto overflow-visible relative max-w-4xl"
        style={
          codeHeight && codeHeight > 0 ? { height: codeHeight + 64 } : undefined
        }
      >
        <div className="w-full h-full" style={getBackgroundStyle()}>
          <div className="flex items-center justify-center w-full h-full p-8">
            <div
              ref={codeBlockRef}
              className="w-full rounded-2xl shadow-lg overflow-auto"
              style={{
                backgroundColor:
                  editorThemes[codeData.theme as keyof EditorThemes]
                    ?.background,
              }}
            >
              {codeData.windowStyle !== "none" && (
                <div
                  className="flex items-center h-9 px-4 border-b relative"
                  style={{
                    backgroundColor:
                      editorThemes[codeData.theme as keyof EditorThemes]
                        ?.background,
                    borderColor:
                      editorThemes[codeData.theme as keyof EditorThemes]
                        ?.comment,
                  }}
                >
                  {codeData.windowStyle === "mac" ? (
                    <div className="flex gap-2 items-center h-full">
                      <div className="w-3 h-3 rounded-full bg-[#FF5F57] ring-1 ring-[#EC4C44]/20" />
                      <div className="w-3 h-3 rounded-full bg-[#FEBC2E] ring-1 ring-[#D69E24]/20" />
                      <div className="w-3 h-3 rounded-full bg-[#28C840] ring-1 ring-[#1DAD2B]/20" />
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center h-full">
                      <div className="w-3 h-3 rounded-full bg-[#666666] ring-1 ring-white/20 hover:bg-[#888888] transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-[#666666] ring-1 ring-white/20 hover:bg-[#888888] transition-colors" />
                      <div className="w-3 h-3 rounded-full bg-[#666666] ring-1 ring-white/20 hover:bg-[#888888] transition-colors" />
                    </div>
                  )}
                  <div className="absolute left-0 right-0 flex items-center justify-center h-full">
                    <span className="text-sm text-gray-400">
                      {codeData.windowTitle}
                    </span>
                  </div>
                </div>
              )}
              <div
                className="p-6 pb-8"
                style={{
                  minHeight: "4rem",
                  backgroundColor:
                    editorThemes[codeData.theme as keyof EditorThemes]
                      ?.background,
                  color:
                    editorThemes[codeData.theme as keyof EditorThemes]?.text,
                }}
              >
                {codeData.showLineNumbers ? (
                  <pre
                    className="whitespace-pre font-mono text-sm pb-2 overflow-x-auto"
                    style={{ lineHeight: "1.75" }}
                  >
                    {codeData.content.split("\n").map((line, i) => (
                      <div key={i} className="flex">
                        <span className="w-8 text-gray-500 select-none">
                          {i + 1}
                        </span>
                        <span
                          dangerouslySetInnerHTML={{
                            __html: highlightCode(
                              line,
                              codeData.language,
                              codeData.theme
                            ),
                          }}
                        />
                      </div>
                    ))}
                    <div style={{ height: "0.5em", opacity: 0 }}>&nbsp;</div>
                  </pre>
                ) : (
                  <pre
                    className="whitespace-pre font-mono text-sm pb-2 overflow-x-auto"
                    style={{ lineHeight: "1.75" }}
                    dangerouslySetInnerHTML={{
                      __html:
                        highlightCode(
                          codeData.content,
                          codeData.language,
                          codeData.theme
                        ) + "<div style='height:0.5em;opacity:0'>&nbsp;</div>",
                    }}
                  />
                )}
              </div>
            </div>
          </div>
          {codeData.showWatermark && (
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

function highlightCode(code: string, language: string, theme: string) {
  try {
    const highlighted = hljs.highlight(code, { language }).value;
    const currentTheme = editorThemes[theme as keyof EditorThemes];
    if (!currentTheme) return code;

    const themed = highlighted.replace(
      /<span class="hljs-([^"]+)">/g,
      (match, type: string) => {
        const color = (currentTheme as any)[type] || currentTheme.text;
        return `<span style="color: ${color}">`;
      }
    );
    return themed;
  } catch (error) {
    return code;
  }
}
