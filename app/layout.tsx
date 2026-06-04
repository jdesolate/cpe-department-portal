import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase-server";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CpE Department Portal",
  description: "Digital Hub for Computer Engineering Students & Faculty",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return (
    <html lang="en" className={cn("font-sans scroll-smooth", inter.variable)}>
      <body className="bg-bg-base text-text-primary flex flex-col min-h-screen antialiased">

        {/* Ambient gradient blobs — fixed, behind everything */}
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="absolute -top-60 -left-40 w-[600px] h-[600px] rounded-full bg-grad-blue/10 blur-[120px] animate-glow-pulse" />
          <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-grad-violet/10 blur-[120px] animate-glow-pulse [animation-delay:2s]" />
          <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-grad-cyan/8 blur-[100px] animate-glow-pulse [animation-delay:4s]" />
        </div>

        {/* Navigation Header */}
        <header className="sticky top-0 z-50 border-b border-border-subtle backdrop-blur-xl bg-bg-base/80 transition-all">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-grad-blue/20 blur-sm group-hover:bg-grad-blue/40 transition-all" />
                <Image
                  src="/cit_cpe_logo.png"
                  alt="CpE Portal Logo"
                  width={32}
                  height={32}
                  className="relative object-contain transition-transform group-hover:scale-110 duration-200"
                  priority
                />
              </div>
              <span className="font-black text-lg tracking-tight gradient-text group-hover:opacity-90 transition-opacity">
                CpE Portal
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-text-muted">
              {[
                { href: "/", label: "Home" },
                { href: "/faculty", label: "Faculty" },
                { href: "/events", label: "Events" },
                { href: "/raffle", label: "Raffle" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-2 rounded-lg hover:bg-bg-surface hover:text-text-primary transition-all duration-150"
                >
                  {label}
                </Link>
              ))}

              {user ? (
                <Link href="/admin/dashboard" className="ml-2">
                  <button className="bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-xs rounded-lg px-5 h-9 glow-btn hover:opacity-90 transition-all active:scale-95 cursor-pointer">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <Link href="/login" className="ml-2">
                  <button className="bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-xs rounded-lg px-5 h-9 glow-btn hover:opacity-90 transition-all active:scale-95 cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </nav>

            {/* Mobile Nav */}
            <div className="flex md:hidden items-center gap-2">
              <Link href="/events" className="text-xs text-text-muted font-semibold px-2 py-1.5 hover:bg-bg-surface rounded-md transition-colors">
                Events
              </Link>
              {user ? (
                <Link href="/admin/dashboard">
                  <button className="bg-linear-to-r from-grad-blue to-grad-cyan text-white font-bold text-[11px] rounded-lg px-3 h-8 active:scale-95 transition-all cursor-pointer">
                    Dashboard
                  </button>
                </Link>
              ) : (
                <Link href="/login">
                  <button className="bg-linear-to-r from-grad-blue to-grad-cyan text-white font-bold text-[11px] rounded-lg px-3 h-8 active:scale-95 transition-all cursor-pointer">
                    Login
                  </button>
                </Link>
              )}
            </div>

          </div>
        </header>

        {/* Page Content */}
        <div className="relative z-10 flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border-subtle bg-bg-surface/60 backdrop-blur-md text-text-dim text-xs py-8 text-center font-mono">
          <div
            className="absolute top-0 inset-x-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.4), rgba(139,92,246,0.4), rgba(6,182,212,0.4), transparent)" }}
          />
          <div className="max-w-7xl mx-auto px-4 space-y-1.5">
            <p className="text-text-muted">
              &copy; {new Date().getFullYear()} Computer Engineering Department
            </p>
            <p>OAuth Domain Verification · Row-Level Security · Supabase + Vercel</p>
          </div>
        </footer>

      </body>
    </html>
  );
}
