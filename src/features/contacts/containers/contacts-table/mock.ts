import type { Contact } from '../../../../types/entities/contact'

export const CONTACTS_MOCK: Contact[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    company_name: 'IFSP',
    full_name: 'Vitor Silva',
    email: 'vitorgabrielsbo1460@gmail.com',
    phone: '+55 11 98765-4321',
    address: {
      street: 'Av. Paulista',
      number: '1578',
      district: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zip_code: '01310-200',
      country: 'Brazil'
    },
    type: 'individual',
    status: 'lead',
    source: 'website',
    tags: ['prospect', 'tech'],
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-28T14:22:00Z',
    created_by_id: null
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    company_name: 'CS2 Inc.',
    full_name: 'Brian Halligan',
    email: 'bh@gmail.com',
    phone: '+1 617-555-0123',
    address: {
      street: '25 First Street',
      number: '2nd Floor',
      district: 'Downtown',
      city: 'Cambridge',
      state: 'MA',
      zip_code: '02141',
      country: 'USA'
    },
    type: 'company',
    status: 'lead',
    source: 'referral',
    tags: ['enterprise', 'saas'],
    created_at: '2024-01-10T08:15:00Z',
    updated_at: '2024-01-25T16:45:00Z',
    created_by_id: null
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    company_name: 'Johnson Consulting',
    full_name: 'Maria Johnson',
    email: 'emailmaria@gmail.com',
    phone: '+1 415-555-0198',
    address: {
      street: 'Market Street',
      number: '500',
      district: 'Financial District',
      city: 'San Francisco',
      state: 'CA',
      zip_code: '94105',
      country: 'USA'
    },
    type: 'individual',
    status: 'lead',
    source: 'cold_call',
    tags: ['consulting'],
    created_at: '2024-01-20T11:00:00Z',
    updated_at: '2024-01-30T09:30:00Z',
    created_by_id: null
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    company_name: 'Tech Solutions Ltd',
    full_name: 'David Chen',
    email: 'david.chen@techsolutions.com',
    phone: '+44 20 7123 4567',
    address: {
      street: 'Oxford Street',
      number: '123',
      district: 'Westminster',
      city: 'London',
      state: 'England',
      zip_code: 'W1D 1BS',
      country: 'UK'
    },
    type: 'company',
    status: 'qualified',
    source: 'website',
    tags: ['enterprise', 'qualified'],
    created_at: '2023-12-05T13:20:00Z',
    updated_at: '2024-02-01T10:15:00Z',
    created_by_id: '660e8400-e29b-41d4-a716-446655440099'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    company_name: 'Global Innovations',
    full_name: 'Sarah Anderson',
    email: 's.anderson@globalinnovations.com',
    phone: '+1 212-555-0147',
    address: {
      street: 'Fifth Avenue',
      number: '789',
      district: 'Midtown',
      city: 'New York',
      state: 'NY',
      zip_code: '10022',
      country: 'USA'
    },
    type: 'company',
    status: 'active',
    source: 'referral',
    tags: ['partner', 'active'],
    created_at: '2023-11-15T09:45:00Z',
    updated_at: '2024-02-02T11:30:00Z',
    created_by_id: '660e8400-e29b-41d4-a716-446655440099'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    company_name: 'Acme Corporation',
    full_name: 'Robert Williams',
    email: 'r.williams@acme.com',
    phone: '+1 305-555-0189',
    address: {
      street: 'Ocean Drive',
      number: '456',
      district: 'South Beach',
      city: 'Miami',
      state: 'FL',
      zip_code: '33139',
      country: 'USA'
    },
    type: 'company',
    status: 'inactive',
    source: 'other',
    tags: ['dormant'],
    created_at: '2023-10-01T14:20:00Z',
    updated_at: '2023-12-15T09:10:00Z',
    created_by_id: '660e8400-e29b-41d4-a716-446655440099'
  }
]
