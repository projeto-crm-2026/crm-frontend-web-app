import { z } from 'zod'

// API Keys
export const apiKeySchema = z.object({
  id: z.number(),
  public_key: z.string(),
  secret_key: z.string().optional(),
  name: z.string(),
  domain: z.string(),
  is_active: z.boolean()
})

export type ApiKey = z.infer<typeof apiKeySchema>

export interface CreateApiKeyPayload {
  name: string
  domain: string
}

// Webhooks
export const webhookSchema = z.object({
  id: z.number(),
  name: z.string(),
  url: z.string(),
  secret: z.string().optional(),
  events: z.array(z.string()),
  is_active: z.boolean(),
  fail_count: z.number(),
  last_used_at: z.string().nullable().optional(),
  created_at: z.string()
})

export type Webhook = z.infer<typeof webhookSchema>

export interface CreateWebhookPayload {
  name: string
  url: string
  events: string[]
}

export interface UpdateWebhookPayload {
  name: string
  url: string
  events: string[]
  is_active: boolean
}

// Webhook Logs
export const webhookLogSchema = z.object({
  id: z.number(),
  event_type: z.string(),
  response_code: z.number(),
  error: z.string().optional(),
  duration_ms: z.number(),
  created_at: z.string()
})

export type WebhookLog = z.infer<typeof webhookLogSchema>

// Incoming Tokens
export const incomingTokenSchema = z.object({
  id: z.number(),
  token: z.string().optional(),
  name: z.string(),
  is_active: z.boolean(),
  last_used_at: z.string().nullable().optional(),
  created_at: z.string()
})

export type IncomingToken = z.infer<typeof incomingTokenSchema>

export interface CreateIncomingTokenPayload {
  name: string
}

// Available Events
export const availableEventsSchema = z.array(z.string())
