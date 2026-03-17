import {
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  Globe,
  Loader2,
  Plus,
  Trash2,
  Webhook
} from 'lucide-react'
import { useState } from 'react'

import { useDeleteWebhook } from '../../../../hooks/use-delete-webhook'
import { useLoadWebhooks } from '../../../../hooks/use-load-webhooks'
import { useUpdateWebhook } from '../../../../hooks/use-update-webhook'
import type { Webhook as WebhookType } from '../../../../types'
import { CreateWebhookModal } from './create-webhook-modal'
import { WebhookLogsDrawer } from './webhook-logs-drawer'

export const WebhooksSection = () => {
  const { data: webhooks, isLoading } = useLoadWebhooks()
  const { updateWebhook } = useUpdateWebhook()
  const { deleteWebhook, isPending: isDeleting } = useDeleteWebhook()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [createdSecret, setCreatedSecret] = useState<string | null>(null)
  const [copiedSecret, setCopiedSecret] = useState(false)
  const [logsWebhookId, setLogsWebhookId] = useState<number | null>(null)

  const toggleActive = async (webhook: WebhookType) => {
    await updateWebhook({
      webhookId: webhook.id,
      payload: {
        name: webhook.name,
        url: webhook.url,
        events: webhook.events,
        is_active: !webhook.is_active
      }
    })
  }

  const handleDelete = async (webhookId: number) => {
    await deleteWebhook(webhookId)
  }

  const handleCopySecret = () => {
    if (createdSecret) {
      navigator.clipboard.writeText(createdSecret)
      setCopiedSecret(true)
      setTimeout(() => setCopiedSecret(false), 1800)
    }
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
          <h2 className="text-lg font-semibold text-slate-700">Webhooks</h2>
          <p className="text-sm text-slate-600">
            Envie eventos do CRM em tempo real para endpoints externos.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-all hover:brightness-110"
        >
          <Plus className="h-4 w-4" />
          Novo webhook
        </button>
      </div>
      <div className="h-px w-full bg-gray-100" />

      {createdSecret && (
        <div className="flex flex-col gap-2 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-700">
              Webhook criado - copie o secret
            </span>
          </div>
          <p className="text-xs text-amber-600">
            Este secret é usado para validar as requisições. Ele não será
            exibido novamente.
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 rounded-md border border-amber-300 bg-white px-3 py-1.5 font-mono text-xs text-slate-600">
              {createdSecret}
            </code>
            <button
              onClick={handleCopySecret}
              className="rounded-md border border-amber-300 p-1.5 text-amber-600 transition-all hover:bg-amber-100"
            >
              {copiedSecret ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
          <button
            onClick={() => setCreatedSecret(null)}
            className="mt-1 self-end text-xs text-amber-600 underline hover:text-amber-700"
          >
            Fechar
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {webhooks && webhooks.length === 0 && (
          <div className="flex flex-col items-center gap-2 rounded-md border border-dashed border-gray-300 py-10">
            <Webhook className="h-6 w-6 text-slate-300" />
            <p className="text-sm text-slate-400">
              Nenhum webhook configurado.
            </p>
          </div>
        )}

        {webhooks?.map(webhook => (
          <div
            key={webhook.id}
            className={`flex flex-col gap-3 rounded-md border px-4 py-4 transition-all ${
              webhook.is_active
                ? 'border-gray-300 bg-white'
                : 'border-gray-100 bg-gray-50 opacity-60'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-semibold text-slate-700">
                  {webhook.name || 'Sem nome'}
                </span>
                <span
                  className={`rounded-md border px-2 py-px text-[10px] font-medium ${
                    webhook.is_active
                      ? 'border-blue-500 text-blue-600'
                      : 'border-gray-400 text-gray-500'
                  }`}
                >
                  {webhook.is_active ? 'Ativo' : 'Inativo'}
                </span>
                {webhook.fail_count > 0 && (
                  <span className="rounded-md border border-red-300 px-2 py-px text-[10px] font-medium text-red-500">
                    {webhook.fail_count} falha{webhook.fail_count > 1 && 's'}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleActive(webhook)}
                  title={webhook.is_active ? 'Desativar' : 'Ativar'}
                  className={`relative inline-flex h-3.5 w-6 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    webhook.is_active ? 'bg-blue-500' : 'bg-slate-200'
                  }`}
                >
                  <span
                    className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white shadow transition-transform duration-300 ${
                      webhook.is_active ? 'translate-x-3' : 'translate-x-1'
                    }`}
                  />
                </button>
                <button
                  onClick={() => setLogsWebhookId(webhook.id)}
                  className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-gray-100"
                  title="Ver logs"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(webhook.id)}
                  disabled={isDeleting}
                  className="rounded-md p-1.5 text-slate-400 transition-all hover:bg-red-50 hover:text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-md border border-gray-300 bg-gray-50 px-3 py-1.5 font-mono text-xs text-slate-600">
                {webhook.url}
              </code>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {webhook.events.map(event => (
                <span
                  key={event}
                  className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500"
                >
                  {event}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400">
              <span>Criado em {webhook.created_at}</span>
              {webhook.last_used_at && (
                <>
                  <span>•</span>
                  <span>Último uso: {webhook.last_used_at}</span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <CreateWebhookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreated={secret => {
          if (secret) setCreatedSecret(secret)
          setIsModalOpen(false)
        }}
      />

      {logsWebhookId && (
        <WebhookLogsDrawer
          webhookId={logsWebhookId}
          onClose={() => setLogsWebhookId(null)}
        />
      )}
    </div>
  )
}
