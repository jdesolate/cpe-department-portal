"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#program", label: "Programs" },
  { href: "/faculty", label: "Faculty" },
  { href: "/#featured-projects", label: "Projects" },
  { href: "/#research", label: "Research" },
  { href: "/events", label: "Events" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        className="flex items-center justify-center w-11 h-11 -mr-2 rounded-[4px] hover:bg-card transition-colors"
      >
        <span className="relative block w-5 h-4">
          <span
            className={cn(
              "absolute left-0 top-0 w-5 h-[2px] bg-foreground transition-transform duration-200",
              open && "translate-y-[7px] rotate-45"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-[7px] w-5 h-[2px] bg-foreground transition-opacity duration-200",
              open && "opacity-0"
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-[14px] w-5 h-[2px] bg-foreground transition-transform duration-200",
              open && "-translate-y-[7px] -rotate-45"
            )}
          />
        </span>
      </button>

      {open && (
        <div className="absolute top-16 inset-x-0 border-b border-line bg-background shadow-lg">
          <nav className="flex flex-col px-4 py-2">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-sm font-medium text-gray hover:text-foreground transition-colors border-b border-line last:border-b-0"
              >
                {label}
              </Link>
            ))}
            <a
              href={process.env.NEXT_PUBLIC_INTERNAL_APP_URL ?? "#"}
              onClick={() => setOpen(false)}
              className="py-3"
            >
              <Button variant="solid" className="w-full text-xs h-11">
                Portal Login
              </Button>
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
