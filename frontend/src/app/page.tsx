"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  Brain,
  CheckCircle,
  Award,
  ArrowRight,
  Sparkles,
  Users,
  ShieldCheck,
  Star,
  Activity,
  Layers,
  ChevronRight
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F4EF] text-[#142420] flex flex-col justify-between">
      
      {/* 1. TOP HEADER / NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E3E8E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#E8F0E8] flex items-center justify-center text-[#145B46]">
              <svg
                className="w-6 h-6 text-[#145B46]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="17" cy="4" r="2" />
                <path d="m15 8-4.5 3-3-1.5L4 13" />
                <path d="M12 11l1 4 4.5 1.5" />
                <path d="M11 17l-3 4-3.5-1" />
              </svg>
            </div>
            <div>
              <span className="text-lg font-bold font-serif text-[#142420] tracking-tight block leading-none">
                Physioiinsider
              </span>
              <span className="text-[10px] text-[#58816B] font-semibold uppercase tracking-wider">
                Physiotherapy Education
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-xs font-semibold text-[#6E756F]">
            <Link href="/student/study" className="hover:text-[#145B46] transition-colors">Courses</Link>
            <Link href="/student/mcqs" className="hover:text-[#145B46] transition-colors">MCQ Bank</Link>
            <Link href="/student/flashcards" className="hover:text-[#145B46] transition-colors">Flashcards</Link>
            <Link href="/student/planner" className="hover:text-[#145B46] transition-colors">Study Planner</Link>
            <Link href="/student/ai-tutor" className="hover:text-[#145B46] transition-colors">AI Clinical Tutor</Link>
            <Link href="/student/community" className="hover:text-[#145B46] transition-colors">Community</Link>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/auth/login"
              className="px-5 py-2.5 rounded-full text-xs font-semibold text-[#145B46] border border-[#E3E8E0] hover:bg-[#FAF9F5] transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-[#145B46] hover:bg-[#12453A] text-white shadow-sm transition-all"
            >
              Get Started
            </Link>
          </div>

        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#E8F0E8] border border-[#8EAF9F]/40 text-[#145B46] text-xs font-bold mb-6">
            <Sparkles size={14} />
            <span>Structured for BPT, MPT & Competitive Physiotherapy Exams</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold font-serif text-[#142420] tracking-tight leading-[1.15]">
            Master Clinical Physiotherapy with Evidence-Based Precision.
          </h1>

          <p className="mt-6 text-sm sm:text-base text-[#6E756F] max-w-2xl mx-auto leading-relaxed">
            The complete academic platform for physiotherapy students. In-depth biomechanics modules, high-yield clinical MCQs, interactive 3D flashcards, and an AI clinical assistant tailored to standard university curriculums.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/student/study"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#145B46] hover:bg-[#12453A] text-white text-xs font-bold transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <span>Explore All Subjects</span>
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/student/mcqs"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white border border-[#E3E8E0] hover:bg-[#FAF9F5] text-[#142420] text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <CheckCircle size={16} className="text-[#145B46]" />
              <span>Practice Free Daily MCQs</span>
            </Link>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-14 pt-10 border-t border-[#E3E8E0]/70 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#142420]">20+</div>
              <div className="text-xs text-[#6E756F] mt-1">Core Clinical Subjects</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#142420]">1,500+</div>
              <div className="text-xs text-[#6E756F] mt-1">Vignette & High-Yield MCQs</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#142420]">98.4%</div>
              <div className="text-xs text-[#6E756F] mt-1">Syllabus Exam Alignment</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold font-serif text-[#142420]">Instant</div>
              <div className="text-xs text-[#6E756F] mt-1">AI Clinical Tutor Feedback</div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. CORE PLATFORM PILLARS */}
      <section className="py-16 bg-white border-y border-[#E3E8E0] px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#58816B]">Engineered for Clinical Mastery</span>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-[#142420] mt-2">
              Everything You Need to Excel in Exam & Clinical Practice
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-[#E3E8E0] flex flex-col justify-between hover:border-[#8EAF9F] transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F0E8] text-[#145B46] flex items-center justify-center mb-6">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-bold font-serif text-[#142420]">Complete BPT & MPT Syllabus</h3>
                <p className="text-xs sm:text-sm text-[#6E756F] mt-2.5 leading-relaxed">
                  From 1st year Anatomy & Physiology to final year Orthopaedics, Neurology, ICU Cardiopulmonary, and MPT research methodologies.
                </p>
              </div>
              <Link href="/student/study" className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-[#145B46] hover:underline">
                <span>View Course Curriculum</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-[#E3E8E0] flex flex-col justify-between hover:border-[#8EAF9F] transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F0E8] text-[#145B46] flex items-center justify-center mb-6">
                  <CheckCircle size={24} />
                </div>
                <h3 className="text-lg font-bold font-serif text-[#142420]">Subject-Wise MCQ Examination Bank</h3>
                <p className="text-xs sm:text-sm text-[#6E756F] mt-2.5 leading-relaxed">
                  Timed clinical vignettes with detailed rationales from standard textbooks (Magee, Snell, O&apos;Sullivan, Cynthia Norkin).
                </p>
              </div>
              <Link href="/student/mcqs" className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-[#145B46] hover:underline">
                <span>Start Practice Test</span>
                <ChevronRight size={14} />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-[#FAF9F5] border border-[#E3E8E0] flex flex-col justify-between hover:border-[#8EAF9F] transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F0E8] text-[#145B46] flex items-center justify-center mb-6">
                  <Brain size={24} />
                </div>
                <h3 className="text-lg font-bold font-serif text-[#142420]">24/7 AI Clinical Tutor Assistant</h3>
                <p className="text-xs sm:text-sm text-[#6E756F] mt-2.5 leading-relaxed">
                  Ask immediate doubts on nerve innervations, special test sensitivity, biomechanics rules, and post-op protocols.
                </p>
              </div>
              <Link href="/student/ai-tutor" className="mt-6 inline-flex items-center space-x-1.5 text-xs font-bold text-[#145B46] hover:underline">
                <span>Ask AI Tutor</span>
                <ChevronRight size={14} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="bg-white border-t border-[#E3E8E0] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#E8F0E8] flex items-center justify-center text-[#145B46]">
              <Activity size={18} />
            </div>
            <span className="text-sm font-bold font-serif text-[#142420]">Physioiinsider</span>
            <span className="text-xs text-[#6E756F]">© 2026 Physioiinsider Portal. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-[#6E756F] font-medium">
            <Link href="/student/study" className="hover:text-[#145B46]">Curriculum</Link>
            <Link href="/student/mcqs" className="hover:text-[#145B46]">MCQs</Link>
            <Link href="/student/flashcards" className="hover:text-[#145B46]">Flashcards</Link>
            <Link href="/student/planner" className="hover:text-[#145B46]">Planner</Link>
            <Link href="/student/community" className="hover:text-[#145B46]">Community</Link>
            <Link href="/student/profile" className="hover:text-[#145B46]">Profile</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}