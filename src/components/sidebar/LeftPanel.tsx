import { featuredLawyer } from '@/data/lawyers'
import { IconPill } from '@/components/shared/IconPill'

const analytics = [
  { label: 'Briefings this week', value: '12' },
  { label: 'Profile views', value: '214' },
  { label: 'Matter alerts', value: '6' },
]

const quickLinks = [
  { label: 'Saved research', href: '/saved' },
  { label: 'Pitch decks', href: '/resources/decks' },
  { label: 'Client billing', href: '/billing' },
]

export const LeftPanel = () => (
  <div className='space-y-4'>
    <section className='card overflow-hidden'>
      <div
        className='h-20 bg-cover bg-center'
        style={{ backgroundImage: `url(${featuredLawyer.cover})` }}
        aria-hidden
      />
      <div className='-mt-12 px-6 pb-6'>
        <div className='inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl border-4 border-white shadow-lg backdrop-blur'>
          <img
            src={featuredLawyer.avatar}
            alt={featuredLawyer.name}
            className='h-full w-full object-cover'
          />
        </div>
        <h2 className='mt-3 text-lg font-semibold text-[var(--brand-ink)]'>{featuredLawyer.name}</h2>
        <p className='text-sm text-[var(--brand-muted)]'>{featuredLawyer.headline}</p>
        <p className='mt-1 text-xs text-[var(--brand-muted)]'>{featuredLawyer.location}</p>

        <div className='mt-4 flex flex-wrap gap-2'>
          {featuredLawyer.specialties.slice(0, 3).map((item) => (
            <IconPill key={item}>{item}</IconPill>
          ))}
        </div>

        <div className='mt-5 grid gap-3 rounded-2xl bg-[var(--brand-sand)]/60 p-4 text-sm'>
          {analytics.map((metric) => (
            <div key={metric.label} className='flex items-center justify-between'>
              <span className='text-[var(--brand-muted)]'>{metric.label}</span>
              <span className='font-semibold text-[var(--brand-ink)]'>{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className='card p-5 text-sm'>
      <h3 className='mb-3 text-sm font-semibold text-[var(--brand-ink)]'>Quick actions</h3>
      <ul className='space-y-2'>
        {quickLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className='flex items-center justify-between rounded-xl px-3 py-2 text-[var(--brand-muted)] transition hover:bg-[var(--brand-sand)] hover:text-[var(--brand-ink)]'
            >
              {link.label}
              <span aria-hidden>→</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  </div>
)

