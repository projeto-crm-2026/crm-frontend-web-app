import { z } from 'zod'

import {
  ContactSource,
  ContactType,
  LeadStatus
} from '../../domain/entities/contact'
import { addressSchema } from './address'

export const contactSchema = z.object({
  id: z.string().uuid(),
  company_name: z.string(),
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: addressSchema,
  status: z.nativeEnum(LeadStatus),
  type: z.nativeEnum(ContactType),
  source: z.nativeEnum(ContactSource).optional(),
  tags: z.array(z.string()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by_id: z.string().uuid().nullable()
})

export type Contact = z.infer<typeof contactSchema>
