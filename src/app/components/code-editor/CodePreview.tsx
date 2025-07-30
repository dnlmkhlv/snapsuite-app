"use client";

import { useRef, useEffect, useState } from "react";
import { CodeData } from "../../types/code";
import { EDITOR_THEMES } from "../../constants/code";
import { highlightCode } from "../../utils/code";

interface CodePreviewProps {
  codeData: CodeData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

export default function CodePreview({
  codeData,
  previewRef,
}: CodePreviewProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const ref = previewRef || internalRef;
  const codeBlockRef = useRef<HTMLDivElement>(null);
  const [codeHeight, setCodeHeight] = useState<number | undefined>(undefined);

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

  useEffect(() => {
    if (codeBlockRef.current) {
      setCodeHeight(codeBlockRef.current.scrollHeight);
    }
  }, [codeData.content, codeData.showLineNumbers, codeData.language]);

  return (
    <div className="p-4">
      <div
        ref={ref}
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
                backgroundColor: EDITOR_THEMES[codeData.theme]?.background,
              }}
            >
              {codeData.windowStyle !== "none" && (
                <div
                  className="flex items-center h-9 px-4 border-b relative"
                  style={{
                    backgroundColor: EDITOR_THEMES[codeData.theme]?.background,
                    borderColor: EDITOR_THEMES[codeData.theme]?.comment,
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
                  backgroundColor: EDITOR_THEMES[codeData.theme]?.background,
                  color: EDITOR_THEMES[codeData.theme]?.text,
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
                              codeData.theme,
                              EDITOR_THEMES
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
                          codeData.theme,
                          EDITOR_THEMES
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
}
