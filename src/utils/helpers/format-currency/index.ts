export const formatCurrency = (
  value: number,
  locale: string = 'pt-BR',
  currency: string = 'BRL'
) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '—'
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}
