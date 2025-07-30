"use client";

import { useState } from "react";
import EditorLayout from "../components/EditorLayout";
import ImageTab from "../components/image-editor/ImageTab";
import TextTab from "../components/image-editor/TextTab";
import EffectsTab from "../components/image-editor/EffectsTab";
import ImageTabNavigation from "../components/ui/ImageTabNavigation";
import ImagePreview from "../components/image-editor/ImagePreview";
import { useImageData } from "../hooks/useImageData";
import { useImageDownload } from "../hooks/useImageDownload";
import { ImageTabType } from "../types/image";

export default function Images() {
  const { imageData, setImageData, resetImageData } = useImageData();
  const { previewRef, downloadImage } = useImageDownload();
  const [activeTab, setActiveTab] = useState<ImageTabType>("image");

  const toolsPanel = (
    <>
      <ImageTabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onReset={resetImageData}
      />

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "image" && (
          <ImageTab imageData={imageData} setImageData={setImageData} />
        )}

        {activeTab === "text" && (
          <TextTab imageData={imageData} setImageData={setImageData} />
        )}

        {activeTab === "effects" && (
          <EffectsTab imageData={imageData} setImageData={setImageData} />
        )}
      </div>
    </>
  );

  const preview = (
    <ImagePreview imageData={imageData} previewRef={previewRef} />
  );

  return (
    <EditorLayout
      toolsPanel={toolsPanel}
      preview={preview}
      onDownload={downloadImage}
    />
  );
}
