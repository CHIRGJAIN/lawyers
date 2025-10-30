import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type ChangeEvent,
  type ForwardRefRenderFunction,
} from 'react'
import { Sparkles, FileText, Paperclip, X } from 'lucide-react'
import type { FeedAttachment } from '@/data/posts'
import { useTransientMessage } from '@/hooks/useTransientMessage'

type PostComposerProps = {
  onPublish: (payload: { summary: string; attachments: FeedAttachment[] }) => void
}

export type PostComposerHandle = {
  focus: () => void
}

const buildAttachment = (file: File, category: FeedAttachment['category']): FeedAttachment => ({
  id: `${category}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  fileName: file.name,
  category,
})

const InnerPostComposer: ForwardRefRenderFunction<PostComposerHandle, PostComposerProps> = ({ onPublish }, ref) => {
  const [draft, setDraft] = useState('')
  const [attachments, setAttachments] = useState<FeedAttachment[]>([])
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const memoInputRef = useRef<HTMLInputElement | null>(null)
  const evidenceInputRef = useRef<HTMLInputElement | null>(null)
  const { message, showMessage } = useTransientMessage()

  useImperativeHandle(ref, () => ({
    focus: () => textareaRef.current?.focus(),
  }))

  const handleAttach =
    (category: FeedAttachment['category'], inputRef: React.RefObject<HTMLInputElement>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files ?? [])
      if (!files.length) return
      setAttachments((prev) => [...prev, ...files.map((file) => buildAttachment(file, category))])
      showMessage(
        files.length === 1 ? `${files[0].name} added.` : `${files.length} ${category === 'memo' ? 'memo(s)' : 'evidence file(s)'} added.`,
      )
      // allow re-selecting the same file
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }

  const handleRemoveAttachment = (attachmentId: string) => {
    setAttachments((prev) => prev.filter((item) => item.id !== attachmentId))
  }

  const handlePublish = () => {
    const trimmed = draft.trim()
    if (!trimmed) return
    onPublish({ summary: trimmed, attachments })
    setDraft('')
    setAttachments([])
    showMessage('Update published to feed.')
  }

  return (
    <section className='card p-6'>
      <p className='text-sm font-semibold text-[var(--brand-ink)]'>Share an update with your legal network</p>
      <textarea
        ref={textareaRef}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        placeholder='Draft a legal insight, case note, or client update...'
        className='mt-3 h-24 w-full resize-none rounded-2xl border border-[var(--brand-border)] bg-white px-4 py-3 text-sm text-[var(--brand-ink)] focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
      />
      {attachments.length > 0 && (
        <ul className='mt-3 flex flex-wrap gap-2 text-xs text-[var(--brand-muted)] sm:text-sm'>
          {attachments.map((attachment) => (
            <li
              key={attachment.id}
              className='inline-flex items-center gap-2 rounded-full bg-[var(--brand-sand)] px-3 py-1 text-[var(--brand-ink)]'
            >
              <span className='uppercase text-[0.6rem] font-semibold tracking-wide text-[var(--brand-muted)]'>
                {attachment.category === 'memo' ? 'Memo' : 'Evidence'}
              </span>
              <span>{attachment.fileName}</span>
              <button
                type='button'
                onClick={() => handleRemoveAttachment(attachment.id)}
                className='rounded-full p-1 text-[var(--brand-muted)] transition hover:bg-[var(--brand-border)]/40'
                aria-label={`Remove ${attachment.fileName}`}
              >
                <X className='h-3.5 w-3.5' />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className='mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--brand-muted)] sm:text-sm'>
        <div className='flex flex-wrap items-center gap-2'>
          <span className='pill'>Draft mode</span>
          <span className='pill inline-flex items-center gap-1'>
            <Sparkles className='h-3.5 w-3.5 text-[var(--brand-blue)]' />
            AI brief assist
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={() => memoInputRef.current?.click()}
            className='btn-outline text-xs sm:text-sm'
          >
            <FileText className='h-4 w-4' />
            Attach memo
          </button>
          <input
            ref={memoInputRef}
            type='file'
            accept='.pdf,.doc,.docx,.txt'
            className='hidden'
            onChange={handleAttach('memo', memoInputRef)}
          />
          <button
            type='button'
            onClick={() => evidenceInputRef.current?.click()}
            className='btn-outline text-xs sm:text-sm'
          >
            <Paperclip className='h-4 w-4' />
            Add evidence
          </button>
          <input
            ref={evidenceInputRef}
            type='file'
            accept='.pdf,.png,.jpg,.jpeg,.xls,.xlsx'
            className='hidden'
            onChange={handleAttach('evidence', evidenceInputRef)}
          />
          <button
            type='button'
            onClick={handlePublish}
            className='btn-primary text-xs sm:text-sm'
            disabled={!draft.trim()}
          >
            Publish update
          </button>
        </div>
      </div>
      {message && <p className='mt-3 text-xs font-semibold text-[var(--brand-blue)] sm:text-sm'>{message}</p>}
    </section>
  )
}

export const PostComposer = forwardRef(InnerPostComposer)
