import { AlertCircle, X } from 'lucide-react'
import { Button } from 'crm-project-ui'

interface ErrorBannerProps {
  message: string
  onDismiss: () => void
}

export function ErrorBanner({ message, onDismiss }: Readonly<ErrorBannerProps>) {
  return (
    <div className="flex items-center gap-2 border-b border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <p className="flex-1">{message}</p>
      <Button
        variant="ghost"
        size="small"
        className="h-6 w-6 text-destructive hover:text-destructive"
        onClick={onDismiss}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}