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
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import EditorLayout from "../components/EditorLayout";

interface CodeData {
  content: string;
  language: string;
  theme: string;
  showLineNumbers: boolean;
  windowStyle: "mac" | "windows" | "none";
  backgroundColor: string;
  textColor: string;
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
  { value: "github-dark", label: "GitHub Dark" },
  { value: "github-light", label: "GitHub Light" },
  { value: "monokai", label: "Monokai" },
  { value: "dracula", label: "Dracula" },
  { value: "solarized-dark", label: "Solarized Dark" },
  { value: "solarized-light", label: "Solarized Light" },
];

export default function CodeSnippets() {
  const [activeTab, setActiveTab] = useState<"code" | "style" | "window">(
    "code"
  );
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [codeData, setCodeData] = useState<CodeData>({
    content: 'function hello() {\n  console.log("Hello, World!");\n}',
    language: "javascript",
    theme: "github-dark",
    showLineNumbers: true,
    windowStyle: "mac",
    backgroundColor: "#0d1117",
    textColor: "#ffffff",
  });

  const previewRef = useRef<HTMLDivElement>(null);

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
                  className="absolute top-0 left-0 p-4 select-none text-right border-r border-gray-200 overflow-hidden"
                  style={{
                    height: "100%",
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    width: "3rem",
                  }}
                >
                  {codeData.content.split("\n").map((_, i) => (
                    <div
                      key={i}
                      className="text-gray-400 font-mono text-sm leading-6"
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
                  onScroll={(e) => {
                    if (lineNumbersRef.current) {
                      lineNumbersRef.current.scrollTop =
                        e.currentTarget.scrollTop;
                    }
                  }}
                  className="w-full h-48 p-4 pl-12 border-none focus:ring-0 resize-none bg-transparent text-gray-900 placeholder:text-gray-400 font-mono text-sm leading-6"
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

  const preview = (
    <div
      ref={previewRef}
      className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
    >
      <div
        className="w-full"
        style={{ backgroundColor: codeData.backgroundColor }}
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
        <div className="p-6">
          {codeData.showLineNumbers ? (
            <pre className="whitespace-pre font-mono text-sm">
              {codeData.content.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 text-gray-500 select-none">{i + 1}</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: hljs.highlight(line, {
                        language: codeData.language,
                      }).value,
                    }}
                  />
                </div>
              ))}
            </pre>
          ) : (
            <pre
              className="whitespace-pre font-mono text-sm"
              dangerouslySetInnerHTML={{
                __html: getHighlightedCode(),
              }}
            />
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
