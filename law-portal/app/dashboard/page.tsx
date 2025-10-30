'use client'

import { useMemo, useState } from 'react'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { FeedPost } from '@/components/FeedPost'
import { StartComposer } from '@/components/feed/StartComposer'
import { PageShell } from '@/components/layout/PageShell'
import { feed, lawyers } from '@/lib/data'
import { MessageBar } from '@/components/messaging/MessageBar'

const authorIndex = Object.fromEntries(lawyers.map((lawyer) => [lawyer.id, lawyer]))

const filters = [
  { id: 'all', label: 'All matters' },
  { id: 'update', label: 'Insights' },
  { id: 'case-note', label: 'Case notes' },
  { id: 'event', label: 'Events' },
]

export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState<string>('all')

  const filteredFeed = useMemo(() => {
    if (activeFilter === 'all') return feed
    if (activeFilter === 'update') {
      return feed.filter((post) => post.type === 'update' || post.type === 'article' || post.type === 'judgment')
    }
    return feed.filter((post) => post.type === activeFilter)
  }, [activeFilter])

  return (
    <PageShell left={<LeftSidebar />} right={<RightSidebar />}>
      <section className='space-y-4'>
        <div className='flex flex-wrap items-center gap-2 text-sm'>
          {filters.map((tab) => (
            <button
              key={tab.id}
              type='button'
              onClick={() => setActiveFilter(tab.id)}
              className={`focus-ring rounded-full border border-border px-3 py-2 transition ${
                activeFilter === tab.id ? 'bg-primary/10 text-primary shadow-sm' : 'bg-white text-text-muted hover:bg-background'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <StartComposer />
        <div className='space-y-4'>
          {filteredFeed.map((post) => {
            const author = authorIndex[post.authorId]
            if (!author) return null
            return <FeedPost key={post.id} post={post} author={author} />
          })}
          {filteredFeed.length === 0 && (
            <div className='card border border-dashed border-border bg-background/60 p-6 text-sm text-text-muted'>
              No updates for this view. Try a different filter.
            </div>
          )}
        </div>
      </section>

      <MessageBar />
    </PageShell>
  )
}
