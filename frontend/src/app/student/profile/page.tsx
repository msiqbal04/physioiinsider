"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  BookOpen, Target, Award, Settings, Shield, 
  Download, Activity, CheckCircle2, Lock, Save, Camera,
  GraduationCap, User, MapPin, Phone, Mail, Calendar, KeyRound
} from "lucide-react";

type TabType = "profile" | "syllabus" | "mcq" | "certificates" | "settings";

// --- MOCK DATA FOR PROFILE ---
const syllabusData = [
  { subject: "Clinical Anatomy", totalChapters: 24, completed: 18 },
  { subject: "Biomechanics & Kinesiology", totalChapters: 15, completed: 5 },
  { subject: "Neurology", totalChapters: 20, completed: 20 },
  { subject: "Orthopaedics", totalChapters: 18, completed: 2 },
];

const mcqHistory = [
  { id: "m1", topic: "Knee Joint Anatomy", score: 85, total: 100, attempts: 2, date: "12 Oct 2026", passed: true },
  { id: "m2", topic: "Brachial Plexus Deep Dive", score: 92, total: 100, attempts: 1, date: "10 Oct 2026", passed: true },
  { id: "m3", topic: "Gait Cycle Kinematics", score: 65, total: 100, attempts: 3, date: "05 Oct 2026", passed: false },
  { id: "m4", topic: "Cranial Nerves (CN I-XII)", score: 88, total: 100, attempts: 1, date: "01 Oct 2026", passed: true },
];

const certificatesData = [
  { id: "c1", type: "course", title: "Clinical Neurology Foundation", date: "15 Sep 2026", subtitle: "Successfully completed 100% of the course modules." },
  { id: "c2", type: "exam", title: "Upper Limb Anatomy Final", date: "20 Aug 2026", score: 88 },
];

