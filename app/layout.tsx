import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "CpE Department Portal",
  description: "Digital Hub for Computer Engineering Students & Faculty",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className="bg-slate-50 text-slate-900 flex flex-col min-h-screen">
        {/* Navigation Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

            {/* Brand Identity / Logo */}
            <div className="flex items-center gap-3 cursor-pointer">
              <span className="text-2xl">💻</span>
              <span className="font-bold text-lg tracking-tight text-slate-800">
                CpE Portal
              </span>
            </div>

            {/* Desktop Navigation Links (Hidden on small screens, flexes on desktop) */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <a href="/" className="hover:text-university-maroon transition cursor-pointer">Home</a>
              <a href="/faculty" className="hover:text-university-maroon transition cursor-pointer">Faculty</a>
              <a href="/achievements" className="hover:text-university-maroon transition cursor-pointer">Achievements</a>
              <Button className="bg-org-blue hover:bg-blue-700 text-white font-medium text-xs rounded-md shadow-xs cursor-pointer px-4 h-9">
                Student Login
              </Button>
            </nav>

            {/* Mobile Action Button (Only visible on smartphones) */}
            <div className="flex md:hidden items-center gap-2">
              <a href="/faculty" className="text-xs text-slate-600 font-medium px-2 py-1 hover:bg-slate-100 rounded-md cursor-pointer">
                Faculty
              </a>
              <Button className="bg-org-blue hover:bg-blue-700 text-white font-medium text-[11px] rounded-md px-3 h-8 cursor-pointer">
                Login
              </Button>
            </div>

          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="bg-slate-800 text-slate-400 text-sm py-6 border-t border-slate-700 text-center">
          <p>© {new Date().getFullYear()} Computer Engineering Department. All Rights Reserved.</p>
        </footer>
      </body>
    </html>
  );
}
