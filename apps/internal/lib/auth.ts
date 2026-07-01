import { createClient } from './supabase-server'

export type Role = 'admin' | 'faculty' | 'org_officer'

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export async function getUserRole(): Promise<Role | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  return (data?.role as Role) ?? null
}

export async function hasRole(required: Role): Promise<boolean> {
  const role = await getUserRole()
  if (role === 'admin') return true
  return role === required
}

export async function isStudent(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user?.email?.endsWith('@cit.edu')
}
