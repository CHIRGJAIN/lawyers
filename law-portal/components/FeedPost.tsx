'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { BadgeCheck, Ellipsis, MessageCircle, Send, Share2, ThumbsUp } from 'lucide-react'
import type { FeedPost as FeedPostType, Lawyer } from '@/lib/data'
import { consultationLink } from '@/lib/data'
import { routeParams, routes } from '@/lib/routes'

type Props = {
  post: FeedPostType
  author: Lawyer
}

export function FeedPost({ post, author }: Props) {
  const [liked, setLiked] = useState(false)

  const actionLabel = useMemo(() => {
    switch (post.type) {
      case 'article':
        return 'Legal article'
      case 'update':
        return 'Practice update'
      case 'case-note':
        return 'Case note'
      case 'judgment':
        return 'Judgment analysis'
      case 'event':
        return 'Event / Seminar'
      default:
        return 'Legal update'
    }
  }, [post.type])

  return (
    <article className='card card-hoverable p-4'>
      {/* FEED POST HEADER */}
      <header className='flex items-start justify-between gap-3'>
        <div className='flex items-start gap-3'>
          <Link href={routes.profile(author.id)} className='focus-ring h-12 w-12 overflow-hidden rounded-full border border-border'>
            <Image src={author.avatar} alt={author.name} width={48} height={48} />
          </Link>
          <div>
            <div className='flex items-center gap-1 text-sm font-semibold text-text'>
              <Link href={routes.profile(author.id)} className='hover:underline focus-ring rounded-md px-1 py-0.5'>
                {author.name}
              </Link>
              {author.verified && <BadgeCheck className='h-4 w-4 text-primary' aria-label='Verified' />}
            </div>
            <p className='text-xs text-text-muted'>
              {author.headline} - {post.createdAt}
            </p>
          </div>
        </div>
        <button
          type='button'
          aria-label='More post actions'
          className='focus-ring rounded-full p-2 text-text-muted hover:bg-background'
        >
          <Ellipsis className='h-5 w-5' />
        </button>
      </header>

      {/* POST BODY */}
      <div className='mt-3 space-y-3 text-sm text-text'>
        <span className='inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-primary'>
          <span className='h-2 w-2 rounded-full bg-primary' aria-hidden />
          {actionLabel}
        </span>
        <p className='font-medium'>{post.title}</p>
        <p className='text-text-muted'>{post.content}</p>
        {post.coverImage && (
          <div className='overflow-hidden rounded-xl border border-border'>
            <Image
              src={post.coverImage}
              alt={post.title}
              width={720}
              height={360}
              className='h-auto w-full object-cover'
            />
          </div>
        )}
      </div>

      {/* POST FOOTER */}
      <footer className='mt-4 flex flex-col gap-3'>
        <div className='flex items-center gap-4 text-xs text-text-muted'>
          <span>{liked ? post.reactions.likes + 1 : post.reactions.likes} likes</span>
          <span>{post.reactions.comments} comments</span>
          <span>{post.reactions.shares} shares</span>
        </div>
        <div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
          <button
            type='button'
            onClick={() => setLiked((prev) => !prev)}
            className={`focus-ring flex items-center justify-center gap-2 rounded-xl border border-transparent px-3 py-2 text-sm font-medium transition ${
              liked ? 'bg-primary/10 text-primary' : 'text-text-muted hover:bg-background'
            }`}
            aria-pressed={liked}
          >
            <ThumbsUp className='h-4 w-4' aria-hidden />
            Like
          </button>
          <Link
            href={routes.messages(routeParams.thread(post.id))}
            className='focus-ring flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-text-muted hover:bg-background'
          >
            <MessageCircle className='h-4 w-4' aria-hidden />
            Comment
          </Link>
          <button
            type='button'
            className='focus-ring flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-text-muted hover:bg-background'
            onClick={() => navigator.clipboard?.writeText(routes.profile(author.id)).catch(() => {})}
          >
            <Share2 className='h-4 w-4' aria-hidden />
            Share
          </button>
          <Link
            href={consultationLink(author.id)}
            className='focus-ring flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-text-muted hover:bg-background'
          >
            <Send className='h-4 w-4' aria-hidden />
            Refer client
          </Link>
        </div>
      </footer>
    </article>
  )
}
