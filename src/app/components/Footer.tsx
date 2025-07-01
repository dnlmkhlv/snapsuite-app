import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-8">
          {/* Logo and Copyright */}
          <div className="col-span-full md:col-span-4 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <Image
                src="/snapsuite-logo.png"
                alt="SnapSuite Logo"
                width={36}
                height={36}
                className="w-9 h-9"
              />
              <span className="text-xl font-semibold text-gray-900">
                SnapSuite
              </span>
            </div>
            <div className="space-y-3 text-sm text-gray-600">
              <p>
                © {new Date().getFullYear()} SnapSuite. All rights reserved.
              </p>
              <p>
                Created by{" "}
                <a
                  href="https://daniilmikhailov.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#5170FF] hover:underline"
                >
                  Daniil
                </a>
              </p>
            </div>
          </div>

          <div className="col-span-full md:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Tools */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Tools</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-600 hover:text-[#5170FF] transition-colors"
                    >
                      Tweet Images
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/code-snippets"
                      className="text-gray-600 hover:text-[#5170FF] transition-colors"
                    >
                      Code Snippets
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/quotes"
                      className="text-gray-600 hover:text-[#5170FF] transition-colors"
                    >
                      Quote Cards
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-600 hover:text-[#5170FF] transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-600 hover:text-[#5170FF] transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-600 hover:text-[#5170FF] transition-colors"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-600 hover:text-[#5170FF] transition-colors"
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
