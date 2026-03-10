import { Bell, Building2, Key, Puzzle, Shield, Users } from 'lucide-react'

import type { SettingSection } from '../types'

export const NAV_ITEMS: {
  id: SettingSection
  label: string
  icon: React.ElementType
  group: string
}[] = [
  {
    id: 'organization',
    label: 'Organização',
    icon: Building2,
    group: 'Workspace'
  },
  { id: 'members', label: 'Membros', icon: Users, group: 'Workspace' },
  { id: 'api-keys', label: 'Chaves de API', icon: Key, group: 'Developers' },
  {
    id: 'integrations',
    label: 'Integrações',
    icon: Puzzle,
    group: 'Developers'
  },
  { id: 'notifications', label: 'Notificações', icon: Bell, group: 'Conta' },
  { id: 'security', label: 'Segurança', icon: Shield, group: 'Conta' }
]

export const GROUPS = ['Workspace', 'Developers', 'Conta']
