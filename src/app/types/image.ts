export interface ImageData {
  image: string | null;
  imageFileName?: string;
  text: string;
  textColor: string;
  fontSize: string;
  textPosition: "top" | "center" | "bottom";
  filter: string;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
}

export interface Filter {
  name: string;
  value: string;
}

export type ImageTabType = "image" | "text" | "effects";
