import Image from "next/image";

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
            <span className="text-lg sm:text-xl font-semibold text-black">
              SnapSuite
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-4 sm:mb-6 max-w-md px-4">
            Create beautiful visuals from your content instantly. Transform
            tweets, code snippets, and quotes into shareable graphics.
          </p>

          {/* Contribute Section */}
          <div className="mb-4 sm:mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200 max-w-md">
            <p className="text-sm text-gray-700 mb-3">
              SnapSuite is open source! <br />
              Help us improve by contributing to the project.
            </p>
            <a
              href="https://github.com/dnlmkhlv/snapsuite-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              Contribute on GitHub
            </a>
          </div>

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
