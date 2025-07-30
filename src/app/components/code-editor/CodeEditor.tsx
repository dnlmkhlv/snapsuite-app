"use client";

import { useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CodeData } from "../../types/code";
import { LANGUAGE_OPTIONS } from "../../constants/code";

interface CodeEditorProps {
  codeData: CodeData;
  setCodeData: (data: CodeData | ((prev: CodeData) => CodeData)) => void;
}

export default function CodeEditor({ codeData, setCodeData }: CodeEditorProps) {
  const [isLanguagesOpen, setIsLanguagesOpen] = useState(false);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
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
            onKeyDown={handleTabKey}
            onScroll={handleScroll}
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
              {LANGUAGE_OPTIONS.map((lang) => (
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
  );
}
