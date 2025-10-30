import { NavLink } from 'react-router-dom'
import { Home, Users2, MessageCircle, BriefcaseBusiness, Bell, Search, UserCircle2 } from 'lucide-react'
import { primaryNav } from '@/data/navigation'
import { cn } from '@/utils/cn'

const iconMap = {
  home: Home,
  network: Users2,
  messages: MessageCircle,
  opportunities: BriefcaseBusiness,
  alerts: Bell,
  profile: UserCircle2,
}

export const AppHeader = () => (
  <header className='surface-blur sticky top-0 z-50 border-b border-[var(--brand-border)]'>
    <div className='mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3'>
      <NavLink to='/' className='flex items-center gap-3'>
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-blue)] text-lg font-bold text-white'>
          LX
        </div>
        <div className='hidden flex-col sm:flex'>
          <span className='text-sm font-semibold uppercase tracking-[0.3em] text-[var(--brand-muted)]'>LexLink</span>
          <span className='text-xs text-[var(--brand-muted)]'>Legal collaboration network</span>
        </div>
      </NavLink>

      <div className='relative hidden flex-1 max-w-lg items-center sm:flex'>
        <Search className='pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-muted)]' />
        <input
          className='h-11 w-full rounded-full bg-white px-12 text-sm text-[var(--brand-ink)] shadow-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
          placeholder='Search lawyers, matters, documents, notes…'
          type='search'
        />
      </div>

      <nav className='flex items-center gap-2 text-xs font-medium sm:gap-4 sm:text-sm'>
        {primaryNav.map((item) => {
          const Icon = iconMap[item.icon]
          return (
            <NavLink
              key={item.id}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'group relative flex h-12 w-16 flex-col items-center justify-center rounded-2xl transition hover:bg-white/60 sm:h-14 sm:w-20',
                  isActive ? 'bg-white text-[var(--brand-blue)] shadow' : 'text-[var(--brand-muted)]',
                )
              }
            >
              <Icon className='h-5 w-5 sm:h-6 sm:w-6' />
              <span className='mt-1 hidden sm:block'>{item.label}</span>
              {item.badge ? (
                <span className='absolute right-1 top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--brand-blue)] text-[0.65rem] font-semibold text-white'>
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          )
        })}
        <NavLink
          to='/profile/priya-menon'
          className={({ isActive }) =>
            cn(
              'group relative flex h-12 w-16 flex-col items-center justify-center rounded-2xl transition hover:bg-white/60 sm:h-14 sm:w-20',
              isActive ? 'bg-white text-[var(--brand-blue)] shadow' : 'text-[var(--brand-muted)]',
            )
          }
        >
          <UserCircle2 className='h-5 w-5 sm:h-6 sm:w-6' />
          <span className='mt-1 hidden sm:block'>Profile</span>
        </NavLink>
      </nav>
    </div>
  </header>
)
