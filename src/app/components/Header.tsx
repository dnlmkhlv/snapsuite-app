"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [stars, setStars] = useState(0);
  const [hasStarred, setHasStarred] = useState(false);

  useEffect(() => {
    const savedStars = localStorage.getItem("snapsuiteStars");
    const userHasStarred = localStorage.getItem("snapsuiteHasStarred");
    if (savedStars) {
      setStars(parseInt(savedStars));
    }
    if (userHasStarred === "true") {
      setHasStarred(true);
    }
  }, []);

  const handleStarClick = () => {
    if (!hasStarred) {
      const newStarCount = stars + 1;
      setStars(newStarCount);
      setHasStarred(true);
      localStorage.setItem("snapsuiteStars", newStarCount.toString());
      localStorage.setItem("snapsuiteHasStarred", "true");
    }
  };

  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/snapsuite-logo.png"
              alt="SnapSuite Logo"
              width={100}
              height={28}
              className="object-contain"
              priority
            />
            <div>
              <h1 className="text-4xl font-black font-montserrat">
                <span className="text-[#5170FF]">Snap</span>
                <span className="text-[#5170FF] opacity-80">Suite</span>
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                Turn content into visuals, instantly.
              </p>
            </div>
          </div>

          <button
            onClick={handleStarClick}
            disabled={hasStarred}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all
              ${
                hasStarred
                  ? "bg-gray-50 border-gray-200 cursor-default"
                  : "border-gray-300 hover:border-gray-400 hover:bg-gray-50 active:bg-gray-100"
              }`}
          >
            <Star
              className={`w-5 h-5 transition-colors ${hasStarred ? "text-yellow-400" : "text-gray-600"}`}
              fill={hasStarred ? "currentColor" : "none"}
            />
            <span
              className={`text-sm font-medium ${hasStarred ? "text-gray-500" : "text-gray-700"}`}
            >
              {stars} {stars === 1 ? "star" : "stars"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
