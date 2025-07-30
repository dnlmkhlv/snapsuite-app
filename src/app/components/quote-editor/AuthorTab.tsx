"use client";

import { QuoteData } from "../../types/quote";

interface AuthorTabProps {
  quoteData: QuoteData;
  setQuoteData: (data: QuoteData | ((prev: QuoteData) => QuoteData)) => void;
}

export default function AuthorTab({ quoteData, setQuoteData }: AuthorTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Author Name
        </label>
        <input
          type="text"
          value={quoteData.author}
          onChange={(e) =>
            setQuoteData((prev) => ({
              ...prev,
              author: e.target.value,
            }))
          }
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
          placeholder="Enter author's name..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Role/Title
        </label>
        <input
          type="text"
          value={quoteData.role}
          onChange={(e) =>
            setQuoteData((prev) => ({
              ...prev,
              role: e.target.value,
            }))
          }
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
          placeholder="Enter author's role or title..."
        />
      </div>
    </div>
  );
}
