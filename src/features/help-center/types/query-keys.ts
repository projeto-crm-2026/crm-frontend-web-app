export const chatKeys = {
    all: ['chats'] as const,
    list: () => [...chatKeys.all, 'list'] as const,
    messages: (chatId: number) => [...chatKeys.all, 'messages', chatId] as const,
}