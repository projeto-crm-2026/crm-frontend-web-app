import { z } from 'zod'

export const createIncomingTokenSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório')
})

export type CreateIncomingTokenFormValues = z.infer<
  typeof createIncomingTokenSchema
>
