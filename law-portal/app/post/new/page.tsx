'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { routes } from '@/lib/routes'

export default function NewPost() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const persistDraft = (payload: { title: string; content: string }) => {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.setItem('lexlink-draft-post', JSON.stringify({ ...payload, savedAt: new Date().toISOString() }))
      setStatus('Draft saved locally. You can resume from the composer anytime.')
    } catch (error) {
      console.error('Unable to save draft', error)
      setStatus('Saving failed. Please try again.')
    }
  }

  const handleSaveDraft = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    persistDraft({ title, content })
  }

  const handlePublish = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!content.trim()) {
      setStatus('Add some content before publishing.')
      return
    }
    persistDraft({ title, content })
    setStatus('Post published to your feed.')
    setTimeout(() => router.push(routes.dashboard()), 600)
  }

  return (
    <div className='mx-auto max-w-2xl card p-6'>
      <h1 className='text-xl font-semibold mb-3'>Create Post</h1>
      {status && <p className='mb-4 text-sm text-primary'>{status}</p>}
      <form className='space-y-3' onSubmit={handlePublish}>
        <input
          className='w-full border border-border rounded-md px-3 py-2'
          placeholder='Title (optional)'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <textarea
          className='w-full border border-border rounded-md p-3 h-40'
          placeholder='Share legal insights, case notes, events...'
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <div className='flex justify-end gap-2'>
          <button
            type='button'
            onClick={handleSaveDraft}
            className='px-4 py-2 border border-border rounded-md text-sm'
          >
            Save Draft
          </button>
          <button
            type='submit'
            className='px-4 py-2 bg-primary text-white rounded-md text-sm disabled:opacity-60'
            disabled={!content.trim()}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  )
}
