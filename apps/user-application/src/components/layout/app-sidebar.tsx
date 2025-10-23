
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react"
import { type LinkProps } from "@tanstack/react-router"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "../navigation/nav-main"
import { NavProjects } from "../navigation/nav-projects"
import { TeamSwitcher } from "../navigation/nav-switcher"
import { NavUser } from "../navigation/nav-user"

// This is sample data.

type NavMainItem = {
  title: string
  url: LinkProps['to']
  icon?: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: LinkProps['to']
  }[]
}

const navMain: NavMainItem[] = [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "/app/dashboard",
        },
        {
          title: "Table",
          url: "/app/dashboard/table",
        },
      ],
    },
    {
      title: "Models",
      url: "/app/dashboard/settings",
      icon: Bot,
      items: [
        {
          title: "Settings",
          url: "/app/dashboard/settings",
        },
      ],
    },
    {
      title: "Documentation",
      url: "/app/dashboard/docs",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "/app/dashboard/docs",
        },
        {
          title: "Get Started",
          url: "/app/dashboard/docs/tutorial",
        },
        {
          title: "Tutorials",
          url: "/app/dashboard/docs/tutorial",
        },
      ],
    },
    {
      title: "Settings",
      url: "/app/dashboard/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/app/dashboard/settings",
        },
      ],
    },
  ]

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}