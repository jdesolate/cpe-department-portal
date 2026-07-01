import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-space-grotesk",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  title: "CpE Department — CIT-U",
  description: "Computer Engineering Department, Cebu Institute of Technology – University",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans scroll-smooth",
        spaceGrotesk.variable,
        plexSans.variable,
        plexMono.variable
      )}
    >
      <body className="bg-ink text-paper flex flex-col min-h-screen antialiased">

        {/* Navigation Header */}
        <header className="sticky top-0 z-50 border-b border-line bg-ink">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

            {/* Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/cit_cpe_logo.png"
                alt="CpE Department Logo"
                width={32}
                height={32}
                className="object-contain transition-transform group-hover:scale-110 duration-200"
                priority
              />
              <span className="font-display font-semibold text-lg tracking-tight text-paper group-hover:text-gold transition-colors">
                CpE Department
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray">
              {[
                { href: "/", label: "Home" },
                { href: "/faculty", label: "Faculty" },
                { href: "/events", label: "Events" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-2 rounded-[4px] hover:bg-panel hover:text-paper transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
              <a href={process.env.NEXT_PUBLIC_INTERNAL_APP_URL ?? "#"} className="ml-2">
                <Button variant="solid" className="text-[11px] h-9 px-5">
                  Staff Login
                </Button>
              </a>
            </nav>

            {/* Mobile Nav */}
            <div className="flex md:hidden items-center gap-2">
              <Link href="/events" className="text-xs text-gray font-semibold px-2 py-1.5 hover:bg-panel rounded-[4px] transition-colors">
                Events
              </Link>
              <a href={process.env.NEXT_PUBLIC_INTERNAL_APP_URL ?? "#"}>
                <Button variant="solid" className="text-[10px] h-8 px-3">
                  Login
                </Button>
              </a>
            </div>

          </div>
        </header>

        {/* Page Content */}
        <div className="relative z-10 flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-line bg-panel-2 text-gray text-xs py-8 text-center font-mono">
          <div className="trace-line absolute top-0 inset-x-0" />
          <div className="max-w-7xl mx-auto px-4 space-y-1.5">
            <p className="text-gray">
              &copy; {new Date().getFullYear()} Computer Engineering Department
            </p>
            <p>Cebu Institute of Technology – University</p>
            <p>
              GLE Building, 7th Floor · (032) 411-2000 loc. 189 ·{" "}
              <a
                href="https://www.facebook.com/cituCPE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold hover:text-gold-dim transition-colors"
              >
                facebook.com/cituCPE
              </a>
            </p>
          </div>
        </footer>

      </body>
    </html>
  );
}
