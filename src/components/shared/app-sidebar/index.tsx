'use client'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from 'crm-project-ui'
import {
  AudioWaveform,
  BookOpen,
  Command,
  GalleryVerticalEnd,
  Map,
  Newspaper,
  PieChart,
  Settings2,
  User
} from 'lucide-react'
import type * as React from 'react'

import { NavMain } from './nav-main/índex'
import { NavProjects } from './nav-projects'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise'
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup'
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free'
    }
  ],
  navMain: [
    {
      title: 'Search Leads',
      url: '/',
      icon: Map,
      isActive: true,
      items: [
        {
          title: 'Map',
          url: '/'
        },
        {
          title: 'Catalog',
          url: '/companies/catalog'
        },
        {
          title: 'Favourites',
          url: '/companies/favourites'
        }
      ]
    },
    {
      title: 'Contacts',
      url: '/contacts',
      icon: User,
      items: [
        {
          title: 'Explore Contacts',
          url: '/contacts'
        },
        {
          title: 'Favourites',
          url: '/contacts/favourites'
        }
      ]
    },
    {
      title: 'News',
      url: '/news',
      icon: Newspaper,
      isActive: false,
      items: [
        {
          title: 'Companies News',
          url: '/news'
        }
      ]
    },
    {
      title: 'Documentation',
      url: '/documentation',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '/documentation/introduction'
        },
        {
          title: 'Get Started',
          url: '/documentation/get-start'
        },
        {
          title: 'Tutorials',
          url: '/documentation/tutorials'
        },
        {
          title: 'Changelog',
          url: '/documentation/changelog'
        }
      ]
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '/general'
        },
        {
          title: 'Billing',
          url: '/billing'
        },
        {
          title: 'Limits',
          url: '/limits'
        }
      ]
    }
  ],
  projects: [
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" id="sidebar-main" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
