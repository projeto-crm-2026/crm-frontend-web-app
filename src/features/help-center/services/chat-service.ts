import { WS_BASE_URL } from '../../../config/constants'
import { api } from '../../../instances/axios'
import { chatListSchema, chatSchema, messageListSchema } from '../types/chat'
import type { Chat, CreateChatRequest, Message } from '../types/chat'

export async function listChats(): Promise<Chat[]> {
    const res = await api.get('/chats')
    return chatListSchema.parse(res.data)
}

export async function getMessages(chatId: number): Promise<Message[]> {
    const res = await api.get(`/chats/${chatId}/messages`)
    return messageListSchema.parse(res.data)
}

export async function createChat(data: CreateChatRequest): Promise<Chat> {
    const res = await api.post('/chats', data)
    return chatSchema.parse(res.data)
}

export function connectWebSocket(chatId: number, visitorId?: string): WebSocket {
    const params = visitorId ? `?visitor_id=${encodeURIComponent(visitorId)}` : ''
    return new WebSocket(`${WS_BASE_URL}/ws/chat/${chatId}${params}`)
}