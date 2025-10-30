'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, FileText, ShieldCheck, UsersRound } from 'lucide-react'
import { PageShell } from '@/components/layout/PageShell'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { routes } from '@/lib/routes'

export default function ComposePage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [attachmentName, setAttachmentName] = useState<string | null>(null)
  const [status, setStatus] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const attachmentInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    textareaRef.current?.focus()
  }, [])

  const persistDraft = (payload: { title: string; content: string; attachment?: string | null }) => {
    try {
      if (typeof window === 'undefined') return
      window.localStorage.setItem(
        'lexlink-composer-draft',
        JSON.stringify({ ...payload, savedAt: new Date().toISOString() }),
      )
      setStatus('Draft saved. You can revisit it from Start Composer.')
    } catch (error) {
      console.error('Unable to persist draft', error)
      setStatus('Saving failed. Please retry.')
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!content.trim()) {
      setStatus('Add some content before sharing.')
      return
    }
    persistDraft({ title, content, attachment: attachmentName })
    setStatus('Update shared with your network.')
    setTimeout(() => router.push(routes.home()), 600)
  }

  return (
    <PageShell left={<LeftSidebar />} right={<RightSidebar />}>
      <section className='card card-hoverable p-6'>
        {/* COMPOSER MODAL ROUTE */}
        <header className='flex items-center justify-between gap-4'>
          <button
            type='button'
            onClick={() => router.back()}
            className='focus-ring inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-text-muted hover:bg-background'
            aria-label='Back to feed'
          >
            <ArrowLeft className='h-4 w-4' aria-hidden />
            Back
          </button>
          <div className='flex items-center gap-4 text-xs text-text-muted'>
            <span className='inline-flex items-center gap-2'>
              <ShieldCheck className='h-4 w-4 text-primary' aria-hidden />
              Confidential drafting
            </span>
            <span className='inline-flex items-center gap-2'>
              <UsersRound className='h-4 w-4 text-primary' aria-hidden />
              Share with network
            </span>
          </div>
        </header>

        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
          {status && <p className='text-sm text-primary'>{status}</p>}
          <label className='block text-sm font-medium text-text'>Title (optional)</label>
          <input
            className='input'
            placeholder='E.g. Recent Supreme Court holding on data privacy'
            name='title'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label className='block text-sm font-medium text-text'>Summary</label>
          <textarea
            ref={textareaRef}
            className='input min-h-[200px] resize-y'
            placeholder='Share legal insight, brief, or case research for your network...'
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />

          <div className='flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4 text-sm'>
            <div className='flex items-center gap-3 text-text-muted'>
              <button
                type='button'
                className='btn-ghost px-3 py-2 text-text'
                onClick={() => attachmentInputRef.current?.click()}
              >
                <FileText className='h-4 w-4 text-primary' aria-hidden />
                Attach research note
              </button>
              <input
                ref={attachmentInputRef}
                type='file'
                accept='.pdf,.doc,.docx'
                className='hidden'
                onChange={(event) => {
                  const file = event.target.files?.[0] ?? null
                  setAttachmentName(file?.name ?? null)
                  if (file) {
                    setStatus(`Attached ${file.name}.`)
                  }
                }}
              />
              {attachmentName && <span className='text-xs text-text'>Attached: {attachmentName}</span>}
            </div>
            <div className='flex items-center gap-2'>
              <button
                type='button'
                className='btn-outline'
                onClick={() => persistDraft({ title, content, attachment: attachmentName })}
              >
                Save draft
              </button>
              <button type='submit' className='btn-primary' disabled={!content.trim()}>
                Share update
              </button>
            </div>
          </div>
        </form>
      </section>
    </PageShell>
  )
}
