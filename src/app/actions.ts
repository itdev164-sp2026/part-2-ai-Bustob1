"use server"

import { redirect } from "next/navigation"

import { authSchema, projectSchema } from "@/lib/schemas"
import { createServerActionSupabaseClient } from "@/lib/supabase/server"

export type CreateProjectResponse =
  | { success: true }
  | { success: false; error: string }

export type AuthActionResponse =
  | { success: true }
  | { success: false; error: string }

export async function signInAction(
  formData: FormData
): Promise<AuthActionResponse> {
  const email = formData.get("email")?.toString().trim() ?? ""
  const password = formData.get("password")?.toString() ?? ""

  const parsed = authSchema.safeParse({ email, password })

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid credentials",
    }
  }

  const supabase = createServerActionSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return { success: false, error: error.message }
  }

  redirect("/projects")
}

export async function signUpAction(
  formData: FormData
): Promise<AuthActionResponse> {
  const email = formData.get("email")?.toString().trim() ?? ""
  const password = formData.get("password")?.toString() ?? ""

  const parsed = authSchema.safeParse({ email, password })

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid registration data",
    }
  }

  const supabase = createServerActionSupabaseClient()
  const { error } = await supabase.auth.signUp(parsed.data)

  if (error) {
    return { success: false, error: error.message }
  }

  redirect("/projects")
}

export async function signOutAction(): Promise<void> {
  const supabase = createServerActionSupabaseClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  redirect("/login")
}

export async function createProjectAction(
  data: unknown
): Promise<CreateProjectResponse> {
  const parsed = projectSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid project data",
    }
  }

  const supabase = createServerActionSupabaseClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, error: "Authentication required" }
  }

  const { error } = await supabase
    .from("Projects")
    .insert([{ ...parsed.data, user_id: user.id }])

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}