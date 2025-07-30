"use client";

import { useState } from "react";
import EditorLayout from "../components/EditorLayout";
import CodeEditor from "../components/code-editor/CodeEditor";
import StyleTab from "../components/code-editor/StyleTab";
import WindowTab from "../components/code-editor/WindowTab";
import CodeTabNavigation from "../components/ui/CodeTabNavigation";
import CodePreview from "../components/code-editor/CodePreview";
import { useCodeData } from "../hooks/useCodeData";
import { useImageDownload } from "../hooks/useImageDownload";
import { useCodeHighlighting } from "../hooks/useCodeHighlighting";
import { CodeTabType } from "../types/code";

export default function CodeSnippets() {
  const { codeData, setCodeData, resetCodeData } = useCodeData();
  const { previewRef, downloadImage } = useImageDownload();
  const [activeTab, setActiveTab] = useState<CodeTabType>("code");

  // Use the code highlighting hook
  useCodeHighlighting(codeData.content, codeData.language);

  const toolsPanel = (
    <>
      <CodeTabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onReset={resetCodeData}
      />

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "code" && (
          <CodeEditor codeData={codeData} setCodeData={setCodeData} />
        )}

        {activeTab === "style" && (
          <StyleTab codeData={codeData} setCodeData={setCodeData} />
        )}

        {activeTab === "window" && (
          <WindowTab codeData={codeData} setCodeData={setCodeData} />
        )}
      </div>
    </>
  );

  const preview = <CodePreview codeData={codeData} previewRef={previewRef} />;

  return (
    <EditorLayout
      toolsPanel={toolsPanel}
      preview={preview}
      onDownload={downloadImage}
    />
  );
}
