import { useState } from 'react'
import {
  Search,
  MoreVertical,
  User,
  ChevronDown,
  Filter,
  Plus
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'crm-project-ui'
import { CONTACTS_MOCK } from './mock'
import { formatDate } from '../../../../utils/helpers/format-date'
import { StatusBadge } from '../../components/status-badge'

export const ContactsTableContainer = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = CONTACTS_MOCK.filter(
    contact =>
      contact.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex w-full flex-col gap-4 p-6 lg:gap-6">
      <div className="mb-4 flex items-center justify-center rounded-md border-4 border-dashed border-[#dbded4] px-6 py-8">
        <div className="flex w-full items-center justify-center gap-8 lg:gap-10">
          <figure className="max-w-[140px]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Contacts_%28iOS%29.png"
              alt="Contacts"
              fetchPriority='high'
              loading='eager'
            />
          </figure>
          <article className="flex max-w-xl flex-col gap-2">
            <h2 className="text-2xl font-bold">Bem-vindo aos Contatos</h2>
            <ul className="flex flex-col gap-1">
              <li className="text-muted-foreground text-base">
                Os contatos ajudam você a organizar e gerenciar todos os seus
                relacionamentos em um único lugar.
              </li>
              <li className="text-muted-foreground text-base">
                Sua equipe talvez já esteja usando os contatos. Você pode
                explorar os registros existentes ou começar criando um novo
                contato.
              </li>
            </ul>
            <div className="flex items-center gap-4 mt-2">
              <button className="flex items-center gap-1.5 justify-center rounded-md border px-3 py-1 text-sm font-medium transition-all duration-300 border-blue-400 hover:bg-blue-50 text-blue-500 disabled:pointer-events-none disabled:opacity-50">
                <Plus className='w-4 h-4' />
                Criar contato
              </button>
            </div>
          </article>
        </div>
      </div>
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
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border py-2 pr-3 pl-10 text-sm transition-all duration-300 focus-visible:ring-1 focus-visible:outline-none"
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Buscar contato"
            type="text"
            value={searchQuery}
          />
        </div>
        <button className="border-input bg-background inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500">
          <Filter className="text-muted-foreground h-4 w-4 transition-all duration-300 hover:text-blue-500" />
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
                    <div className="flex items-center gap-3">
                      <figure className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-200">
                        <User className="text-muted-foreground h-5 w-5" />
                      </figure>
                      <div>
                        <div className="font-medium">{contact.full_name}</div>
                        <div className="text-muted-foreground text-sm">
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
  )
}
