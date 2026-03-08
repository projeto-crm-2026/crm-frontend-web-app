import { useState } from 'react'

import { Divider } from '../../../../components/divider'
import { SectionDescription } from '../../../../components/section-description'
import { SectionTitle } from '../../../../components/section-title'
import { INTEGRATIONS_MOCK } from '../../../../mock'

export const IntegrationsSection = () => {
  const [connected, setConnected] = useState<Record<string, boolean>>(
    Object.fromEntries(INTEGRATIONS_MOCK.map(i => [i.id, i.connected]))
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <SectionTitle>Integrações</SectionTitle>
        <SectionDescription>
          Conecte ferramentas externas ao seu CRM para automatizar fluxos de
          trabalho.
        </SectionDescription>
      </div>
      <Divider />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {INTEGRATIONS_MOCK.map(integration => {
          const Icon = integration.icon
          const isConnected = connected[integration.id]
          return (
            <div
              key={integration.id}
              className="flex flex-col gap-3 rounded-md border border-gray-300 bg-white p-4 transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-md ${isConnected ? 'bg-blue-100' : 'bg-gray-100'}`}
                  >
                    <Icon
                      className={`h-4.5 w-4.5 ${isConnected ? 'text-blue-500' : 'text-slate-400'}`}
                    />
                  </div>
                  <div className="flex flex-col gap-px">
                    <span className="text-sm font-semibold text-slate-700">
                      {integration.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {integration.category}
                    </span>
                  </div>
                </div>
                <span
                  className={`rounded-md border px-2 py-0.5 text-[10px] font-medium ${isConnected ? 'border-blue-500 text-blue-600' : 'border-gray-300 text-slate-500'}`}
                >
                  {isConnected ? 'Conectado' : 'Disponível'}
                </span>
              </div>
              <p className="h-full text-xs text-slate-500">
                {integration.description}
              </p>
              <button
                onClick={() =>
                  setConnected(v => ({
                    ...v,
                    [integration.id]: !v[integration.id]
                  }))
                }
                className={`w-full rounded-md border py-1.5 text-xs font-medium transition-all ${
                  isConnected
                    ? 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'
                    : 'bg-gray-600 text-white'
                }`}
              >
                {isConnected ? 'Desconectar' : 'Conectar'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
