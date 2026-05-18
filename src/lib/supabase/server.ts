import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!

type CookieRecord = {
  name: string
  value: string
  options?: Record<string, unknown>
}

function createCookieStore() {
  const cookieStore = cookies()

  return {
    getAll: () => cookieStore.getAll().map(({ name, value }) => ({ name, value })),
    setAll: (cookiesToSet: CookieRecord[]) => {
      cookiesToSet.forEach(({ name, value, options }) => {
        cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
      })
    },
  }
}

export function createServerComponentSupabaseClient() {
  const cookieStore = createCookieStore()

  return createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll: cookieStore.getAll,
      setAll: cookieStore.setAll,
    },
  })
}

export function createServerActionSupabaseClient() {
  return createServerComponentSupabaseClient()
}
