import { TableBody, TableCell, TableRow } from 'crm-project-ui'

import { EmptyBox } from '../../../../assets/common/empty-box'
import type { ContactsTableEmptyProps } from './types'

export const ContactsTableEmpty = ({
  searchQuery
}: ContactsTableEmptyProps) => {
  const isFiltered = searchQuery && searchQuery.trim().length > 0

  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={8} className="h-48">
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <EmptyBox />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-neutral-700">
                {isFiltered
                  ? 'Nenhum contato encontrado'
                  : 'Nenhum contato cadastrado'}
              </p>
              <p className="text-muted-foreground text-xs">
                {isFiltered
                  ? `Não encontramos resultados para "${searchQuery}". Tente outro termo.`
                  : 'Clique em "Adicionar Contato" para começar.'}
              </p>
            </div>
          </div>
        </TableCell>
      </TableRow>
    </TableBody>
  )
}
