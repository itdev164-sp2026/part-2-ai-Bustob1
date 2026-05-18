import { NextResponse, type NextRequest } from "next/server"

import { createMiddlewareSupabaseClient } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const supabase = createMiddlewareSupabaseClient(request, response)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  const isProjectsRoute = pathname.startsWith("/projects")
  const isLoginRoute = pathname === "/login"

  if (isProjectsRoute && !user) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isLoginRoute && user) {
    return NextResponse.redirect(new URL("/projects", request.url))
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
