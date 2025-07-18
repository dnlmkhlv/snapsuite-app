"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Code, Quote, Image } from "lucide-react";

export default function TabNav() {
  const pathname = usePathname();

  const tabs = [
    {
      name: "Tweets",
      href: "/tweet-images",
      icon: MessageSquare,
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
    {
      name: "Images",
      href: "/images",
      icon: Image,
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = pathname === tab.href;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-3 sm:py-4 font-medium transition-colors relative text-sm sm:text-base ${
                  isActive
                    ? "text-[#5170FF]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.name}</span>
                <span className="sm:hidden">{tab.name.slice(0, 1)}</span>
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
