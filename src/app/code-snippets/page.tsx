"use client";

import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import {
  Palette,
  Type,
  Settings,
  Code,
  Monitor,
  ChevronDown,
  ChevronUp,
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
import "highlight.js/styles/github-dark.css";
import "highlight.js/styles/github.css";
import "highlight.js/styles/monokai.css";
import "highlight.js/styles/vs2015.css";
import "highlight.js/styles/vs.css";
import "highlight.js/styles/atom-one-dark.css";
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

interface CodeData {
  content: string;
  language: string;
  theme: string;
  showLineNumbers: boolean;
  windowStyle: "mac" | "windows" | "none";
  backgroundColor: string;
  textColor: string;
  aspectRatio: "4/5" | "1/1" | "16/9" | "3/2";
  backgroundType: "solid" | "gradient";
  gradientStart: string;
  gradientEnd: string;
}

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
];

const themeOptions = [
  { value: "github-dark", label: "GitHub Dark", style: "github-dark" },
  { value: "github-light", label: "GitHub Light", style: "github" },
  { value: "monokai", label: "Monokai", style: "monokai" },
  { value: "vs2015", label: "VS Dark", style: "vs2015" },
  { value: "vs", label: "VS Light", style: "vs" },
  { value: "atom-one-dark", label: "Atom Dark", style: "atom-one-dark" },
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

export default function CodeSnippets() {
  const [activeTab, setActiveTab] = useState<"code" | "style" | "window">(
    "code"
  );
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);
  const [isBackgroundThemesOpen, setIsBackgroundThemesOpen] = useState(false);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [codeData, setCodeData] = useState<CodeData>({
    content: 'function hello() {\n  console.log("Hello, World!");\n}',
    language: "javascript",
    theme: "github-dark",
    showLineNumbers: true,
    windowStyle: "mac",
    backgroundColor: "#0d1117",
    textColor: "#ffffff",
    aspectRatio: "4/5",
    backgroundType: "solid",
    gradientStart: "#ffffff",
    gradientEnd: "#ffffff",
  });

  const previewRef = useRef<HTMLDivElement>(null);
  const [codeHeight, setCodeHeight] = useState<number | undefined>(undefined);
  const codeBlockRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
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
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const toolsPanel = (
    <>
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab("code")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
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
          onClick={() => setActiveTab("window")}
          className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
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
            {/* Image Ratio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Image Ratio
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() =>
                    setCodeData((prev) => ({
                      ...prev,
                      aspectRatio: "4/5",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    codeData.aspectRatio === "4/5"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  4:5
                </button>
                <button
                  onClick={() =>
                    setCodeData((prev) => ({
                      ...prev,
                      aspectRatio: "1/1",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    codeData.aspectRatio === "1/1"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  1:1
                </button>
                <button
                  onClick={() =>
                    setCodeData((prev) => ({
                      ...prev,
                      aspectRatio: "16/9",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    codeData.aspectRatio === "16/9"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  16:9
                </button>
                <button
                  onClick={() =>
                    setCodeData((prev) => ({
                      ...prev,
                      aspectRatio: "3/2",
                    }))
                  }
                  className={`flex items-center justify-center p-3 border rounded-xl ${
                    codeData.aspectRatio === "3/2"
                      ? "border-[#5170FF] bg-[#5170FF] bg-opacity-10 text-[#5170FF]"
                      : "border-gray-200 text-gray-700"
                  }`}
                >
                  3:2
                </button>
              </div>
            </div>

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

            {/* Existing theme and color options */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Theme
              </label>
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
                    }))
                  }
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
                />
                <div className="w-12 h-12 relative">
                  <input
                    type="color"
                    value={codeData.backgroundColor}
                    onChange={(e) =>
                      setCodeData((prev) => ({
                        ...prev,
                        backgroundColor: e.target.value,
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Text Color
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={codeData.textColor}
                  onChange={(e) =>
                    setCodeData((prev) => ({
                      ...prev,
                      textColor: e.target.value,
                    }))
                  }
                  className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50"
                />
                <div className="w-12 h-12 relative">
                  <input
                    type="color"
                    value={codeData.textColor}
                    onChange={(e) =>
                      setCodeData((prev) => ({
                        ...prev,
                        textColor: e.target.value,
                      }))
                    }
                    className="absolute inset-0 rounded-lg cursor-pointer opacity-0"
                  />
                  <div
                    className="w-full h-full rounded-lg border border-gray-200"
                    style={{ backgroundColor: codeData.textColor }}
                  />
                </div>
              </div>
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
        className={`mx-auto overflow-visible relative max-w-4xl`}
        style={
          codeHeight && codeHeight > 0
            ? { height: codeHeight + 64 }
            : { aspectRatio: codeData.aspectRatio }
        }
      >
        <div
          className="w-full h-full"
          style={{
            ...(codeData.backgroundType === "gradient"
              ? {
                  backgroundImage: `linear-gradient(to bottom right, ${codeData.gradientStart}, ${codeData.gradientEnd})`,
                }
              : {
                  backgroundColor: codeData.backgroundColor,
                }),
          }}
        >
          <div className="flex items-center justify-center w-full h-full p-8">
            <div
              ref={codeBlockRef}
              className={`w-full bg-white rounded-2xl shadow-lg overflow-auto`}
            >
              {codeData.windowStyle !== "none" && (
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-800">
                  {codeData.windowStyle === "mac" ? (
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                      <div className="w-3 h-3 rounded-full bg-gray-500" />
                    </div>
                  )}
                </div>
              )}
              <div
                className={`p-6 pb-8 hljs ${themeOptions.find((t) => t.value === codeData.theme)?.style || "github-dark"}`}
                style={{ minHeight: "4rem" }}
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
                            __html: hljs.highlight(line, {
                              language: codeData.language,
                            }).value,
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
                        getHighlightedCode() +
                        "<div style='height:0.5em;opacity:0'>&nbsp;</div>",
                    }}
                  />
                )}
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
