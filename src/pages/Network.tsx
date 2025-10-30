import { useNavigate } from 'react-router-dom'
import { lawyers } from '@/data/lawyers'
import { IconPill } from '@/components/shared/IconPill'
import { useMessaging } from '@/context/MessagingContext'
import { useTransientMessage } from '@/hooks/useTransientMessage'

export const NetworkPage = () => {
  const navigate = useNavigate()
  const { startConversation } = useMessaging()
  const { message, showMessage } = useTransientMessage()

  const handleViewProfile = (lawyerId: string) => {
    navigate(`/profile/${lawyerId}`)
  }

  const handleRequestCollaboration = (lawyerId: string) => {
    startConversation(lawyerId)
    showMessage('Collaboration thread initiated in Messages.')
    navigate('/messages')
  }

  return (
    <main className='mx-auto max-w-7xl px-4 py-10 sm:px-6'>
      <header className='flex flex-wrap items-end justify-between gap-3'>
        <div>
          <h1 className='text-2xl font-semibold text-[var(--brand-ink)]'>People you may want to collaborate with</h1>
          <p className='text-sm text-[var(--brand-muted)]'>
            Discovery desk surfaces counsel aligned with your recent matters and briefs.
          </p>
        </div>
        <p className='text-xs uppercase tracking-wide text-[var(--brand-muted)]'>
          Showing {lawyers.length} recommended connections
        </p>
      </header>
      {message && <p className='mt-4 text-sm font-semibold text-[var(--brand-blue)]'>{message}</p>}

      <section className='mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
        {lawyers.map((lawyer) => (
          <article key={lawyer.id} className='card space-y-4 rounded-3xl p-5 text-sm shadow-[var(--shadow-sm)]'>
            <div className='flex items-center gap-3'>
              <img src={lawyer.avatar} alt={lawyer.name} className='h-14 w-14 rounded-full object-cover shadow-sm' />
              <div className='min-w-0'>
                <h2 className='truncate text-base font-semibold text-[var(--brand-ink)]'>{lawyer.name}</h2>
                <p className='truncate text-xs text-[var(--brand-muted)]'>{lawyer.headline}</p>
                <p className='text-[0.7rem] text-[var(--brand-muted)]'>{lawyer.location}</p>
              </div>
            </div>
            <div className='flex flex-wrap gap-1.5'>
              {lawyer.specialties.slice(0, 4).map((item) => (
                <IconPill key={item}>{item}</IconPill>
              ))}
            </div>
            <div className='space-y-2 text-[0.75rem] text-[var(--brand-muted)]'>
              <p>
                Bar ID <span className='font-semibold text-[var(--brand-ink)]'>{lawyer.barNumber}</span>
              </p>
              <p>
                Availability <span className='font-semibold text-[var(--brand-ink)]'>{lawyer.availability}</span>
              </p>
            </div>
            <div className='flex flex-col gap-2'>
              <button type='button' onClick={() => handleViewProfile(lawyer.id)} className='btn-outline text-xs sm:text-sm'>
                View profile
              </button>
              <button
                type='button'
                onClick={() => handleRequestCollaboration(lawyer.id)}
                className='btn-primary text-xs sm:text-sm'
              >
                Connect
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
