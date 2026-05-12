import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

import { supabaseAnonKey, supabaseUrl } from "./env"

export function createSupabaseServerComponentClient() {
  const cookieStore = cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll() {
        // Server Components cannot mutate cookies; middleware and server actions handle refreshes.
      },
    },
  })
}