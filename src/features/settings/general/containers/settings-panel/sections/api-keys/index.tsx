import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Key,
  Plus,
  RefreshCw,
  Trash2
} from 'lucide-react'
import { useState } from 'react'

import { Divider } from '../../../../components/divider'
import { SectionDescription } from '../../../../components/section-description'
import { SectionTitle } from '../../../../components/section-title'
import { API_KEYS_MOCK } from '../../../../mock'

export const ApiKeysSection = () => {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [keys, setKeys] = useState(API_KEYS_MOCK)

  const toggleVisibility = (id: string) =>
    setVisibleKeys(v => ({ ...v, [id]: !v[id] }))

  const handleCopy = (id: string, key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  const toggleActive = (id: string) =>
    setKeys(prev =>
      prev.map(k => (k.id === id ? { ...k, active: !k.active } : k))
    )

  const maskKey = (key: string) => key.slice(0, 14) + '••••••••••••'

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <SectionTitle>Chaves de API</SectionTitle>
          <SectionDescription>
            Gerencie o acesso programático ao seu CRM via API.
          </SectionDescription>
        </div>
        <button className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:brightness-110">
          <Plus className="h-4 w-4" />
          Nova chave
        </button>
      </div>
      <Divider />

      <div className="flex flex-col gap-3">
        {keys.map(key => (
          <div
            key={key.id}
            className={`flex flex-col gap-3 rounded-md border px-4 py-4 transition-all ${key.active ? 'border-gray-300 bg-white' : 'border-gray-100 bg-gray-50 opacity-60'}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold text-slate-700">
                  {key.name}
                </span>
                <span
                  className={`rounded-md border px-2 py-px text-[10px] font-medium ${key.active ? 'border-blue-500 text-blue-600' : 'border-gray-400 text-gray-500'}`}
                >
                  {key.active ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleActive(key.id)}
                  title={key.active ? 'Desativar' : 'Ativar'}
                  className={`relative inline-flex h-3.5 w-6 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    key.active ? 'bg-blue-500' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow transition-transform duration-300 ${
                      key.active ? 'translate-x-3' : 'translate-x-1'
                    }`}
                  />
                </button>
                <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-gray-100">
                  <RefreshCw className="h-3.5 w-3.5" />
                </button>
                <button className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-background flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 font-mono text-xs text-slate-600">
                {visibleKeys[key.id] ? key.key : maskKey(key.key)}
              </code>
              <button
                onClick={() => toggleVisibility(key.id)}
                className="rounded-md border border-gray-300 p-1.5 text-slate-400 transition-all duration-300 hover:bg-gray-50"
              >
                {visibleKeys[key.id] ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </button>
              <button
                onClick={() => handleCopy(key.id, key.key)}
                className="rounded-md border border-gray-300 p-1.5 text-slate-400 transition-all duration-300 hover:bg-gray-50"
              >
                {copiedId === key.id ? (
                  <Check className="h-3.5 w-3.5 text-blue-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
              </button>
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Criada em {key.created}</span>
              <span>•</span>
              <span>Último uso: {key.lastUsed}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
