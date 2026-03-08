import { Button } from 'crm-project-ui'
import { AlertCircle, X } from 'lucide-react'

interface ErrorBannerProps {
  message: string
  onDismiss: () => void
}

export function ErrorBanner({
  message,
  onDismiss
}: Readonly<ErrorBannerProps>) {
  return (
    <div className="border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-2 border-b px-4 py-2 text-sm">
      <AlertCircle className="h-4 w-4 shrink-0" />
      <p className="flex-1">{message}</p>
      <Button
        variant="ghost"
        size="small"
        className="text-destructive hover:text-destructive h-6 w-6"
        onClick={onDismiss}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}
