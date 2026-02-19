import { z } from 'zod'

export const loginRequestSchema = z.object({
  email: z.email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
})

export const authResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
})

export type LoginRequest = z.infer<typeof loginRequestSchema>
export type AuthResponse = z.infer<typeof authResponseSchema>