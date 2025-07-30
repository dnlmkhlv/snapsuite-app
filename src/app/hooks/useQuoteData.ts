import { useState } from "react";
import { QuoteData } from "../types/quote";
import { DEFAULT_QUOTE_DATA } from "../constants/quote";

export function useQuoteData() {
  const [quoteData, setQuoteData] = useState<QuoteData>(DEFAULT_QUOTE_DATA);

  const resetQuoteData = () => {
    setQuoteData(DEFAULT_QUOTE_DATA);
  };

  return {
    quoteData,
    setQuoteData,
    resetQuoteData,
  };
}
