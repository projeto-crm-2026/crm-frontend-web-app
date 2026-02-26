import { Loader2, MessageSquare, Send } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Input } from 'crm-project-ui'
import { cn } from '../../../lib/utils'
import type { Chat, Message } from '../types/chat'
import { MessageBubble } from './message-bubble'

interface MessageAreaProps {
  chat: Chat | null
  messages: Message[]
  isLoading: boolean
  onSend: (content: string) => void
}

export function MessageArea({
  chat,
  messages,
  isLoading,
  onSend,
}: Readonly<MessageAreaProps>) {
  const [input, setInput] = useState('')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const prevMessageCountRef = useRef(0)
  const [newMessageIds, setNewMessageIds] = useState<Set<number | string>>(
    new Set()
  )

  useEffect(() => {
    const prevCount = prevMessageCountRef.current
    const currentCount = messages.length
    prevMessageCountRef.current = currentCount


    if (currentCount > prevCount && prevCount > 0) {
      const newMsgs = messages.slice(prevCount)
      const ids = new Set<number | string>(
        newMsgs.map((m, i) => m.id ?? `ws-${prevCount + i}`)
      )
      setNewMessageIds(ids)

      const timeout = setTimeout(() => setNewMessageIds(new Set()), 400)
      return () => clearTimeout(timeout)
    }

  }, [messages])

  const scrollToBottom = useCallback((smooth = true) => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'instant',
      })
    }
  }, [])

  useEffect(() => {
    scrollToBottom(prevMessageCountRef.current > 0)
  }, [messages.length, scrollToBottom])

  useEffect(() => {
    if (!isLoading && messages.length > 0) {
      scrollToBottom(false)
    }
  }, [isLoading, messages.length, scrollToBottom])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed) return
    onSend(trimmed)
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (!chat) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-background text-muted-foreground">
        <div className="rounded-2xl bg-muted/50 p-6">
          <MessageSquare className="h-12 w-12" />
        </div>
        <div className="text-center">
          <p className="text-sm font-medium">Nenhuma conversa selecionada</p>
          <p className="text-xs text-muted-foreground/70">
            Selecione uma conversa ao lado para começar
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b border-border bg-white px-6 py-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">
            Chat #{chat.id}
          </p>
          <p className="text-xs text-muted-foreground">
            Origem do chat: {chat.origin} - Status: {chat.status === 'open' ? 'Online' : 'Offline'}
          </p>
        </div>
        <span
          className={cn(
            'h-2.5 w-2.5 rounded-full',
            chat.status === 'open'
              ? 'bg-green-500'
              : 'bg-muted-foreground/40'
          )}
        />
      </div>

      <div
        ref={scrollContainerRef}
        className="chat-scroll min-h-0 flex-1 overflow-y-auto bg-background px-6 py-4"
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground">
                Carregando mensagens...
              </p>
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
            <MessageSquare className="h-8 w-8" />
            <p className="text-sm">Nenhuma mensagem ainda</p>
            <p className="text-xs text-muted-foreground/70">
              Envie a primeira mensagem
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((msg, idx) => {
              const key = msg.id ?? `ws-${idx}`
              return (
                <MessageBubble
                  key={key}
                  message={msg}
                  isOwn={!!msg.sender_id}
                  isNew={newMessageIds.has(key)}
                />
              )
            })}
            <div ref={bottomRef} className="h-px" />
          </div>
        )}
      </div>

      <div className="shrink-0 border-t border-border bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className="flex-1 rounded-xl border-border bg-muted/30 px-4 py-2.5 focus-visible:ring-primary/30"
            disabled={chat.status !== 'open'}
          />
          <Button
            onClick={handleSend}
            size="small"
            disabled={!input.trim() || chat.status !== 'open'}
            className={cn(
              'h-10 w-10 cursor-pointer rounded-xl transition-all',
              input.trim()
                ? 'bg-primary text-primary-foreground shadow-md hover:shadow-lg'
                : 'bg-muted text-muted-foreground'
            )}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}