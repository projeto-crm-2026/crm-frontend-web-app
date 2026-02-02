export const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig: Record<string, { label: string; className: string }> = {
    lead: {
      label: 'Lead',
      className: 'border-[#008cff] border text-[#008cff]'
    },
    qualified: {
      label: 'Qualificado',
      className: 'border-[#8567ff] border text-[#8567ff]'
    },
    active: {
      label: 'Ativo',
      className: 'border-[#34af66] border text-[#34af66]'
    },
    inactive: {
      label: 'Inativo',
      className: 'border-[#f7a501] border text-[#f7a501]'
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
