"use server"

import { projectSchema } from "@/lib/schemas"
import { supabase } from "@/lib/supabase"

export type CreateProjectResponse =
  | { success: true }
  | { success: false; error: string }

export async function createProjectAction(
  data: unknown
): Promise<CreateProjectResponse> {
  const parsed = projectSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.errors[0]?.message ?? "Invalid project data",
    }
  }

  const { error } = await supabase.from("Projects").insert([parsed.data])

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
