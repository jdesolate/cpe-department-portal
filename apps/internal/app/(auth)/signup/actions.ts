'use server'

import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export type SignUpState =
  | { success: true; email: string }
  | { error: string }
  | null

export async function signUpUser(
  prevState: SignUpState,
  formData: FormData
): Promise<SignUpState> {
  const email = (formData.get('email') as string).trim().toLowerCase()
  const password = formData.get('password') as string
  const role = (formData.get('role') as string) || null

  if (!email || !password) return { error: 'Email and password are required.' }
  if (password.length < 6) return { error: 'Password must be at least 6 characters.' }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return { error: 'SUPABASE_SERVICE_ROLE_KEY is not set in .env.local — cannot create accounts server-side.' }
  }

  const admin = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data: userData, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  })

  if (createError) {
    if (createError.message?.toLowerCase().includes('already registered')) {
      return { error: 'An account with this email already exists.' }
    }
    return { error: createError.message }
  }

  if (role && userData.user) {
    const { error: roleError } = await admin
      .from('user_roles')
      .insert({ user_id: userData.user.id, role })

    if (roleError) {
      return { error: `Account created but role assignment failed: ${roleError.message}` }
    }
  }

  return { success: true, email }
}
