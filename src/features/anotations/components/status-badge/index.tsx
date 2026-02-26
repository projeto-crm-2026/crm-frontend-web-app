export const StatusBadge = ({ status }: { status: string }) => {
  return (
    <span
      className={`mt-0.5 inline-flex items-center rounded-md border border-[#1229f5] px-1.5 py-0.5 text-[11px] font-medium text-[#1229f5]`}
    >
      {status}
    </span>
  )
}
