import HelpCenterLayout from './layouts'
import { ChatList } from './components/chat-list'
import { ErrorBanner } from './components/error-banner'
import { MessageArea } from './components/message-area'
import { useChat } from './hooks/use-chat'

export const HelpCenterFeature = () => {
  const {
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
  } = useChat()

  return (
    <HelpCenterLayout>
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {error && (
          <ErrorBanner
            message={error}
            onDismiss={clearError}
          />
        )}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <ChatList
            chats={chats}
            activeChat={activeChat}
            isLoading={isLoadingChats}
            onSelect={selectChat}
            onRefresh={refetchChats}
          />
          <MessageArea
            chat={activeChat}
            messages={messages}
            isLoading={isLoadingMessages}
            onSend={sendMessage}
          />
        </div>
      </div>
    </HelpCenterLayout>
  )
}