'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { MessageSquarePlus, Search } from 'lucide-react'
import { lawyers, suggestedConnections } from '@/lib/data'
import { routes } from '@/lib/routes'

const threads = suggestedConnections.map((lawyer, index) => ({
  id: `thread-${index + 1}`,
  participant: lawyer,
  lastMessage: 'Drafted consultation memo for upcoming briefing.',
  updatedAt: `${index + 1}h ago`,
}))

export default function Messages() {
  const params = useSearchParams()
  const activeThread = params.get('thread') ?? threads[0]?.id

  return (
    <div className='mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-6 sm:px-6'>
      <header className='flex items-center justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-text'>Messaging</h1>
          <p className='text-sm text-text-muted'>Coordinate matters, send briefs, or book consultations in LexLink.</p>
        </div>
        <Link href={routes.messages('new=consultation')} className='btn-primary'>Start consultation</Link>
      </header>

      <div className='grid min-h-[480px] grid-cols-1 gap-4 rounded-xl border border-border bg-surface-base shadow-card md:grid-cols-[280px_minmax(0,1fr)]'>
        {/* THREAD LIST */}
        <aside className='flex flex-col border-b border-border md:border-b-0 md:border-r'>
          <div className='flex items-center gap-2 border-b border-border px-4 py-3'>
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted' aria-hidden />
              <input
                className='input w-full rounded-xl pl-9 pr-3'
                placeholder='Search conversations'
                aria-label='Search conversations'
              />
            </div>
            <Link
              href={routes.messages('new=thread')}
              className='focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-primary hover:bg-background'
              aria-label='New message'
            >
              <MessageSquarePlus className='h-5 w-5' />
            </Link>
          </div>
          <nav className='flex-1 overflow-y-auto py-2 text-sm' aria-label='Conversation threads'>
            <ul className='space-y-1'>
              {threads.map((thread) => {
                const isActive = activeThread === thread.id
                return (
                  <li key={thread.id}>
                    <Link
                      href={routes.messages(`thread=${thread.id}`)}
                      className={`flex flex-col gap-1 rounded-xl px-4 py-3 transition ${
                        isActive ? 'bg-primary/10 text-primary' : 'text-text hover:bg-background'
                      }`}
                    >
                      <span className='font-semibold'>{thread.participant.name}</span>
                      <span className='text-xs text-text-muted'>{thread.lastMessage}</span>
                      <span className='text-[0.65rem] uppercase tracking-wide text-text-muted'>Updated {thread.updatedAt}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </aside>

        {/* THREAD DETAIL */}
        <section className='flex flex-col justify-between rounded-br-xl rounded-tr-xl bg-white p-6 text-sm text-text'>
          <div className='space-y-3'>
            <p className='text-lg font-semibold text-text'>Select a conversation</p>
            <p className='text-text-muted'>Choose a matter to review documents, share briefs, or loop in associates. Recording is encrypted.</p>
            <div className='rounded-xl border border-dashed border-border bg-background/60 p-4 text-text-muted'>
              Tip: Attach draft consultation notes or evidence bundles right before the meeting so collaborators have fresh context.
            </div>
          </div>
          <div className='mt-6 flex flex-wrap gap-2'>
            {threads.slice(0, 3).map((thread) => (
              <Link key={thread.id} href={routes.messages(`thread=${thread.id}`)} className='pill'>
                {thread.participant.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

