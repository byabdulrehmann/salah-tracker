import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import DashboardView from '@/components/dashboard-view'

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  return <DashboardView />
}
