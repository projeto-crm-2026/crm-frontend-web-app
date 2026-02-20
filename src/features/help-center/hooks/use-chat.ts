import { useCallback, useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import {
    connectWebSocket,
    getMessages,
    listChats,
} from '../services/chat-service'
import { messageSchema } from '../types/chat'
import type { Chat, Message } from '../types/chat'
import { chatKeys } from '../types/query-keys'

export function useChat() {
    const queryClient = useQueryClient()
    const [activeChat, setActiveChat] = useState<Chat | null>(null)
    const [wsError, setWsError] = useState<string | null>(null)
    const wsRef = useRef<WebSocket | null>(null)

    const {
        data: chats = [],
        isLoading: isLoadingChats,
        error: chatsError,
        refetch: refetchChats,
    } = useQuery({
        queryKey: chatKeys.list(),
        queryFn: listChats,
    })

    const {
        data: messages = [],
        isLoading: isLoadingMessages,
        error: messagesError,
    } = useQuery({
        queryKey: chatKeys.messages(activeChat?.id ?? 0),
        queryFn: () => getMessages(activeChat!.id),
        enabled: !!activeChat,
    })

    const connectWs = useCallback(
        (chatId: number) => {
            if (wsRef.current) {
                wsRef.current.close()
                wsRef.current = null
            }

            setWsError(null)
            const ws = connectWebSocket(chatId)

            ws.onmessage = (event: MessageEvent) => {
                try {
                    const parsed = messageSchema.parse(JSON.parse(event.data))
                    queryClient.setQueryData<Message[]>(
                        chatKeys.messages(chatId),
                        (old = []) => [...old, parsed]
                    )
                } catch (err) {
                    console.error('[useChat] Failed to parse WebSocket message:', err)
                }
            }

            ws.onerror = () => {
                setWsError('Erro na conexão WebSocket')
            }

            ws.onclose = () => {
                wsRef.current = null
            }

            wsRef.current = ws
        },
        [queryClient]
    )

    const selectChat = useCallback(
        (chat: Chat) => {
            if (activeChat?.id === chat.id) return

            if (activeChat) {
                queryClient.removeQueries({
                    queryKey: chatKeys.messages(activeChat.id),
                })
            }

            setActiveChat(chat)
            connectWs(chat.id)
        },
        [activeChat, connectWs, queryClient]
    )

    const sendMessage = useCallback(
        (content: string) => {
            if (wsRef.current?.readyState !== WebSocket.OPEN || !activeChat) return

            const payload = {
                type: 'message',
                content,
            }

            wsRef.current.send(JSON.stringify(payload))
        },
        [activeChat]
    )

    useEffect(() => {
        return () => {
            if (wsRef.current) {
                wsRef.current.close()
            }
        }
    }, [])

    const error =
        wsError ??
        (chatsError instanceof Error ? chatsError.message : null) ??
        (messagesError instanceof Error ? messagesError.message : null)

    const clearError = useCallback(() => setWsError(null), [])

    return {
        chats,
        activeChat,
        messages,
        isLoadingChats,
        isLoadingMessages,
        error,
        selectChat,
        sendMessage,
        refetchChats,
        clearError,
    }
}