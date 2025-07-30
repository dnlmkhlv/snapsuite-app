import { useRef } from "react";
import html2canvas from "html2canvas";

export function useImageDownload() {
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
      // Add style rule for proper image rendering
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule(
        "body > div:last-child img { display: inline-block; }"
      );

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        scale: 2,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `tweet-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();

      // Clean up the added style
      document.head.removeChild(style);
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  return {
    previewRef,
    downloadImage,
  };
}
