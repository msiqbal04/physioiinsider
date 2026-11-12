"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, Search, Activity, Brain, 
  HeartPulse, Bone, Stethoscope, Dumbbell, Baby, 
  Microscope, ArrowRight, PlayCircle, BookOpen
} from "lucide-react";

export default function CourseCatalogPage() {
  const [activeTab, setActiveTab] = useState<"BPT" | "MPT">("BPT");
  const [searchQuery, setSearchQuery] = useState("");

  // BPT Year-wise Curriculum Data
  const bptCurriculum = [
    {
      year: "1st Year (Pre-Clinical)",
      subjects: [
        { name: "Human Anatomy", slug: "human-anatomy", icon: Bone, modules: 12, mcqs: 350 },
        { name: "Human Physiology", slug: "human-physiology", icon: HeartPulse, modules: 10, mcqs: 280 },
        { name: "Clinical Biochemistry", slug: "biochemistry", icon: Microscope, modules: 6, mcqs: 150 },
      ]
    },
    {
      year: "2nd Year (Para-Clinical)",
      subjects: [
        { name: "Biomechanics & Kinesiology", slug: "biomechanics", icon: Activity, modules: 14, mcqs: 420 },
        { name: "Exercise Therapy", slug: "exercise-therapy", icon: Dumbbell, modules: 15, mcqs: 400 },
        { name: "Electrotherapy", slug: "electrotherapy", icon: Activity, modules: 12, mcqs: 320 },
        { name: "Pathology & Microbiology", slug: "pathology", icon: Microscope, modules: 8, mcqs: 200 },
      ]
    },
    {
      year: "3rd Year (Clinical)",
      subjects: [
        { name: "Orthopaedics & Traumatology", slug: "orthopaedics", icon: Bone, modules: 16, mcqs: 450 },
        { name: "Neurology & Neurosurgery", slug: "neurology", icon: Brain, modules: 14, mcqs: 380 },
        { name: "Clinical Assessment", slug: "clinical-assessment", icon: Stethoscope, modules: 8, mcqs: 180 },
      ]
    },
    {
      year: "4th Year (Advanced PT)",
      subjects: [
        { name: "PT in Orthopaedics", slug: "pt-orthopaedics", icon: Bone, modules: 18, mcqs: 500 },
        { name: "PT in Neurology", slug: "pt-neurology", icon: Brain, modules: 16, mcqs: 480 },
        { name: "PT in Cardiopulmonary", slug: "pt-cardio", icon: HeartPulse, modules: 12, mcqs: 350 },
        { name: "Sports Physiotherapy", slug: "sports-pt", icon: Dumbbell, modules: 10, mcqs: 220 },
      ]
    }
  ];

  // MPT Specialization Data
  const mptCurriculum = [
    {
      year: "Musculoskeletal & Sports",
      subjects: [
        { name: "Advanced Biomechanics", slug: "adv-biomechanics", icon: Activity, modules: 12, mcqs: 300 },
        { name: "Manual Therapy Techniques", slug: "manual-therapy", icon: Bone, modules: 15, mcqs: 450 },
        { name: "Sports Injury Rehab", slug: "sports-rehab", icon: Dumbbell, modules: 14, mcqs: 380 },
      ]
    },
    {
      year: "Neurological Rehabilitation",
      subjects: [
        { name: "Adult Neuro-rehabilitation", slug: "neuro-rehab", icon: Brain, modules: 16, mcqs: 420 },
        { name: "Paediatric Neurology", slug: "paediatric-neuro", icon: Baby, modules: 10, mcqs: 250 },
      ]
    }
  ];

  const currentCurriculum = activeTab === "BPT" ? bptCurriculum : mptCurriculum;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* 1. HEADER (Clean Medical White) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/student/dashboard" className="p-2.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-blue-50 hover:text-blue-700 transition-colors">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <span className="text-[10px] font-bold text-teal-600 uppercase tracking-widest block">Medical Library</span>
              <h1 className="text-sm font-bold text-slate-900">Academic Curriculum</h1>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MEDICAL HERO SECTION (Deep Blue Gradient) */}
      <div className="bg-linear-to-r from-blue-950 via-blue-900 to-slate-900 pb-16 pt-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Abstract Medical Background Pattern (Subtle) */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="medical-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#medical-grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl text-white">
              <div className="inline-flex items-center space-x-2 bg-blue-800/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-700/50 mb-4">
                <Stethoscope size={14} className="text-teal-400" />
                <span className="text-xs font-bold text-blue-100 tracking-wide">Evidence-Based Learning</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
                Master Clinical <br/><span className="text-teal-400">Physiotherapy</span>
              </h1>
              <p className="text-sm text-blue-200 mt-4 leading-relaxed max-w-lg">
                Explore year-wise structured clinical modules, practical assessments, and standard anatomical MCQs tailored for BPT & MPT.
              </p>
            </div>

            {/* Search Bar - Glassmorphism */}
            <div className="w-full lg:w-100 relative">
              <Search className="absolute left-4 top-4 text-blue-300" size={18} />
              <input
                type="text"
                placeholder="Search anatomy, neurology, modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-sm text-white focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder-slate-400 transition-all shadow-lg placeholder:text-blue-200/70"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. BPT / MPT TOGGLE (Floating over hero) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="inline-flex items-center bg-white p-1.5 rounded-2xl shadow-md border border-slate-200">
          <button
            onClick={() => setActiveTab("BPT")}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "BPT"
                ? "bg-blue-900 text-white shadow-sm"
                : "text-slate-500 hover:text-blue-900 hover:bg-blue-50"
            }`}
          >
            BPT Program
          </button>
          <button
            onClick={() => setActiveTab("MPT")}
            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all ${
              activeTab === "MPT"
                ? "bg-blue-900 text-white shadow-sm"
                : "text-slate-500 hover:text-blue-900 hover:bg-blue-50"
            }`}
          >
            MPT Specializations
          </button>
        </div>
      </div>

      {/* 4. COURSE SECTIONS (YEAR-WISE) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">
        
        {currentCurriculum.map((section, index) => (
          <div key={index} className="animate-fadeIn">
            
            {/* Year Header with Medical Accent */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-2 h-6 bg-teal-500 rounded-full"></div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
                {section.year}
              </h2>
              <div className="h-px bg-slate-200 flex-1 mt-1"></div>
            </div>

            {/* Subjects Grid (3D Enhanced Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.subjects
                .filter((sub) => sub.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((subject, subIndex) => (
                <Link 
                  href={`/student/courses/${subject.slug}`} 
                  key={subIndex}
                  className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-blue-200 transition-all duration-300 group flex flex-col justify-between h-full relative overflow-hidden"
                >
                  {/* Top Right Decorative Circle */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 text-blue-900 flex items-center justify-center mb-5 group-hover:bg-blue-900 group-hover:text-white transition-all duration-300 shadow-sm">
                      <subject.icon size={26} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug mb-3 group-hover:text-blue-900 transition-colors">
                      {subject.name}
                    </h3>
                  </div>

                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Syllabus</span>
                      <span className="text-xs font-semibold text-slate-700 flex items-center space-x-1">
                        <PlayCircle size={12} className="text-teal-600" />
                        <span>{subject.modules} Units</span>
                        <span className="text-slate-300 mx-1">|</span>
                        <span className="text-blue-700">{subject.mcqs} MCQs</span>
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-700 transition-colors">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        ))}

        {/* Fallback for Empty Search */}
        {currentCurriculum.every(section => 
          section.subjects.filter(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0
        ) && (
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-200 shadow-sm">
            <BookOpen size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No clinical subjects found</h3>
            <p className="text-sm text-slate-500 mt-2">Try adjusting your search keywords (e.g., Anatomy, Neuro).</p>
          </div>
        )}

      </div>
    </div>
  );
}