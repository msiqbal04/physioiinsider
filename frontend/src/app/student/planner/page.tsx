"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CalendarDays, CheckCircle2, Circle, Clock, Plus, Trash2, 
  BookOpen, Target, Activity 
} from "lucide-react";

// Types for our Planner
type TaskType = "study" | "exam" | "break";

interface Task {
  id: string;
  title: string;
  type: TaskType;
  time: string; // HH:mm format
  completed: boolean;
}

type WeekPlan = Record<string, Task[]>;

const DAYS_OF_WEEK = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Default Medical Student Template (Users can delete and create their own)
const initialWeekPlan: WeekPlan = {
  Monday: [
    { id: "1", title: "Knee Joint Biomechanics", type: "study", time: "09:00", completed: true },
    { id: "2", title: "MCQ Practice: Knee Complex", type: "exam", time: "14:00", completed: false },
  ],
  Tuesday: [
    { id: "3", title: "Brachial Plexus Anatomy", type: "study", time: "10:00", completed: false },
    { id: "4", title: "Upper Limb Special Tests", type: "study", time: "15:00", completed: false },
  ],
  Wednesday: [
    { id: "5", title: "Mid-Week Mini Mock Test", type: "exam", time: "11:00", completed: false },
  ],
  Thursday: [],
  Friday: [],
  Saturday: [],
  Sunday: [
    { id: "6", title: "Full Week Revision", type: "study", time: "10:00", completed: false },
    { id: "7", title: "Rest & Recovery", type: "break", time: "16:00", completed: false },
  ],
};

