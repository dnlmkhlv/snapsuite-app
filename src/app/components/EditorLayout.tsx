import { ReactNode } from "react";
import { Download } from "lucide-react";

interface EditorLayoutProps {
  toolsPanel: ReactNode;
  preview: ReactNode;
  onDownload: () => void;
}

export default function EditorLayout({
  toolsPanel,
  preview,
  onDownload,
}: EditorLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
          {/* Tools Panel - Left Side */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            {/* Toolbar */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200/50 backdrop-blur-sm">
              {toolsPanel}

              {/* Download Button */}
              <div className="p-4 sm:p-5 border-t">
                <button
                  onClick={onDownload}
                  className="w-full flex items-center justify-center gap-2 bg-[#5170FF] text-white px-4 sm:px-6 py-2.5 rounded-xl font-medium hover:bg-[#4060EE] transition-colors text-sm sm:text-base"
                >
                  <Download className="w-4 h-4" />
                  Download Image
                </button>
              </div>
            </div>
          </div>

          {/* Preview Area - Right Side */}
          <div className="lg:col-span-7 order-1 lg:order-2 lg:sticky lg:top-4">
            <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 border border-gray-200/50 backdrop-blur-sm">
              {preview}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
