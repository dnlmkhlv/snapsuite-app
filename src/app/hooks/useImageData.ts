import { useState } from "react";
import { ImageData } from "../types/image";
import { DEFAULT_IMAGE_DATA } from "../constants/image";

export function useImageData() {
  const [imageData, setImageData] = useState<ImageData>(DEFAULT_IMAGE_DATA);

  const resetImageData = () => {
    setImageData(DEFAULT_IMAGE_DATA);
  };

  return {
    imageData,
    setImageData,
    resetImageData,
  };
}
