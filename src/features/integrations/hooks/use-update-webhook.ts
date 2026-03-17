import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import type { UpdateWebhookPayload } from '../types'
import { integrationsQueryKeys } from './query-keys'

export const useUpdateWebhook = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: updateWebhook, isPending } = useMutation({
    mutationFn: ({
      webhookId,
      payload
    }: {
      webhookId: number
      payload: UpdateWebhookPayload
    }) => IntegrationsRepository.updateWebhook(webhookId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: integrationsQueryKeys.webhooks
      })
    }
  })

  return { updateWebhook, isPending }
}
