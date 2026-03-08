import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'crm-project-ui'
import { ChevronDown, Filter, MoreVertical, Search, User } from 'lucide-react'
import { useState } from 'react'

import { FeatureContainer } from '../../../../components/shared/FeatureContainer'
import { formatDate } from '../../../../utils/helpers/format-date'
import { StatusBadge } from '../../components/status-badge'
import { CONTACTS_MOCK } from './mock'

export const ContactsTableContainer = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = CONTACTS_MOCK.filter(
    contact =>
      contact.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <FeatureContainer>
      <div className="flex flex-col gap-5 rounded-md border border-gray-300 bg-white px-4 py-5 lg:gap-7">
        <div className="flex items-center justify-between">
          <article className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight">Contatos</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Gerencie seus relacionamentos de contato e acompanhe o engajamento
            </p>
          </article>
          <button
            type="button"
            className="text-primary-foreground inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:brightness-110"
          >
            Adicionar Contato
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground w-full rounded-md border py-1.5 pr-3 pl-10 text-sm transition-all duration-300 focus:border-neutral-400 focus-visible:outline-none"
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar contato"
              type="text"
              value={searchQuery}
            />
          </div>
          <button className="border-input bg-background inline-flex items-center gap-2 rounded-md border px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:border-neutral-400 hover:bg-blue-50 hover:text-neutral-700">
            <Filter className="text-muted-foreground h-4 w-4 transition-all duration-300 hover:text-neutral-700" />
            <p className="text-muted-foreground">Filtros avançados</p>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

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
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContacts.length > 0 ? (
                filteredContacts.map(contact => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <div className="ml-1.5 flex items-center gap-3">
                        <figure className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-200">
                          <User className="text-muted-foreground h-4.5 w-4.5" />
                        </figure>
                        <div>
                          <div className="text-sm font-medium">
                            {contact.full_name}
                          </div>
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
                        {formatDate({ dateString: contact.created_at })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {formatDate({ dateString: contact.updated_at })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{contact.company_name}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {contact.phone}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button className="hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="h-24 text-center" colSpan={8}>
                    <div className="text-muted-foreground">
                      No contacts found.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <div>
            Exibindo {filteredContacts.length} de {CONTACTS_MOCK.length}{' '}
            contato(s)
          </div>
          <div className="flex items-center gap-2">
            <button className="border-input inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 disabled:pointer-events-none disabled:opacity-50">
              Página Anterior
            </button>
            <button className="border-input inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 disabled:pointer-events-none disabled:opacity-50">
              Próxima página
            </button>
          </div>
        </div>
      </div>
    </FeatureContainer>
  )
}
