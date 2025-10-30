'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Newspaper } from 'lucide-react'
import { consultationLink, legalNews, suggestedConnections } from '@/lib/data'
import { routes } from '@/lib/routes'

export default function RightSidebar() {
  return (
    <div className='space-y-4'>
      {/* LEGAL NEWS */}
      <section className='card card-hoverable p-4'>
        <header className='flex items-center justify-between'>
          <div className='flex items-center gap-2 text-sm font-semibold text-text'>
            <Newspaper className='h-4 w-4 text-primary' aria-hidden />
            Legal news briefing
          </div>
          <Link href={routes.alerts()} className='text-xs text-primary hover:underline'>
            View all
          </Link>
        </header>
        <ul className='mt-3 space-y-3 text-sm'>
          {legalNews.map((item) => (
            <li key={item.id} className='rounded-lg p-2 hover:bg-background/60'>
              <p className='font-medium text-text'>{item.title}</p>
              <p className='text-xs text-text-muted'>{item.source} - {item.time}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* SUGGESTED CONNECTIONS */}
      <section className='card card-hoverable p-4'>
        <h2 className='text-sm font-semibold text-text'>Suggested lawyers &amp; firms</h2>
        <ul className='mt-3 space-y-3 text-sm'>
          {suggestedConnections.map((lawyer) => (
            <li key={lawyer.id} className='flex items-center gap-3 rounded-lg p-2 hover:bg-background/60'>
              <div className='h-12 w-12 overflow-hidden rounded-full border border-border'>
                <Image src={lawyer.avatar} alt={lawyer.name} width={48} height={48} />
              </div>
              <div className='min-w-0 flex-1'>
                <Link href={routes.profile(lawyer.id)} className='block truncate font-semibold text-text hover:underline'>
                  {lawyer.name}
                </Link>
                <p className='truncate text-xs text-text-muted'>{lawyer.headline}</p>
                <p className='text-[0.7rem] text-success'>Mutual connections: {Math.floor(Math.random() * 12) + 2}</p>
              </div>
              <div className='flex flex-col gap-1'>
                <Link href={routes.profile(lawyer.id)} className='btn-outline text-xs'>Connect</Link>
                <Link href={consultationLink(lawyer.id)} className='btn-ghost text-xs'>Book</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
