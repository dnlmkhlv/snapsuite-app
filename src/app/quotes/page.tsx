"use client";

import { useState } from "react";
import EditorLayout from "../../components/EditorLayout";
import ContentTab from "../../components/quote-editor/ContentTab";
import StyleTab from "../../components/quote-editor/StyleTab";
import AuthorTab from "../../components/quote-editor/AuthorTab";
import QuoteTabNavigation from "../../components/ui/QuoteTabNavigation";
import QuotePreview from "../../components/quote-editor/QuotePreview";
import { useQuoteData } from "../../hooks/useQuoteData";
import { useImageDownload } from "../../hooks/useImageDownload";
import { QuoteTabType } from "../../types/quote";

export default function Quotes() {
  const { quoteData, setQuoteData, resetQuoteData } = useQuoteData();
  const { previewRef, downloadImage } = useImageDownload();
  const [activeTab, setActiveTab] = useState<QuoteTabType>("content");

  const toolsPanel = (
    <>
      <QuoteTabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onReset={resetQuoteData}
      />

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "content" && (
          <ContentTab quoteData={quoteData} setQuoteData={setQuoteData} />
        )}

        {activeTab === "style" && (
          <StyleTab quoteData={quoteData} setQuoteData={setQuoteData} />
        )}

        {activeTab === "author" && (
          <AuthorTab quoteData={quoteData} setQuoteData={setQuoteData} />
        )}
      </div>
    </>
  );

  const preview = (
    <QuotePreview quoteData={quoteData} previewRef={previewRef} />
  );

  return (
    <EditorLayout
      toolsPanel={toolsPanel}
      preview={preview}
      onDownload={downloadImage}
    />
  );
}
