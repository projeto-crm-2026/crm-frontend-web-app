import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from 'crm-project-ui'
import { useMemo, useState } from 'react'

import { FeatureContainer } from '../../../../components/shared/FeatureContainer'
import { ContactsTableHeader } from '../../components/contact-table-header'
import { ContactsTableEmpty } from '../../components/contacts-table-empty'
import { ContactsTablePagination } from '../../components/contacts-table-pagination'
import { ContactsTableSkeleton } from '../../components/contacts-table-skeleton'
import { CreateContactModal } from '../../components/create-contact-modal'
import { ContactsTableRow } from '../../components/table-row'
import { PAGE_SIZE } from '../../constants/page-size'
import { useLoadContacts } from '../../contacts/use-load-contacts'

export const ContactsTableContainer = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data, isLoading } = useLoadContacts({})

  const filteredContacts = useMemo(() => {
    if (!data) return []
    const query = searchQuery.trim().toLowerCase()
    if (!query) return data

    return data.filter(
      contact =>
        contact.full_name.toLowerCase().includes(query) ||
        contact.email.toLowerCase().includes(query)
    )
  }, [data, searchQuery])

  const totalPages = Math.ceil(filteredContacts.length / PAGE_SIZE)

  const paginatedContacts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredContacts.slice(start, start + PAGE_SIZE)
  }, [filteredContacts, currentPage])

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)
    setCurrentPage(1)
  }

  return (
    <FeatureContainer>
      <div className="flex flex-col gap-5 rounded-md border border-gray-300 bg-white px-4 py-5 lg:gap-7">
        <ContactsTableHeader
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onAddContact={() => setIsModalOpen(true)}
        />

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Nome</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Data de criação</TableHead>
                <TableHead>Última atividade</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>

            {isLoading ? (
              <ContactsTableSkeleton />
            ) : paginatedContacts.length > 0 ? (
              <TableBody>
                {paginatedContacts.map(contact => (
                  <ContactsTableRow key={contact.id} contact={contact} />
                ))}
              </TableBody>
            ) : (
              <ContactsTableEmpty searchQuery={searchQuery} />
            )}
          </Table>
        </div>

        {!isLoading && (
          <ContactsTablePagination
            showing={paginatedContacts.length}
            total={filteredContacts.length}
            hasPrevPage={currentPage > 1}
            hasNextPage={currentPage < totalPages}
            onPrevPage={() => setCurrentPage(p => p - 1)}
            onNextPage={() => setCurrentPage(p => p + 1)}
          />
        )}
      </div>
      <CreateContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </FeatureContainer>
  )
}
