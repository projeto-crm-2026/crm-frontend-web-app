import { z } from 'zod'

import { api } from '../../../../instances/axios'
import {
  type ApiKey,
  type CreateApiKeyPayload,
  type CreateIncomingTokenPayload,
  type CreateWebhookPayload,
  type IncomingToken,
  type UpdateWebhookPayload,
  type Webhook,
  type WebhookLog,
  apiKeySchema,
  availableEventsSchema,
  incomingTokenSchema,
  webhookLogSchema,
  webhookSchema
} from '../../types'

export class IntegrationsRepository {
  // API Keys
  public static async listApiKeys(): Promise<ApiKey[]> {
    const { data } = await api.get('/v1/api-keys')
    return z.array(apiKeySchema).parse(data)
  }

  public static async createApiKey(
    payload: CreateApiKeyPayload
  ): Promise<ApiKey> {
    const { data } = await api.post('/v1/api-keys', payload)
    return apiKeySchema.parse(data)
  }

  public static async deleteApiKey(keyId: number): Promise<void> {
    await api.delete(`/v1/api-keys/${keyId}`)
  }

  // Outgoing Webhooks
  public static async listWebhooks(): Promise<Webhook[]> {
    const { data } = await api.get('/v1/webhooks')
    return z.array(webhookSchema).parse(data)
  }

  public static async getWebhook(webhookId: number): Promise<Webhook> {
    const { data } = await api.get(`/v1/webhooks/${webhookId}`)
    return webhookSchema.parse(data)
  }

  public static async createWebhook(
    payload: CreateWebhookPayload
  ): Promise<Webhook> {
    const { data } = await api.post('/v1/webhooks', payload)
    return webhookSchema.parse(data)
  }

  public static async updateWebhook(
    webhookId: number,
    payload: UpdateWebhookPayload
  ): Promise<void> {
    await api.put(`/v1/webhooks/${webhookId}`, payload)
  }

  public static async deleteWebhook(webhookId: number): Promise<void> {
    await api.delete(`/v1/webhooks/${webhookId}`)
  }

  public static async getWebhookLogs(
    webhookId: number,
    limit?: number
  ): Promise<WebhookLog[]> {
    const params = limit ? `?limit=${limit}` : ''
    const { data } = await api.get(`/v1/webhooks/${webhookId}/logs${params}`)
    return z.array(webhookLogSchema).parse(data)
  }

  public static async getAvailableEvents(): Promise<string[]> {
    const { data } = await api.get('/v1/webhooks/events')
    return availableEventsSchema.parse(data)
  }

  // Incoming Webhook Tokens
  public static async listIncomingTokens(): Promise<IncomingToken[]> {
    const { data } = await api.get('/v1/webhooks/tokens')
    return z.array(incomingTokenSchema).parse(data)
  }

  public static async createIncomingToken(
    payload: CreateIncomingTokenPayload
  ): Promise<IncomingToken> {
    const { data } = await api.post('/v1/webhooks/tokens', payload)
    return incomingTokenSchema.parse(data)
  }

  public static async deleteIncomingToken(tokenId: number): Promise<void> {
    await api.delete(`/v1/webhooks/tokens/${tokenId}`)
  }
}
