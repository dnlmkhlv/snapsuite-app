"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Twitter, Code, Quote } from "lucide-react";

const tabs = [
  {
    name: "Tweets",
    href: "/tweet-images",
    icon: Twitter,
  },
  {
    name: "Code",
    href: "/code-snippets",
    icon: Code,
  },
  {
    name: "Quotes",
    href: "/quotes",
    icon: Quote,
  },
];

export default function TabNav() {
  const pathname = usePathname();

  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors relative ${
                  isActive
                    ? "text-[#5170FF]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5170FF]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
