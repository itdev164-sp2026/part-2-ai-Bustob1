import { redirect } from "next/navigation"

import { AuthCard } from "@/components/auth-card"
import { createServerComponentSupabaseClient } from "@/lib/supabase/server"

export default async function LoginPage() {
  const supabase = await createServerComponentSupabaseClient()
  const { data } = await supabase.auth.getUser()

  if (data.user) {
    redirect("/projects")
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-background p-4">
      <AuthCard />
    </div>
  )
}
