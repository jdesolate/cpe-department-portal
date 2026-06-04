import { createClient } from '@/lib/supabase-server'
import { getUserRole } from '@/lib/auth'
import Link from 'next/link'
import { Megaphone, Pin, Plus, ArrowRight } from 'lucide-react'
import FadeInView from '@/components/animations/FadeInView'

export default async function AdminDashboard() {
  const supabase = await createClient()
  const role = await getUserRole()

  const [
    { count: totalAnnouncements },
    { count: pinnedCount },
    { data: recentAnnouncements },
  ] = await Promise.all([
    supabase.from('announcements').select('*', { count: 'exact', head: true }),
    supabase.from('announcements').select('*', { count: 'exact', head: true }).is('is_pinned', true),
    supabase
      .from('announcements')
      .select('id, title, category, is_pinned, is_private, created_at')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  return (
    <div className="p-6 md:p-8 max-w-4xl">

      <FadeInView>
        <div className="mb-8">
          <p className="font-mono text-accent-glow text-xs uppercase tracking-widest mb-2">
            // admin.dashboard
          </p>
          <h1 className="text-3xl font-black text-text-primary">
            Admin <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-text-muted text-sm mt-1">
            Manage department content and communications.
            {role && (
              <span className="ml-2 font-mono text-text-dim">
                Role: <span className="text-grad-violet">{role}</span>
              </span>
            )}
          </p>
        </div>
      </FadeInView>

      {/* Stats */}
      <FadeInView delay={0.05}>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass-card glow-border rounded-2xl p-5">
            <p className="text-text-dim text-xs font-mono mb-2 flex items-center gap-1.5">
              <Megaphone size={12} />
              Total Announcements
            </p>
            <p className="text-4xl font-black gradient-text">{totalAnnouncements ?? 0}</p>
          </div>
          <div className="glass-card glow-border rounded-2xl p-5">
            <p className="text-text-dim text-xs font-mono mb-2 flex items-center gap-1.5">
              <Pin size={12} />
              Pinned Notices
            </p>
            <p className="text-4xl font-black gradient-text">{pinnedCount ?? 0}</p>
          </div>
        </div>
      </FadeInView>

      {/* Quick actions */}
      <FadeInView delay={0.1}>
        <div className="glass-card glow-border rounded-2xl p-6 mb-8">
          <h2 className="text-sm font-bold text-text-primary mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/dashboard/announcements">
              <button className="flex items-center gap-2 bg-linear-to-r from-grad-blue via-grad-violet to-grad-cyan text-white font-semibold text-sm rounded-xl px-5 py-2.5 glow-btn hover:opacity-90 transition-all active:scale-95 cursor-pointer">
                <Plus size={14} />
                New Announcement
              </button>
            </Link>
          </div>
        </div>
      </FadeInView>

      {/* Recent announcements */}
      <FadeInView delay={0.15}>
        <div className="glass-card glow-border rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-border-subtle flex items-center justify-between">
            <h2 className="text-sm font-bold text-text-primary flex items-center gap-2">
              <Megaphone size={14} className="text-accent-glow" />
              Recent Announcements
            </h2>
            <Link
              href="/admin/dashboard/announcements"
              className="text-xs font-mono text-accent-glow hover:opacity-75 transition-opacity flex items-center gap-1"
            >
              Manage <ArrowRight size={11} />
            </Link>
          </div>

          {!recentAnnouncements || recentAnnouncements.length === 0 ? (
            <div className="px-6 py-10 text-center">
              <p className="text-text-dim text-sm">No announcements yet.</p>
              <Link
                href="/admin/dashboard/announcements"
                className="text-xs text-accent-glow font-mono hover:opacity-75 transition-opacity mt-2 inline-block"
              >
                Create the first one →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border-subtle">
              {recentAnnouncements.map((item) => (
                <div key={item.id} className="px-6 py-3.5 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      {item.is_pinned && (
                        <span className="text-[10px] font-mono font-bold bg-grad-blue/15 text-grad-blue border border-grad-blue/25 px-1.5 py-px rounded-full">
                          PIN
                        </span>
                      )}
                      {item.is_private && (
                        <span className="text-[10px] font-mono font-bold bg-bg-elevated text-text-dim border border-border-subtle px-1.5 py-px rounded-full">
                          PRIVATE
                        </span>
                      )}
                      <span className="text-[10px] text-text-dim font-mono">{item.category}</span>
                    </div>
                    <p className="text-sm font-medium text-text-primary truncate">{item.title}</p>
                  </div>
                  <p className="text-[11px] text-text-dim font-mono shrink-0">
                    {new Date(item.created_at).toLocaleDateString('en-PH', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeInView>

    </div>
  )
}
