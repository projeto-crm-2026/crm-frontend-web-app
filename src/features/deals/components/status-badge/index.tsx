export const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    hot: {
      label: 'Quente',
      className: 'border-[#db3707] border text-[#db3707]'
    },
    warm: {
      label: 'Morno',
      className: 'border-[#f7a501] border text-[#f7a501]'
    },
    cold: {
      label: 'Frio',
      className: 'border-[#008cff] border text-[#008cff]'
    }
  }

  const config = statusConfig[status] || statusConfig.lead

  return (
    <span
      className={`mt-0.5 inline-flex items-center rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${config.className}`}
    >
      {config.label}
    </span>
  )
}
