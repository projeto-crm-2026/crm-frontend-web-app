import { ChevronRight, Settings } from 'lucide-react'
import { useState } from 'react'

import { GROUPS, NAV_ITEMS } from '../../constants'
import type { SettingSection } from '../../types'
import { ApiKeysSection } from './sections/api-keys'
import { IntegrationsSection } from './sections/integrations'
import { MembersSection } from './sections/members'
import { NotificationsSection } from './sections/notifications'
import { OrganizationSection } from './sections/organization'
import { SecuritySection } from './sections/security'

export const SettingsPanelContainer = () => {
  const [active, setActive] = useState<SettingSection>('organization')

  const renderSection = () => {
    switch (active) {
      case 'organization':
        return <OrganizationSection />
      case 'members':
        return <MembersSection />
      case 'api-keys':
        return <ApiKeysSection />
      case 'integrations':
        return <IntegrationsSection />
      case 'notifications':
        return <NotificationsSection />
      case 'security':
        return <SecuritySection />
    }
  }

  return (
    <div className="no-scrollbar flex h-full max-h-[880px] w-full gap-4 overflow-y-scroll p-6 lg:gap-6">
      <aside className="flex w-60 flex-col gap-0">
        <div className="flex items-center gap-2.5 border-b border-gray-100 px-4 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500">
            <Settings className="h-4 w-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Configurações
          </span>
        </div>

        <nav className="flex flex-col gap-5 px-3 py-4">
          {GROUPS.map((group, index: number) => (
            <div key={`${group}-${index}`} className="flex flex-col gap-0.5">
              <p className="mb-1 px-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
                {group}
              </p>
              {NAV_ITEMS.filter(i => i.group === group).map(item => {
                const Icon = item.icon
                const isActive = active === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => setActive(item.id)}
                    className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all ${
                      isActive
                        ? 'bg-[#e1e2de] font-medium'
                        : 'text-gray-600 hover:bg-[#e1e2de77] hover:text-gray-700'
                    }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${isActive ? 'text-gray-600' : 'text-gray-500'}`}
                    />
                    {item.label}
                  </button>
                )
              })}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex flex-1 flex-col gap-8 lg:pl-8 xl:pl-10">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Configurações</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-xs font-medium text-gray-700">
            {NAV_ITEMS.find(i => i.id === active)?.label}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl">{renderSection()}</div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPanelContainer
