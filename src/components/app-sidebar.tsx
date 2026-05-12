"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { User } from "@supabase/supabase-js"
import { FolderOpen, Home, LogOut, Settings } from "lucide-react"

import { signOut } from "@/app/actions"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

type AppSidebarProps = {
  user: User | null
}

const navigation = [
  {
    title: "Overview",
    href: "/",
    icon: Home,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="offcanvas" variant="inset">
      <SidebarHeader>
        <div className="px-2 py-1 text-sm font-semibold tracking-tight">Dashboard</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {user ? (
        <>
          <SidebarSeparator />
          <SidebarFooter>
            <form action={signOut}>
              <Button
                type="submit"
                variant="outline"
                className="w-full justify-start gap-2"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </form>
          </SidebarFooter>
        </>
      ) : null}
      <SidebarRail />
    </Sidebar>
  )
}