import type { ContactsTablePaginationProps } from './types'

export const ContactsTablePagination = ({
  showing,
  total,
  hasPrevPage,
  hasNextPage,
  onPrevPage,
  onNextPage
}: ContactsTablePaginationProps) => {
  return (
    <div className="text-muted-foreground flex items-center justify-between text-sm">
      <div>
        Exibindo {showing} de {total} contato(s)
      </div>
      <div className="flex items-center gap-2">
        <button
          disabled={!hasPrevPage}
          onClick={onPrevPage}
          className="border-input inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          Página Anterior
        </button>
        <button
          disabled={!hasNextPage}
          onClick={onNextPage}
          className="border-input inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all duration-300 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-500 disabled:pointer-events-none disabled:opacity-50"
        >
          Próxima página
        </button>
      </div>
    </div>
  )
}
