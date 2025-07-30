"use client";

import { useState } from "react";
import EditorLayout from "../components/EditorLayout";
import TextTab from "../components/tweet-editor/TextTab";
import StyleTab from "../components/tweet-editor/StyleTab";
import ProfileTab from "../components/tweet-editor/ProfileTab";
import TabNavigation from "../components/ui/TabNavigation";
import TweetPreview from "../components/tweet-editor/TweetPreview";
import { useTweetData } from "../hooks/useTweetData";
import { useImageDownload } from "../hooks/useImageDownload";
import { TabType, Theme } from "../types/tweet";

export default function TweetImages() {
  const { tweetData, setTweetData, resetTweetData } = useTweetData();
  const { previewRef, downloadImage } = useImageDownload();
  const [activeTab, setActiveTab] = useState<TabType>("text");

  const handleThemeSelect = (theme: Theme) => {
    setTweetData((prev) => ({
      ...prev,
      gradientStart: theme.gradientStart,
      gradientEnd: theme.gradientEnd,
      backgroundType: "gradient", // Always switch to gradient mode when selecting a theme
      cardTheme: prev.cardTheme, // Preserve the current card theme
    }));
  };

  const toolsPanel = (
    <>
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onReset={resetTweetData}
      />

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "text" && (
          <TextTab tweetData={tweetData} setTweetData={setTweetData} />
        )}

        {activeTab === "style" && (
          <StyleTab
            tweetData={tweetData}
            setTweetData={setTweetData}
            handleThemeSelect={handleThemeSelect}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab tweetData={tweetData} setTweetData={setTweetData} />
        )}
      </div>
    </>
  );

  const preview = (
    <TweetPreview tweetData={tweetData} previewRef={previewRef} />
  );

  return (
    <EditorLayout
      toolsPanel={toolsPanel}
      preview={preview}
      onDownload={downloadImage}
    />
  );
}
