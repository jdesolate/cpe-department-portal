"use client";

import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface Props {
  mobile?: boolean;
}

export function NavUserMenu({ mobile }: Props) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  if (mobile) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/admin/dashboard">
          <button className="bg-linear-to-r from-grad-blue to-grad-cyan text-white font-bold text-[11px] rounded-lg px-3 h-8 active:scale-95 transition-all cursor-pointer">
            Dashboard
          </button>
        </Link>
        {!isAdmin && (
          <button
            onClick={handleSignOut}
            disabled={loading}
            className="text-[11px] text-text-muted font-semibold px-2 py-1.5 hover:bg-bg-surface hover:text-red-400 rounded-md transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "…" : "Sign out"}
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 ml-2">
      <Link href="/admin/dashboard">
        <button className="bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-bold text-xs rounded-lg px-5 h-9 glow-btn hover:opacity-90 transition-all active:scale-95 cursor-pointer">
          Dashboard
        </button>
      </Link>
      {!isAdmin && (
        <button
          onClick={handleSignOut}
          disabled={loading}
          className="text-xs text-text-muted font-semibold px-3 h-9 hover:bg-bg-surface hover:text-red-400 rounded-lg transition-all disabled:opacity-50 cursor-pointer"
        >
          {loading ? "…" : "Sign out"}
        </button>
      )}
    </div>
  );
}
