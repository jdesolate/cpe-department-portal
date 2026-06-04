import { createClient } from '@/lib/supabase-server'
import AnnouncementsManager from './AnnouncementsManager'

export default async function AnnouncementsPage() {
  const supabase = await createClient()

  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .order('is_pinned', { ascending: false })
    .order('created_at', { ascending: false })

  return <AnnouncementsManager initialAnnouncements={announcements ?? []} />
}
