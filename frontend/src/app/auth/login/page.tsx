"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("student@physioiinsider.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Pure Frontend Simulation (No backend required)
    setTimeout(() => {
      // Save mock session locally
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "physio_user",
          JSON.stringify({
            name: "Shahid Iqbal",
            email: email,
            role: "student",
            program: "BPT • 3rd Year",
          })
        );
      }
      setLoading(false);
      router.push("/student/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F5F4EF] flex flex-col justify-center items-center px-4 py-8">
      {/* Centered Rounded Card */}
      <div className="w-full max-w-[390px] bg-white rounded-[28px] p-7 sm:p-8 shadow-[0_4px_25px_rgba(20,36,32,0.06)] border border-[#E3E8E0]">
        
        {/* Brand Logo & Graphic */}
        <div className="text-center mb-6">
          <Link href="/" className="inline-block">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#E8F0E8] flex items-center justify-center">
              <svg
                className="w-8 h-8 text-[#145B46]"
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
          </Link>
          <h1 className="text-2xl font-bold font-serif text-[#142420] tracking-tight">
            Physioiinsider
          </h1>
          <h2 className="text-sm font-semibold text-[#145B46] mt-2">
            Welcome Back
          </h2>
          <p className="text-[12px] text-[#6E756F] mt-0.5">
            Sign in to continue your learning journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3.5 top-3.5 text-[#6E756F]" size={17} />
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Phone Number"
              className="w-full pl-10 pr-4 py-3 bg-[#FAF9F5] border border-[#E3E8E0] rounded-2xl text-xs text-[#142420] placeholder:text-[#6E756F] focus:outline-none focus:border-[#6F9B83] focus:bg-white transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3.5 top-3.5 text-[#6E756F]" size={17} />
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 bg-[#FAF9F5] border border-[#E3E8E0] rounded-2xl text-xs text-[#142420] placeholder:text-[#6E756F] focus:outline-none focus:border-[#6F9B83] focus:bg-white transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-[#6E756F] hover:text-[#142420]"
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          {/* Remember me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-0.5 px-0.5">
            <label className="flex items-center space-x-2 text-[#6E756F] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#E3E8E0] accent-[#145B46] cursor-pointer"
              />
              <span className="text-[11px]">Remember me</span>
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-[11px] text-[#145B46] font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Sign In Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 mt-2 bg-[#145B46] text-white rounded-full font-semibold text-xs tracking-wide hover:bg-[#12453A] transition-all shadow-sm flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E3E8E0]" />
          </div>
          <span className="relative bg-white px-3 text-[11px] text-[#6E756F]">
            or
          </span>
        </div>

        {/* Continue with Google */}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-2.5 px-4 bg-[#FAF9F5] border border-[#E3E8E0] rounded-full text-xs font-medium text-[#142420] flex items-center justify-center space-x-2 hover:bg-[#EFECE3] transition-colors cursor-pointer"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-xs text-[#6E756F]">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[#145B46] font-bold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}