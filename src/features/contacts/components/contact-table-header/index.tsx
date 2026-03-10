import { ChevronDown, Filter, Search } from 'lucide-react'

import type { ContactsTableHeaderProps } from './types'

export const ContactsTableHeader = ({
  searchQuery,
  onSearchChange,
  onAddContact
}: ContactsTableHeaderProps) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <article className="flex flex-col">
          <h1 className="text-2xl font-semibold tracking-tight">Contatos</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Gerencie seus relacionamentos de contato e acompanhe o engajamento
          </p>
        </article>
        <button
          type="button"
          onClick={onAddContact}
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
            onChange={e => onSearchChange(e.target.value)}
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
    </div>
  )
}
