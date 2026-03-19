import {
  Check,
  Copy,
  Eye,
  EyeOff,
  Key,
  Loader2,
  Plus,
  Trash2
} from 'lucide-react'
import { useState } from 'react'

import { useDeleteApiKey } from '../../../../hooks/use-delete-api-key'
import { useLoadApiKeys } from '../../../../hooks/use-load-api-keys'
import type { ApiKey } from '../../../../types'
import { CreateApiKeyModal } from './create-api-key-modal'

export const ApiKeysSection = () => {
  const { data: keys, isLoading } = useLoadApiKeys()
  const { deleteApiKey, isPending: isDeleting } = useDeleteApiKey()
  const [visibleKeys, setVisibleKeys] = useState<Record<number, boolean>>({})
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createdKey, setCreatedKey] = useState<ApiKey | null>(null)

  const toggleVisibility = (id: number) =>
    setVisibleKeys(v => ({ ...v, [id]: !v[id] }))

  const handleCopy = (id: number, key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  const maskKey = (key: string) =>
    key.length > 14 ? key.slice(0, 14) + '••••••••••••' : '••••••••••••'

  const handleDelete = async (keyId: number) => {
    await deleteApiKey(keyId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-slate-700">
            Chaves de API
          </h2>
          <p className="text-sm text-slate-600">
            Gerencie o acesso programático ao seu CRM via API.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          Nova chave
        </button>
      </div>
      <div className="h-px w-full bg-gray-100" />

      {createdKey && (
        <div className="flex flex-col gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <Key className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Chave criada com sucesso
            </span>
          </div>
          <p className="text-xs text-green-600">
            Copie a chave secreta agora. Ela não será exibida novamente.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md border border-green-300 bg-white px-3 py-1.5 font-mono text-xs text-slate-600">
              {createdKey.secret_key}
            </code>
            <button
              onClick={() => {
                if (createdKey.secret_key) {
                  navigator.clipboard.writeText(createdKey.secret_key)
                }
              }}
              className="rounded-md border border-green-300 p-1.5 text-green-600 transition-all hover:bg-green-100"
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            onClick={() => setCreatedKey(null)}
            className="mt-1 self-end text-xs text-green-600 underline hover:text-green-700"
          >
            Fechar
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {keys && keys.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 py-10">
            <Key className="h-6 w-6 text-slate-300" />
            <p className="text-sm text-slate-400">
              Nenhuma chave de API criada.
            </p>
          </div>
        )}

        {keys?.map(key => (
          <div
            key={key.id}
            className={`flex flex-col gap-3 rounded-md border px-4 py-4 transition-all ${
              key.is_active
                ? 'border-gray-300 bg-white'
                : 'border-gray-100 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold text-slate-700">
                  {key.name}
                </span>
                <span
                  className={`rounded-md border px-2 py-px text-[10px] font-medium ${
                    key.is_active
                      ? 'border-blue-500 text-blue-600'
                      : 'border-gray-400 text-gray-500'
                  }`}
                >
                  {key.is_active ? 'Ativa' : 'Inativa'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDelete(key.id)}
                  disabled={isDeleting}
                  className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 font-mono text-xs text-slate-600">
                {visibleKeys[key.id] ? key.public_key : maskKey(key.public_key)}
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
                onClick={() => handleCopy(key.id, key.public_key)}
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
              <span>Domínio: {key.domain}</span>
            </div>
          </div>
        ))}
      </div>

      <CreateApiKeyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={key => {
          setCreatedKey(key)
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}
