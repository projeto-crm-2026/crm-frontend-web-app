import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import { integrationsQueryKeys } from './query-keys'

export const useDeleteApiKey = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteApiKey, isPending } = useMutation({
    mutationFn: (keyId: number) => IntegrationsRepository.deleteApiKey(keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationsQueryKeys.apiKeys })
    }
  })

  return { deleteApiKey, isPending }
}
