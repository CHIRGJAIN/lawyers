import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  ExternalLink,
  MoreHorizontal,
  Search,
  Send,
} from 'lucide-react'
import { useMessaging, lawyerDirectory } from '@/context/MessagingContext'
import { cn } from '@/utils/cn'
import { useTransientMessage } from '@/hooks/useTransientMessage'

const formatTime = (iso: string) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

type ViewMode = 'focused' | 'other'

type MessageDockProps = {
  floating?: boolean
  className?: string
}

export const MessageDock = ({ floating = true, className }: MessageDockProps) => {
  const { conversations, messages, currentConversationId, setCurrentConversationId, sendMessage, startConversation, markAllRead } =
    useMessaging()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [expanded, setExpanded] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('focused')
  const [showMenu, setShowMenu] = useState(false)
  const [showComposer, setShowComposer] = useState(false)
  const { message, showMessage } = useTransientMessage()

  const segmentedConversations = useMemo(() => {
    const focused = conversations.filter((conversation) => conversation.unread > 0)
    const other = conversations.filter((conversation) => conversation.unread === 0)
    return { focused, other }
  }, [conversations])

  const pool = viewMode === 'focused' ? segmentedConversations.focused : segmentedConversations.other

  const filtered = useMemo(() => {
    const source = pool.length ? pool : conversations
    const q = query.trim().toLowerCase()
    if (!q) return source
    return source.filter((item) => {
      const lawyer = lawyerDirectory[item.participantId]
      const haystack = `${lawyer?.name ?? ''} ${lawyer?.headline ?? ''}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [pool, conversations, query])

  const activeConversation = useMemo(() => {
    if (!currentConversationId) return null
    return conversations.find((item) => item.id === currentConversationId) ?? null
  }, [conversations, currentConversationId])

  const activeMessages = useMemo(() => {
    if (!activeConversation) return []
    return messages.filter((message) => message.conversationId === activeConversation.id)
  }, [messages, activeConversation])

  const handleSend = () => {
    if (!activeConversation) return
    const trimmed = draft.trim()
    if (!trimmed) return
    sendMessage(activeConversation.id, trimmed)
    setDraft('')
  }

  const handleMarkAllRead = () => {
    markAllRead()
    showMessage('All conversations marked as read.')
    setShowMenu(false)
  }

  const handleOpenMessages = () => {
    navigate('/messages')
    setExpanded(false)
    showMessage('Opening full messaging workspace.')
  }

  const handleStartConversation = (participantId: string) => {
    startConversation(participantId)
    setExpanded(true)
    setShowComposer(false)
    showMessage('Conversation ready in dock.')
  }

  if (!conversations.length) {
    return null
  }

  const availableContacts = useMemo(() => Object.values(lawyerDirectory), [])

  const containerClasses = cn(
    'z-40 w-full max-w-[360px] rounded-3xl bg-[var(--brand-sand)] shadow-[var(--shadow-lg)] backdrop-blur',
    floating ? 'fixed bottom-4 right-4 bg-[var(--brand-sand)]/90' : 'relative',
    className,
  )

  return (
    <aside className={containerClasses}>
      <div className='flex items-center justify-between rounded-t-3xl border-b border-[var(--brand-border)] px-4 py-3'>
        <div>
          <h3 className='text-sm font-semibold text-[var(--brand-ink)]'>Messaging</h3>
          <p className='text-xs text-[var(--brand-muted)]'>Coordinate briefs with your inner circle</p>
        </div>
        <div className='relative flex items-center gap-2'>
          <button
            type='button'
            className='rounded-full p-1.5 text-[var(--brand-muted)] hover:bg-[var(--brand-sand)]'
            onClick={() => setShowMenu((prev) => !prev)}
            aria-haspopup='menu'
            aria-expanded={showMenu}
          >
            <MoreHorizontal className='h-4 w-4' />
          </button>
          <button
            type='button'
            className='rounded-full p-1.5 text-[var(--brand-muted)] hover:bg-[var(--brand-sand)]'
            onClick={handleOpenMessages}
          >
            <ExternalLink className='h-4 w-4' />
          </button>
          <button
            type='button'
            className='rounded-full p-1.5 text-[var(--brand-muted)] hover:bg-[var(--brand-sand)]'
            onClick={() => setExpanded((prev) => !prev)}
            aria-label={expanded ? 'Collapse messaging panel' : 'Expand messaging panel'}
          >
            {expanded ? <ChevronDown className='h-4 w-4' /> : <ChevronUp className='h-4 w-4' />}
          </button>

          {showMenu && (
            <div className='absolute right-2 top-10 w-48 rounded-2xl border border-[var(--brand-border)] bg-white p-2 text-sm shadow-[var(--shadow-md)]'>
              <button
                type='button'
                className='w-full rounded-xl px-3 py-2 text-left text-[var(--brand-ink)] hover:bg-[var(--brand-sand)]'
                onClick={handleMarkAllRead}
              >
                Mark all as read
              </button>
              <button
                type='button'
                className='w-full rounded-xl px-3 py-2 text-left text-[var(--brand-ink)] hover:bg-[var(--brand-sand)]'
                onClick={() => {
                  setShowComposer(true)
                  setExpanded(true)
                  setShowMenu(false)
                }}
              >
                New message
              </button>
            </div>
          )}
        </div>
      </div>

      {message && <p className='px-4 pt-2 text-[0.65rem] font-semibold uppercase tracking-wide text-[var(--brand-blue)]'>{message}</p>}

      {expanded && (
        <div className='max-h-[460px] overflow-hidden border-t border-[var(--brand-border)]'>
          {!activeConversation && (
            <div className='flex flex-col gap-3 p-3'>
              <div className='relative'>
                <Search className='pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--brand-muted)]' />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className='h-9 w-full rounded-full bg-[var(--brand-sand)] px-9 text-xs text-[var(--brand-ink)] focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
                  placeholder='Search'
                />
              </div>
              <div className='rounded-full bg-[var(--brand-sand)] p-1 text-xs font-semibold text-[var(--brand-muted)]'>
                <button
                  type='button'
                  onClick={() => setViewMode('focused')}
                  className={cn(
                    'flex-1 rounded-full py-1 text-center transition',
                    viewMode === 'focused' ? 'bg-white text-[var(--brand-blue)] shadow' : 'hover:text-[var(--brand-ink)]',
                  )}
                >
                  Focused
                </button>
                <button
                  type='button'
                  onClick={() => setViewMode('other')}
                  className={cn(
                    'ml-1 flex-1 rounded-full py-1 text-center transition',
                    viewMode === 'other' ? 'bg-white text-[var(--brand-blue)] shadow' : 'hover:text-[var(--brand-ink)]',
                  )}
                >
                  Other
                </button>
              </div>
              {filtered.length === 0 && (
                <p className='px-3 py-6 text-center text-[0.7rem] text-[var(--brand-muted)]'>No conversations found.</p>
              )}
              <div className='space-y-1 overflow-y-auto pr-1 text-left text-xs'>
                {filtered.map((conversation) => {
                  const lawyer = lawyerDirectory[conversation.participantId]
                  return (
                    <button
                      type='button'
                      key={conversation.id}
                      onClick={() => setCurrentConversationId(conversation.id)}
                      className='flex w-full flex-col gap-1 rounded-2xl px-3 py-3 text-left transition hover:bg-[var(--brand-sand)]/80'
                    >
                      <div className='flex items-center justify-between gap-3'>
                        <div className='flex items-center gap-3'>
                          <img src={lawyer.avatar} alt={lawyer.name} className='h-10 w-10 rounded-2xl object-cover shadow-sm' />
                          <div className='min-w-0'>
                            <p className='truncate text-sm font-semibold text-[var(--brand-ink)]'>{lawyer.name}</p>
                            <p className='truncate text-[0.65rem] text-[var(--brand-muted)]'>{lawyer.headline}</p>
                          </div>
                        </div>
                        <span className='text-[0.65rem] text-[var(--brand-muted)]'>{formatTime(conversation.lastTimestamp)}</span>
                      </div>
                      <p
                        className='text-left text-[0.7rem] text-[var(--brand-muted)] leading-snug'
                        style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                      >
                        {conversation.lastMessage}
                      </p>
                    </button>
                  )
                })}
              </div>

              {showComposer && (
                <div className='rounded-2xl border border-[var(--brand-border)] p-3 text-xs text-[var(--brand-muted)]'>
                  <p className='mb-2 text-[var(--brand-ink)]'>Start a new thread</p>
                  <div className='space-y-1 max-h-40 overflow-y-auto'>
                    {availableContacts.map((lawyer) => (
                      <button
                        key={lawyer.id}
                        type='button'
                        onClick={() => handleStartConversation(lawyer.id)}
                        className='flex w-full items-center justify-between rounded-xl px-3 py-2 text-left hover:bg-[var(--brand-sand)]'
                      >
                        <span>{lawyer.name}</span>
                        <span className='text-[0.6rem] uppercase tracking-wide text-[var(--brand-muted)]'>Start</span>
                      </button>
                    ))}
                  </div>
                  <button
                    type='button'
                    onClick={() => setShowComposer(false)}
                    className='mt-2 w-full rounded-xl border border-[var(--brand-border)] py-1 text-[var(--brand-muted)] hover:bg-[var(--brand-sand)]'
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          )}

          {activeConversation && (
            <div className='flex max-h-[460px] flex-col'>
              <header className='flex items-center gap-3 border-b border-[var(--brand-border)] px-4 py-3 text-sm'>
                <button
                  type='button'
                  className='rounded-full p-1.5 text-[var(--brand-muted)] hover:bg-[var(--brand-sand)]'
                  onClick={() => setCurrentConversationId(null)}
                  aria-label='Back to conversations'
                >
                  <ChevronLeft className='h-4 w-4' />
                </button>
                <div>
                  <p className='font-semibold text-[var(--brand-ink)]'>
                    {lawyerDirectory[activeConversation.participantId].name}
                  </p>
                  <p className='text-xs text-[var(--brand-muted)]'>
                    {lawyerDirectory[activeConversation.participantId].headline}
                  </p>
                </div>
              </header>
              <div className='flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm'>
                {activeMessages.map((message) => {
                  const isSelf = message.senderId === 'priya-menon'
                  return (
                    <div key={message.id} className={cn('flex gap-2', isSelf ? 'justify-end' : 'justify-start')}>
                      {!isSelf && (
                        <img
                          src={lawyerDirectory[activeConversation.participantId].avatar}
                          alt={lawyerDirectory[activeConversation.participantId].name}
                          className='h-8 w-8 rounded-2xl object-cover'
                        />
                      )}
                      <div
                        className={cn(
                          'max-w-[70%] break-words rounded-2xl px-3 py-2 text-sm',
                          isSelf ? 'bg-[var(--brand-blue)] text-white' : 'bg-[var(--brand-sand)] text-[var(--brand-ink)]',
                        )}
                      >
                        <p>{message.text}</p>
                        <p className={cn('mt-1 text-[0.6rem]', isSelf ? 'text-white/70' : 'text-[var(--brand-muted)]')}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className='border-t border-[var(--brand-border)] px-4 py-3'>
                <div className='flex items-center gap-2'>
                  <input
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder='Write a message...'
                    className='h-10 flex-1 rounded-full border border-[var(--brand-border)] bg-[var(--brand-sand)] px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
                  />
                  <button
                    type='button'
                    onClick={handleSend}
                    disabled={!draft.trim()}
                    className='btn-primary h-10 w-10 rounded-full p-0 text-white disabled:cursor-not-allowed disabled:opacity-60'
                  >
                    <Send className='mx-auto h-4 w-4' />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  )
}
