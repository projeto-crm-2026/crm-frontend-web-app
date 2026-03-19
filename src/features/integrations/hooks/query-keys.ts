export const integrationsQueryKeys = {
  apiKeys: ['api-keys'] as const,
  webhooks: ['webhooks'] as const,
  webhook: (id: number) => ['webhooks', id] as const,
  webhookLogs: (id: number) => ['webhooks', id, 'logs'] as const,
  availableEvents: ['webhooks', 'events'] as const,
  incomingTokens: ['webhooks', 'tokens'] as const
}
