import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

type CookieRecord = {
  name: string
  value: string
  options?: Record<string, unknown>
}

async function createCookieStore() {
  const cookieStore = await cookies()

  return {
    getAll: () => cookieStore.getAll().map(({ name, value }) => ({ name, value })),
    setAll: (cookiesToSet: CookieRecord[]) => {
      cookiesToSet.forEach(({ name, value, options }) => {
        cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
      })
    },
  }
}

export async function createServerComponentSupabaseClient() {
  const cookieStore = await createCookieStore()

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: cookieStore.getAll,
      setAll: cookieStore.setAll,
    },
  })
}

export async function createServerActionSupabaseClient() {
  return createServerComponentSupabaseClient()
}
