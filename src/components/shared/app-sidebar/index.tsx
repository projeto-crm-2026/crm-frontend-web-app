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
  Calendar,
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
      title: 'CRM',
      url: '/dashboard',
      icon: Map,
      isActive: true,
      items: [
        {
          title: 'Visão Geral',
          url: '/dashboard'
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
          title: 'Segmentos',
          url: '/crm/segmentos'
        },
        {
          title: 'Anotações',
          url: '/crm/anotacoes'
        }
      ]
    },
    {
      title: 'Agenda',
      url: '/calendar',
      icon: Calendar,
      isActive: false,
      items: [
        {
          title: 'My Calendar',
          url: '/calendar'
        },
        {
          title: 'New Event',
          url: 'calendar/new-event'
        }
      ]
    },
    {
      title: 'Vendas',
      url: '/vendas',
      icon: Newspaper,
      items: [
        {
          title: 'Negócios (Deals)',
          url: '/vendas/negocios'
        },
        {
          title: 'Pedidos',
          url: '/vendas/pedidos'
        },
        {
          title: 'Produtos',
          url: '/vendas/produtos'
        },
        {
          title: 'Agenda de Reuniões',
          url: '/vendas/agenda'
        }
      ]
    },
    {
      title: 'Atendimento',
      url: '/atendimento',
      icon: User,
      items: [
        {
          title: 'Tickets',
          url: '/atendimento/tickets'
        },
        {
          title: 'Central de Ajuda',
          url: '/atendimento/central-ajuda'
        },
        {
          title: 'Workflows',
          url: '/atendimento/workflows'
        }
      ]
    },
    {
      title: 'Relatórios',
      url: '/relatorios',
      icon: PieChart,
      items: [
        {
          title: 'Relatórios de Vendas',
          url: '/relatorios/vendas'
        },
        {
          title: 'Relatórios de Atendimento',
          url: '/relatorios/atendimento'
        },
        {
          title: 'Análises de Engajamento',
          url: '/relatorios/engajamento'
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
          title: 'Usuários & Permissões',
          url: '/configuracoes/usuarios'
        },
        {
          title: 'Faturamento',
          url: '/configuracoes/faturamento'
        },
        {
          title: 'Limites & Plano',
          url: '/configuracoes/limites'
        },
        {
          title: 'Integrações',
          url: '/configuracoes/integracoes'
        }
      ]
    },
    {
      title: 'Documentação',
      url: '/documentacao',
      icon: BookOpen,
      items: [
        {
          title: 'Introdução',
          url: '/documentacao/introducao'
        },
        {
          title: 'Primeiros Passos',
          url: '/documentacao/primeiros-passos'
        },
        {
          title: 'Tutoriais',
          url: '/documentacao/tutoriais'
        },
        {
          title: 'Changelog',
          url: '/documentacao/changelog'
        }
      ]
    }
  ],
  projects: [
    {
      name: 'Vendas & Marketing',
      url: '/relatorios/vendas',
      icon: PieChart
    },
    {
      name: 'Mapa de Clientes',
      url: '/crm/mapa-clientes',
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
