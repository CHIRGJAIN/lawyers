import { useState } from 'react'
import { BookmarkCheck, MessageCircle, Share2, ThumbsUp } from 'lucide-react'
import { lawyers } from '@/data/lawyers'
import type { FeedPost } from '@/data/posts'
import { buildAuthorMap } from '@/data/posts'
import { IconPill } from '@/components/shared/IconPill'
import { useTransientMessage } from '@/hooks/useTransientMessage'

const authorMap = buildAuthorMap(lawyers)

export type FeedComment = {
  id: string
  text: string
  createdAt: string
}

export type FeedListItem = FeedPost & {
  viewerState: {
    liked: boolean
    saved: boolean
  }
  comments: FeedComment[]
}

type FeedListProps = {
  posts: FeedListItem[]
  onToggleLike: (postId: string) => void
  onToggleSave: (postId: string) => void
  onShare: (postId: string) => Promise<void> | void
  onAddComment: (postId: string, comment: string) => void
  onMessageAuthor: (authorId: string) => void
}

export const FeedList = ({ posts, onToggleLike, onToggleSave, onShare, onAddComment, onMessageAuthor }: FeedListProps) => {
  const { message, showMessage } = useTransientMessage()
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({})
  const [expandedPost, setExpandedPost] = useState<string | null>(null)

  const handleCommentSubmit = (postId: string) => {
    const draft = commentDrafts[postId]?.trim()
    if (!draft) return
    onAddComment(postId, draft)
    setCommentDrafts((prev) => ({ ...prev, [postId]: '' }))
    showMessage('Comment added.')
  }

  const handleShare = async (postId: string) => {
    await onShare(postId)
    showMessage('Post link copied to clipboard.')
  }

  return (
    <div className='space-y-4'>
      {message && <p className='text-xs font-semibold uppercase tracking-wide text-[var(--brand-blue)]'>{message}</p>}
      {posts.map((post) => {
        const author = authorMap[post.authorId]
        if (!author) return null

        const draft = commentDrafts[post.id] ?? ''
        const isExpanded = expandedPost === post.id

        return (
          <article key={post.id} className='card p-6'>
            <header className='flex items-start gap-3'>
              <img src={author.avatar} alt={author.name} className='h-14 w-14 rounded-2xl object-cover shadow-sm' />
              <div className='flex-1'>
                <div className='flex flex-wrap items-center gap-2 text-sm'>
                  <h3 className='font-semibold text-[var(--brand-ink)]'>{author.name}</h3>
                  <span className='pill text-[var(--brand-blue)]'>{post.category.toUpperCase()}</span>
                </div>
                <p className='text-xs text-[var(--brand-muted)]'>{author.headline}</p>
                <p className='text-xs text-[var(--brand-muted)]'>{post.createdAt}</p>
              </div>
              <button
                type='button'
                onClick={() => onMessageAuthor(author.id)}
                className='rounded-full px-3 py-1 text-xs font-medium text-[var(--brand-blue)] hover:bg-[var(--brand-blue)]/10'
              >
                Message
              </button>
            </header>

            <div className='mt-4 space-y-3 text-sm text-[var(--brand-ink)]'>
              <h4 className='text-base font-semibold leading-snug'>{post.title}</h4>
              <p className='text-[var(--brand-muted)]'>{post.summary}</p>
              {post.attachments?.length ? (
                <ul className='flex flex-wrap gap-2 text-xs text-[var(--brand-muted)]'>
                  {post.attachments.map((attachment) => (
                    <li
                      key={attachment.id}
                      className='inline-flex items-center gap-2 rounded-full bg-[var(--brand-sand)] px-3 py-1 text-[var(--brand-ink)]'
                    >
                      <span className='uppercase text-[0.6rem] font-semibold tracking-wide text-[var(--brand-muted)]'>
                        {attachment.category === 'memo' ? 'Memo' : 'Evidence'}
                      </span>
                      <span>{attachment.fileName}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className='flex flex-wrap gap-2'>
                {post.tags.map((tag) => (
                  <IconPill key={tag}>#{tag}</IconPill>
                ))}
              </div>
            </div>

            <footer className='mt-5 flex flex-wrap items-center gap-4 text-xs text-[var(--brand-muted)]'>
              <span>{post.reactions.likes} likes</span>
              <span>{post.reactions.comments} comments</span>
              <span>{post.reactions.reposts} reposts</span>
            </footer>

            <div className='mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4'>
              <button
                type='button'
                onClick={() => {
                  onToggleLike(post.id)
                  showMessage(post.viewerState.liked ? 'Appreciation removed.' : 'Appreciated.')
                }}
                className={`btn-outline justify-center text-xs sm:text-sm ${
                  post.viewerState.liked ? 'border-[var(--brand-blue)] text-[var(--brand-blue)]' : ''
                }`}
                aria-pressed={post.viewerState.liked}
              >
                <ThumbsUp className='h-4 w-4' />
                Appreciate
              </button>
              <button
                type='button'
                onClick={() => {
                  setExpandedPost((prev) => (prev === post.id ? null : post.id))
                  showMessage('Draft your response below.')
                }}
                className='btn-outline justify-center text-xs sm:text-sm'
                aria-expanded={isExpanded}
              >
                <MessageCircle className='h-4 w-4' />
                Comment
              </button>
              <button type='button' onClick={() => handleShare(post.id)} className='btn-outline justify-center text-xs sm:text-sm'>
                <Share2 className='h-4 w-4' />
                Share
              </button>
              <button
                type='button'
                onClick={() => {
                  onToggleSave(post.id)
                  showMessage(post.viewerState.saved ? 'Removed from saved posts.' : 'Saved to your library.')
                }}
                className={`btn-outline justify-center text-xs sm:text-sm ${
                  post.viewerState.saved ? 'border-[var(--brand-blue)] text-[var(--brand-blue)]' : ''
                }`}
                aria-pressed={post.viewerState.saved}
              >
                <BookmarkCheck className='h-4 w-4' />
                Save
              </button>
            </div>

            {isExpanded && (
              <div className='mt-4 space-y-3 rounded-2xl border border-[var(--brand-border)] p-4 text-sm text-[var(--brand-muted)]'>
                <div className='space-y-2'>
                  {post.comments.length === 0 ? (
                    <p className='text-xs text-[var(--brand-muted)]'>No comments yet. Start the discussion.</p>
                  ) : (
                    post.comments.slice(-3).map((comment) => (
                      <div key={comment.id} className='rounded-2xl bg-[var(--brand-sand)] px-3 py-2'>
                        <p className='text-[var(--brand-ink)]'>{comment.text}</p>
                        <p className='mt-1 text-[0.65rem]'>{comment.createdAt}</p>
                      </div>
                    ))
                  )}
                </div>
                <div className='flex flex-col gap-2 sm:flex-row sm:items-end'>
                  <textarea
                    value={draft}
                    onChange={(event) => setCommentDrafts((prev) => ({ ...prev, [post.id]: event.target.value }))}
                    placeholder='Add a thoughtful comment...'
                    className='min-h-[72px] flex-1 rounded-2xl border border-[var(--brand-border)] bg-white px-3 py-2 text-sm text-[var(--brand-ink)] focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
                  />
                  <button
                    type='button'
                    onClick={() => handleCommentSubmit(post.id)}
                    className='btn-primary text-xs sm:text-sm'
                    disabled={!draft.trim()}
                  >
                    Post comment
                  </button>
                </div>
              </div>
            )}
          </article>
        )
      })}
    </div>
  )
}
