import type { Metadata } from "next";
import "./globals.css";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import MobileNav from "@/components/layout/MobileNav";

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

const siteName = "Computer Engineering Department — CIT-U";
const description =
  "Cebu Institute of Technology – University's Computer Engineering Department builds industry-ready software and embedded systems engineers through student projects, research, competitions, and professional activities.";

export const metadata: Metadata = {
  // Set NEXT_PUBLIC_SITE_URL in production so Open Graph/Twitter image URLs resolve absolutely.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3100"),
  title: {
    default: siteName,
    template: "%s — CpE Department, CIT-U",
  },
  description,
  openGraph: {
    title: siteName,
    description,
    siteName,
    type: "website",
    // TODO: replace with a dedicated 1200x630 share image once available.
    images: ["/cit_cpe_logo.png"],
  },
  twitter: {
    card: "summary",
    title: siteName,
    description,
    images: ["/cit_cpe_logo.png"],
  },
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
      <body className="bg-background text-foreground flex flex-col min-h-screen antialiased">

        {/* Navigation Header */}
        <header className="sticky top-0 z-50 border-b border-line bg-background">
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
              <span className="font-display font-semibold text-lg tracking-tight text-foreground group-hover:text-gold-text transition-colors">
                CpE Department
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray">
              {[
                { href: "/", label: "Home" },
                { href: "/#program", label: "Programs" },
                { href: "/faculty", label: "Faculty" },
                { href: "/#featured-projects", label: "Projects" },
                { href: "/#research", label: "Research" },
                { href: "/events", label: "Events" },
                { href: "/#services", label: "Services" },
                { href: "/#contact", label: "Contact" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="px-3 py-2 rounded-[4px] hover:bg-card hover:text-foreground transition-colors duration-150"
                >
                  {label}
                </Link>
              ))}
              <a href={process.env.NEXT_PUBLIC_INTERNAL_APP_URL ?? "#"} className="ml-2">
                <Button variant="solid" className="text-[11px] h-9 px-5">
                  Portal Login
                </Button>
              </a>
            </nav>

            {/* Mobile Nav */}
            <MobileNav />

          </div>
        </header>

        {/* Page Content */}
        <div className="relative z-10 flex-1">
          {children}
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-line bg-card text-gray text-xs py-8 text-center font-mono">
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
                className="text-gold-text hover:text-maroon-bright transition-colors"
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
