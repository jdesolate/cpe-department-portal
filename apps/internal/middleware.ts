import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Routes requiring a logged-in user (any account)
const STUDENT_ROUTES = ['/freedom-wall/submit', '/schedule', '/feedback']

// Routes requiring org_officer or admin role
const ORG_ROUTES = ['/raffle']

// Routes requiring any assigned role (faculty / org_officer / admin)
const ADMIN_ROUTES = ['/admin']

export async function middleware(request: NextRequest) {
  // Build a response we can attach refreshed session cookies to
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Do not add logic between createServerClient and getUser().
  // getUser() refreshes the session cookie — any early return would drop it.
  const { data: { user } } = await supabase.auth.getUser()

  const path = request.nextUrl.pathname
  const isStudentRoute = STUDENT_ROUTES.some(r => path.startsWith(r))
  const isOrgRoute = ORG_ROUTES.some(r => path.startsWith(r))
  const isAdminRoute = ADMIN_ROUTES.some(r => path.startsWith(r))
  const isProtected = isStudentRoute || isOrgRoute || isAdminRoute

  if (!isProtected) return supabaseResponse

  // Not logged in → login page
  if (!user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('next', path)
    return NextResponse.redirect(loginUrl)
  }

  // Org/admin routes also require a role assignment
  if (isOrgRoute || isAdminRoute) {
    const { data: roleData } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single()

    const role = roleData?.role as string | undefined

    const isDev = process.env.NODE_ENV === 'development'

    if (!isDev && isOrgRoute && !['org_officer', 'admin'].includes(role ?? '')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (!isDev && isAdminRoute && !role) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
