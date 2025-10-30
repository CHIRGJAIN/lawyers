import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shell } from '@/components/layout/Shell'
import { LeftPanel } from '@/components/sidebar/LeftPanel'
import { RightPanel } from '@/components/sidebar/RightPanel'
import { PostComposer, type PostComposerHandle } from '@/components/feed/PostComposer'
import { FeedList, type FeedListItem } from '@/components/feed/PostCard'
import { MessageDock } from '@/components/messaging/MessageDock'
import { posts as seedPosts } from '@/data/posts'
import { useMessaging } from '@/context/MessagingContext'
import { useTransientMessage } from '@/hooks/useTransientMessage'

const insights = [
  'Track ESG disclosures and tech policy trends curated for counsel',
  'Organise matters, share briefs, and run diligence playbooks with your team',
]

const buildInitialFeed = (): FeedListItem[] =>
  seedPosts.map((post) => ({
    ...post,
    viewerState: { liked: false, saved: false },
    comments: [],
  }))

const deriveTitle = (summary: string) => {
  const cleaned = summary.trim()
  if (!cleaned) return 'New update'
  const firstSentence = cleaned.split(/\r?\n/).filter(Boolean)[0] ?? cleaned
  if (firstSentence.length <= 96) return firstSentence
  return `${firstSentence.slice(0, 93)}...`
}

export const HomePage = () => {
  const navigate = useNavigate()
  const { startConversation } = useMessaging()
  const composerRef = useRef<PostComposerHandle | null>(null)
  const [feedPosts, setFeedPosts] = useState<FeedListItem[]>(() => buildInitialFeed())
  const { message, showMessage } = useTransientMessage(2800)

  const handleScheduleConsult = () => {
    navigate('/network')
    showMessage('Opening your curated network to schedule a consult.')
  }

  const handleDraftNewNote = () => {
    composerRef.current?.focus()
    showMessage('Composer focused—start drafting your note.')
  }

  const handlePublishUpdate = ({ summary, attachments }: { summary: string; attachments: FeedListItem['attachments'] }) => {
    const createdAt = new Date()
    const formattedTimestamp = createdAt.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

    const newPost: FeedListItem = {
      id: `post-${Date.now()}`,
      authorId: 'priya-menon',
      category: 'insight',
      title: deriveTitle(summary),
      summary,
      createdAt: `${formattedTimestamp} · Today`,
      tags: [],
      reactions: { likes: 0, comments: 0, reposts: 0 },
      attachments,
      viewerState: { liked: false, saved: false },
      comments: [],
    }

    setFeedPosts((prev) => [newPost, ...prev])
    showMessage('Update published to your network.')
  }

  const handleToggleLike = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        const liked = !post.viewerState.liked
        return {
          ...post,
          viewerState: { ...post.viewerState, liked },
          reactions: {
            ...post.reactions,
            likes: Math.max(0, post.reactions.likes + (liked ? 1 : -1)),
          },
        }
      }),
    )
  }

  const handleToggleSave = (postId: string) => {
    setFeedPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, viewerState: { ...post.viewerState, saved: !post.viewerState.saved } } : post,
      ),
    )
  }

  const handleShare = async (postId: string) => {
    const target = feedPosts.find((post) => post.id === postId)
    if (!target) return

    const sharePayload = `${target.title}\n${window.location.origin}/#feed-${postId}`
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(sharePayload)
      } else {
        const helper = document.createElement('textarea')
        helper.value = sharePayload
        helper.setAttribute('readonly', '')
        helper.style.position = 'absolute'
        helper.style.left = '-9999px'
        document.body.append(helper)
        helper.select()
        document.execCommand('copy')
        helper.remove()
      }
    } catch (error) {
      console.error('Unable to copy share link', error)
    }
  }

  const handleAddComment = (postId: string, comment: string) => {
    const timestamp = new Date().toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })
    setFeedPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post
        return {
          ...post,
          comments: [...post.comments, { id: `comment-${Date.now()}`, text: comment, createdAt: timestamp }],
          reactions: {
            ...post.reactions,
            comments: post.reactions.comments + 1,
          },
        }
      }),
    )
  }

  const handleMessageAuthor = (authorId: string) => {
    startConversation(authorId)
    showMessage('Conversation ready in Messages.')
    navigate('/messages')
  }

  return (
    <div className='pb-20'>
      <Shell left={<LeftPanel />} right={<RightPanel />}>
        <section className='space-y-4'>
          <header className='card flex flex-wrap items-center justify-between gap-3 px-6 py-5'>
            <div>
              <h1 className='text-xl font-semibold text-[var(--brand-ink)]'>Good afternoon, Priya</h1>
              <p className='text-sm text-[var(--brand-muted)]'>Here are the updates and briefs that need your attention.</p>
              {message && <p className='mt-2 text-xs font-semibold text-[var(--brand-blue)] sm:text-sm'>{message}</p>}
            </div>
            <div className='flex gap-2'>
              <button type='button' onClick={handleScheduleConsult} className='btn-outline text-xs sm:text-sm'>
                Schedule consult
              </button>
              <button type='button' onClick={handleDraftNewNote} className='btn-primary text-xs sm:text-sm'>
                Draft new note
              </button>
            </div>
          </header>
          <div className='grid gap-4 md:grid-cols-2'>
            {insights.map((item) => (
              <div key={item} className='card border border-[var(--brand-border)] px-5 py-4 text-sm text-[var(--brand-muted)]'>
                {item}
              </div>
            ))}
          </div>
          <PostComposer ref={composerRef} onPublish={handlePublishUpdate} />
          <FeedList
            posts={feedPosts}
            onToggleLike={handleToggleLike}
            onToggleSave={handleToggleSave}
            onShare={handleShare}
            onAddComment={handleAddComment}
            onMessageAuthor={handleMessageAuthor}
          />
        </section>
      </Shell>
      <MessageDock />
    </div>
  )
}
