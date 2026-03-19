import { useMutation, useQueryClient } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import { integrationsQueryKeys } from './query-keys'

export const useDeleteIncomingToken = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: deleteIncomingToken, isPending } = useMutation({
    mutationFn: (tokenId: number) =>
      IntegrationsRepository.deleteIncomingToken(tokenId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: integrationsQueryKeys.incomingTokens
      })
    }
  })

  return { deleteIncomingToken, isPending }
}
