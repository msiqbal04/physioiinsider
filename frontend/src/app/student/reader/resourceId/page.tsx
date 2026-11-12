"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Download, ZoomIn, ZoomOut, Bookmark, Share2, MoreHorizontal } from "lucide-react";

export default function DocumentReaderPage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(3);
  const totalPages = 24;
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col justify-between max-w-xl mx-auto">
      {/* Top App Bar */}
      <header className="p-4 bg-white border-b border-border-light flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <button onClick={() => router.back()} className="text-forest-950 hover:text-forest-800">
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-xs font-bold text-forest-950">Anatomy Notes.pdf</h1>
            <p className="text-[10px] text-secondary-text">2.4 MB</p>
          </div>
        </div>

        <button className="flex items-center space-x-1 bg-forest-800 text-white px-3 py-1.5 rounded-full text-[11px] font-semibold hover:bg-forest-900 transition-colors">
          <Download size={13} />
          <span>Download</span>
        </button>
      </header>

      {/* PDF Viewport Canvas */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-card border border-border-light p-4 flex flex-col items-center">
          {/* Anatomical Diagram Area */}
          <div
            className="w-full h-80 rounded-xl bg-cream-50 border border-border-light flex items-center justify-center overflow-hidden transition-transform duration-200"
            style={{ transform: `scale(${zoomLevel / 100})` }}
          >
            <div className="text-center p-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-sage-100 flex items-center justify-center text-forest-800 font-serif font-black text-4xl mb-3">
                🦵
              </div>
              <p className="text-xs font-bold text-forest-950">Knee Joint: Patellar Ligament & Condyles</p>
              <p className="text-[10px] text-secondary-text mt-1">Figure 4.2 — Musculoskeletal Structural Plate</p>
            </div>
          </div>

          {/* Page Pill Counter */}
          <div className="mt-4 bg-cream-100 px-4 py-1 rounded-full text-xs font-bold text-forest-950 border border-border-light">
            {currentPage} / {totalPages}
          </div>
        </div>
      </main>

      {/* Bottom Floating Control Bar */}
      <footer className="p-4 bg-white border-t border-border-light flex items-center justify-around shadow-soft">
        <button
          onClick={() => setZoomLevel((prev) => (prev > 80 ? prev - 10 : prev))}
          className="flex flex-col items-center text-secondary-text hover:text-forest-950"
        >
          <ZoomOut size={18} />
          <span className="text-[10px] mt-1">Zoom Out</span>
        </button>

        <button
          onClick={() => setZoomLevel((prev) => (prev < 130 ? prev + 10 : prev))}
          className="flex flex-col items-center text-secondary-text hover:text-forest-950"
        >
          <ZoomIn size={18} />
          <span className="text-[10px] mt-1">Zoom In</span>
        </button>

        <button
          onClick={() => setIsBookmarked(!isBookmarked)}
          className={`flex flex-col items-center ${
            isBookmarked ? "text-accent-warm" : "text-secondary-text hover:text-forest-950"
          }`}
        >
          <Bookmark size={18} className={isBookmarked ? "fill-accent-warm" : ""} />
          <span className="text-[10px] mt-1">Bookmark</span>
        </button>

        <button className="flex flex-col items-center text-secondary-text hover:text-forest-950">
          <Share2 size={18} />
          <span className="text-[10px] mt-1">Share</span>
        </button>

        <button className="flex flex-col items-center text-secondary-text hover:text-forest-950">
          <MoreHorizontal size={18} />
          <span className="text-[10px] mt-1">More</span>
        </button>
      </footer>
    </div>
  );
}