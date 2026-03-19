import { z } from 'zod'

export const createWebhookSchema = z.object({
  name: z.string(),
  url: z.url('URL inválida').min(1, 'URL é obrigatória'),
  events: z.array(z.string()).min(1, 'Selecione ao menos um evento')
})

export type CreateWebhookFormValues = z.infer<typeof createWebhookSchema>
