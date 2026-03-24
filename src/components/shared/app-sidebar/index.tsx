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
  Calendar,
  Command,
  GalleryVerticalEnd,
  Map,
  MessageCircle,
  Settings2
} from 'lucide-react'
import type * as React from 'react'

import { NavMain } from './nav-main'
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
      title: 'CRM',
      url: '/',
      icon: Map,
      isActive: true,
      items: [
        {
          title: 'Visão Geral',
          url: '/'
        },
        {
          title: 'Contatos',
          url: '/crm/contatos'
        },
        {
          title: 'Empresas',
          url: '/crm/empresas'
        },
        {
          title: 'Deals',
          url: '/crm/deals'
        },
        {
          title: 'Anotações',
          url: '/crm/anotations'
        }
      ]
    },
    {
      title: 'Agenda',
      url: '/calendar',
      icon: Calendar,
      items: [
        {
          title: 'Meu Calendário',
          url: '/calendar'
        }
      ]
    },
    {
      title: 'Atendimento',
      url: '/atendimento',
      icon: MessageCircle,
      items: [
        {
          title: 'Central de Ajuda',
          url: '/atendimento/central-ajuda'
        }
      ]
    },
    {
      title: 'Configurações',
      url: '/configuracoes',
      icon: Settings2,
      items: [
        {
          title: 'Geral',
          url: '/configuracoes/geral'
        },
        {
          title: 'Integrações',
          url: '/configuracoes/integracoes'
        }
      ]
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