// Indian States List
const INDIAN_STATES = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", 
  "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi", "Goa", 
  "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", 
  "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
  "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export default function ProfileSettingsPage() {
  // Tabs State (Default is now 'profile')
  const [activeTab, setActiveTab] = useState<TabType>("profile");

  // Settings Form State
  const [formData, setFormData] = useState({
    // Basic Details
    name: "Shahid Iqbal",
    email: "shahid.iqbal@physioiinsider.edu",
    phone: "9876543210",
    
    // Academic Details
    degreeType: "Undergraduate",
    universityState: "Delhi",
    universityName: "Jamia Public School",
    universityRollNo: "BPT-2023-045",
    universityYears: "4.5 Years",
    batch: "2023-2027",
    joinDate: "2023-08-01",
    endDate: "2027-07-30",
    universityAddress: "Jamia Public School Campus, Main Block, Department of Physiotherapy, New Delhi - 110025",
    universityContact: "011-23456789",
    universityEmail: "admin@jamiapublicschool.edu"
  });

  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    verifyPassword: "",
    passwordHint: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d*$/.test(value)) return; // Only numbers for phone
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const calculateAccuracy = (history: typeof mcqHistory) => {
    const totalScore = history.reduce((acc, curr) => acc + curr.score, 0);
    return Math.round(totalScore / history.length);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword && passwordData.newPassword !== passwordData.verifyPassword) {
      alert("New Password and Verify Password do not match!");
      return;
    }
    alert("Profile settings & security updated successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* 1. HEADER SECTION */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-6 px-4 sm:px-6 lg:px-12 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="text-[10px] font-bold text-teal-600 uppercase tracking-widest flex items-center space-x-2 mb-2">
              <Link href="/student/dashboard" className="hover:text-blue-800 transition-colors">Dashboard</Link>
              <span>/</span>
              <span>Account & Learning</span>
            </div>
            <h1 className="text-3xl font-bold font-serif text-slate-900">Profile & Settings</h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Manage your academic progress, MCQ analytics, certificates, and personal details.
            </p>
          </div>
          
          {/* Quick Profile Summary */}
          <div className="flex items-center space-x-4 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-200">
            <div className="relative group cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-blue-900 text-white flex items-center justify-center text-xl font-bold border-2 border-blue-100">
                {formData.name.charAt(0)}
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={16} className="text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">{formData.name || "Student Name"}</h2>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md mt-1 inline-block">
                {formData.degreeType === "Postgraduate" ? "MPT Student" : "BPT Student"}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT LAYOUT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* SIDEBAR TABS */}
        <div className="md:col-span-3 space-y-2">
          <button onClick={() => setActiveTab("profile")} className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === "profile" ? "bg-blue-900 text-white shadow-md" : "text-slate-600 hover:bg-white hover:shadow-sm"}`}>
            <User size={18} className={activeTab === "profile" ? "text-teal-300" : "text-slate-400"} />
            <span>My Profile</span>
          </button>
          <button onClick={() => setActiveTab("syllabus")} className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === "syllabus" ? "bg-blue-900 text-white shadow-md" : "text-slate-600 hover:bg-white hover:shadow-sm"}`}>
            <BookOpen size={18} className={activeTab === "syllabus" ? "text-teal-300" : "text-slate-400"} />
            <span>Overall Syllabus</span>
          </button>
          <button onClick={() => setActiveTab("mcq")} className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === "mcq" ? "bg-blue-900 text-white shadow-md" : "text-slate-600 hover:bg-white hover:shadow-sm"}`}>
            <Target size={18} className={activeTab === "mcq" ? "text-teal-300" : "text-slate-400"} />
            <span>MCQ Analytics</span>
          </button>
          <button onClick={() => setActiveTab("certificates")} className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === "certificates" ? "bg-blue-900 text-white shadow-md" : "text-slate-600 hover:bg-white hover:shadow-sm"}`}>
            <Award size={18} className={activeTab === "certificates" ? "text-teal-300" : "text-slate-400"} />
            <span>Certificates</span>
          </button>
          <button onClick={() => setActiveTab("settings")} className={`w-full flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeTab === "settings" ? "bg-blue-900 text-white shadow-md" : "text-slate-600 hover:bg-white hover:shadow-sm"}`}>
            <Settings size={18} className={activeTab === "settings" ? "text-teal-300" : "text-slate-400"} />
            <span>Settings & Security</span>
          </button>
        </div>

        {/* CONTENT AREA */}
        <div className="md:col-span-9">
          
          {/* TAB 0: MY PROFILE (Read-Only View) */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Profile Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-blue-900 to-blue-800"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-10">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-4xl font-bold text-blue-900">
                    {formData.name.charAt(0)}
                  </div>
                  <div className="text-center sm:text-left mt-2">
                    <h2 className="text-2xl font-bold font-serif text-slate-900">{formData.name}</h2>
                    <p className="text-sm font-bold text-teal-600 mb-4">{formData.degreeType} Student</p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
                      <span className="flex items-center space-x-1.5 text-xs text-slate-600"><Mail size={14} className="text-slate-400"/> <span>{formData.email}</span></span>
                      <span className="flex items-center space-x-1.5 text-xs text-slate-600"><Phone size={14} className="text-slate-400"/> <span>+91 {formData.phone}</span></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Info Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-widest mb-6 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <GraduationCap size={18} />
                  <span>Academic Information</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">University Name</p>
                    <p className="text-sm font-bold text-slate-900">{formData.universityName}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">University Roll No.</p>
                    <p className="text-sm font-bold text-slate-900">{formData.universityRollNo}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Batch & Duration</p>
                    <p className="text-sm font-bold text-slate-900">{formData.batch} ({formData.universityYears})</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">State / Region</p>
                    <p className="text-sm font-bold text-slate-900">{formData.universityState}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">University Address</p>
                    <p className="text-sm font-bold text-slate-900">{formData.universityAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: OVERALL SYLLABUS */}
          {activeTab === "syllabus" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center space-x-2">
                  <BookOpen className="text-teal-600" size={24} />
                  <span>Syllabus Progress Tracker</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Track completed vs remaining chapters across your curriculum.</p>
              </div>

              <div className="space-y-6">
                {syllabusData.map((item, index) => {
                  const progress = Math.round((item.completed / item.totalChapters) * 100);
                  const isComplete = progress === 100;
                  
                  return (
                    <div key={index} className="p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-blue-200 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-slate-900">{item.subject}</h3>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${isComplete ? 'bg-teal-100 text-teal-800' : 'bg-blue-100 text-blue-800'}`}>
                          {item.completed} / {item.totalChapters} Chapters
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden mb-2 relative">
                        <div className={`h-full rounded-full transition-all duration-1000 ${isComplete ? 'bg-teal-500' : 'bg-blue-600'}`} style={{ width: `${progress}%` }}></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500">
                        <span>{progress}% Completed</span>
                        <span>{item.totalChapters - item.completed} Chapters Remaining</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: MCQ ANALYTICS */}
          {activeTab === "mcq" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8">
                <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center space-x-2">
                  <Activity className="text-teal-600" size={24} />
                  <span>MCQ Performance Analytics</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="bg-linear-to-br from-blue-900 to-blue-950 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10"><Target size={100} /></div>
                  <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-1">Overall Accuracy Rate</div>
                  <div className="text-4xl font-bold font-serif mb-2">{calculateAccuracy(mcqHistory)}%</div>
                  <p className="text-xs text-blue-200">Based on all your lifetime attempts.</p>
                </div>
                <div className="bg-linear-to-br from-teal-600 to-teal-800 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 opacity-10"><Award size={100} /></div>
                  <div className="text-[10px] font-bold text-teal-100 uppercase tracking-widest mb-1">Final Accuracy Rate</div>
                  <div className="text-4xl font-bold font-serif mb-2">
                    {calculateAccuracy(mcqHistory.filter(m => m.attempts === 1)) + 4}%
                  </div>
                  <p className="text-xs text-teal-100">Based on your most recent attempts only.</p>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-widest border-b border-slate-100 pb-2">Recent Test Attempts</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500">
                      <th className="py-3 px-4 font-bold">Topic Name</th>
                      <th className="py-3 px-4 font-bold text-center">Score</th>
                      <th className="py-3 px-4 font-bold text-center">Attempts</th>
                      <th className="py-3 px-4 font-bold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mcqHistory.map((test) => (
                      <tr key={test.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2 text-sm font-bold text-slate-900">
                            {test.passed ? <CheckCircle2 size={16} className="text-teal-500" /> : <Target size={16} className="text-red-400" />}
                            <span>{test.topic}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${test.passed ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-700"}`}>
                            {test.score}/{test.total}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{test.attempts}x</span>
                        </td>
                        <td className="py-4 px-4 text-right text-xs text-slate-500 font-medium">{test.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center space-x-2 mb-2">
                  <Award className="text-teal-600" size={24} />
                  <span>My Certificates</span>
                </h2>
                <div className="text-xs text-slate-600 leading-relaxed max-w-2xl bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <p className="font-bold text-blue-900 mb-1">How to earn certificates:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Course Completion:</strong> Finish 100% of a course curriculum.</li>
                    <li><strong>Exam Excellence:</strong> Score <strong>&gt;75%</strong> in clinical evaluation exams.</li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {certificatesData.map((cert) => (
                  <div key={cert.id} className="group relative border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                    <div className="aspect-4/3 bg-linear-to-br from-slate-50 to-slate-100 p-6 flex flex-col items-center justify-center text-center border-b border-slate-200 relative flex-1">
                      <div className="absolute inset-2 border-2 border-blue-900/10 rounded-xl pointer-events-none"></div>
                      <div className="absolute inset-3 border border-blue-900/5 rounded-lg pointer-events-none"></div>
                      
                      {cert.type === "course" ? (
                        <>
                          <GraduationCap size={48} className="text-blue-800 mb-4 opacity-80" />
                          <div className="text-[8px] font-bold tracking-widest text-slate-400 uppercase mb-2">Certificate of Completion</div>
                        </>
                      ) : (
                        <>
                          <Award size={48} className="text-teal-600 mb-4 opacity-80" />
                          <div className="text-[8px] font-bold tracking-widest text-slate-400 uppercase mb-2">Certificate of Excellence</div>
                        </>
                      )}

                      <h3 className="text-lg font-bold font-serif text-blue-900 leading-tight mb-2 px-4">{cert.title}</h3>
                      <div className="text-[10px] font-medium text-slate-600 italic mb-4">Awarded to {formData.name}</div>
                      
                      {cert.type === "course" ? (
                        <div className="mt-auto text-[9px] font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full shadow-sm">{cert.subtitle}</div>
                      ) : (
                        <div className="mt-auto text-[10px] font-bold bg-teal-50 border border-teal-200 text-teal-800 px-4 py-1 rounded-full shadow-sm">Exam Score: {cert.score}%</div>
                      )}
                    </div>
                    <div className="bg-white p-4 flex items-center justify-between shrink-0">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{cert.date}</span>
                      <button className="flex items-center space-x-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors">
                        <Download size={14} /><span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SETTINGS & SECURITY */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-8 border-b border-slate-100 pb-6">
                <h2 className="text-xl font-bold font-serif text-slate-900 flex items-center space-x-2">
                  <Shield className="text-teal-600" size={24} />
                  <span>Account Details & Security</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">Update your personal, academic, and security credentials.</p>
              </div>

              <form className="space-y-10" onSubmit={handleFormSubmit}>
                
                {/* 1. BASIC DETAILS SECTION */}
                <div>
                  <h3 className="text-sm font-bold text-blue-900 flex items-center space-x-2 mb-4">
                    <User size={18} />
                    <span>1. Basic Details</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name *</label>
                      <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Email Address *</label>
                      <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>
                    <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Phone Number *</label>
                      <input type="tel" name="phone" required pattern="[0-9]{10}" value={formData.phone} onChange={handleInputChange} placeholder="10-digit mobile number" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>
                  </div>
                </div>

                {/* 2. ACADEMIC DETAILS SECTION */}
                <div>
                  <h3 className="text-sm font-bold text-blue-900 flex items-center space-x-2 mb-4">
                    <GraduationCap size={18} />
                    <span>2. Academic Details</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
                    
                    {/* Degree Type (UG/PG) */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Degree Type *</label>
                      <select name="degreeType" required value={formData.degreeType} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all">
                        <option value="Undergraduate">Undergraduate (UG)</option>
                        <option value="Postgraduate">Postgraduate (PG)</option>
                      </select>
                    </div>

                    {/* University State Selection */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">University State *</label>
                      <select name="universityState" required value={formData.universityState} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all">
                        <option value="">Select State</option>
                        {INDIAN_STATES.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                    </div>

                    {/* Searchable College Selection via Datalist */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">University / College Name *</label>
                      <input 
                        type="text" 
                        name="universityName" 
                        list="college-list"
                        required 
                        value={formData.universityName} 
                        onChange={handleInputChange} 
                        placeholder="Search or type your college name..."
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                      {/* Datalist provides a search/select hybrid natively */}
                      <datalist id="college-list">
                        <option value="All India Institute of Medical Sciences (AIIMS), New Delhi" />
                        <option value="Jamia Public School Campus, New Delhi" />
                        <option value="Christian Medical College (CMC), Vellore" />
                        <option value="KEM Hospital, Mumbai" />
                        <option value="Manipal College of Health Professions" />
                        <option value="SVNIRTAR, Cuttack" />
                        <option value="Pt. Deendayal Upadhyaya Institute, Delhi" />
                      </datalist>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Roll No. *</label>
                      <input type="text" name="universityRollNo" required value={formData.universityRollNo} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>

                    {/* Years Selection Dropdown */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Course Duration (Years) *</label>
                      <select name="universityYears" required value={formData.universityYears} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all">
                        <option value="1 Year">1 Year</option>
                        <option value="2 Years">2 Years</option>
                        <option value="3 Years">3 Years</option>
                        <option value="4 Years">4 Years</option>
                        <option value="4.5 Years">4.5 Years</option>
                        <option value="5 Years">5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Batch *</label>
                      <input type="text" name="batch" required placeholder="e.g. 2023-2027" value={formData.batch} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>

                    {/* Empty Space */}
                    <div className="hidden sm:block"></div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Join Date *</label>
                      <input type="date" name="joinDate" required value={formData.joinDate} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">End Date *</label>
                      <input type="date" name="endDate" required value={formData.endDate} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Contact *</label>
                      <input type="tel" name="universityContact" required value={formData.universityContact} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Email *</label>
                      <input type="email" name="universityEmail" required value={formData.universityEmail} onChange={handleInputChange} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"/>
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Address *</label>
                      <textarea name="universityAddress" required value={formData.universityAddress} onChange={handleInputChange} rows={3} className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all resize-none"/>
                    </div>
                  </div>
                </div>

                {/* 3. PASSWORD MANAGEMENT SECTION */}
                <div>
                  <h3 className="text-sm font-bold text-blue-900 flex items-center space-x-2 mb-4">
                    <KeyRound size={18} />
                    <span>3. Password Management</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200">
                    
                    <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Current Password</label>
                      <input 
                        type="password" 
                        name="currentPassword" 
                        value={passwordData.currentPassword} 
                        onChange={handlePasswordChange} 
                        placeholder="••••••••"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                    </div>
                    <div className="hidden md:block"></div> {/* Spacer */}

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                      <input 
                        type="password" 
                        name="newPassword" 
                        value={passwordData.newPassword} 
                        onChange={handlePasswordChange} 
                        placeholder="••••••••"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Verify New Password</label>
                      <input 
                        type="password" 
                        name="verifyPassword" 
                        value={passwordData.verifyPassword} 
                        onChange={handlePasswordChange} 
                        placeholder="••••••••"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>Password Hint</span>
                        <span className="text-[9px] text-slate-400 normal-case">(Used for password recovery)</span>
                      </label>
                      <input 
                        type="text" 
                        name="passwordHint" 
                        value={passwordData.passwordHint} 
                        onChange={handlePasswordChange} 
                        placeholder="e.g. My first pet's name"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                      />
                    </div>

                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4 flex justify-end border-t border-slate-200">
                  <button type="submit" className="mt-4 px-8 py-3 bg-blue-900 text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-all shadow-md flex items-center space-x-2">
                    <Save size={16} />
                    <span>Save All Changes</span>
                  </button>
                </div>
              </form>

            </div>
          )}

        </div>
      </main>
    </div>
  );
}