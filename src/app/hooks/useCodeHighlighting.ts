import { useEffect } from "react";
import { highlightAll } from "../utils/code";

export function useCodeHighlighting(content: string, language: string) {
  useEffect(() => {
    highlightAll();
  }, [content, language]);
}