export default function StudyPlannerPage() {
  const [weekPlan, setWeekPlan] = useState<WeekPlan>(initialWeekPlan);
  const [activeDay, setActiveDay] = useState<string>("Monday");
  
  // Form State
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskType, setNewTaskType] = useState<TaskType>("study");
  const [newTaskTime, setNewTaskTime] = useState("10:00");

  const currentTasks = weekPlan[activeDay] || [];

  // Sort tasks by time
  const sortedTasks = [...currentTasks].sort((a, b) => a.time.localeCompare(b.time));

  // Calculate Progress
  const totalTasks = Object.values(weekPlan).flat().length;
  const completedTasks = Object.values(weekPlan).flat().filter(t => t.completed).length;
  const progressPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const handleToggleTask = (taskId: string) => {
    setWeekPlan(prev => ({
      ...prev,
      [activeDay]: prev[activeDay].map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const handleDeleteTask = (taskId: string) => {
    setWeekPlan(prev => ({
      ...prev,
      [activeDay]: prev[activeDay].filter(task => task.id !== taskId)
    }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      type: newTaskType,
      time: newTaskTime,
      completed: false,
    };

    setWeekPlan(prev => ({
      ...prev,
      [activeDay]: [...prev[activeDay], newTask]
    }));

    setNewTaskTitle("");
  };

  const formatTime = (time24: string) => {
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* 1. HEADER SECTION (Premium Medical Theme) */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-6 px-4 sm:px-6 lg:px-12 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[10px] font-bold text-teal-600 uppercase tracking-widest flex items-center space-x-2 mb-2">
              <Link href="/student/dashboard" className="hover:text-blue-800 transition-colors">Dashboard</Link>
              <span>/</span>
              <span>Organization</span>
            </div>
            <h1 className="text-3xl font-bold font-serif text-slate-900">Weekly Study Planner</h1>
            <p className="text-sm text-slate-500 mt-2 max-w-xl leading-relaxed">
              Design your perfect week. Schedule your clinical study blocks, set exact times for mock exams, and track your daily targets.
            </p>
          </div>

          {/* Weekly Progress Widget */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center space-x-6 min-w-64">
             <div>
               <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Week Progress</div>
               <div className="text-2xl font-bold font-serif text-blue-900">{progressPercentage}%</div>
             </div>
             <div className="flex-1">
               <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1.5">
                 <span>{completedTasks} Done</span>
                 <span>{totalTasks} Total</span>
               </div>
               <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-teal-500 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
               </div>
             </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN LAYOUT */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Week Navigator & Form */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Days List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-2">
            <div className="flex flex-col space-y-1">
              {DAYS_OF_WEEK.map((day) => {
                const dayTasks = weekPlan[day] || [];
                const dayCompleted = dayTasks.filter(t => t.completed).length;
                const isActive = activeDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => setActiveDay(day)}
                    className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive 
                        ? "bg-blue-900 text-white shadow-md" 
                        : "bg-transparent text-slate-600 hover:bg-slate-50 hover:text-blue-800"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <CalendarDays size={16} className={isActive ? "text-teal-400" : "text-slate-400"} />
                      <span>{day}</span>
                    </div>
                    {dayTasks.length > 0 && (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? "bg-blue-800 text-blue-100" : "bg-slate-100 text-slate-500"}`}>
                        {dayCompleted}/{dayTasks.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add New Task Form */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full opacity-50 pointer-events-none"></div>
             
             <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2 mb-6 relative z-10">
               <Plus size={16} className="text-teal-600" />
               <span>Add Task to {activeDay}</span>
             </h3>

             <form onSubmit={handleAddTask} className="space-y-4 relative z-10">
               <div>
                 <label htmlFor="taskTitle" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Task / Topic</label>
                 <input 
                   id="taskTitle"
                   type="text" 
                   value={newTaskTitle}
                   onChange={(e) => setNewTaskTitle(e.target.value)}
                   placeholder="e.g., Read Neurology Ch 4" 
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                 />
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                 <div>
                   <label htmlFor="taskTime" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Time</label>
                   <input 
                     id="taskTime"
                     type="time" 
                     value={newTaskTime}
                     onChange={(e) => setNewTaskTime(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-all"
                   />
                 </div>
                 <div>
                   <label htmlFor="taskType" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Type</label>
                   <select 
                     id="taskType"
                     value={newTaskType}
                     onChange={(e) => setNewTaskType(e.target.value as TaskType)}
                     className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400 transition-all"
                   >
                     <option value="study">Study</option>
                     <option value="exam">Exam</option>
                     <option value="break">Break</option>
                   </select>
                 </div>
               </div>

               <button 
                 type="submit"
                 disabled={!newTaskTitle.trim()}
                 className="w-full mt-2 bg-blue-900 text-white rounded-xl py-3 text-xs font-bold hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
               >
                 Save to Schedule
               </button>
             </form>
          </div>
        </div>

        {/* RIGHT COLUMN: Tasks List for Selected Day */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 min-h-[600px]">
            
            <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-2xl font-bold font-serif text-slate-900">{activeDay}'s Schedule</h2>
                <p className="text-xs text-slate-500 mt-1">
                  {sortedTasks.length} {sortedTasks.length === 1 ? 'task' : 'tasks'} planned for today.
                </p>
              </div>
            </div>

            {sortedTasks.length > 0 ? (
              <div className="space-y-3">
                {sortedTasks.map((task) => {
                  
                  // Visual themes based on task type
                  let typeStyles = "";
                  let TypeIcon = BookOpen;
                  
                  if (task.type === "study") {
                    typeStyles = "bg-blue-50 text-blue-800 border-blue-200";
                    TypeIcon = BookOpen;
                  } else if (task.type === "exam") {
                    typeStyles = "bg-teal-50 text-teal-800 border-teal-200";
                    TypeIcon = Target;
                  } else {
                    typeStyles = "bg-orange-50 text-orange-800 border-orange-200";
                    TypeIcon = Activity;
                  }

                  return (
                    <div 
                      key={task.id} 
                      className={`group flex items-center justify-between p-4 rounded-2xl border transition-all hover:shadow-md ${task.completed ? "bg-slate-50 border-slate-200 opacity-60" : "bg-white border-slate-200"}`}
                    >
                      <div className="flex items-center space-x-4 flex-1">
                        
                        {/* Checkbox */}
                        <button 
                          onClick={() => handleToggleTask(task.id)}
                          className={`shrink-0 transition-colors ${task.completed ? "text-teal-500" : "text-slate-300 hover:text-blue-500"}`}
                        >
                          {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </button>

                        {/* Task Details */}
                        <div className="flex-1">
                          <h4 className={`text-sm font-bold transition-all ${task.completed ? "text-slate-500 line-through" : "text-slate-900"}`}>
                            {task.title}
                          </h4>
                          <div className="flex items-center space-x-3 mt-1.5">
                            <span className="flex items-center space-x-1 text-[11px] font-medium text-slate-500">
                              <Clock size={12} />
                              <span>{formatTime(task.time)}</span>
                            </span>
                            <span className={`flex items-center space-x-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${typeStyles} ${task.completed ? "grayscale" : ""}`}>
                              <TypeIcon size={10} />
                              <span>{task.type}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Delete Button */}
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl opacity-0 group-hover:opacity-100 transition-all focus:opacity-100"
                        title="Delete Task"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              
              // Empty State
              <div className="flex flex-col items-center justify-center text-center py-20 px-4">
                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-4">
                  <CalendarDays size={32} />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900 mb-2">No tasks planned for {activeDay}</h3>
                <p className="text-sm text-slate-500 max-w-sm">
                  Use the form on the left to add study sessions, mock exams, or rest breaks to your schedule.
                </p>
              </div>
            )}
            
          </div>
        </div>

      </main>
    </div>
  );
}