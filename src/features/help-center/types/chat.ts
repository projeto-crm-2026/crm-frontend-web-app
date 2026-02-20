import { z } from 'zod'

export const chatSchema = z.object({
    id: z.number(),
    uuid: z.string(),
    status: z.string(),
    origin: z.string(),
})

export const messageSchema = z.object({
    id: z.number().optional(),
    chat_id: z.number().optional(),
    sender_id: z.number().nullable().optional(),
    visitor_id: z.string().optional(),
    content: z.string(),
    type: z.string().optional(),
    created_at: z.string().optional(),
})

export const chatListSchema = z.array(chatSchema)
export const messageListSchema = z.array(messageSchema)

export type Chat = z.infer<typeof chatSchema>
export type Message = z.infer<typeof messageSchema>

export interface CreateChatRequest {
    origin: string
    visitor_id: string
}

export interface SendMessagePayload {
    type: 'message'
    content: string
    visitor_id: string
}