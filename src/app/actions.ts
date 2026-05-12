"use server"

import { redirect } from "next/navigation"
import { z } from "zod"

import { projectSchema } from "@/lib/schemas"
import { createSupabaseServerActionClient } from "@/lib/supabase/server-action"

export type AuthFormState = {
  error: string | null
  message: string | null
}

const authSchema = z.object({
  mode: z.enum(["signIn", "signUp"]),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export async function authenticate(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const parsed = authSchema.safeParse(Object.fromEntries(formData.entries()))

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Validation failed",
      message: null,
    }
  }

  const supabase = createSupabaseServerActionClient()
  const { mode, email, password } = parsed.data

  if (mode === "signUp") {
    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
      return {
        error: error.message,
        message: null,
      }
    }

    if (data.session) {
      redirect("/projects")
    }

    return {
      error: null,
      message: "Account created. Check your email to finish signing in.",
    }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return {
      error: error.message,
      message: null,
    }
  }

  redirect("/projects")
}

export async function createProject(data: unknown) {
  const parsed = projectSchema.safeParse(data)

  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
    }
  }

  const supabase = createSupabaseServerActionClient()

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

export async function signOut() {
  const supabase = createSupabaseServerActionClient()

  await supabase.auth.signOut()
  redirect("/login")
}
