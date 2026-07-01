import { redirect } from 'next/navigation'
import { getUserRole, getCurrentUser } from '@/lib/auth'
import AdminSidebar from './_components/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [role, user] = await Promise.all([getUserRole(), getCurrentUser()])

  if (!role && process.env.NODE_ENV !== 'development') redirect('/login')

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <AdminSidebar userEmail={user?.email ?? ''} role={role} />
      <main className="flex-1 overflow-auto min-w-0">
        {children}
      </main>
    </div>
  )
}
