'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Megaphone, ChevronRight, LogOut } from 'lucide-react'
import { createBrowserClient } from '@supabase/ssr'
import type { Role } from '@/lib/auth'

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/dashboard/announcements', label: 'Announcements', icon: Megaphone, exact: false },
]

export default function AdminSidebar({
  userEmail,
  role,
}: {
  userEmail: string
  role: Role | null
}) {
  const pathname = usePathname()

  const handleLogout = async () => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  return (
    <aside className="w-60 shrink-0 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto border-r border-border-subtle bg-bg-surface/60 backdrop-blur-md flex flex-col">

      {/* Panel header */}
      <div className="px-5 py-5 border-b border-border-subtle">
        <p className="font-mono text-accent-glow text-[10px] uppercase tracking-widest mb-2">
          // admin.panel
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="text-sm font-bold text-text-primary">Control Room</h2>
          {role && (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-grad-violet/15 text-grad-violet border border-grad-violet/25">
              {role}
            </span>
          )}
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href)
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-grad-blue/12 text-text-primary border border-grad-blue/25'
                  : 'text-text-muted hover:bg-bg-elevated hover:text-text-primary border border-transparent'
              }`}
            >
              <Icon size={15} className={isActive ? 'text-accent-glow' : ''} />
              <span className="flex-1">{label}</span>
              {isActive && <ChevronRight size={13} className="text-text-dim" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer — user info + logout */}
      <div className="px-4 py-4 border-t border-border-subtle space-y-2">
        <p className="text-[11px] text-text-dim font-mono truncate px-1" title={userEmail}>
          {userEmail}
        </p>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-text-muted hover:bg-red-500/10 hover:text-red-400 transition-all cursor-pointer"
        >
          <LogOut size={14} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}
