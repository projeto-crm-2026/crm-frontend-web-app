import type { z } from 'zod'

import type { ContactType } from '../../domain/entities/contact'
import type { contactSchema } from '../../types/entities/contact'

export type ContactResponse = z.infer<typeof contactSchema>

export type CreateContactPayload = Omit<
  ContactType,
  'id' | 'created_at' | 'updated_at' | 'created_by_id'
>

export type UpdateContactPayload = Partial<CreateContactPayload>
