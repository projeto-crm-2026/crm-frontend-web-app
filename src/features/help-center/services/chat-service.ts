import { API_BASE_URL, WS_BASE_URL } from '../../../config/constants'
import { chatListSchema, chatSchema, messageListSchema } from '../types/chat'
import type { Chat, CreateChatRequest, Message } from '../types/chat'

async function handleResponse<T>(res: Response, schema: { parse: (data: unknown) => T }): Promise<T> {
    if (!res.ok) {
        const text = await res.text()
        throw new Error(text || `HTTP ${res.status}`)
    }
    const json = await res.json()
    return schema.parse(json)
}

export async function listChats(): Promise<Chat[]> {
    const res = await fetch(`${API_BASE_URL}/chats`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
    return handleResponse(res, chatListSchema)
}

export async function getMessages(chatId: number): Promise<Message[]> {
    const res = await fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    })
    return handleResponse(res, messageListSchema)
}

export async function createChat(data: CreateChatRequest): Promise<Chat> {
    const res = await fetch(`${API_BASE_URL}/chats`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    return handleResponse(res, chatSchema)
}

export function connectWebSocket(chatId: number, visitorId?: string): WebSocket {
    const params = visitorId ? `?visitor_id=${visitorId}` : ''
    return new WebSocket(`${WS_BASE_URL}/ws/chat/${chatId}${params}`)
}