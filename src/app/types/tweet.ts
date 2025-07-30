export interface TweetData {
  content: string;
  username: string;
  fullName: string;
  verified: boolean;
  profilePhoto: string | null;
  nameColor: string;
  usernameColor: string;
  contentColor: string;
  verifiedColor: string;
  fontFamily: string;
  fontSize: number;
  cardTheme: "light" | "dark";
  backgroundColor: string;
  alignment: "left" | "center";
  gradientStart: string;
  gradientEnd: string;
  showBorder: boolean;
  borderStyle: "solid" | "dashed" | "dotted" | "double";
  borderWidth: number;
  borderColor: string;
  backgroundType: "solid" | "gradient" | "image";
  backgroundImage: string | null;
  backgroundOpacity: number;
  aspectRatio: "4/5" | "1/1" | "16/9" | "3/2";
  borderRadius: number;
  showWatermark: boolean;
}

export interface Theme {
  name: string;
  gradientStart: string;
  gradientEnd: string;
}

export type TabType = "text" | "style" | "profile";
