"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, Search, Filter, FileText, Download, BookOpen,
  FolderOpen, Bookmark, FileStack, ExternalLink, Library
} from "lucide-react";

export default function StudyLibraryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Resource Database
  const resources = [
    {
      id: "res-1",
      title: "Orthopaedics & Traumatology Complete Notes",
      subject: "Orthopaedics",
      type: "notes",
      year: "BPT 3rd Year",
      size: "4.2 MB",
      pages: 124,
      format: "PDF"
    },
    {
      id: "res-2",
      title: "Magee: Orthopedic Physical Assessment (Ch 12 Knee)",
      subject: "Clinical Assessment",
      type: "book",
      year: "Reference",
      size: "15.8 MB",
      pages: 45,
      format: "PDF"
    },
    {
      id: "res-3",
      title: "AIIMS MPT Entrance - 2025 Previous Year Paper",
      subject: "Entrance Prep",
      type: "pyq",
      year: "MPT Entrance",
      size: "1.1 MB",
      pages: 18,
      format: "PDF"
    },
    {
      id: "res-4",
      title: "Neurology Practical Viva Questions & MMT Grading",
      subject: "Neurology",
      type: "practical",
      year: "BPT 4th Year",
      size: "2.4 MB",
      pages: 32,
      format: "PDF"
    },
    {
      id: "res-5",
      title: "Biomechanics - Gait Cycle Summary",
      subject: "Biomechanics",
      type: "notes",
      year: "BPT 2nd Year",
      size: "800 KB",
      pages: 5,
      format: "PDF"
    },
    {
      id: "res-6",
      title: "Rajiv Gandhi University BPT 1st Year Anatomy PYQ (2020-2024)",
      subject: "Anatomy",
      type: "pyq",
      year: "BPT 1st Year",
      size: "3.5 MB",
      pages: 40,
      format: "PDF"
    }
  ];

  const filteredResources = resources.filter((res) => {
    const matchesTab = activeTab === "all" || res.type === activeTab;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case "notes": return <FileText size={20} className="text-forest-800" />;
      case "pyq": return <FileStack size={20} className="text-accent-warm" />;
      case "practical": return <FolderOpen size={20} className="text-sage-600" />;
      case "book": return <BookOpen size={20} className="text-forest-950" />;
      default: return <FileText size={20} className="text-forest-800" />;
    }
  };

  const getLabelForType = (type: string) => {
    switch (type) {
      case "notes": return "Unit Notes";
      case "pyq": return "PYQ Paper";
      case "practical": return "Practical File";
      case "book": return "Reference Book";
      default: return "Document";
    }
  };

  return (
    <div className="min-h-screen bg-cream-100 text-forest-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border-light">
          <div className="flex items-start space-x-4">
            <Link href="/student/dashboard" className="p-2.5 rounded-full bg-white border border-border-light hover:bg-cream-50 transition-colors mt-1">
              <ArrowLeft size={16} />
            </Link>
            <div>
              <div className="flex items-center space-x-2 text-sage-600 mb-1">
                <Library size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Digital Resource Vault</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-forest-950">Study Library & PYQs</h1>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Download unit-wise notes, previous year question papers, viva files, and standard reference book chapters.
              </p>
            </div>
          </div>

          <div className="w-full md:w-80 relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={17} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, PYQs, subjects..."
              className="w-full pl-11 pr-4 py-3 bg-cream-50 border border-border-light rounded-2xl text-xs text-forest-950 focus:outline-none focus-within:border-sage-500 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Filters (3 Cols) */}
          <div className="lg:col-span-3 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 px-2">Library Categories</h3>
            
            {[
              { id: "all", label: "All Resources", icon: Library },
              { id: "notes", label: "Unit-wise Notes", icon: FileText },
              { id: "pyq", label: "Previous Year Papers", icon: FileStack },
              { id: "practical", label: "Viva & Practical Files", icon: FolderOpen },
              { id: "book", label: "Reference Books", icon: BookOpen },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? "bg-forest-800 text-white shadow-md"
                    : "bg-transparent text-forest-950 hover:bg-white border border-transparent hover:border-border-light"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <tab.icon size={16} className={activeTab === tab.id ? "text-white" : "text-sage-600"} />
                  <span>{tab.label}</span>
                </div>
                {activeTab === tab.id && <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />}
              </button>
            ))}

            <div className="mt-8 p-5 bg-white rounded-3xl border border-border-light shadow-sm">
              <h4 className="text-xs font-bold text-forest-950 mb-2">Saved for Offline</h4>
              <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                You can bookmark important notes to access them quickly from your profile.
              </p>
              <Link href="/student/profile" className="flex items-center justify-center space-x-2 w-full py-2.5 bg-cream-50 border border-border-light rounded-xl text-xs font-semibold hover:bg-sage-100 transition-colors">
                <Bookmark size={14} className="text-forest-800" />
                <span className="text-forest-800">View Bookmarks</span>
              </Link>
            </div>
          </div>

          {/* Main Content Grid (9 Cols) */}
          <div className="lg:col-span-9">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm font-semibold text-forest-950">
                Showing {filteredResources.length} files
              </span>
              <button className="flex items-center space-x-1.5 text-xs font-semibold text-slate-500 bg-white px-3 py-1.5 rounded-lg border border-border-light hover:bg-cream-50 transition-colors">
                <Filter size={14} />
                <span>Sort by: Newest</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {filteredResources.map((res) => (
                <div key={res.id} className="bg-white rounded-3xl p-5 border border-border-light shadow-sm hover:border-sage-400 transition-all group flex flex-col justify-between h-full">
                  
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-cream-50 border border-border-light flex items-center justify-center shrink-0">
                        {getIconForType(res.type)}
                      </div>
                      <span className="px-2.5 py-1 rounded-md bg-sage-100 text-forest-800 text-[10px] font-bold tracking-wide">
                        {getLabelForType(res.type)}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold text-sage-600 block mb-1">
                      {res.subject} • {res.year}
                    </span>
                    <h3 className="text-sm font-bold text-forest-950 leading-snug group-hover:text-forest-800 transition-colors line-clamp-2">
                      {res.title}
                    </h3>
                  </div>

                  <div className="mt-5 pt-4 border-t border-cream-50 flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-[11px] font-medium text-slate-500">
                      <span>{res.format}</span>
                      <span>•</span>
                      <span>{res.size}</span>
                      <span>•</span>
                      <span>{res.pages} Pages</span>
                    </div>
                    
                    <button className="p-2.5 rounded-full bg-cream-50 text-forest-800 border border-border-light hover:bg-forest-800 hover:text-white transition-colors" title="Download Resource">
                      <Download size={15} />
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {filteredResources.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-border-light">
                <FolderOpen size={48} className="mx-auto text-sage-400 mb-4 opacity-50" />
                <h3 className="text-base font-bold text-forest-950">No resources found</h3>
                <p className="text-xs text-slate-500 mt-2">Try adjusting your search or switching categories.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}