import Header from "../components/Header";
import { Mail, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>

          <div className="space-y-6">
            <p className="text-gray-600">
              Have a question or feedback? We'd love to hear from you. Fill out
              the form below and we'll get back to you as soon as possible.
            </p>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300"
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5170FF] focus:border-transparent bg-gray-50 text-gray-900 transition-all placeholder:text-gray-400 hover:border-gray-300 resize-none"
                  placeholder="Your message..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#5170FF] text-white py-4 px-6 rounded-xl font-medium hover:bg-[#5170FF]/90 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-5 h-5 text-[#5170FF]" />
                <span>Or email us directly at: </span>
                <a
                  href="mailto:support@snapsuite.com"
                  className="text-[#5170FF] hover:underline"
                >
                  support@snapsuite.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
