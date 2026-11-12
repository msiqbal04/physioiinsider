"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, Bell, Flame, CheckCircle2, Award, 
  BookOpen, Calendar, Layers, Sparkles, ChevronRight, PlayCircle, FileText, Bot,
  Stethoscope
} from "lucide-react";

export default function DashboardPage() {
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) setGreeting("Good Morning");
    else if (currentHour >= 12 && currentHour < 17) setGreeting("Good Afternoon");
    else if (currentHour >= 17 && currentHour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  // YEH FUNCTION WIDGET KO OPEN KAREGA
  const openAITutor = () => {
    window.dispatchEvent(new CustomEvent("open-ai-chat"));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-12">
      
      {/* 1. TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/student/dashboard" className="flex items-center space-x-3 shrink-0">
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-800 border border-blue-100">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="17" cy="4" r="2" />
                <path d="m15 8-4.5 3-3-1.5L4 13" />
                <path d="M12 11l1 4 4.5 1.5" />
                <path d="M11 17l-3 4-3.5-1" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-bold text-slate-900 block leading-none">Physioiinsider</span>
              <span className="text-[9px] font-bold text-teal-600 uppercase tracking-widest block mt-0.5">Learning Portal</span>
            </div>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <Search className="absolute left-4 top-2.5 text-slate-400" size={16} />
            <input type="text" placeholder="Search subjects, anatomical topics, MCQs..." className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs text-slate-900 focus:outline-none focus:border-blue-400 focus:bg-white transition-colors placeholder:text-slate-400 shadow-sm" />
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden lg:flex items-center space-x-6 text-xs font-semibold text-slate-500">
              <Link href="/student/study" className="hover:text-blue-800 transition-colors">Courses</Link>
              <Link href="/student/mcqs" className="hover:text-blue-800 transition-colors">MCQ Bank</Link>
              <Link href="/student/flashcards" className="hover:text-blue-800 transition-colors">Flashcards</Link>
              <Link href="/student/planner" className="hover:text-blue-800 transition-colors">Planner</Link>
              <Link href="/student/community" className="hover:text-blue-800 transition-colors">Community</Link>
            </nav>

            <div className="flex items-center space-x-4 border-l border-slate-200 pl-6">
              <button className="text-slate-400 hover:text-blue-800 relative transition-colors">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
              </button>
              <Link href="/student/profile" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-800 flex items-center justify-center font-bold text-xs border border-blue-100 group-hover:bg-blue-800 group-hover:text-white transition-colors">SI</div>
                <div className="hidden sm:block text-left">
                  <span className="text-xs font-bold text-slate-900 block leading-tight group-hover:text-blue-800 transition-colors">Shahid Iqbal</span>
                  <span className="text-[10px] text-slate-500 block leading-tight">BPT - 3rd Year</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MEDICAL HERO SECTION */}
      <div className="bg-linear-to-r from-blue-950 via-blue-900 to-slate-900 pt-10 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="medical-grid-dash" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#medical-grid-dash)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center space-x-2 bg-blue-800/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-blue-700/50 mb-4">
              <Stethoscope size={14} className="text-teal-400" />
              <span className="text-xs font-bold text-blue-100 tracking-wide">Academic Overview</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white flex items-center gap-2 transition-all">
              {greeting}, Shahid Iqbal <span className="text-3xl">👋</span>
            </h1>
            <p className="text-sm text-blue-200 mt-2">
              Ready to learn? You're on a <strong className="text-teal-400">12-day streak!</strong> Keep it up.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {/* FIXED BUTTON: Triggers Chat Widget Open */}
           
            <Link href="/student/mcqs" className="px-5 py-2.5 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center space-x-1.5 hover:bg-teal-600 shadow-lg shadow-teal-900/50 transition-all">
              <CheckCircle2 size={14} />
              <span>Daily Practice</span>
            </Link>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        
        {/* STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center space-x-4 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 border border-orange-100"><Flame size={24} /></div>
            <div><div className="text-2xl font-bold font-serif text-slate-900">12</div><div className="text-[11px] text-slate-500 font-medium mt-0.5">Day Streak</div></div>
          </div>
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-center justify-between hover:-translate-y-1 transition-transform duration-300">
            <div><div className="text-[11px] text-slate-500 font-medium mb-0.5">Weekly Target</div><div className="text-base font-bold text-slate-900">4/7 Chapters</div></div>
            <div className="relative w-12 h-12 shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#E2E8F0" strokeWidth="3" /><circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#1E3A8A" strokeWidth="3" strokeDasharray="57, 100" strokeLinecap="round" /></svg>
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-900">57%</div>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-start justify-between hover:-translate-y-1 transition-transform duration-300">
            <div><div className="text-[11px] text-slate-500 font-medium mb-0.5">MCQs Solved</div><div className="text-2xl font-bold font-serif text-slate-900 mt-1">156</div></div>
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0"><CheckCircle2 size={16} /></div>
          </div>
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-lg shadow-slate-200/50 flex items-start justify-between hover:-translate-y-1 transition-transform duration-300">
            <div><div className="text-[11px] text-slate-500 font-medium mb-0.5">Certificates</div><div className="text-2xl font-bold font-serif text-slate-900 mt-1">8</div></div>
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><Award size={16} /></div>
          </div>
        </div>

        {/* CONTENT SPLIT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          
          <div className="lg:col-span-2 space-y-6 sm:space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-bl from-blue-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/3 opacity-50"></div>
              <div className="relative z-10 flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-1 bg-blue-900 text-white text-[10px] font-bold uppercase tracking-wide rounded-md shadow-sm">TODAY'S FOCUS</span>
                  <span className="text-[11px] text-slate-500 font-medium">• 45 mins left</span>
                </div>
                <span className="text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">25% Complete</span>
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-800 group-hover:text-white transition-colors duration-300"><BookOpen size={24} /></div>
                  <div><h2 className="text-lg font-bold font-serif text-slate-900">Knee Joint Anatomy & Biomechanics</h2><p className="text-xs text-slate-500 mt-1">Chapter 2 • Musculoskeletal System</p></div>
                </div>
                <Link href="/student/study" className="shrink-0 px-6 py-3 bg-blue-900 text-white rounded-full text-xs font-bold flex items-center justify-center space-x-2 hover:bg-blue-800 transition-all shadow-md hover:shadow-lg"><PlayCircle size={16} /><span>Resume Learning</span></Link>
              </div>
              <div className="relative z-10 w-full h-2 bg-slate-100 rounded-full mt-8 overflow-hidden"><div className="h-full bg-teal-500 rounded-full" style={{ width: "25%" }} /></div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 ml-1">Quick Navigation</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link href="/student/study" className="bg-white p-5 rounded-[20px] border border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all group"><BookOpen size={20} className="text-slate-400 group-hover:text-blue-700 mb-4 transition-colors" /><h4 className="text-sm font-bold text-slate-900">Course Catalog</h4><span className="text-[10px] text-slate-500 mt-1 block">12 Enrolled</span></Link>
                <Link href="/student/mcqs" className="bg-white p-5 rounded-[20px] border border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all group"><CheckCircle2 size={20} className="text-slate-400 group-hover:text-teal-600 mb-4 transition-colors" /><h4 className="text-sm font-bold text-slate-900">Daily MCQs</h4><span className="text-[10px] text-slate-500 mt-1 block">Exam practice</span></Link>
                <Link href="/student/planner" className="bg-white p-5 rounded-[20px] border border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all group"><Calendar size={20} className="text-slate-400 group-hover:text-blue-700 mb-4 transition-colors" /><h4 className="text-sm font-bold text-slate-900">Study Planner</h4><span className="text-[10px] text-slate-500 mt-1 block">Weekly targets</span></Link>
                <Link href="/student/flashcards" className="bg-white p-5 rounded-[20px] border border-slate-200 hover:border-blue-300 hover:shadow-md hover:-translate-y-1 transition-all group"><Layers size={20} className="text-slate-400 group-hover:text-blue-700 mb-4 transition-colors" /><h4 className="text-sm font-bold text-slate-900">Flashcards</h4><span className="text-[10px] text-slate-500 mt-1 block">Anatomy decks</span></Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            {/* AI Tutor Card (Triggers Widget directly) */}
            <div className="bg-linear-to-br from-blue-900 to-blue-950 rounded-3xl p-6 shadow-lg shadow-blue-900/20 text-white relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -top-10 -right-10 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"><Bot size={150} /></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-2 text-teal-400 mb-4"><Sparkles size={14} /><span className="text-[10px] font-bold uppercase tracking-widest">AI TUTOR ASSISTANT</span></div>
                <h3 className="text-base font-bold font-serif leading-snug mb-3 text-white">Stuck on a clinical concept or anatomy landmark?</h3>
                <p className="text-xs text-blue-200 leading-relaxed mb-6">Get instant anatomical explanations, special test interpretations, and MCQ breakdowns.</p>
                {/* FIXED BUTTON: Triggers Chat Widget Open */}
                <button onClick={openAITutor} className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-white text-blue-950 rounded-full text-xs font-bold hover:bg-blue-50 transition-colors shadow-sm">
                  <span>Ask Question</span><ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-6"><h3 className="text-xs font-bold uppercase tracking-widest text-slate-900">Upcoming Tasks</h3><Link href="/student/planner" className="text-[10px] font-bold text-blue-700 hover:underline">Planner</Link></div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200"><div className="mt-0.5 text-teal-600"><CheckCircle2 size={16} /></div><div><h4 className="text-xs font-bold text-slate-900 leading-tight">Ligaments & Menisci Special Tests</h4><span className="text-[10px] text-slate-500 mt-1 block">Today, 5:00 PM</span></div></div>
                <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200"><div className="mt-0.5 text-slate-400"><FileText size={16} /></div><div><h4 className="text-xs font-bold text-slate-900 leading-tight">Cranial Nerves Clinical Exam</h4><span className="text-[10px] text-slate-500 mt-1 block">Tomorrow, 10:00 AM</span></div></div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}