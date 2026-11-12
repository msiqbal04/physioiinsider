"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { 
  Hash, Ghost, Sparkles, Send, Trophy, Gamepad2, 
  MessageCircle, ThumbsUp, Share2, MoreHorizontal, CheckCircle2,
  Brain, Bone, Activity, Coffee, PlayCircle, X, ImagePlus, XCircle
} from "lucide-react";

// --- TYPES & MOCK DATA ---
type Channel = "General Lounge" | "Anatomy" | "Biomechanics" | "Neurology" | "Orthopaedics";

interface Post {
  id: string;
  author: string;
  avatar?: string;
  isAnonymous: boolean;
  badge?: string;
  channel: Channel;
  content: string;
  imageUrl?: string; // New Image Property
  tags: string[];
  likes: number;
  comments: number;
  timeAgo: string;
}

const mockPosts: Post[] = [
  {
    id: "p1",
    author: "Shahid Iqbal",
    badge: "Anatomy Whiz",
    isAnonymous: false,
    channel: "Anatomy",
    content: "Can someone simplify the branches of the posterior cord of the brachial plexus? I always confuse the upper and lower subscapular nerves.",
    tags: ["#BrachialPlexus", "#UpperLimb"],
    likes: 12,
    comments: 4,
    timeAgo: "2 hours ago"
  },
  {
    id: "p_img1",
    author: "Anonymous Student",
    isAnonymous: true,
    channel: "Neurology",
    content: "Need help identifying this specific region on the axial MRI. Is this the caudate nucleus or the putamen? Getting confused with the basal ganglia cross-sections.",
    imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80", // Medical MRI Mock Image
    tags: ["#MRI", "#Neuroanatomy", "#BasalGanglia"],
    likes: 34,
    comments: 11,
    timeAgo: "3 hours ago"
  },
  {
    id: "p2",
    author: "Anonymous Student",
    isAnonymous: true,
    channel: "Biomechanics",
    content: "[Clinical Case Format]\nChief Complaint: Difficulty understanding Convex-Concave rule in shoulder mobilizations.\nQuestion: If I want to increase shoulder abduction, which way should I glide the humerus? Inferiorly or Superiorly?",
    tags: ["#Mobilization", "#Arthrokinematics"],
    likes: 24,
    comments: 8,
    timeAgo: "4 hours ago"
  },
  {
    id: "p3",
    author: "Dr. Sharma",
    badge: "Faculty",
    isAnonymous: false,
    channel: "General Lounge",
    content: "Taking a break! Remember guys, spaced repetition is better than cramming all night. Stay hydrated! 💧",
    tags: ["#Motivation", "#StudyTips"],
    likes: 89,
    comments: 12,
    timeAgo: "5 hours ago"
  }
];

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState<Channel>("Anatomy");
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  
  // Composer States
  const [inputText, setInputText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Game Modal State
  const [showGameModal, setShowGameModal] = useState(false);

  const filteredPosts = posts.filter(post => post.channel === activeChannel);

  // Handle Image Upload Selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: isAnonymous ? "Anonymous Student" : "Shahid Iqbal",
      isAnonymous: isAnonymous,
      channel: activeChannel,
      content: inputText,
      imageUrl: selectedImage || undefined,
      tags: ["#NewDiscussion"],
      likes: 0,
      comments: 0,
      timeAgo: "Just now"
    };

    setPosts([newPost, ...posts]);
    setInputText("");
    setSelectedImage(null);
    setIsAnonymous(false);
  };

  const handleEnhanceClinically = () => {
    if (!inputText.trim()) return;
    setIsEnhancing(true);
    
    // Simulate AI transforming the text
    setTimeout(() => {
      setInputText(`[Clinical Case Setup]\nPatient Presentation: ${inputText}\n\nKey Question: What are the primary differential diagnoses and appropriate special tests for this condition?`);
      setIsEnhancing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans pb-16">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 pt-8 pb-6 px-4 sm:px-6 lg:px-12 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="text-[10px] font-bold text-teal-600 uppercase tracking-widest flex items-center space-x-2 mb-2">
              <Link href="/student/dashboard" className="hover:text-blue-800 transition-colors">Dashboard</Link>
              <span>/</span>
              <span>Network</span>
            </div>
            <h1 className="text-3xl font-bold font-serif text-slate-900">Clinical Community</h1>
            <p className="text-sm text-slate-500 mt-2 max-w-2xl leading-relaxed">
              Discuss clinical cases, upload X-rays or notes, and learn from peers.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT SIDEBAR - CHANNELS */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Channel List */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-3">Discussion Channels</h3>
            <div className="space-y-1">
              {(["General Lounge", "Anatomy", "Biomechanics", "Neurology", "Orthopaedics"] as Channel[]).map((channel) => {
                const isActive = activeChannel === channel;
                let Icon = Hash;
                if (channel === "General Lounge") Icon = Coffee;
                else if (channel === "Anatomy") Icon = Bone;
                else if (channel === "Biomechanics") Icon = Activity;
                else if (channel === "Neurology") Icon = Brain;

                return (
                  <button
                    key={channel}
                    onClick={() => setActiveChannel(channel)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                      isActive 
                        ? "bg-blue-50 text-blue-900 border border-blue-100 shadow-sm" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-blue-800"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-teal-500" : "text-slate-400"} />
                    <span>{channel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Clinical Case of the Week Highlight */}
          <div className="bg-linear-to-br from-blue-900 to-slate-900 rounded-3xl p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-5 rounded-bl-full"></div>
            <div className="flex items-center space-x-2 text-teal-400 mb-3">
              <Trophy size={14} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Case of the Week</span>
            </div>
            <h4 className="text-sm font-bold font-serif mb-2 leading-tight">24M athlete with a popping sound in the knee and immediate swelling.</h4>
            <p className="text-xs text-blue-200 mb-4 opacity-90 line-clamp-2">Discuss special tests and immediate management protocols...</p>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-xs font-bold transition-colors border border-white/20">
              Join Discussion
            </button>
          </div>
        </div>

        {/* RIGHT SIDE - FEED & COMPOSER */}
        <div className="lg:col-span-3 flex flex-col space-y-6">
          
          {/* GENERAL LOUNGE GAME BANNER */}
          {activeChannel === "General Lounge" && (
            <div className="bg-white rounded-3xl border border-slate-200 p-5 flex flex-col sm:flex-row items-center justify-between shadow-sm relative overflow-hidden gap-4">
              <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none"><Gamepad2 size={120} /></div>
              <div className="flex items-center space-x-4 relative z-10">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 border border-orange-100 shrink-0">
                  <Gamepad2 size={24} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Daily Medical Break 🎮</h3>
                  <p className="text-xs text-slate-500">Take a 5-minute break. Play the medical word scramble!</p>
                </div>
              </div>
              <button 
                onClick={() => setShowGameModal(true)}
                className="shrink-0 px-6 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors shadow-sm flex items-center space-x-2 relative z-10"
              >
                <PlayCircle size={16} />
                <span>Play Now</span>
              </button>
            </div>
          )}

          {/* COMPOSER WIDGET */}
          <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center space-x-2">
              <MessageCircle size={16} className="text-teal-600" />
              <span>Ask a question in {activeChannel}</span>
            </h3>
            
            <form onSubmit={handlePostSubmit}>
              <div className="relative border border-slate-200 rounded-2xl bg-slate-50 focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 transition-all overflow-hidden flex flex-col">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={activeChannel === "General Lounge" ? "Share a thought, study tip, or just say hi..." : "Type your clinical doubt, or upload a photo of your notes/scans..."}
                  className="w-full bg-transparent p-4 min-h-24 resize-none focus:outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
                
                {/* Image Preview Area */}
                {selectedImage && (
                  <div className="px-4 pb-4">
                    <div className="relative inline-block">
                      <img src={selectedImage} alt="Upload preview" className="h-32 w-auto rounded-lg border border-slate-200 object-cover shadow-sm" />
                      <button 
                        type="button" 
                        onClick={() => setSelectedImage(null)} 
                        className="absolute -top-2 -right-2 bg-white rounded-full text-slate-400 hover:text-red-500 shadow-md transition-colors"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>
                  </div>
                )}

                {/* AI Loading State Overlay */}
                {isEnhancing && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="flex items-center space-x-2 text-blue-800 font-bold text-xs">
                      <Sparkles size={14} className="animate-pulse text-teal-500" />
                      <span>Formatting Clinically...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  
                  {/* Image Upload Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-white text-blue-700 border border-blue-200 hover:bg-blue-50 transition-colors"
                  >
                    <ImagePlus size={14} />
                    <span>Add Photo</span>
                  </button>
                  {/* Hidden File Input */}
                  <input 
                    type="file" 
                    accept="image/*" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleImageChange} 
                  />

                  {/* Anonymous Toggle */}
                  <button
                    type="button"
                    onClick={() => setIsAnonymous(!isAnonymous)}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition-colors border ${
                      isAnonymous ? "bg-slate-800 text-white border-slate-800 shadow-sm" : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    <Ghost size={14} />
                    <span>{isAnonymous ? "Posting Anonymously" : "Post Anonymously"}</span>
                  </button>

                  {/* AI Enhance Button */}
                  {activeChannel !== "General Lounge" && (
                    <button
                      type="button"
                      onClick={handleEnhanceClinically}
                      disabled={!inputText.trim() || isEnhancing}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 transition-colors disabled:opacity-50"
                    >
                      <Sparkles size={14} />
                      <span>Enhance Clinically</span>
                    </button>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={(!inputText.trim() && !selectedImage) || isEnhancing}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <span>Post</span>
                  <Send size={14} />
                </button>
              </div>
            </form>
          </div>

          {/* POSTS FEED */}
          <div className="space-y-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
                  
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0 ${
                        post.isAnonymous ? "bg-slate-100 border-slate-200 text-slate-500" : "bg-blue-50 border-blue-100 text-blue-800"
                      }`}>
                        {post.isAnonymous ? <Ghost size={18} /> : <span className="font-bold text-sm">{post.author.charAt(0)}</span>}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
                          {post.badge && (
                            <span className="flex items-center space-x-1 px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[9px] font-bold uppercase tracking-wider">
                              <CheckCircle2 size={10} />
                              <span>{post.badge}</span>
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">{post.timeAgo}</span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600"><MoreHorizontal size={18} /></button>
                  </div>

                  {/* Post Content */}
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap mb-4">
                    {post.content}
                  </p>

                  {/* Post Image Render (If Available) */}
                  {post.imageUrl && (
                    <div className="mb-5 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img 
                        src={post.imageUrl} 
                        alt="Post Attachment" 
                        className="w-full max-h-[400px] object-contain"
                      />
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-[11px] font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-6 border-t border-slate-100 pt-4">
                    <button className="flex items-center space-x-1.5 text-slate-500 hover:text-blue-700 transition-colors">
                      <ThumbsUp size={16} />
                      <span className="text-xs font-bold">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-slate-500 hover:text-teal-600 transition-colors">
                      <MessageCircle size={16} />
                      <span className="text-xs font-bold">{post.comments} Answers</span>
                    </button>
                    <button className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-900 transition-colors ml-auto">
                      <Share2 size={16} />
                      <span className="text-xs font-bold hidden sm:inline">Share</span>
                    </button>
                  </div>
                </div>
              ))
            ) : (
              // Empty Feed State
              <div className="bg-white rounded-3xl border border-slate-200 p-16 flex flex-col items-center justify-center text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4 border border-slate-100">
                  <MessageCircle size={32} />
                </div>
                <h3 className="text-lg font-bold font-serif text-slate-900 mb-2">No discussions yet in {activeChannel}</h3>
                <p className="text-sm text-slate-500 max-w-sm">Be the first to start a clinical discussion or ask a doubt!</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL: GENERAL LOUNGE STUDY GAME */}
      {showGameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-blue-900 px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center space-x-2">
                <Gamepad2 size={18} className="text-teal-400" />
                <h3 className="text-sm font-bold">Medical Scramble Game</h3>
              </div>
              <button onClick={() => setShowGameModal(false)} className="text-blue-200 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-8 text-center bg-slate-50">
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block mb-2">Guess the Bone</span>
              <h2 className="text-3xl font-bold tracking-widest text-slate-900 mb-6 drop-shadow-sm">S P C A L U A</h2>
              
              <input 
                type="text" 
                placeholder="Type your answer here..."
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-center font-bold focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all mb-4 uppercase"
              />
              <button className="w-full py-3 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-sm">
                Submit Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}