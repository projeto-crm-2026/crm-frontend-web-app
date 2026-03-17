import { z } from 'zod'

export const createApiKeySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  domain: z.string().min(1, 'Domínio é obrigatório')
})

export type CreateApiKeyFormValues = z.infer<typeof createApiKeySchema>
