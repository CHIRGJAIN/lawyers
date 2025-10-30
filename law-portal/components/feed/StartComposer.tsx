'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FileText, PencilLine, Upload } from 'lucide-react'
import { lawyers } from '@/lib/data'
import { routes } from '@/lib/routes'

const me = lawyers.find((lawyer) => lawyer.id === 'me')

export function StartComposer() {
  const router = useRouter()

  const openComposer = () => {
    router.push(routes.compose())
  }

  return (
    <section className='card card-hoverable p-4'>
      {/* START COMPOSER */}
      <div className='flex items-center gap-3'>
        <div className='h-12 w-12 overflow-hidden rounded-full border border-border'>
          {me && <Image src={me.avatar} alt={`${me.name} avatar`} width={48} height={48} />}
        </div>
        <button
          type='button'
          onClick={openComposer}
          className='focus-ring flex-1 rounded-full border border-border bg-[#F3F2F0] px-4 py-2 text-left text-sm text-text-muted hover:bg-white'
        >
          Start a legal update...
        </button>
      </div>
      <div className='mt-4 grid grid-cols-1 gap-2 text-sm text-text-muted sm:grid-cols-3'>
        <button
          type='button'
          onClick={openComposer}
          className='focus-ring btn-ghost justify-start rounded-full px-3 py-2 text-text'
          aria-label='Share a brief'
        >
          <PencilLine className='h-4 w-4 text-primary' aria-hidden />
          Share a brief
        </button>
        <button
          type='button'
          onClick={openComposer}
          className='focus-ring btn-ghost justify-start rounded-full px-3 py-2 text-text'
          aria-label='Draft an article'
        >
          <FileText className='h-4 w-4 text-primary' aria-hidden />
          Draft an article
        </button>
        <button
          type='button'
          onClick={openComposer}
          className='focus-ring btn-ghost justify-start rounded-full px-3 py-2 text-text'
          aria-label='Upload a case note'
        >
          <Upload className='h-4 w-4 text-primary' aria-hidden />
          Upload case note
        </button>
      </div>
    </section>
  )
}

