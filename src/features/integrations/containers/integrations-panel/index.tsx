import { ChevronRight, Key, Puzzle, Webhook } from 'lucide-react'
import { useState } from 'react'

import { ApiKeysSection } from './sections/api-keys'
import { WebhooksSection } from './sections/webhooks'

type IntegrationTab = 'api-keys' | 'webhooks'

const TABS: {
  id: IntegrationTab
  label: string
  icon: React.ElementType
}[] = [
  { id: 'api-keys', label: 'Chaves de API', icon: Key },
  { id: 'webhooks', label: 'Webhooks', icon: Webhook }
]

export const IntegrationsPanelContainer = () => {
  const [activeTab, setActiveTab] = useState<IntegrationTab>('api-keys')

  const renderSection = () => {
    switch (activeTab) {
      case 'api-keys':
        return <ApiKeysSection />
      case 'webhooks':
        return <WebhooksSection />
    }
  }

  return (
    <div className="no-scrollbar flex h-full max-h-220 w-full gap-4 overflow-y-scroll p-6 lg:gap-6">
      <aside className="flex w-60 flex-col gap-0">
        <div className="flex items-center gap-2.5 border-b border-gray-100 px-4 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-md">
            <Puzzle className="h-4 w-4 text-gray-700" />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Integrações
          </span>
        </div>

        <nav className="flex flex-col gap-0.5 px-3 py-4">
          <p className="mb-1 px-2 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            Configurar
          </p>
          {TABS.map(tab => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all ${
                  isActive
                    ? 'bg-[#e1e2de] font-medium'
                    : 'text-gray-600 hover:bg-[#e1e2de77] hover:text-gray-700'
                }`}
              >
                <Icon
                  className={`h-3.5 w-3.5 ${isActive ? 'text-gray-600' : 'text-gray-500'}`}
                />
                {tab.label}
              </button>
            )
          })}
        </nav>
      </aside>

      <main className="flex flex-1 flex-col gap-8 lg:pl-8 xl:pl-10">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">Integrações</span>
          <ChevronRight className="h-3 w-3 text-gray-300" />
          <span className="text-xs font-medium text-gray-700">
            {TABS.find(t => t.id === activeTab)?.label}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl">{renderSection()}</div>
        </div>
      </main>
    </div>
  )
}

export default IntegrationsPanelContainer
