import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"
import { supabaseAnonKey, supabaseUrl } from "./env"

export async function createSupabaseServerComponentClient() {
  const cookieStore = await cookies()
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {
        // Server Components cannot mutate cookies
      },
    },
  })
}
