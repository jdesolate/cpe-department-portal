import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

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
    <html lang="en" className={cn("font-sans scroll-smooth", inter.variable)}>
      <body className="bg-slate-50 text-slate-900 flex flex-col min-h-screen antialiased">

        {/* Navigation Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-50 transition-all">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

            {/* Brand Identity / Logo */}
            <Link href="/" className="flex items-center gap-3 cursor-pointer group">
              <Image
                src="/cit_cpe_logo.png"
                alt="CpE Portal Logo"
                width={32}
                height={32}
                className="object-contain transition-transform group-hover:scale-110 duration-200"
                priority
              />
              <span className="font-black text-lg tracking-tight text-slate-800 group-hover:text-university-maroon transition-colors">
                CpE Portal
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
              <Link href="/" className="hover:text-university-maroon transition-colors">Home</Link>
              <Link href="/faculty" className="hover:text-university-maroon transition-colors">Faculty</Link>
              <Link href="/achievements" className="hover:text-university-maroon transition-colors">Achievements</Link>

              <Link href="/login">
                <Button className="bg-university-maroon hover:bg-[#5a0c22] text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer px-5 h-9 transition-all active:scale-95">
                  Student Login
                </Button>
              </Link>
            </nav>

            {/* Mobile Action Links */}
            <div className="flex md:hidden items-center gap-2">
              <Link href="/faculty" className="text-xs text-slate-600 font-bold px-2 py-1.5 hover:bg-slate-100 rounded-md transition-colors">
                Faculty
              </Link>
              <Link href="/login">
                <Button className="bg-university-maroon hover:bg-[#5a0c22] text-white font-bold text-[11px] rounded-lg px-3 h-8 active:scale-95 transition-all">
                  Login
                </Button>
              </Link>
            </div>

          </div>
        </header>

        {/* Dynamic Page Content Shell */}
        <div className="flex-1">
          {children}
        </div>

        {/* Global Footer (Isolated seamlessly from specific page overrides) */}
        <footer className="bg-slate-950 text-slate-500 text-xs py-8 border-t border-slate-900 text-center font-mono">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p>&copy; {new Date().getFullYear()} Computer Engineering Department. Institutional Cloud Network.</p>
            <p className="text-slate-700">Protected via OAuth Domain Verification & Row-Level Security (RLS)</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
