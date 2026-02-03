export const formatDate = ({
  dateString,
  locale = 'pt-BR'
}: {
  dateString: string
  locale?: string
}) => {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
