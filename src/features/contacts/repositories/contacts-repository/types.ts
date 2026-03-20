import type { z } from 'zod'

import type {
  ContactSource,
  ContactType,
  LeadStatus
} from '../../../../domain/entities/contact'
import type { contactSchema } from '../../../../types/entities/contact'

export type ContactResponse = z.infer<typeof contactSchema>

export interface CreateContactPayload {
  type: ContactType
  first_name: string
  last_name?: string
  company_name?: string
  email?: string
  phone?: string
  status?: LeadStatus
  source?: ContactSource
  tags?: string[]
  street?: string
  number?: string
  complement?: string
  district?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string
}

export interface UpdateContactPayload {
  first_name?: string
  last_name?: string
  company_name?: string
  email?: string
  phone?: string
  status?: LeadStatus
  type?: ContactType
  source?: ContactSource
  tags?: string[]
  street?: string
  number?: string
  complement?: string
  district?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string
}
