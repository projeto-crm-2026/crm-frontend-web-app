export interface ContactsTablePaginationProps {
  showing: number
  total: number
  hasPrevPage: boolean
  hasNextPage: boolean
  onPrevPage: () => void
  onNextPage: () => void
}
