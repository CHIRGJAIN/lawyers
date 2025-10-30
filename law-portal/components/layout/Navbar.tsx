'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, BriefcaseBusiness, Home, MessageCircle, Search, UsersRound, UserRound } from 'lucide-react'
import { routes } from '@/lib/routes'

type NavItem = {
  id: string
  label: string
  href: string
  icon: React.ReactNode
  badge?: string
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', href: routes.home(), icon: <Home className='h-5 w-5' aria-hidden /> },
  { id: 'network', label: 'Network', href: routes.network(), icon: <UsersRound className='h-5 w-5' aria-hidden /> },
  {
    id: 'opportunities',
    label: 'Opportunities',
    href: routes.opportunities(),
    icon: <BriefcaseBusiness className='h-5 w-5' aria-hidden />,
  },
  {
    id: 'messages',
    label: 'Messaging',
    href: routes.messages(),
    icon: <MessageCircle className='h-5 w-5' aria-hidden />,
    badge: '3',
  },
  { id: 'alerts', label: 'Alerts', href: routes.alerts(), icon: <Bell className='h-5 w-5' aria-hidden />, badge: '5' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className='sticky top-0 z-40 border-b border-border bg-surface-base/95 backdrop-blur supports-[backdrop-filter]:bg-surface-base/85'>
      <a href='#page-root' className='skip-link focus-ring'>Skip to content</a>
      <div className='mx-auto flex max-w-6xl items-center gap-4 px-3 py-2 sm:px-6'>
        <Link href={routes.home()} className='flex items-center gap-2 rounded-lg px-2 py-1 focus-ring' aria-label='LexLink home'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white font-semibold'>LL</div>
          <span className='hidden text-lg font-semibold text-text sm:inline'>LexLink</span>
        </Link>

        <div className='relative hidden flex-1 items-center sm:flex'>
          <Search className='absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted' aria-hidden />
          <input
            type='search'
            className='input w-full pl-11 pr-4'
            placeholder='Search lawyers, matters, documents'
            aria-label='Search LexLink'
          />
        </div>

        <nav aria-label='Primary' className='flex flex-1 items-center justify-end gap-1 text-xs sm:gap-2 sm:text-sm'>
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group flex flex-col items-center rounded-lg px-2 py-1.5 transition focus-ring sm:px-3 ${
                  active ? 'text-primary' : 'text-text-muted hover:text-text'
                }`}
              >
                <span className={`relative flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7 ${active ? 'text-primary' : ''}`}>
                  {item.icon}
                  {item.badge && (
                    <span className='absolute -right-2 -top-1 inline-flex h-4 min-w-[1rem] items-center justify-center rounded-full bg-danger px-1 text-[0.6rem] font-semibold text-white'>
                      {item.badge}
                    </span>
                  )}
                </span>
                <span className='mt-1 hidden text-[0.7rem] font-medium sm:block'>{item.label}</span>
              </Link>
            )
          })}

          <Link
            href={routes.settings()}
            className={`group flex flex-col items-center rounded-lg px-2 py-1.5 transition focus-ring sm:px-3 ${
              pathname === routes.settings() ? 'text-primary' : 'text-text-muted hover:text-text'
            }`}
          >
            <span className='flex h-6 w-6 items-center justify-center sm:h-7 sm:w-7'>
              <UserRound className='h-5 w-5' aria-hidden />
            </span>
            <span className='mt-1 hidden text-[0.7rem] font-medium sm:block'>Me</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
