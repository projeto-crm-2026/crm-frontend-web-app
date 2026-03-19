import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import { integrationsQueryKeys } from './query-keys'

export const useDeleteWebhook = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteWebhook, isPending } = useMutation({
    mutationFn: (webhookId: number) =>
      IntegrationsRepository.deleteWebhook(webhookId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: integrationsQueryKeys.webhooks
      })
    }
  })

  return { deleteWebhook, isPending }
}
