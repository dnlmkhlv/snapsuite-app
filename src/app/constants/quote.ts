import { QuoteData, FontOption } from "../types/quote";

export const DEFAULT_QUOTE_DATA: QuoteData = {
  content: "The only way to do great work is to love what you do.",
  author: "Steve Jobs",
  role: "Co-founder of Apple Inc.",
  alignment: "center",
  gradientStart: "#4F46E5",
  gradientEnd: "#9333EA",
  textColor: "#ffffff",
  fontFamily: "Inter",
  backgroundType: "gradient",
  backgroundColor: "#111827",
  showWatermark: true,
  aspectRatio: "4/5",
  fontSize: 24,
  backgroundImage: null,
  backgroundOpacity: 100,
};

export const FONT_OPTIONS: FontOption[] = [
  { value: "Inter", label: "Inter", className: "font-inter" },
  { value: "Roboto", label: "Roboto", className: "font-roboto" },
  { value: "Open Sans", label: "Open Sans", className: "font-open-sans" },
  { value: "Lato", label: "Lato", className: "font-lato" },
  { value: "Poppins", label: "Poppins", className: "font-poppins" },
  { value: "Montserrat", label: "Montserrat", className: "font-montserrat" },
];

export const MAX_QUOTE_LENGTH = 280;

export const TAB_CONFIG = [
  {
    id: "content" as const,
    label: "Content",
    icon: "Quote",
  },
  {
    id: "style" as const,
    label: "Style",
    icon: "Palette",
  },
  {
    id: "author" as const,
    label: "Author",
    icon: "User",
  },
] as const;
