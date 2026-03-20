import { z } from 'zod'

import {
  ContactSource,
  ContactType,
  LeadStatus
} from '../../domain/entities/contact'
import { addressSchema } from './address'

export const contactSchema = z.object({
  id: z.string().uuid(),
  company_name: z.string().nullable().optional(),
  full_name: z.string(),
  email: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: addressSchema.optional(),
  status: z.nativeEnum(LeadStatus),
  type: z.nativeEnum(ContactType),
  source: z.nativeEnum(ContactSource).optional(),
  tags: z.array(z.string()).nullable().optional().default([]),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable().optional(),
  created_by_id: z.number().nullable().optional()
})

export type Contact = z.infer<typeof contactSchema>
