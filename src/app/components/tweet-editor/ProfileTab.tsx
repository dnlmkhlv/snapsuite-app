"use client";

interface TweetData {
  content: string;
  fontFamily: string;
  fontSize: number;
  alignment: "left" | "center";
  username: string;
  fullName: string;
  verified: boolean;
  profilePhoto: string | null;
  nameColor: string;
  usernameColor: string;
  contentColor: string;
  verifiedColor: string;
  cardTheme: "light" | "dark";
  backgroundColor: string;
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

interface ProfileTabProps {
  tweetData: TweetData;
  setTweetData: (data: TweetData | ((prev: TweetData) => TweetData)) => void;
}

export default function ProfileTab({
  tweetData,
  setTweetData,
}: ProfileTabProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTweetData((prev) => ({
          ...prev,
          profilePhoto: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={tweetData.fullName}
          onChange={(e) =>
            setTweetData((prev) => ({
              ...prev,
              fullName: e.target.value,
            }))
          }
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Username
        </label>
        <input
          type="text"
          value={tweetData.username}
          onChange={(e) =>
            setTweetData((prev) => ({
              ...prev,
              username: e.target.value.replace("@", ""),
            }))
          }
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="verified"
          checked={tweetData.verified || false}
          onChange={(e) =>
            setTweetData((prev) => ({
              ...prev,
              verified: e.target.checked,
            }))
          }
          className="w-4 h-4 text-[#5170FF] border-gray-300 rounded focus:ring-[#5170FF]"
        />
        <label
          htmlFor="verified"
          className="text-sm font-medium text-gray-700 flex items-center gap-2"
        >
          Show Verified Badge
        </label>
      </div>
      {tweetData.verified && (
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Badge Color
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={tweetData.verifiedColor}
              onChange={(e) =>
                setTweetData((prev) => ({
                  ...prev,
                  verifiedColor: e.target.value,
                }))
              }
              className="flex-1 p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900"
            />
            <div className="w-12 h-12 relative">
              <input
                type="color"
                value={tweetData.verifiedColor}
                onChange={(e) =>
                  setTweetData((prev) => ({
                    ...prev,
                    verifiedColor: e.target.value,
                  }))
                }
                className="absolute inset-0 opacity-0 cursor-pointer z-10"
              />
              <div
                className="w-full h-full rounded-xl border border-gray-200"
                style={{ backgroundColor: tweetData.verifiedColor }}
              />
            </div>
          </div>
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#5170FF] file:text-white hover:file:bg-[#4060EE] text-gray-900"
        />
      </div>
    </div>
  );
}
