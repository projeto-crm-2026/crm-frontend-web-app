import { useQuery } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import { integrationsQueryKeys } from './query-keys'

export const useLoadApiKeys = () => {
  return useQuery({
    queryKey: integrationsQueryKeys.apiKeys,
    queryFn: () => IntegrationsRepository.listApiKeys(),
    staleTime: 1000 * 60 * 5
  })
}
