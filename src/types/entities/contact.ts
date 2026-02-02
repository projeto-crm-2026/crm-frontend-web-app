import { z } from 'zod'

export const AddressSchema = z.object({
  street: z.string(),
  number: z.string(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  country: z.string()
})

export const ContactSchema = z.object({
  id: z.string().uuid(),
  company_name: z.string(),
  full_name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  address: AddressSchema,
  type: z.enum(['company', 'individual']),
  status: z.enum(['lead', 'qualified', 'active', 'inactive']),
  source: z.enum(['referral', 'website', 'cold_call', 'other']).optional(),
  tags: z.array(z.string()),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  created_by_id: z.string().uuid().nullable()
})

export type Contact = z.infer<typeof ContactSchema>
export type Address = z.infer<typeof AddressSchema>
