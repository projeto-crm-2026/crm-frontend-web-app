import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import type { CreateIncomingTokenPayload } from '../types'
import { integrationsQueryKeys } from './query-keys'

export const useCreateIncomingToken = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: createIncomingToken, isPending } = useMutation({
    mutationFn: (payload: CreateIncomingTokenPayload) =>
      IntegrationsRepository.createIncomingToken(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: integrationsQueryKeys.incomingTokens
      })
    }
  })

  return { createIncomingToken, isPending }
}
