import { z } from 'zod'

export const loginRequestSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
})

export const loginResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    uuid: z.uuid(),
    name: z.string(),
    email: z.email(),
    role: z.string(),
    status: z.string(),
    organization_id: z.uuid(),
  })
})

export type LoginRequest = z.infer<typeof loginRequestSchema>
export type LoginResponse = z.infer<typeof loginResponseSchema>