import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import type { CreateApiKeyPayload } from '../types'
import { integrationsQueryKeys } from './query-keys'

export const useCreateApiKey = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createApiKey, isPending } = useMutation({
    mutationFn: (payload: CreateApiKeyPayload) =>
      IntegrationsRepository.createApiKey(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: integrationsQueryKeys.apiKeys })
    }
  })

  return { createApiKey, isPending }
}
