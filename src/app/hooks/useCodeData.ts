import { useState } from "react";
import { CodeData } from "../types/code";
import { DEFAULT_CODE_DATA } from "../constants/code";

export function useCodeData() {
  const [codeData, setCodeData] = useState<CodeData>(DEFAULT_CODE_DATA);

  const resetCodeData = () => {
    setCodeData(DEFAULT_CODE_DATA);
  };

  return {
    codeData,
    setCodeData,
    resetCodeData,
  };
}
