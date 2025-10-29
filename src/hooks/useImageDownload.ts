import { useRef } from "react";
import html2canvas from "html2canvas";

export function useImageDownload() {
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!previewRef.current) return;

    try {
      // Pre-load all images in the preview to ensure they're fully loaded
      const images = previewRef.current.querySelectorAll("img");
      const imagePromises = Array.from(images).map((img) => {
        return new Promise<void>((resolve, reject) => {
          if (img.complete && img.naturalWidth > 0) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () =>
              reject(new Error(`Failed to load image: ${img.src}`));
          }
        });
      });

      // Wait for all images to load
      await Promise.all(imagePromises);

      // Add style rule for proper image rendering
      const style = document.createElement("style");
      document.head.appendChild(style);
      style.sheet?.insertRule(
        "body > div:last-child img { display: inline-block; }"
      );

      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: false,
        scale: 3,
        logging: false,
        imageTimeout: 15000,
        removeContainer: true,
      });

      const link = document.createElement("a");
      link.download = `tweet-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
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
