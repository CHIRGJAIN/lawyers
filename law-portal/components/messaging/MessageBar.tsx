'use client'

import { useMemo, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, MessageCircle, Send, User } from 'lucide-react'
import { currentUser, getSeedConversations, type Conversation, type Message } from '@/lib/messaging'

const MAX_VISIBLE = 4

const formatTime = (iso: string) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export function MessageBar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const [conversations, setConversations] = useState<Conversation[]>(() => getSeedConversations())
  const [selectedId, setSelectedId] = useState(conversations[0]?.id ?? null)
  const [draft, setDraft] = useState('')

  const selectedConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === selectedId) ?? conversations[0],
    [conversations, selectedId],
  )

  const messageList = selectedConversation?.messages ?? []

  const onSelectConversation = (conversationId: string) => {
    setSelectedId(conversationId)
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId ? { ...conversation, unread: 0 } : conversation,
      ),
    )
    setIsExpanded(true)
  }

  const onSendMessage = () => {
    if (!selectedConversation || !draft.trim() || !currentUser) return
    const newMessage: Message = {
      id: `draft-${Date.now()}`,
      senderId: currentUser.id,
      text: draft.trim(),
      timestamp: new Date().toISOString(),
    }

    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedConversation.id
          ? {
              ...conversation,
              messages: [...conversation.messages, newMessage],
            }
          : conversation,
      ),
    )
    setDraft('')
  }

  if (!currentUser || conversations.length === 0) {
    return null
  }

  return (
    <div className='fixed bottom-3 right-2 z-50 w-[320px] sm:bottom-4 sm:right-4 sm:w-[360px]'>
      <div className='card border border-border shadow-card hover:shadow-card-hover transition-shadow'>
        <div className='flex items-center gap-3 border-b border-border px-3 py-2'>
          <div className='relative h-9 w-9 overflow-hidden rounded-full border border-border'>
            <Image src={currentUser.avatar} alt={currentUser.name} width={36} height={36} />
            <span className='absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-success ring-2 ring-white' aria-label='Online status' />
          </div>
          <div className='flex-1'>
            <button
              type='button'
              className='text-left text-sm font-semibold text-text focus-ring'
              onClick={() => setIsExpanded((prev) => !prev)}
            >
              Messaging
            </button>
            <p className='text-xs text-text-muted'>Stay in sync with your legal network</p>
          </div>
          <button
            type='button'
            className='focus-ring rounded-full p-1 text-text-muted hover:bg-background'
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-label={isExpanded ? 'Collapse messaging panel' : 'Expand messaging panel'}
          >
            {isExpanded ? <ChevronDown className='h-5 w-5' /> : <ChevronUp className='h-5 w-5' />}
          </button>
        </div>

        {isExpanded ? (
          <div className='grid max-h-[420px] grid-cols-1 divide-y border-t border-border sm:grid-cols-[140px_minmax(0,1fr)] sm:divide-y-0 sm:divide-x'>
            {/* Conversation list */}
            <div className='max-h-[420px] overflow-y-auto p-2 text-xs sm:text-sm'>
              {conversations.slice(0, MAX_VISIBLE).map((conversation) => {
                const isActive = selectedConversation?.id === conversation.id
                return (
                  <button
                    type='button'
                    key={conversation.id}
                    onClick={() => onSelectConversation(conversation.id)}
                    className={`mb-2 flex w-full items-start gap-2 rounded-xl px-2 py-2 text-left transition-colors focus-ring ${
                      isActive ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-background'
                    }`}
                  >
                    <div className='relative h-8 w-8 overflow-hidden rounded-full border border-border'>
                      <Image src={conversation.participant.avatar} alt={conversation.participant.name} width={32} height={32} />
                      <span className='absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-success ring-2 ring-white' />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-semibold'>{conversation.participant.name}</p>
                      <p className='truncate text-[0.7rem]'>{conversation.participant.headline}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <span className='ml-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary text-[0.65rem] font-semibold text-white'>
                        {conversation.unread}
                      </span>
                    )}
                  </button>
                )
              })}

              {conversations.length > MAX_VISIBLE && (
                <p className='px-2 text-[0.7rem] text-text-muted'>See all in Messaging</p>
              )}
            </div>

            {/* Message view */}
            <div className='flex max-h-[420px] flex-1 flex-col'>
              {selectedConversation ? (
                <>
                  <div className='flex items-center gap-2 border-b border-border px-3 py-2'>
                    <div className='h-8 w-8 overflow-hidden rounded-full border border-border'>
                      <Image
                        src={selectedConversation.participant.avatar}
                        alt={selectedConversation.participant.name}
                        width={32}
                        height={32}
                      />
                    </div>
                    <div>
                      <p className='text-sm font-semibold text-text'>{selectedConversation.participant.name}</p>
                      <p className='text-xs text-text-muted'>Tap to open full messaging</p>
                    </div>
                  </div>

                  <div className='flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm'>
                    {messageList.length === 0 && (
                      <p className='text-center text-xs text-text-muted'>Start the conversation.</p>
                    )}

                    {messageList.map((message) => {
                      const isMe = message.senderId === currentUser.id
                      const partner = selectedConversation.participant
                      return (
                        <div key={message.id} className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                          {!isMe && (
                            <div className='h-7 w-7 overflow-hidden rounded-full border border-border'>
                              <Image src={partner.avatar} alt={partner.name} width={28} height={28} />
                            </div>
                          )}
                          <div
                            className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                              isMe ? 'bg-primary text-white' : 'bg-background text-text'
                            }`}
                          >
                            <p>{message.text}</p>
                            <p className={`mt-1 text-[0.65rem] ${isMe ? 'text-white/70' : 'text-text-muted'}`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className='border-t border-border px-3 py-2'>
                    <div className='flex items-center gap-2'>
                      <div className='flex h-9 w-9 items-center justify-center rounded-full bg-background text-text-muted'>
                        <User className='h-4 w-4' aria-hidden />
                      </div>
                      <input
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault()
                            onSendMessage()
                          }
                        }}
                        className='input flex-1 rounded-full'
                        placeholder={`Message ${selectedConversation.participant.name.split(' ')[0]}`}
                        aria-label='Type your message'
                      />
                      <button
                        type='button'
                        className='focus-ring rounded-full bg-primary p-2 text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-60'
                        onClick={onSendMessage}
                        disabled={!draft.trim()}
                        aria-label='Send message'
                      >
                        <Send className='h-4 w-4' aria-hidden />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className='flex flex-1 flex-col items-center justify-center gap-2 p-6 text-sm text-text-muted'>
                  <MessageCircle className='h-6 w-6 text-primary' aria-hidden />
                  Select a conversation to begin.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='px-3 py-3 text-sm text-text-muted'>
            Continue where you left off with colleagues and referring partners.
          </div>
        )}
      </div>
    </div>
  )
}

