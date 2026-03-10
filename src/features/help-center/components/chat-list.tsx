import { Button } from 'crm-project-ui'
import { MessageSquare, RefreshCw } from 'lucide-react'

import { cn } from '../../../lib/utils'
import type { Chat } from '../types/chat'

interface ChatListProps {
  chats: Chat[]
  activeChat: Chat | null
  isLoading: boolean
  onSelect: (chat: Chat) => void
  onRefresh: () => void
}

export function ChatList({
  chats,
  activeChat,
  isLoading,
  onSelect,
  onRefresh
}: Readonly<ChatListProps>) {
  return (
    <div className="border-border flex h-full w-80 flex-col border-r bg-white">
      <div className="border-border flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-foreground text-sm font-semibold">Conversas</h2>
        <Button
          variant="ghost"
          size="small"
          className="text-muted-foreground hover:text-foreground h-8 w-8 cursor-pointer"
          onClick={onRefresh}
          disabled={isLoading}
        >
          <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
        </Button>
      </div>

      <div className="chat-list-scroll flex-1 overflow-y-auto">
        {chats.length === 0 && !isLoading && (
          <div className="text-muted-foreground flex flex-col items-center justify-center gap-2 px-4 py-12 text-center">
            <MessageSquare className="h-8 w-8" />
            <p className="text-sm">Nenhuma conversa encontrada</p>
          </div>
        )}

        {isLoading && (
          <div className="space-y-2 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`skeleton-${i + 1}`}
                className="bg-muted h-14 animate-pulse rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="flex flex-col gap-1 p-2">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => onSelect(chat)}
              className={cn(
                'flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-3 text-left transition-all duration-200',
                'hover:bg-accent/50 hover:text-accent-foreground',
                activeChat?.id === chat.id
                  ? 'bg-primary/5 text-foreground ring-primary/20 ring-1'
                  : ''
              )}
            >
              <div
                className={cn(
                  'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                  activeChat?.id === chat.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-primary/10 text-primary'
                )}
              >
                <MessageSquare className="h-4 w-4" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">Chat #{chat.id}</p>
                <p className="text-muted-foreground truncate text-xs">
                  Origem: {chat.origin} - Status:{' '}
                  {chat.status === 'open' ? 'Online' : 'Offline'}
                </p>
              </div>
              <span
                className={cn(
                  'h-2 w-2 rounded-full',
                  chat.status === 'open'
                    ? 'bg-green-500'
                    : 'bg-muted-foreground/40'
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
