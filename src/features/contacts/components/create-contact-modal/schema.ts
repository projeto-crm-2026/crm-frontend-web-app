import { z } from 'zod'

import {
  ContactSource,
  ContactType,
  LeadStatus
} from '../../../../domain/entities/contact'

export const createContactSchema = z.object({
  full_name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  company_name: z.string().min(1, 'Empresa é obrigatória'),
  status: z.nativeEnum(LeadStatus, 'Status é obrigatório'),
  type: z.nativeEnum(ContactType, 'Tipo é obrigatório'),
  source: z.nativeEnum(ContactSource).optional(),
  tags: z.array(z.string()).optional(),
  address: z
    .object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      country: z.string().optional(),
      zip_code: z.string().optional()
    })
    .optional()
})

export type CreateContactFormValues = z.infer<typeof createContactSchema>
