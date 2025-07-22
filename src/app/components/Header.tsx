"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-4 sm:py-6">
          <Link href="/" className="flex flex-col items-center">
            <div className="flex items-center gap-2 sm:gap-3 mb-1">
              <Image
                src="/snapsuite-logo.png"
                alt="SnapSuite"
                width={64}
                height={64}
                quality={100}
                className="-rotate-12"
              />
              <span className="text-lg sm:text-2xl font-semibold text-gray-800">
                SnapSuite
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 text-center">
              Turning content into beautiful visuals, instantly.
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}
