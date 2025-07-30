import { ImageData, Filter } from "../types/image";

export const DEFAULT_IMAGE_DATA: ImageData = {
  image: null,
  imageFileName: undefined,
  text: "",
  textColor: "#ffffff",
  fontSize: "24px",
  textPosition: "bottom",
  filter: "none",
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
};

export const FILTERS: Filter[] = [
  { name: "None", value: "none" },
  { name: "Grayscale", value: "grayscale(100%)" },
  { name: "Sepia", value: "sepia(100%)" },
  { name: "Vintage", value: "sepia(50%) contrast(85%) brightness(90%)" },
  { name: "Dramatic", value: "contrast(120%) saturate(110%)" },
  { name: "Cool", value: "saturate(80%) hue-rotate(20deg)" },
  { name: "Warm", value: "saturate(120%) hue-rotate(-10deg)" },
];

export const MAX_TEXT_LENGTH = 280;

export const TAB_CONFIG = [
  {
    id: "image" as const,
    label: "Image",
    icon: "ImageIcon",
  },
  {
    id: "text" as const,
    label: "Text",
    icon: "Type",
  },
  {
    id: "effects" as const,
    label: "Effects",
    icon: "Palette",
  },
] as const;
