"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import type { User } from "@supabase/supabase-js"

import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/header"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

type AppShellProps = {
  children: ReactNode
  user: User | null
}

export function AppShell({ children, user }: AppShellProps) {
  const pathname = usePathname()
  const isAuthRoute = pathname.startsWith("/login")

  if (isAuthRoute) {
    return <>{children}</>
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <Header />
        <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-card/40 px-4 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">ITDEV-164</BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Overview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}