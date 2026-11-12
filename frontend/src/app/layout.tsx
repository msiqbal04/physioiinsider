import type { Metadata } from "next";
import "./globals.css"; // Yeh aapki global CSS file hai
import AIChatWidget from "@/components/AIChatWidget"; // Widget ka sahi path yahan check kar lein

export const metadata: Metadata = {
  title: "Physioiinsider | Learning Portal",
  description: "Advanced clinical learning for physiotherapy students.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
        
        {/* Aapki puri website yahan render hogi */}
        {children}
        
        {/* AI WIDGET HAMESHA BODY KE ANDAR, SABSE NEECHE RAHEGA */}
        <AIChatWidget />
        
      </body>
    </html>
  );
}