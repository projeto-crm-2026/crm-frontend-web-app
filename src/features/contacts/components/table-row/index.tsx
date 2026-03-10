import { TableCell, TableRow } from 'crm-project-ui'
import { MoreVertical, User } from 'lucide-react'

import { formatDate } from '../../../../utils/helpers/format-date'
import { StatusBadge } from '../../components/status-badge'
import type { ContactsTableRowProps } from './types'

export const ContactsTableRow = ({
  contact,
  onActionClick
}: ContactsTableRowProps) => {
  return (
    <TableRow key={contact.id}>
      <TableCell>
        <div className="ml-1.5 flex items-center gap-3">
          <figure className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-200">
            <User className="text-muted-foreground h-4.5 w-4.5" />
          </figure>
          <div>
            <div className="text-sm font-medium">{contact.full_name}</div>
            <div className="text-muted-foreground text-[13px]">
              {contact.email}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <StatusBadge status={contact.status} />
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground text-sm">
          {contact.created_by_id
            ? 'Nome do cara futuramente**'
            : 'Sem responsável'}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {formatDate({ dateString: contact.created_at.toString() })}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-sm">
          {formatDate({ dateString: contact.updated_at.toString() })}
        </span>
      </TableCell>
      <TableCell>
        <span className="text-sm">{contact.company_name}</span>
      </TableCell>
      <TableCell>
        <span className="text-muted-foreground text-sm">{contact.phone}</span>
      </TableCell>
      <TableCell>
        <button
          className="hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md"
          onClick={() => onActionClick?.(contact)}
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </button>
      </TableCell>
    </TableRow>
  )
}
