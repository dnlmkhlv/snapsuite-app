import {
  CodeData,
  EditorThemes,
  Theme,
  LanguageOption,
  ThemeOption,
} from "../types/code";

export const DEFAULT_CODE_DATA: CodeData = {
  content: 'function hello() {\n  console.log("Hello, World!");\n}',
  language: "javascript",
  theme: "nord",
  showLineNumbers: true,
  windowStyle: "mac",
  windowTitle: "script.js",
  backgroundColor: "#F97316",
  backgroundType: "gradient",
  gradientStart: "#F97316",
  gradientEnd: "#DB2777",
  backgroundImage: null,
  backgroundOpacity: 1,
  showWatermark: true,
};

export const EDITOR_THEMES: EditorThemes = {
  "github-dark": {
    name: "GitHub Dark",
    background: "#0d1117",
    text: "#c9d1d9",
    comment: "#8b949e",
    keyword: "#ff7b72",
    string: "#a5d6ff",
    number: "#79c0ff",
    function: "#d2a8ff",
    operator: "#ff7b72",
    variable: "#ffa657",
  },
  "github-light": {
    name: "GitHub Light",
    background: "#ffffff",
    text: "#24292f",
    comment: "#6e7781",
    keyword: "#cf222e",
    string: "#0a3069",
    number: "#0550ae",
    function: "#8250df",
    operator: "#cf222e",
    variable: "#953800",
  },
  monokai: {
    name: "Monokai",
    background: "#272822",
    text: "#f8f8f2",
    comment: "#75715e",
    keyword: "#f92672",
    string: "#e6db74",
    number: "#ae81ff",
    function: "#66d9ef",
    operator: "#f92672",
    variable: "#fd971f",
  },
  dracula: {
    name: "Dracula",
    background: "#282a36",
    text: "#f8f8f2",
    comment: "#6272a4",
    keyword: "#ff79c6",
    string: "#f1fa8c",
    number: "#bd93f9",
    function: "#50fa7b",
    operator: "#ff79c6",
    variable: "#ffb86c",
  },
  nord: {
    name: "Nord",
    background: "#2e3440",
    text: "#d8dee9",
    comment: "#4c566a",
    keyword: "#81a1c1",
    string: "#a3be8c",
    number: "#b48ead",
    function: "#88c0d0",
    operator: "#81a1c1",
    variable: "#d8dee9",
  },
  "one-dark": {
    name: "One Dark",
    background: "#282c34",
    text: "#abb2bf",
    comment: "#5c6370",
    keyword: "#c678dd",
    string: "#98c379",
    number: "#d19a66",
    function: "#61afef",
    operator: "#56b6c2",
    variable: "#e06c75",
  },
};

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
  { value: "sql", label: "SQL" },
  { value: "shell", label: "Shell/Bash" },
  { value: "html", label: "HTML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "yaml", label: "YAML" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "markdown", label: "Markdown" },
];

export const BACKGROUND_THEMES: Theme[] = [
  {
    name: "Minimal",
    gradientStart: "#ffffff",
    gradientEnd: "#ffffff",
  },
  {
    name: "Dark",
    gradientStart: "#1E293B",
    gradientEnd: "#0F172A",
  },
  {
    name: "Ocean",
    gradientStart: "#0EA5E9",
    gradientEnd: "#2563EB",
  },
  {
    name: "Sunset",
    gradientStart: "#F97316",
    gradientEnd: "#DB2777",
  },
  {
    name: "Forest",
    gradientStart: "#22C55E",
    gradientEnd: "#15803D",
  },
  {
    name: "Purple Haze",
    gradientStart: "#A855F7",
    gradientEnd: "#6366F1",
  },
];

export const THEME_OPTIONS: ThemeOption[] = Object.entries(EDITOR_THEMES).map(
  ([value, theme]) => ({
    value,
    label: theme.name,
  })
);

export const TAB_CONFIG = [
  {
    id: "code" as const,
    label: "Code",
    icon: "Code",
  },
  {
    id: "style" as const,
    label: "Style",
    icon: "Palette",
  },
  {
    id: "window" as const,
    label: "Window",
    icon: "Monitor",
  },
] as const;
