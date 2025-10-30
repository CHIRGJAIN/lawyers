'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChartLine } from 'lucide-react'
import { consultationLink, lawyers, quickLinks, shortcutStats } from '@/lib/data'
import { routes } from '@/lib/routes'

const currentUser = lawyers.find((lawyer) => lawyer.id === 'me')

export default function LeftSidebar() {
  if (!currentUser) return null

  return (
    <div className='space-y-4'>
      {/* PROFILE SNAPSHOT */}
      <section className='card card-hoverable overflow-hidden'>
        <div className='h-20 w-full bg-gradient-to-r from-primary/20 via-primary/10 to-primary/30' />
        <div className='p-4'>
          <div className='-mt-12 flex items-center gap-3'>
            <div className='h-16 w-16 overflow-hidden rounded-full border-4 border-surface-base shadow-card'>
              <Image src={currentUser.avatar} alt={`${currentUser.name} avatar`} width={64} height={64} />
            </div>
            <div>
              <p className='text-base font-semibold text-text'>{currentUser.name}</p>
              <p className='text-sm text-text-muted'>{currentUser.headline}</p>
            </div>
          </div>
          <div className='mt-3 flex flex-wrap gap-2 text-xs text-text-muted'>
            <span>{currentUser.jurisdiction}</span>
            <span aria-hidden>-</span>
            <span>{currentUser.firm}</span>
          </div>
          <div className='mt-4 flex gap-2'>
            <Link href={routes.profileMe()} className='btn-primary text-xs sm:text-sm'>View profile</Link>
            <Link
              href={consultationLink('me')}
              className='btn-outline text-xs sm:text-sm'
              aria-label='Book consultation with yourself'
            >
              Book consultation
            </Link>
          </div>
        </div>
      </section>

      {/* QUICK STATS */}
      <section className='card card-hoverable p-4'>
        <div className='mb-3 flex items-center gap-2 text-sm font-semibold text-text'>
          <ChartLine className='h-4 w-4 text-primary' aria-hidden />
          Weekly analytics
        </div>
        <ul className='space-y-3 text-sm'>
          {shortcutStats.map((stat) => (
            <li key={stat.id} className='flex items-center justify-between'>
              <span className='text-text-muted'>{stat.label}</span>
              <span className='font-semibold text-text'>{stat.value}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* QUICK LINKS */}
      <section className='card card-hoverable p-4'>
        <h2 className='text-sm font-semibold text-text'>Quick links</h2>
        <ul className='mt-3 space-y-2 text-sm'>
          {quickLinks.map((item) => (
            <li key={item.id}>
              <Link href={item.href} className='flex items-center justify-between text-text-muted hover:text-primary focus-ring rounded-lg px-2 py-1'>
                {item.label}
                <span aria-hidden>-</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

