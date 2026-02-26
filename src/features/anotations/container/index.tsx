import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from 'crm-project-ui'
import {
  Building2,
  ChevronDown,
  Filter,
  MoreVertical,
  Search
} from 'lucide-react'

import { CreateItemFrame } from '../../../components/shared/createItemFrame'
import { FeatureContainer } from '../../../components/shared/FeatureContainer'
import { formatDate } from '../../../utils/helpers/format-date'
import { COMPANIES_MOCK } from '../../companies/containers/companies-table/mock'
import { StatusBadge } from '../components/status-badge'
import { ANOTATIONS_MOCK } from '../mock'

export const AnotationsContainer = () => {
  return (
    <FeatureContainer>
      <CreateItemFrame
        title="Anotações"
        description="Adicione e gerencie suas anotações para acompanhar informações importantes sobre seus contatos, negócios e atividades"
        buttonText="Adicionar Anotação"
        onButtonClick={() => {}}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Contacts_%28iOS%29.png"
          alt="Contacts"
          fetchPriority="high"
          loading="eager"
        />
      </CreateItemFrame>
      <div className="flex flex-col gap-4 rounded-md border border-gray-300 bg-white px-4 py-5 lg:gap-6">
        <div className="flex items-center justify-between bg-white">
          <article className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-tight">Anotações</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Gerencie suas anotações
            </p>
          </article>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative max-w-sm flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full rounded-md border py-2 pr-3 pl-10 text-sm transition-all duration-300 focus-visible:ring-1 focus-visible:outline-none"
              placeholder="Buscar anotação"
              type="text"
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
                <TableHead className="w-[300px]">Associado</TableHead>
                <TableHead>Categoria</TableHead>
                <TableHead>Data de criação</TableHead>
                <TableHead>Visualização</TableHead>
                <TableHead>Ações</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ANOTATIONS_MOCK.length > 0 ? (
                ANOTATIONS_MOCK.map(anotate => (
                  <TableRow key={anotate.id}>
                    <TableCell>
                      <div className="flex items-center gap-4 pl-1">
                        <figure className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100 p-1.5">
                          {anotate.assigned_to ? (
                            <img
                              src={anotate.assigned_to_avatar}
                              alt={anotate.assigned_to}
                              className="h-auto w-auto rounded-md object-contain"
                            />
                          ) : (
                            <Building2 className="text-muted-foreground h-6.5 w-6.5" />
                          )}
                        </figure>
                        <div>
                          <div className="font-medium">
                            {anotate.assigned_to}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={anotate.assigned_status} />
                    </TableCell>
                    <TableCell>
                      <span className="text-muted-foreground text-sm">
                        {formatDate({ dateString: anotate.created_at })}
                      </span>
                    </TableCell>
                    <TableCell>
                      <button className="text-sm text-blue-600">
                        Consultar
                      </button>
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
            Exibindo {COMPANIES_MOCK.length} de {COMPANIES_MOCK.length}{' '}
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
    </FeatureContainer>
  )
}
