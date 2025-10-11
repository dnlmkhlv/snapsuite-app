export interface QuoteData {
  content: string;
  author: string;
  role: string;
  alignment: "left" | "center";
  gradientStart: string;
  gradientEnd: string;
  textColor: string;
  fontFamily: string;
  backgroundType: "solid" | "gradient" | "image";
  backgroundColor: string;
  showWatermark: boolean;
  aspectRatio: "4/5" | "1/1" | "16/9" | "3/2";
  fontSize: number;
  backgroundImage: string | null;
  backgroundOpacity: number;
}

export interface FontOption {
  value: string;
  label: string;
  className: string;
}

export type QuoteTabType = "content" | "style" | "author";
