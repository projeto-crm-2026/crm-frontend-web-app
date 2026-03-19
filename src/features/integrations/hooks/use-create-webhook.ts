import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import type { CreateWebhookPayload } from '../types'
import { integrationsQueryKeys } from './query-keys'

export const useCreateWebhook = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createWebhook, isPending } = useMutation({
    mutationFn: (payload: CreateWebhookPayload) =>
      IntegrationsRepository.createWebhook(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: integrationsQueryKeys.webhooks
      })
    }
  })

  return { createWebhook, isPending }
}
