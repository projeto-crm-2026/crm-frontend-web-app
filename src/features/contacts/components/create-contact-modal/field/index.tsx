import type { FieldProps } from './types'

export const Field = ({ label, error, children }: FieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-left text-sm font-medium text-neutral-700">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
)
