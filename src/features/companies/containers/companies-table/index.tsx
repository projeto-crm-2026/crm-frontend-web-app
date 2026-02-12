import { useState } from 'react'
import {
  Search,
  MoreVertical,
  Building2,
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
import { COMPANIES_MOCK } from './mock'
import { formatDate } from '../../../../utils/helpers/format-date'
import { StatusBadge } from '../../../contacts/components/status-badge'

export const CompaniesTableContainer = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCompanies = COMPANIES_MOCK.filter(
    company =>
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.domain.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex w-full flex-col gap-4 p-6 lg:gap-6">
      <div className="mb-4 flex items-center justify-center rounded-md border-4 border-dashed border-[#dbded4] px-6 py-8">
        <div className="flex w-full items-center justify-center gap-8 lg:gap-10">
          <figure className="max-w-[160px]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4406/4406356.png"
              alt="Companies"
              className="opacity-80"
              fetchPriority="high"
              loading="eager"
              width={120}
            />
          </figure>
          <article className="flex max-w-xl flex-col gap-2">
            <h2 className="text-2xl font-bold">Bem-vindo às Empresas</h2>
            <ul className="flex flex-col gap-1">
              <li className="text-gray-600 text-base">
                As empresas ajudam você a organizar as organizações com as quais você trabalha. Sincronize dados automaticamente ou adicione registros
                manualmente para manter sua base atualizada.
              </li>
            </ul>
            <div className="mt-2 flex items-center gap-4">
              <button className="flex items-center justify-center gap-1.5 rounded-md border border-blue-400 px-3 py-1 text-base font-medium text-blue-500 transition-all duration-300 hover:bg-blue-50 disabled:pointer-events-none disabled:opacity-50 bg-white">
                <Plus className="h-4 w-4" />
                Criar empresa
              </button>
            </div>
          </article>
        </div>
      </div>
      <div className="flex flex-col gap-4 bg-white border border-gray-300 rounded-md px-4 py-5 lg:gap-6">
        <div className="flex items-center justify-between bg-white">
          <article className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight">Empresas</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Gerencie sua carteira de clientes e parceiros
            </p>
          </article>
          <button
            type="button"
            className="text-primary-foreground inline-flex items-center justify-center rounded-md bg-blue-500 px-4 py-1.5 text-sm font-medium transition-all duration-300 hover:brightness-110"
          >
            Adicionar Empresa
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border py-2 pr-3 pl-10 text-sm transition-all duration-300 focus-visible:ring-1 focus-visible:outline-none"
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar empresa ou domínio"
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
                <TableHead className="w-[300px]">Empresa</TableHead>
                <TableHead>Proprietário</TableHead>
                <TableHead>Status do Lead</TableHead>
                <TableHead>Data de criação</TableHead>
                <TableHead>Última atividade</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Localização</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map(company => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-4 pl-1">
                        <figure className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 p-1.5">
                          {company.logo_url ? (
                            <img
                              src={company.logo_url}
                              alt={company.name}
                              className="h-auto w-auto rounded-md object-contain"
                            />
                          ) : (
                            <Building2 className="text-muted-foreground h-6.5 w-6.5" />
                          )}
                        </figure>
                        <div>
                          <div className="font-medium">{company.name}</div>
                          <div className="text-muted-foreground -mt-0.5 text-sm">
                            {company.domain}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {company.owner_avatar ? (
                          <img
                            src={company.owner_avatar}
                            className="h-6 w-6 rounded-full"
                            alt=""
                          />
                        ) : (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-[10px] font-bold text-blue-400">
                            {company.owner_name?.charAt(0) || '-'}
                          </div>
                        )}
                        <span className="text-sm text-neutral-700">
                          {company.owner_name || 'Sem proprietário'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={company.lead_status} />
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {formatDate({ dateString: company.created_at })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {formatDate({ dateString: company.last_activity_date })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {company.phone || '--'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-neutral-600">
                        {company.city
                          ? `${company.city}, ${company.country}`
                          : '--'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button className="hover:bg-accent hover:text-accent-foreground inline-flex h-8 w-8 items-center justify-center rounded-md transition-all duration-300">
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
                      Nenhuma empresa encontrada.
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <div>
            Exibindo {filteredCompanies.length} de {COMPANIES_MOCK.length}{' '}
            empresa(s)
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
    </div>
  )
}
