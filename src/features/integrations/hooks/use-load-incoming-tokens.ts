import { useQuery } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import { integrationsQueryKeys } from './query-keys'

export const useLoadIncomingTokens = () => {
  return useQuery({
    queryKey: integrationsQueryKeys.incomingTokens,
    queryFn: () => IntegrationsRepository.listIncomingTokens(),
    staleTime: 1000 * 60 * 5
  })
}
