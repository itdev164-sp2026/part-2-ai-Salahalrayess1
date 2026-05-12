import { NextRequest, NextResponse } from "next/server"

import { updateSession } from "@/lib/supabase/middleware"

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)
  const { pathname } = request.nextUrl

  if (pathname === "/login" && user) {
    return NextResponse.redirect(new URL("/projects", request.url))
  }

  if (pathname.startsWith("/projects") && !user) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirectedFrom", pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
}