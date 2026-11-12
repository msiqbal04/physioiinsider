"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, PlayCircle, FileText, CheckSquare, BookOpen, UserCheck, 
  Brain, Download, Activity, ExternalLink, ShieldCheck 
} from "lucide-react";

export default function ClinicalLessonPlayer() {
  const [activeTab, setActiveTab] = useState("video");

  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#142420] flex flex-col">
      {/* Navbar */}
      <header className="bg-white border-b border-[#E3E8E0] px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center space-x-4">
          <Link href="/student/dashboard" className="p-2 rounded-full hover:bg-[#FAF9F5] border border-[#E3E8E0]">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <span className="text-[10px] font-bold text-[#58816B] uppercase tracking-wider">Orthopedic Assessment • Unit 3</span>
            <h1 className="text-sm font-bold text-[#142420]">Knee Joint: Special Tests & Clinical Reasoning</h1>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[10px] font-bold text-[#145B46] bg-[#E8F0E8] px-3 py-1.5 rounded-full">
          <ShieldCheck size={14} />
          <span>Reviewed by Qualified Physiotherapists</span>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Viewer Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Media Player / Content Area */}
          <div className="bg-black w-full rounded-2xl aspect-video relative flex items-center justify-center overflow-hidden shadow-md">
            {activeTab === "video" ? (
              <div className="text-center text-white">
                <PlayCircle size={64} className="mx-auto text-[#8EAF9F] mb-4 opacity-80 cursor-pointer hover:opacity-100 hover:scale-110 transition-all" />
                <p className="text-sm font-semibold">Step-by-step Demonstration: Lachman Test[cite: 4]</p>
              </div>
            ) : activeTab === "practical" ? (
              <div className="bg-white w-full h-full p-8 text-[#142420] overflow-y-auto">
                <h2 className="text-xl font-bold border-b pb-2 mb-4">Practical Skills: Knee Assessment[cite: 5]</h2>
                <ul className="space-y-4 text-sm">
                  <li><strong>Muscle Testing (MMT):</strong> Quadriceps & Hamstrings grading criteria against gravity[cite: 5].</li>
                  <li><strong>Range of Motion (ROM):</strong> Normal knee flexion (135°) using goniometer axis at lateral epicondyle[cite: 5].</li>
                  <li><strong>Gait Analysis:</strong> Identifying stiff-knee gait post-ACL reconstruction[cite: 5].</li>
                </ul>
              </div>
            ) : activeTab === "cases" ? (
              <div className="bg-[#FAF9F5] w-full h-full p-8 text-[#142420] overflow-y-auto">
                <h2 className="text-xl font-bold border-b pb-2 mb-4 text-[#C8492F]">Case-Based Clinical Reasoning[cite: 4]</h2>
                <div className="bg-white p-4 rounded-xl border border-[#E3E8E0]">
                  <p className="font-semibold text-sm">Case Vignette:</p>
                  <p className="text-xs text-[#6E756F] mt-1">A 22-year-old footballer presents with a "pop" sound during deceleration. Swelling occurred within 2 hours. Which test is most specific?</p>
                  <div className="mt-4 space-y-2">
                    <button className="w-full text-left p-3 rounded-lg border border-[#E3E8E0] text-xs hover:bg-[#E8F0E8]">A) Anterior Drawer Test</button>
                    <button className="w-full text-left p-3 rounded-lg border-[#145B46] bg-[#E8F0E8] text-xs font-bold text-[#145B46]">B) Lachman Test (Correct)</button>
                  </div>
                </div>
              </div>
            ) : (
               <div className="bg-white w-full h-full p-8 flex flex-col items-center justify-center text-[#142420]">
                <FileText size={48} className="text-[#145B46] mb-4" />
                <h2 className="text-lg font-bold">One-Page Revision Notes & Mnemonics[cite: 4]</h2>
                <button className="mt-4 px-4 py-2 bg-[#145B46] text-white rounded-full text-xs font-bold flex items-center space-x-2">
                  <Download size={14} /> <span>Download PDF</span>
                </button>
              </div>
            )}
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex overflow-x-auto space-x-2 bg-white p-2 rounded-2xl border border-[#E3E8E0] shadow-sm">
            {[
              { id: "video", icon: PlayCircle, label: "Videos & Diagrams" },
              { id: "notes", icon: FileText, label: "Unit-wise Notes" },
              { id: "practical", icon: Activity, label: "MMT & ROM Skills" },
              { id: "cases", icon: Brain, label: "Clinical Reasoning" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTab === tab.id ? "bg-[#145B46] text-white" : "text-[#6E756F] hover:bg-[#FAF9F5]"
                }`}
              >
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Study Resources (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* PYQs & Viva Questions[cite: 3] */}
          <div className="bg-white p-5 rounded-3xl border border-[#E3E8E0] shadow-sm">
            <h3 className="text-sm font-bold text-[#142420] flex items-center space-x-2 mb-4">
              <CheckSquare size={16} className="text-[#145B46]" />
              <span>Exam Preparation</span>
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E8E0] hover:border-[#8EAF9F]">
                <span className="text-xs font-semibold text-[#142420]">Previous Year Question Papers (PYQs)[cite: 3]</span>
                <Download size={14} className="text-[#145B46]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E8E0] hover:border-[#8EAF9F]">
                <span className="text-xs font-semibold text-[#142420]">Practical files aur viva questions[cite: 3]</span>
                <ExternalLink size={14} className="text-[#145B46]" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-xl bg-[#FAF9F5] border border-[#E3E8E0] hover:border-[#8EAF9F]">
                <span className="text-xs font-semibold text-[#142420]">Important Definitions & Tricks[cite: 4]</span>
                <BookOpen size={14} className="text-[#145B46]" />
              </button>
            </div>
          </div>

          {/* Reference Books[cite: 3] */}
          <div className="bg-white p-5 rounded-3xl border border-[#E3E8E0] shadow-sm">
             <h3 className="text-sm font-bold text-[#142420] flex items-center space-x-2 mb-3">
              <BookOpen size={16} className="text-[#C98A2E]" />
              <span>Topic-wise Reference Books[cite: 3]</span>
            </h3>
            <ul className="space-y-2 text-xs text-[#6E756F]">
              <li>• Magee: Orthopedic Physical Assessment (Ch 12)</li>
              <li>• Norkin & White: Measurement of Joint Motion</li>
            </ul>
          </div>

          <button className="w-full py-3.5 bg-[#145B46] text-white rounded-full text-xs font-bold shadow-md hover:bg-[#12453A]">
            Mark Topic as Completed
          </button>
        </div>

      </main>
    </div>
  );
}