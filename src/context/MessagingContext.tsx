import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { lawyers } from '@/data/lawyers'
import {
  conversations as seedConversations,
  messages as seedMessages,
  type Conversation,
  type Message,
} from '@/data/messages'

type MessagingContextValue = {
  conversations: typeof seedConversations
  messages: Message[]
  currentConversationId: string | null
  setCurrentConversationId: (id: string | null) => void
  sendMessage: (conversationId: string, text: string) => void
  startConversation: (participantId: string) => string
  markAllRead: () => void
}

const MessagingContext = createContext<MessagingContextValue | undefined>(undefined)

export const MessagingProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState(seedConversations)
  const [messages, setMessages] = useState(seedMessages)
  const [currentConversationId, setCurrentConversationIdState] = useState<string | null>(seedConversations[0]?.id ?? null)

  const setCurrentConversationId = useCallback((id: string | null) => {
    setCurrentConversationIdState(id)
    if (!id) return
    setConversations((prev) => prev.map((item) => (item.id === id ? { ...item, unread: 0 } : item)))
  }, [])

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const payload: Message = {
      id: `draft-${Date.now()}`,
      conversationId,
      senderId: 'priya-menon',
      text: trimmed,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, payload])
    setConversations((prev) =>
      prev.map((item) =>
        item.id === conversationId
          ? {
              ...item,
              lastMessage: trimmed,
              lastTimestamp: payload.timestamp,
              unread: 0,
            }
          : item,
      ),
    )
  }, [])

  const generateConversationId = () => `conv-${Math.random().toString(36).slice(2, 9)}`

  const startConversation = useCallback(
    (participantId: string) => {
      const existing = conversations.find((item) => item.participantId === participantId)
      if (existing) {
        setCurrentConversationId(existing.id)
        return existing.id
      }

      const lawyer = lawyerDirectory[participantId]
      const newConversation: Conversation = {
        id: generateConversationId(),
        participantId,
        lastMessage: `Started a conversation with ${lawyer?.name ?? 'counsel'}.`,
        lastTimestamp: new Date().toISOString(),
        unread: 0,
      }

      setConversations((prev) => [...prev, newConversation])
      setCurrentConversationId(newConversation.id)
      return newConversation.id
    },
    [conversations, setCurrentConversationId],
  )

  const markAllRead = useCallback(() => {
    setConversations((prev) => prev.map((item) => ({ ...item, unread: 0 })))
  }, [])

  const value = useMemo(
    () => ({
      conversations,
      messages,
      currentConversationId,
      setCurrentConversationId,
      sendMessage,
      startConversation,
      markAllRead,
    }),
    [conversations, messages, currentConversationId, sendMessage, startConversation, markAllRead],
  )

  return <MessagingContext.Provider value={value}>{children}</MessagingContext.Provider>
}

export const useMessaging = () => {
  const context = useContext(MessagingContext)
  if (!context) {
    throw new Error('useMessaging must be used within MessagingProvider')
  }
  return context
}

export const lawyerDirectory = Object.fromEntries(lawyers.map((lawyer) => [lawyer.id, lawyer]))
