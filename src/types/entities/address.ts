import { z } from 'zod'

export const addressSchema = z.object({
  street: z.string(),
  number: z.string(),
  district: z.string(),
  city: z.string(),
  state: z.string(),
  zip_code: z.string(),
  country: z.string()
})

export type Address = z.infer<typeof addressSchema>
