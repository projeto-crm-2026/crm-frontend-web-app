import type { z } from 'zod'

import type {
  ContactSource,
  ContactType,
  LeadStatus
} from '../../../../domain/entities/contact'
import type { contactSchema } from '../../../../types/entities/contact'

export type ContactResponse = z.infer<typeof contactSchema>

export interface CreateContactPayload {
  full_name: string
  email: string
  phone: string
  company_name: string
  status: LeadStatus
  type: ContactType
  source?: ContactSource
  tags?: string[]
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    zip_code?: string
  }
}

export interface UpdateContactPayload {
  full_name?: string
  email?: string
  phone?: string
  company_name?: string
  status?: LeadStatus
  type?: ContactType
  source?: ContactSource
  tags?: string[]
  address?: {
    street?: string
    city?: string
    state?: string
    country?: string
    zip_code?: string
  }
}
