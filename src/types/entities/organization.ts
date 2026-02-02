import { z } from 'zod'

export const OrganizationSettingsSchema = z.object({
  timezone: z.string()
})

export const OrganizationSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  slug: z.string(),
  email: z.string().email(),
  phone: z.string(),
  website: z.string().url().optional(),
  document_id: z.string(),
  industry: z.string().optional(),
  plan: z.enum(['free', 'professional', 'enterprise']),
  settings: OrganizationSettingsSchema,
  is_active: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime()
})

export type Organization = z.infer<typeof OrganizationSchema>
export type OrganizationSettings = z.infer<typeof OrganizationSettingsSchema>
