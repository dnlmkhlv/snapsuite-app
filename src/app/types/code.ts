export interface CodeData {
  content: string;
  language: string;
  theme: string;
  showLineNumbers: boolean;
  windowStyle: "mac" | "windows" | "none";
  windowTitle: string;
  backgroundColor: string;
  backgroundType: "solid" | "gradient" | "image";
  gradientStart: string;
  gradientEnd: string;
  backgroundImage: string | null;
  backgroundOpacity: number;
  showWatermark: boolean;
}

export interface ThemeColors {
  name: string;
  background: string;
  text: string;
  comment: string;
  keyword: string;
  string: string;
  number: string;
  function: string;
  operator: string;
  variable: string;
  [key: string]: string;
}

export interface EditorThemes {
  [key: string]: ThemeColors;
}

export interface Theme {
  name: string;
  gradientStart: string;
  gradientEnd: string;
}

export interface LanguageOption {
  value: string;
  label: string;
}

export interface ThemeOption {
  value: string;
  label: string;
}

export type CodeTabType = "code" | "style" | "window";
