import type z from 'zod'

import type { contactSchema } from '../../types/entities/contact'

export enum Roles {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  CONTRIBUTOR = 'contributor'
}

export enum LeadStatus {
  LEAD = 'lead',
  QUALIFIED = 'qualified',
  CUSTOMER = 'customer',
  INACTIVE = 'inactive',
  LOST = 'lost'
}

export enum ContactType {
  COMPANY = 'company',
  PERSON = 'person'
}

export enum ContactSource {
  WEBSITE = 'website',
  REFERRAL = 'referral',
  EMAIL = 'email',
  PAID_ADS = 'paid_ads',
  ORGANIC_SEARCH = 'organic_search',
  SOCIAL_MEDIA = 'social_media',
  EVENT = 'event',
  OTHER = 'other'
}

export type ContactEntityData = z.infer<typeof contactSchema>

export class Contact {
  constructor(private readonly props: ContactEntityData) {}

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.full_name
  }

  get email(): string {
    return this.props.email
  }

  get status(): LeadStatus {
    return this.props.status
  }

  get type(): ContactType {
    return this.props.type
  }

  get source(): ContactSource {
    if (this.props.source) return this.props.source

    return ContactSource.OTHER
  }

  get role(): Roles {
    return Roles.SUPER_ADMIN
    // return this.props.role
  }

  get full_name(): string {
    return this.props.full_name
  }

  get created_at(): Date {
    return this.props.created_at
  }

  get updated_at(): Date {
    return this.props.updated_at
  }

  get phone(): string {
    return this.props.phone
  }

  get created_by_id(): string {
    return this.props.created_by_id || ''
  }

  get company_name(): string {
    return this.props.company_name
  }
}
