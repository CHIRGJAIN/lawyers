import { useEffect, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Search, Send } from 'lucide-react'
import { useMessaging, lawyerDirectory } from '@/context/MessagingContext'
import { cn } from '@/utils/cn'
import { useTransientMessage } from '@/hooks/useTransientMessage'

const formatTime = (iso: string) => {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
}

export const MessagesPage = () => {
  const { conversations, messages, currentConversationId, setCurrentConversationId, sendMessage } = useMessaging()
  const [query, setQuery] = useState('')
  const [draft, setDraft] = useState('')
  const [schedulerOpen, setSchedulerOpen] = useState(false)
  const [scheduledAt, setScheduledAt] = useState('')
  const [agenda, setAgenda] = useState('')
  const deckInputRef = useRef<HTMLInputElement | null>(null)
  const { message, showMessage } = useTransientMessage()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter((item) => {
      const lawyer = lawyerDirectory[item.participantId]
      const haystack = `${lawyer?.name ?? ''} ${lawyer?.headline ?? ''}`.toLowerCase()
      return haystack.includes(q)
    })
  }, [conversations, query])

  const activeConversation = useMemo(() => {
    if (!currentConversationId) return null
    return conversations.find((item) => item.id === currentConversationId) ?? null
  }, [conversations, currentConversationId])

  const activeMessages = useMemo(() => {
    if (!activeConversation) return []
    return messages.filter((message) => message.conversationId === activeConversation.id)
  }, [messages, activeConversation])

  useEffect(() => {
    if (!currentConversationId) return
    const exists = conversations.some((item) => item.id === currentConversationId)
    if (!exists) {
      setCurrentConversationId(null)
    }
  }, [conversations, currentConversationId, setCurrentConversationId])

  const handleSend = () => {
    if (!activeConversation) return
    const trimmed = draft.trim()
    if (!trimmed) return
    sendMessage(activeConversation.id, trimmed)
    setDraft('')
  }

  const handleShareDeck = () => {
    if (!activeConversation) return
    deckInputRef.current?.click()
  }

  const onDeckSelected = (event: ChangeEvent<HTMLInputElement>) => {
    if (!activeConversation) return
    const files = Array.from(event.target.files ?? [])
    if (!files.length) return

    files.forEach((file) => {
      sendMessage(activeConversation.id, `Shared deck: ${file.name}`)
    })
    showMessage(files.length === 1 ? 'Deck shared in the thread.' : 'Decks shared in the thread.')
    if (deckInputRef.current) {
      deckInputRef.current.value = ''
    }
  }

  const handleScheduleCall = () => {
    if (!activeConversation) return
    setSchedulerOpen(true)
  }

  const submitSchedule = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!activeConversation || !scheduledAt) return

    const when = new Date(scheduledAt)
    const whenReadable = Number.isNaN(when.getTime())
      ? scheduledAt
      : when.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
    const agendaNote = agenda.trim() ? `Agenda: ${agenda.trim()}` : 'Agenda: Will confirm on call.'

    sendMessage(activeConversation.id, `Scheduled call for ${whenReadable}. ${agendaNote}`)
    showMessage('Call scheduled—invites will follow.')
    setSchedulerOpen(false)
    setScheduledAt('')
    setAgenda('')
  }

  return (
    <main className='mx-auto min-h-[calc(100vh-88px)] w-full max-w-6xl px-4 py-8 sm:px-6'>
      <div className='rounded-3xl border border-[var(--brand-border)] bg-[var(--surface-primary)] shadow-[var(--shadow-sm)]'>
        <div className='grid min-h-[70vh] grid-cols-1 sm:grid-cols-[260px_minmax(0,1fr)]'>
          <aside className='border-b border-[var(--brand-border)] bg-[var(--surface-muted)] px-6 py-6 sm:rounded-l-3xl sm:border-b-0 sm:border-r'>
            <h1 className='text-lg font-semibold text-[var(--brand-ink)]'>Messages</h1>
            <p className='text-xs text-[var(--brand-muted)]'>Stay aligned with co-counsel, clients, and partners.</p>
            <div className='relative mt-4'>
              <Search className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-muted)]' />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder='Search conversations'
                className='h-11 w-full rounded-full bg-[var(--brand-sand)] px-12 text-sm text-[var(--brand-ink)] focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
              />
            </div>
            <div className='mt-4 space-y-2 overflow-y-auto pr-1 text-sm'>
              {filtered.map((conversation) => {
                const lawyer = lawyerDirectory[conversation.participantId]
                const isActive = conversation.id === activeConversation?.id
                return (
                  <button
                    key={conversation.id}
                    type='button'
                    onClick={() => setCurrentConversationId(conversation.id)}
                    className={cn(
                      'flex w-full flex-col gap-1 rounded-2xl px-4 py-3 text-left transition hover:bg-[var(--brand-sand)]',
                      isActive && 'bg-[var(--brand-blue)]/10 text-[var(--brand-blue)] shadow-sm',
                    )}
                  >
                    <div className='flex items-center justify-between gap-3'>
                      <div className='flex items-center gap-3'>
                        <img src={lawyer.avatar} alt={lawyer.name} className='h-11 w-11 rounded-2xl object-cover shadow-sm' />
                        <div className='min-w-0'>
                          <p className='truncate text-sm font-semibold'>{lawyer.name}</p>
                          <p className='truncate text-xs text-[var(--brand-muted)]'>{lawyer.headline}</p>
                        </div>
                      </div>
                      <span className='text-[0.65rem] text-[var(--brand-muted)]'>{formatTime(conversation.lastTimestamp)}</span>
                    </div>
                    <p className='max-h-12 overflow-hidden text-xs text-[var(--brand-muted)] leading-snug'>
                      {conversation.lastMessage}
                    </p>
                  </button>
                )
              })}
            </div>
          </aside>

          <section className='flex min-h-[50vh] flex-col bg-[var(--surface-muted)] sm:rounded-r-3xl'>
            {activeConversation ? (
              <>
                <header className='flex items-center justify-between border-b border-[var(--brand-border)] px-6 py-6'>
                  <div>
                    <h2 className='text-lg font-semibold text-[var(--brand-ink)]'>
                      {lawyerDirectory[activeConversation.participantId].name}
                    </h2>
                    <p className='text-sm text-[var(--brand-muted)]'>
                      {lawyerDirectory[activeConversation.participantId].headline}
                    </p>
                  </div>
                  <div className='flex gap-2'>
                    <button type='button' onClick={handleShareDeck} className='btn-outline text-xs sm:text-sm'>
                      Share deck
                    </button>
                    <input
                      ref={deckInputRef}
                      type='file'
                      accept='.ppt,.pptx,.pdf,.doc,.docx'
                      className='hidden'
                      onChange={onDeckSelected}
                    />
                    <button type='button' onClick={handleScheduleCall} className='btn-primary text-xs sm:text-sm'>
                      Schedule call
                    </button>
                  </div>
                </header>

                {message && <p className='px-6 pt-4 text-xs font-semibold text-[var(--brand-blue)] sm:text-sm'>{message}</p>}

                <div className='flex-1 space-y-4 overflow-y-auto px-6 py-6 text-sm'>
                  {activeMessages.map((message) => {
                    const isSelf = message.senderId === 'priya-menon'
                    return (
                      <div key={message.id} className={cn('flex gap-3', isSelf ? 'justify-end' : 'justify-start')}>
                        {!isSelf && (
                          <img
                            src={lawyerDirectory[activeConversation.participantId].avatar}
                            alt={lawyerDirectory[activeConversation.participantId].name}
                            className='h-8 w-8 rounded-2xl object-cover'
                          />
                        )}
                        <div
                          className={cn(
                            'max-w-[65%] break-words rounded-3xl px-4 py-3 text-sm',
                            isSelf ? 'bg-[var(--brand-blue)] text-white' : 'bg-[var(--brand-sand)] text-[var(--brand-ink)]',
                          )}
                        >
                          <p>{message.text}</p>
                          <p className={cn('mt-1 text-[0.65rem]', isSelf ? 'text-white/70' : 'text-[var(--brand-muted)]')}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <footer className='border-t border-[var(--brand-border)] px-6 py-5'>
                  <div className='flex items-center gap-3'>
                    <input
                      value={draft}
                      onChange={(event) => setDraft(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                          event.preventDefault()
                          handleSend()
                        }
                      }}
                      placeholder='Draft your message...'
                      className='h-11 flex-1 rounded-full border border-[var(--brand-border)] bg-[var(--brand-sand)] px-5 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
                    />
                    <button
                      type='button'
                      onClick={handleSend}
                      disabled={!draft.trim()}
                      className='btn-primary h-11 w-12 rounded-full p-0 disabled:cursor-not-allowed disabled:opacity-60'
                    >
                      <Send className='mx-auto h-5 w-5' />
                    </button>
                  </div>
                </footer>
              </>
            ) : (
              <div className='flex flex-1 items-center justify-center text-sm text-[var(--brand-muted)]'>
                Select a conversation from the list to begin.
              </div>
            )}
          </section>
        </div>
      </div>

      {schedulerOpen && activeConversation && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4'>
          <form
            onSubmit={submitSchedule}
            className='w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-[var(--shadow-lg)]'
          >
            <h3 className='text-lg font-semibold text-[var(--brand-ink)]'>Schedule a call</h3>
            <label className='text-sm font-semibold text-[var(--brand-ink)]'>
              Date & time
              <input
                type='datetime-local'
                value={scheduledAt}
                onChange={(event) => setScheduledAt(event.target.value)}
                required
                className='mt-2 h-11 w-full rounded-2xl border border-[var(--brand-border)] px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
              />
            </label>
            <label className='text-sm font-semibold text-[var(--brand-ink)]'>
              Agenda (optional)
              <textarea
                value={agenda}
                onChange={(event) => setAgenda(event.target.value)}
                className='mt-2 min-h-[96px] w-full rounded-2xl border border-[var(--brand-border)] px-4 py-3 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
                placeholder='Key points you would like to align on...'
              />
            </label>
            <div className='flex justify-end gap-2'>
              <button
                type='button'
                onClick={() => {
                  setSchedulerOpen(false)
                  setScheduledAt('')
                  setAgenda('')
                }}
                className='btn-outline text-xs sm:text-sm'
              >
                Cancel
              </button>
              <button type='submit' className='btn-primary text-xs sm:text-sm'>
                Confirm schedule
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  )
}
