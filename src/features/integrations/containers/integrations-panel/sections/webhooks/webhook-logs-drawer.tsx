import { Loader2, X } from 'lucide-react'

import { useLoadWebhookLogs } from '../../../../hooks/use-load-webhooks'

interface WebhookLogsDrawerProps {
  webhookId: number
  onClose: () => void
}

export const WebhookLogsDrawer = ({
  webhookId,
  onClose
}: WebhookLogsDrawerProps) => {
  const { data: logs, isLoading } = useLoadWebhookLogs(webhookId)

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
      <div className="flex h-full w-full max-w-lg flex-col border-l border-gray-200 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-base font-semibold text-slate-700">
            Logs do Webhook
          </h3>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 transition-all hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            </div>
          )}

          {logs && logs.length === 0 && (
            <div className="flex flex-col items-center gap-2 py-12">
              <p className="text-sm text-slate-400">
                Nenhum log encontrado para este webhook.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            {logs?.map(log => (
              <div
                key={log.id}
                className="flex flex-col gap-1.5 rounded-md border border-gray-200 px-4 py-3"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
                    {log.event_type}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                      log.response_code >= 200 && log.response_code < 300
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-500'
                    }`}
                  >
                    {log.response_code}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span>{log.duration_ms}ms</span>
                  <span>•</span>
                  <span>{log.created_at}</span>
                </div>
                {log.error && (
                  <p className="mt-1 rounded-md bg-red-50 px-2 py-1 text-xs text-red-500">
                    {log.error}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
