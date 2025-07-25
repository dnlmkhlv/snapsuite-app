import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1 mb-4 sm:mb-6">
            <Image
              src="/snapsuite-logo.png"
              alt="SnapSuite"
              width={64}
              height={64}
              quality={100}
              className="-rotate-12"
            />
            <span className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-handwriting">
              SnapSuite
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4 sm:mb-6 max-w-md px-4">
            Create beautiful visuals from your content instantly. Transform
            tweets, code snippets, quotes, and images into shareable graphics.
          </p>
          <div className="space-y-1">
            <p className="text-xs sm:text-sm text-gray-600">
              © {new Date().getFullYear()} SnapSuite. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Created by{" "}
              <a
                href="https://www.daniilmikhailov.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5170FF] hover:underline"
              >
                Daniil
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
