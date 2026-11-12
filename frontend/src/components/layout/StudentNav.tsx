"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, Users, User } from "lucide-react";

export function StudentNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/student/dashboard", icon: Home },
    { label: "Study", href: "/student/study", icon: BookOpen },
    { label: "Community", href: "/student/community", icon: Users },
    { label: "Profile", href: "/student/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border-light py-2 px-6 sm:hidden shadow-soft">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/student/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 py-1 transition-all ${
                isActive
                  ? "text-forest-800 font-semibold scale-105"
                  : "text-secondary-text hover:text-forest-800"
              }`}
            >
              <div
                className={`p-1.5 rounded-full transition-colors ${
                  isActive ? "bg-sage-100 text-forest-800" : ""
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}