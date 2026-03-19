import {
  Check,
  Copy,
  Download,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Plus,
  Trash2
} from 'lucide-react'
import { useState } from 'react'

import { useDeleteIncomingToken } from '../../../../hooks/use-delete-incoming-token'
import { useLoadIncomingTokens } from '../../../../hooks/use-load-incoming-tokens'
import type { IncomingToken } from '../../../../types'
import { CreateIncomingTokenModal } from './create-incoming-token-modal'

export const IncomingTokensSection = () => {
  const { data: tokens, isLoading } = useLoadIncomingTokens()
  const { deleteIncomingToken, isPending: isDeleting } =
    useDeleteIncomingToken()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createdToken, setCreatedToken] = useState<IncomingToken | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [visibleTokens, setVisibleTokens] = useState<Record<number, boolean>>(
    {}
  )

  const handleCopy = (id: number, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  const toggleVisibility = (id: number) =>
    setVisibleTokens(v => ({ ...v, [id]: !v[id] }))

  const maskToken = (token: string) =>
    token.length > 10 ? token.slice(0, 10) + '••••••••••••' : '••••••••••••'

  const handleDelete = async (tokenId: number) => {
    await deleteIncomingToken(tokenId)
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
            Webhooks de Entrada
          </h2>
          <p className="text-sm text-slate-600">
            Receba eventos externos no CRM via tokens de autenticação.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          Novo token
        </button>
      </div>
      <div className="h-px w-full bg-gray-100" />

      {createdToken && createdToken.token && (
        <div className="flex flex-col gap-2 rounded-md border border-green-200 bg-green-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">
              Token criado com sucesso
            </span>
          </div>
          <p className="text-xs text-green-600">
            Copie o token agora. Ele não será exibido novamente.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md border border-green-300 bg-white px-3 py-1.5 font-mono text-xs text-slate-600">
              {createdToken.token}
            </code>
            <button
              onClick={() => handleCopy(-1, createdToken.token!)}
              className="rounded-md border border-green-300 p-1.5 text-green-600 transition-all hover:bg-green-100"
            >
              {copiedId === -1 ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <button
            onClick={() => setCreatedToken(null)}
            className="mt-1 self-end text-xs text-green-600 underline hover:text-green-700"
          >
            Fechar
          </button>
        </div>
      )}

      <div className="rounded-md border border-gray-200 bg-slate-50 px-4 py-3">
        <p className="text-xs leading-relaxed text-slate-500">
          Use o token no header{' '}
          <code className="font-mono text-slate-600">X-Webhook-Token</code> ou
          como query param{' '}
          <code className="font-mono text-slate-600">?token=SEU_TOKEN</code> ao
          enviar requisições para{' '}
          <code className="font-mono text-slate-600">
            POST /v1/webhook/incoming
          </code>
        </p>
        <div className="mt-2 flex flex-col gap-1">
          <p className="text-[10px] font-semibold tracking-wide text-slate-400 uppercase">
            Ações disponíveis
          </p>
          <div className="flex gap-1.5">
            <span className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-500">
              send_message
            </span>
            <span className="rounded-md border border-gray-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-500">
              close_chat
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {tokens && tokens.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 py-10">
            <Download className="h-6 w-6 text-slate-300" />
            <p className="text-sm text-slate-400">
              Nenhum token de webhook de entrada criado.
            </p>
          </div>
        )}

        {tokens?.map(token => (
          <div
            key={token.id}
            className={`flex flex-col gap-3 rounded-md border px-4 py-4 transition-all ${
              token.is_active
                ? 'border-gray-300 bg-white'
                : 'border-gray-100 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold text-slate-700">
                  {token.name}
                </span>
                <span
                  className={`rounded-md border px-2 py-px text-[10px] font-medium ${
                    token.is_active
                      ? 'border-blue-500 text-blue-600'
                      : 'border-gray-400 text-gray-500'
                  }`}
                >
                  {token.is_active ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDelete(token.id)}
                  disabled={isDeleting}
                  className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 font-mono text-xs text-slate-600">
                {visibleTokens[token.id]
                  ? `whit_••••••••-••••-••••-••••-••••••••••••`
                  : maskToken('whit_••••••••-••••')}
              </code>
              <button
                onClick={() => toggleVisibility(token.id)}
                className="rounded-md border border-gray-300 p-1.5 text-slate-400 transition-all duration-300 hover:bg-gray-50"
              >
                {visibleTokens[token.id] ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Criado em {token.created_at}</span>
              {token.last_used_at && (
                <>
                  <span>•</span>
                  <span>Último uso: {token.last_used_at}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateIncomingTokenModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={token => {
          setCreatedToken(token)
          setIsModalOpen(false)
        }}
      />
    </div>
  )
}
