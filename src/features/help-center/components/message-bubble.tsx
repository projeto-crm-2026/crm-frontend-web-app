import { Avatar, AvatarImage } from 'crm-project-ui'
import { cn } from '../../../lib/utils'
import type { Message } from '../types/chat'

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  isNew?: boolean
}

function formatTime(raw?: string): string {
  if (!raw) return ''
  const date = new Date(raw)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// depois alterar os avatares, vou ver oq fazer
export function MessageBubble({ message, isOwn, isNew = false }: Readonly<MessageBubbleProps>) {
  const time = formatTime(message.created_at)

  return (
    <div
      className={cn(
        'flex w-full',
        isOwn ? 'justify-end' : 'justify-start',
        isNew && 'animate-message-in'
      )}
    >
      {!isOwn && (
        <Avatar className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
          <AvatarImage alt='Visitor' src='https://cdn-icons-png.flaticon.com/512/149/149071.png' />
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[70%] rounded-2xl px-4 py-2.5 text-sm shadow-sm',
          isOwn
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm bg-white text-foreground border border-border'
        )}
      >
        <p className="whitespace-pre-wrap wrap-break-word leading-relaxed">
          {message.content}
        </p>
        {time && (
          <p
            className={cn(
              'mt-1 text-[10px] text-right',
              isOwn ? 'text-primary-foreground/60' : 'text-muted-foreground'
            )}
          >
            {time}
          </p>
        )}
      </div>
      {isOwn && (
        <Avatar className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary" >
        <AvatarImage alt='You' src='https://media.licdn.com/dms/image/v2/D4E03AQFx96IPby1uQQ/profile-displayphoto-crop_800_800/B4EZszFU8lJ0AI-/0/1766088596312?e=1773273600&v=beta&t=RKY5s05fRgfl86S5FWBnFyRWOM2pbWHFCJeRdX5WZdQ' />
        </Avatar>
      )}
    </div>
  )
}