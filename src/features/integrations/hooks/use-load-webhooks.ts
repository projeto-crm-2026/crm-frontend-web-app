import { useQuery } from '@tanstack/react-query'

import { IntegrationsRepository } from '../repositories/integrations-repository'
import { integrationsQueryKeys } from './query-keys'

export const useLoadWebhooks = () => {
  return useQuery({
    queryKey: integrationsQueryKeys.webhooks,
    queryFn: () => IntegrationsRepository.listWebhooks(),
    staleTime: 1000 * 60 * 5
  })
}

export const useLoadAvailableEvents = () => {
  return useQuery({
    queryKey: integrationsQueryKeys.availableEvents,
    queryFn: () => IntegrationsRepository.getAvailableEvents(),
    staleTime: 1000 * 60 * 30
  })
}

export const useLoadWebhookLogs = (webhookId: number) => {
  return useQuery({
    queryKey: integrationsQueryKeys.webhookLogs(webhookId),
    queryFn: () => IntegrationsRepository.getWebhookLogs(webhookId),
    staleTime: 1000 * 60 * 2
  })
}
