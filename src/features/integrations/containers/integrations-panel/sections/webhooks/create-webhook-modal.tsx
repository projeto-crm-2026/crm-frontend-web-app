import { Check, Loader2, X } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateWebhook } from '../../../../hooks/use-create-webhook'
import { useLoadAvailableEvents } from '../../../../hooks/use-load-webhooks'
import { type CreateWebhookFormValues, createWebhookSchema } from './schema'

interface CreateWebhookModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (secret?: string) => void
}

export const CreateWebhookModal = ({
  isOpen,
  onClose,
  onCreated
}: CreateWebhookModalProps) => {
  const { createWebhook, isPending } = useCreateWebhook()
  const { data: availableEvents } = useLoadAvailableEvents()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors }
  } = useForm<CreateWebhookFormValues>({
    resolver: zodResolver(createWebhookSchema),
    defaultValues: {
      name: '',
      url: '',
      events: []
    }
  })

  if (!isOpen) return null

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (values: CreateWebhookFormValues) => {
    const webhook = await createWebhook(values)
    reset()
    onCreated(webhook.secret)
  }

  const inputClass = (hasError: boolean) =>
    [
      'rounded-md border px-3 py-2 text-sm text-slate-700 outline-none transition-all',
      'focus:border-blue-400 focus:ring-1 focus:ring-blue-400',
      hasError ? 'border-red-400 focus:border-red-400' : 'border-gray-300'
    ].join(' ')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-700">
            Novo Webhook
          </h3>
          <button
            onClick={handleClose}
            className="rounded-md p-1 text-slate-400 transition-all hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">
              Nome (opcional)
            </label>
            <input
              {...register('name')}
              placeholder="Ex: Notificação Slack"
              className={inputClass(false)}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">
              URL do endpoint
            </label>
            <input
              {...register('url')}
              placeholder="https://exemplo.com/webhook"
              className={inputClass(!!errors.url)}
            />
            {errors.url && (
              <span className="text-xs text-red-500">{errors.url.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-slate-600">
              Eventos
            </label>
            <Controller
              name="events"
              control={control}
              render={({ field }) => (
                <div className="grid grid-cols-2 gap-2">
                  {availableEvents?.map(event => {
                    const isSelected = field.value.includes(event)
                    return (
                      <button
                        key={event}
                        type="button"
                        onClick={() => {
                          const next = isSelected
                            ? field.value.filter(e => e !== event)
                            : [...field.value, event]
                          field.onChange(next)
                        }}
                        className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs transition-all ${
                          isSelected
                            ? 'border-blue-400 bg-blue-50 text-blue-600'
                            : 'border-gray-200 text-slate-500 hover:border-gray-300'
                        }`}
                      >
                        <div
                          className={`flex h-3.5 w-3.5 items-center justify-center rounded border ${
                            isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {isSelected && (
                            <Check className="h-2.5 w-2.5 text-white" />
                          )}
                        </div>
                        {event}
                      </button>
                    )
                  })}
                </div>
              )}
            />
            {errors.events && (
              <span className="text-xs text-red-500">
                {errors.events.message}
              </span>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="rounded-md border border-gray-300 px-4 py-1.5 text-sm font-medium text-slate-600 transition-all hover:bg-gray-50 disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 rounded-md bg-blue-500 px-4 py-1.5 text-sm font-medium text-white transition-all hover:brightness-110 disabled:opacity-50"
            >
              {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              Criar webhook
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
