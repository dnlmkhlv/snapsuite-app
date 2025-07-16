"use client";

import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Link href="/" className="flex items-center justify-center gap-4">
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
        </Link>
      </div>
    </header>
  );
}
