"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star, Users, CheckCircle2, PlayCircle, FileText, ChevronRight } from "lucide-react";

export default function CourseDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "lessons" | "notes">("overview");

  useEffect(() => {
    async function loadCourse() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"}/courses/${slug}`,
          { credentials: "include" }
        );
        const json = await res.json();
        if (json.success) {
          setData(json);
        }
      } catch (err) {
        console.error("Course fetch error:", err);
      }
    }
    loadCourse();
  }, [slug]);

  if (!data) {
    return <div className="min-h-screen bg-cream-100 p-8 text-center text-xs">Loading course...</div>;
  }

  const { course, modules } = data;

  return (
    <div className="min-h-screen bg-cream-100 pb-24 max-w-xl mx-auto">
      {/* Visual Header / Cover */}
      <div className="relative bg-forest-900 text-white p-5 rounded-b-3xl">
        <button
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center mb-4"
        >
          <ArrowLeft size={18} />
        </button>

        <span className="inline-block bg-accent-warm text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
          {course.program?.join(" / ")}
        </span>

        <h1 className="text-xl font-bold font-serif">{course.title}</h1>
        <p className="text-xs text-sage-100 mt-1">{course.instructor?.name}</p>

        <div className="flex items-center space-x-4 mt-3 text-xs text-sage-100">
          <div className="flex items-center space-x-1">
            <Star size={14} className="fill-accent-warm text-accent-warm" />
            <span className="font-semibold text-white">4.8</span>
            <span>(2.4k students)</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users size={14} />
            <span>{course.lessonsCount} Lessons</span>
          </div>
        </div>
      </div>

      <div className="px-4 mt-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-border-light text-xs font-semibold">
          {[
            { id: "overview", label: "Overview" },
            { id: "lessons", label: "Lessons" },
            { id: "notes", label: "Notes" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-4 transition-all ${
                activeTab === tab.id
                  ? "border-b-2 border-forest-800 text-forest-800 font-bold"
                  : "text-secondary-text hover:text-forest-950"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="mt-4 space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-card border border-border-light">
              <h2 className="text-xs font-bold text-forest-950 mb-1">About This Course</h2>
              <p className="text-xs text-secondary-text leading-relaxed">{course.description}</p>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-card border border-border-light">
              <h2 className="text-xs font-bold text-forest-950 mb-2">Learning Objectives</h2>
              <ul className="space-y-2">
                {course.learningObjectives?.map((obj: string, i: number) => (
                  <li key={i} className="flex items-start space-x-2 text-xs text-forest-950">
                    <CheckCircle2 size={16} className="text-forest-800 shrink-0 mt-0.5" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "lessons" && (
          <div className="mt-4 space-y-3">
            {modules?.map((m: any) => (
              <div key={m._id} className="bg-white rounded-2xl p-4 shadow-card border border-border-light">
                <h3 className="text-xs font-bold text-forest-950 mb-2">{m.title}</h3>
                <div className="space-y-2">
                  {m.lessons?.map((lesson: any) => (
                    <div
                      key={lesson._id}
                      onClick={() => router.push(`/lessons/${lesson._id}`)}
                      className="flex items-center justify-between p-2 rounded-xl bg-cream-50 hover:bg-sage-100 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        <PlayCircle size={18} className="text-forest-800" />
                        <div>
                          <p className="text-xs font-semibold text-forest-950">{lesson.title}</p>
                          <span className="text-[10px] text-secondary-text">
                            {Math.round((lesson.durationSeconds || 0) / 60)} mins
                          </span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-secondary-text" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="mt-4 space-y-2">
            <div className="bg-white rounded-2xl p-4 shadow-card border border-border-light flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText size={20} className="text-forest-800" />
                <div>
                  <h4 className="text-xs font-bold text-forest-950">Anatomy Notes.pdf</h4>
                  <p className="text-[10px] text-secondary-text">2.4 MB • Orthopaedics Reference</p>
                </div>
              </div>
              <button
                onClick={() => router.push(`/reader/ortho-knee-notes`)}
                className="px-3 py-1 bg-forest-800 text-white rounded-full text-xs font-semibold"
              >
                Open
              </button>
            </div>
          </div>
        )}

        {/* Sticky Continue Learning Action */}
        <div className="mt-6">
          <button
            onClick={() => {
              const firstLessonId = modules?.[0]?.lessons?.[0]?._id;
              if (firstLessonId) router.push(`/lessons/${firstLessonId}`);
            }}
            className="w-full py-3 bg-forest-800 text-white rounded-full font-bold text-xs hover:bg-forest-900 transition-colors shadow-soft"
          >
            Continue Learning
          </button>
        </div>
      </div>
    </div>
  );
}