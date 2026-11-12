"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bot, X, Send, Sparkles, User, RefreshCcw } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
}

export default function AIChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg-1",
      role: "ai",
      content: "Hello! I am your AI Clinical Tutor. I can help you with anatomy, biomechanics, or rehab protocols. What would you like to ask?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  if (pathname?.includes("/student/profile")) {
    return null;
  }

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: "user", content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "That's a great clinical question! The standard assessment involves checking dermatomes, myotomes, and reflexes. Should we review the specific nerve roots?"
      };
      setMessages((prev) => [...prev, newAiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    // FIXED POSITION: Shifted to bottom-right
    <div className="fixed bottom-6 right-6 z-9999">
      
      {/* CHAT WINDOW: Strictly constrained height and width */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[320px] sm:w-[360px] h-120 max-h-[75vh] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-3 duration-300">
          
          {/* Header */}
          <div className="bg-blue-900 p-3.5 flex items-center justify-between text-white shadow-sm z-10 shrink-0">
            <div className="flex items-center space-x-3">
              {/* Purana Robot Icon */}
              <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center border border-blue-700 shadow-inner">
                <Bot className="text-teal-300" size={16} />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">AI Clinical Tutor</h3>
                <span className="text-[10px] text-teal-300 font-medium flex items-center space-x-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_rgba(45,212,191,0.8)]"></span>
                  <span>Online</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 hover:bg-blue-800 rounded-full transition-colors text-blue-200 hover:text-white"
                title="Reset Chat"
              >
                <RefreshCcw size={14} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-red-500 hover:text-white rounded-full transition-colors text-blue-200"
                title="Close"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4 scrollbar-none">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-end space-x-2 ${msg.role === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                
                {/* Purana Avatar Logic */}
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mb-1 ${
                  msg.role === "user" ? "bg-teal-600 text-white shadow-sm" : "bg-blue-100 text-blue-800 shadow-sm"
                }`}>
                  {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                </div>
                
                <div className={`max-w-[82%] p-3 text-sm leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-blue-900 text-white rounded-2xl rounded-br-sm" 
                    : "bg-white border border-slate-200 text-slate-800 rounded-2xl rounded-bl-sm"
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-end space-x-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mb-1">
                  <Bot size={12} />
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && !isTyping && (
            <div className="px-4 pb-2 bg-slate-50 flex flex-wrap gap-2 shrink-0">
              {["Explain ACL Tear", "UMN vs LMN"].map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-blue-800 hover:border-blue-300 hover:bg-blue-50 transition-colors shadow-sm flex items-center"
                >
                  <Sparkles className="mr-1 text-teal-500" size={10} />
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }} 
            className="p-3 bg-white border-t border-slate-200 flex items-end space-x-2 shrink-0"
          >
            <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl flex items-center px-3 py-1 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(input);
                  }
                }}
                placeholder="Ask clinical doubt..."
                className="flex-1 max-h-20 min-h-10 bg-transparent border-none focus:outline-none resize-none py-2.5 text-xs text-slate-900 placeholder:text-slate-400"
                rows={1}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 shrink-0 rounded-xl bg-blue-900 text-white flex items-center justify-center hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
            >
              <Send className="ml-0.5" size={16} />
            </button>
          </form>
        </div>
      )}

      {/* FLOATING ACTION BUTTON (FAB) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 ${
          isOpen 
            ? "bg-slate-100 text-slate-600 border-slate-200 rotate-90 scale-90" 
            : "bg-blue-900 text-white border-blue-900 hover:bg-blue-800"
        }`}
      >
        {/* Purana Main Button Avatar */}
        {isOpen ? <X size={24} /> : <Bot className="text-teal-300" size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-teal-500 border-2 border-white rounded-full animate-pulse"></span>
        )}
      </button>
    </div>
  );
}