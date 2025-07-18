"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-center py-6">
          <Link href="/" className="flex flex-col items-center">
            <div className="flex items-center gap-1 mb-1">
              <Image
                src="/snapsuite-logo.png"
                alt="SnapSuite"
                width={40}
                height={40}
                className="w-16 h-16 -rotate-12"
              />
              <span className="text-2xl font-semibold text-gray-800">
                SnapSuite
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Turning content into beautiful visuals, instantly.
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}
