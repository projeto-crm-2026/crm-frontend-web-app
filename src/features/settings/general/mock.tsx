import { Globe, Mail, SlackIcon, Webhook } from 'lucide-react'

export const API_KEYS_MOCK = [
  {
    id: '1',
    name: 'Production Key',
    key: 'crm_live_sk_a9f2c3d4e5b6',
    created: '2025-01-10',
    lastUsed: '2026-03-05',
    active: true
  },
  {
    id: '2',
    name: 'Staging Key',
    key: 'crm_test_sk_x1y2z3w4v5u6',
    created: '2025-03-22',
    lastUsed: '2026-02-28',
    active: true
  },
  {
    id: '3',
    name: 'CI/CD Pipeline',
    key: 'crm_live_sk_q7r8s9t0p1o2',
    created: '2025-06-01',
    lastUsed: '2026-01-15',
    active: false
  }
]

export const MEMBERS_MOCK = [
  {
    id: '1',
    name: 'Lucas Ferreira',
    email: 'lucas@empresa.com.br',
    role: 'Owner',
    avatar: null,
    joined: '2024-11-01',
    status: 'active'
  },
  {
    id: '2',
    name: 'Ana Souza',
    email: 'ana@empresa.com.br',
    role: 'Admin',
    avatar: null,
    joined: '2025-01-15',
    status: 'active'
  },
  {
    id: '3',
    name: 'Pedro Costa',
    email: 'pedro@empresa.com.br',
    role: 'Member',
    avatar: null,
    joined: '2025-03-10',
    status: 'active'
  },
  {
    id: '4',
    name: 'Julia Alves',
    email: 'julia@empresa.com.br',
    role: 'Member',
    avatar: null,
    joined: '2025-07-20',
    status: 'pending'
  }
]

export const INTEGRATIONS_MOCK = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Notificações e atualizações em tempo real nos seus canais.',
    icon: SlackIcon,
    connected: true,
    category: 'Communication'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Sincronize e-mails e acompanhe conversas com clientes.',
    icon: Mail,
    connected: false,
    category: 'Communication'
  },
  {
    id: 'webhook',
    name: 'Webhooks',
    description: 'Envie eventos do CRM para qualquer endpoint HTTP.',
    icon: Webhook,
    connected: true,
    category: 'Developer'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Automatize fluxos de trabalho com mais de 5.000 apps.',
    icon: Globe,
    connected: false,
    category: 'Automation'
  }
]
