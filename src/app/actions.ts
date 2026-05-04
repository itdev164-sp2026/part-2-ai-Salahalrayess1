"use server"

import { projectSchema } from "@/lib/schemas"
import { supabase } from "@/lib/supabase"

export async function createProject(data: unknown) {
  const parsed = projectSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
    }
  }

  const { error } = await supabase
    .from("projects")
    .insert([parsed.data])

  if (error) {
    return {
      success: false,
      error: error.message,
    }
  }

  return {
    success: true,
  }
}
