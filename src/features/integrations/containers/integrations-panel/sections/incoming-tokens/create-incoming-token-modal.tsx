import { Loader2, X } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateIncomingToken } from '../../../../hooks/use-create-incoming-token'
import type { IncomingToken } from '../../../../types'
import {
  type CreateIncomingTokenFormValues,
  createIncomingTokenSchema
} from './schema'

interface CreateIncomingTokenModalProps {
  isOpen: boolean
  onClose: () => void
  onCreated: (token: IncomingToken) => void
}

export const CreateIncomingTokenModal = ({
  isOpen,
  onClose,
  onCreated
}: CreateIncomingTokenModalProps) => {
  const { createIncomingToken, isPending } = useCreateIncomingToken()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateIncomingTokenFormValues>({
    resolver: zodResolver(createIncomingTokenSchema)
  })

  if (!isOpen) return null

  const handleClose = () => {
    reset()
    onClose()
  }

  const onSubmit = async (values: CreateIncomingTokenFormValues) => {
    const token = await createIncomingToken(values)
    reset()
    onCreated(token)
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
            Novo Token de Webhook
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
            <label className="text-xs font-medium text-slate-600">Nome</label>
            <input
              {...register('name')}
              placeholder="Ex: Integração Zapier"
              className={inputClass(!!errors.name)}
            />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          <p className="text-xs text-slate-400">
            O token será gerado automaticamente e exibido apenas uma vez após a
            criação.
          </p>

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
              Criar token
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
