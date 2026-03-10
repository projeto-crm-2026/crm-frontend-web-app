import type { Contact } from '../../../../domain/entities/contact'

export interface ContactsTableRowProps {
  contact: Contact
  onActionClick?: (contact: Contact) => void
}
