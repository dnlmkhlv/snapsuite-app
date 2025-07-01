"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Twitter,
  Code,
  Quote,
  Star,
  Users,
  Image as ImageIcon,
  Zap,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import Header from "./components/Header";
import { useState } from "react";

const tools = [
  {
    title: "Tweet Images",
    description:
      "Transform your tweets into beautiful, shareable images perfect for Instagram and other social media platforms.",
    icon: Twitter,
    href: "/tweet-images",
    color: "bg-blue-500",
    gradient: "from-blue-500/20 to-blue-500/5",
  },
  {
    title: "Code Snippets",
    description:
      "Create stunning images of your code snippets with syntax highlighting and customizable themes.",
    icon: Code,
    href: "/code-snippets",
    color: "bg-purple-500",
    gradient: "from-purple-500/20 to-purple-500/5",
  },
  {
    title: "Quote Cards",
    description:
      "Turn inspiring quotes into eye-catching visuals with our quote card generator.",
    icon: Quote,
    href: "/quotes",
    color: "bg-emerald-500",
    gradient: "from-emerald-500/20 to-emerald-500/5",
  },
];

const testimonials = [
  {
    content:
      "SnapSuite has completely transformed how I share content on social media. The quality and customization options are unmatched.",
    author: "Sarah Johnson",
    role: "Content Creator",
    avatar: "/avatars/avatar-1.jpg",
    rating: 5,
    platform: "Instagram",
  },
  {
    content:
      "The tweet image generator saves me hours every week. It's now an essential part of my content creation workflow.",
    author: "Michael Chen",
    role: "Digital Marketer",
    avatar: "/avatars/avatar-2.jpg",
    rating: 5,
    platform: "Twitter",
  },
  {
    content:
      "As a developer, the code snippet tool is exactly what I needed. Clean, beautiful, and highly customizable.",
    author: "Alex Rodriguez",
    role: "Software Engineer",
    avatar: "/avatars/avatar-3.jpg",
    rating: 5,
    platform: "LinkedIn",
  },
];

const stats = [
  { number: "50K+", label: "Images Created", icon: ImageIcon },
  { number: "10K+", label: "Active Users", icon: Users },
  { number: "4.9", label: "User Rating", icon: Star },
  { number: "0.5s", label: "Generation Time", icon: Zap },
];

export default function Home() {
  const [activeToolIndex, setActiveToolIndex] = useState(0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#5170FF]/5 via-transparent to-purple-500/5" />
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-100 text-sm text-gray-600 mb-8 hover:scale-105 transition-transform cursor-pointer">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5170FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5170FF]"></span>
              </span>
              <span>Trusted by 10,000+ content creators</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
            <h1 className="text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Transform Your Ideas Into{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-[#5170FF]/20 to-purple-500/20 blur-2xl" />
                <span className="relative bg-gradient-to-r from-[#5170FF] to-purple-500 bg-clip-text text-transparent">
                  Beautiful Visuals
                </span>
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Create stunning social media content in seconds. No design skills
              needed. Join thousands of creators who trust SnapSuite for their
              content creation.
            </p>
            <div className="flex items-center justify-center gap-6">
              <Link
                href="/tweet-images"
                className="group inline-flex items-center gap-2 bg-[#5170FF] text-white px-10 py-5 rounded-xl font-medium hover:bg-[#4060EE] transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                Start Creating Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#features"
                className="group inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-10 py-5 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 hover:scale-105 hover:shadow-lg border border-gray-200"
              >
                See How It Works
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Interactive Tools Preview */}
          <div className="relative mt-20">
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-80 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 blur-3xl -z-10" />
            <div className="grid md:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className={`group relative bg-white rounded-2xl transition-all duration-500 ${
                    activeToolIndex === index
                      ? "scale-105 shadow-xl ring-2 ring-[#5170FF]"
                      : "hover:shadow-xl hover:scale-102 shadow-sm"
                  }`}
                  onMouseEnter={() => setActiveToolIndex(index)}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}
                  />
                  <div className="relative p-8">
                    <div
                      className={`w-12 h-12 ${tool.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <tool.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 mb-6">{tool.description}</p>
                    <div className="flex items-center text-[#5170FF] font-medium">
                      Try Now
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center transform hover:scale-105 transition-transform cursor-pointer"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5170FF] to-[#4060EE] text-white mb-4 shadow-lg shadow-blue-500/25">
                  <stat.icon className="w-8 h-8" />
                </div>
                <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5170FF] to-[#4060EE] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#5170FF]/10 mb-6">
              <Sparkles className="w-8 h-8 text-[#5170FF]" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Crafted for Perfection
            </h2>
            <p className="text-xl text-gray-600">
              Every feature is designed to help you create stunning content that
              stands out.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/25">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Lightning Fast
              </h3>
              <p className="text-gray-600 text-center">
                Generate beautiful images in seconds with our intuitive
                interface.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-purple-500/25">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                Customizable
              </h3>
              <p className="text-gray-600 text-center">
                Personalize every aspect of your content with powerful
                customization options.
              </p>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/25">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                High Quality
              </h3>
              <p className="text-gray-600 text-center">
                Export your creations in high resolution, perfect for any
                platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5170FF]/5 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Content Creators
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied users who trust SnapSuite for their
              content creation needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 ring-4 ring-white">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      {testimonial.role}
                      <span className="inline-block w-1 h-1 rounded-full bg-gray-300" />
                      {testimonial.platform}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-[#5170FF] to-[#4060EE] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-emerald-500/20 blur-3xl" />
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-8">
            <Sparkles className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Something Amazing?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Join thousands of creators who trust SnapSuite to bring their
            content to life. Start creating beautiful visuals today.
          </p>
          <div className="flex items-center justify-center gap-6">
            <Link
              href="/tweet-images"
              className="group inline-flex items-center gap-2 bg-white text-[#5170FF] px-8 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/25"
            >
              Get Started for Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#features"
              className="group inline-flex items-center gap-2 bg-transparent text-white border border-white/30 px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Watch Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
