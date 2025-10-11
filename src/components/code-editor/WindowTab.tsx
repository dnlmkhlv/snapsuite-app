"use client";

import { CodeData } from "../../types/code";

interface WindowTabProps {
  codeData: CodeData;
  setCodeData: (data: CodeData | ((prev: CodeData) => CodeData)) => void;
}

export default function WindowTab({ codeData, setCodeData }: WindowTabProps) {
  return (
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
  );
}
