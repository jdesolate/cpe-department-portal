'use server'

import { createClient } from '@/lib/supabase-server'
import { getUserRole } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

async function assertCanManage() {
  const role = await getUserRole()
  if (!role || !['admin', 'faculty'].includes(role)) {
    throw new Error('Unauthorized')
  }
}

export type ActionState = { error: string } | { success: true } | null

export async function saveAnnouncement(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  await assertCanManage()
  const supabase = await createClient()

  const id = formData.get('id') as string | null
  const payload = {
    title: (formData.get('title') as string).trim(),
    content: ((formData.get('content') as string) || '').trim() || null,
    category: (formData.get('category') as string) || 'General',
    is_pinned: formData.get('is_pinned') === 'on',
    is_private: formData.get('is_private') === 'on',
    expires_at: (formData.get('expires_at') as string) || null,
  }

  if (!payload.title) {
    return { error: 'Title is required.' }
  }

  const { error } = id
    ? await supabase.from('announcements').update(payload).eq('id', id)
    : await supabase.from('announcements').insert(payload)

  if (error) return { error: error.message }

  revalidatePath('/admin/dashboard/announcements')
  revalidatePath('/admin/dashboard')
  revalidatePath('/')
  return { success: true }
}

export async function deleteAnnouncement(id: string): Promise<void> {
  await assertCanManage()
  const supabase = await createClient()
  await supabase.from('announcements').delete().eq('id', id)
  revalidatePath('/admin/dashboard/announcements')
  revalidatePath('/admin/dashboard')
  revalidatePath('/')
}

export async function togglePin(id: string, isPinned: boolean): Promise<void> {
  await assertCanManage()
  const supabase = await createClient()
  await supabase.from('announcements').update({ is_pinned: isPinned }).eq('id', id)
  revalidatePath('/admin/dashboard/announcements')
  revalidatePath('/admin/dashboard')
  revalidatePath('/')
}
