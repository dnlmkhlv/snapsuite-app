import { TweetData } from "../types/tweet";

export const DEFAULT_TWEET_DATA: TweetData = {
  content:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  username: "johndoe",
  fullName: "John Doe",
  verified: false,
  profilePhoto: null,
  nameColor: "#000000",
  usernameColor: "#4B5563", // gray-600
  contentColor: "#000000",
  verifiedColor: "#1D9BF0",
  fontFamily: "Inter",
  cardTheme: "light",
  backgroundColor: "#ffffff",
  alignment: "left",
  gradientStart: "#ffffff",
  gradientEnd: "#ffffff",
  showBorder: false,
  borderStyle: "solid",
  borderWidth: 1,
  borderColor: "#e5e7eb", // gray-200
  backgroundType: "gradient",
  aspectRatio: "4/5",
  borderRadius: 12,
  fontSize: 16,
  backgroundImage: null,
  backgroundOpacity: 1,
  showWatermark: true,
};

export const TAB_CONFIG = [
  {
    id: "text" as const,
    label: "Text",
    icon: "Type",
  },
  {
    id: "style" as const,
    label: "Style",
    icon: "Palette",
  },
  {
    id: "profile" as const,
    label: "Profile",
    icon: "User",
  },
] as const;
