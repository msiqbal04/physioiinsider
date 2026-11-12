"use client";

import React, { useState } from "react";
import { Trophy, Medal, Flame } from "lucide-react";

interface LeaderboardUser {
  rank: number;
  name: string;
  scoreInfo: string;
  streak: number;
  avatarBg: string;
}

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<"weekly" | "questions" | "discussions">("weekly");

  const leaders: LeaderboardUser[] = [
    { rank: 1, name: "Priya Sharma", scoreInfo: "12 lessons • 60 MCQs", streak: 18, avatarBg: "bg-sage-100" },
    { rank: 2, name: "Rohit Kumar", scoreInfo: "10 lessons • 45 MCQs", streak: 14, avatarBg: "bg-amber-100" },
    { rank: 3, name: "Shahid Iqbal", scoreInfo: "8 lessons • 40 MCQs", streak: 12, avatarBg: "bg-emerald-100" },
    { rank: 4, name: "Neha Singh", scoreInfo: "7 lessons • 35 MCQs", streak: 9, avatarBg: "bg-cream-200" },
    { rank: 5, name: "Aman Soni", scoreInfo: "6 lessons • 30 MCQs", streak: 6, avatarBg: "bg-cream-200" },
  ];

  return (
    <div className="min-h-screen bg-cream-100 pb-24 pt-4 px-4 sm:px-8 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-2 py-2">
        <Trophy className="text-accent-warm" size={22} />
        <h1 className="text-xl font-bold font-serif text-forest-950">Leaderboard</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-cream-200 p-1 rounded-full mt-3">
        {(["weekly", "questions", "discussions"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-full capitalize transition-all ${
              activeTab === tab
                ? "bg-forest-800 text-white shadow-sm"
                : "text-secondary-text hover:text-forest-950"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Ranks Feed */}
      <div className="mt-5 space-y-2.5">
        {leaders.map((student) => {
          const isTopThree = student.rank <= 3;

          return (
            <div
              key={student.rank}
              className={`bg-white rounded-2xl p-3.5 shadow-card border flex items-center justify-between ${
                student.name === "Shahid Iqbal" ? "border-forest-800 bg-sage-50/30" : "border-border-light"
              }`}
            >
              <div className="flex items-center space-x-3.5">
                {/* Rank Number / Badge */}
                <span
                  className={`w-6 text-center text-xs font-bold ${
                    isTopThree ? "text-accent-warm" : "text-secondary-text"
                  }`}
                >
                  #{student.rank}
                </span>

                {/* Avatar Placeholder */}
                <div
                  className={`w-10 h-10 rounded-full ${student.avatarBg} flex items-center justify-center font-bold text-forest-950 text-xs border border-border-light`}
                >
                  {student.name.charAt(0)}
                </div>

                {/* Name & Metric */}
                <div>
                  <h3 className="text-xs font-bold text-forest-950">{student.name}</h3>
                  <p className="text-[10px] text-secondary-text mt-0.5">{student.scoreInfo}</p>
                </div>
              </div>

              {/* Streak Counter */}
              <div className="flex items-center space-x-1 text-xs font-bold text-accent-warm bg-accent-warm/10 px-2.5 py-1 rounded-full">
                <Flame size={14} className="fill-accent-warm" />
                <span>{student.streak}d</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}