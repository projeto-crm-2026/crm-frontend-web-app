import { z } from 'zod'

import {
  ContactSource,
  ContactType,
  LeadStatus
} from '../../../../domain/entities/contact'

export const createContactSchema = z.object({
  full_name: z.string().min(1, 'Nome é obrigatório'),
  email: z.union([z.email('E-mail inválido'), z.literal('')]).optional(),
  phone: z.string().optional(),
  company_name: z.string().optional(),
  status: z.enum(Object.values(LeadStatus) as [LeadStatus, ...LeadStatus[]], {
    error: 'Status é obrigatório'
  }),
  type: z.enum(Object.values(ContactType) as [ContactType, ...ContactType[]], {
    error: 'Tipo é obrigatório'
  }),
  source: z
    .enum(Object.values(ContactSource) as [ContactSource, ...ContactSource[]])
    .optional(),
  tags: z.array(z.string()).optional()
})

export type CreateContactFormValues = z.infer<typeof createContactSchema>
