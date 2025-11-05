import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { lawyers } from '@/data/lawyers'
import { IconPill } from '@/components/shared/IconPill'
import { useMessaging } from '@/context/MessagingContext'
import { useTransientMessage } from '@/hooks/useTransientMessage'

export const ProfilePage = () => {
  const { id } = useParams()
  const lawyer = lawyers.find((item) => item.id === id) ?? lawyers[0]
  const { profile } = lawyer
  const navigate = useNavigate()
  const { startConversation, sendMessage } = useMessaging()
  const { message, showMessage } = useTransientMessage()
  const [introRequested, setIntroRequested] = useState(false)

  const handleDownloadProfile = () => {
    const summaryLines = [
      `${lawyer.name}`,
      lawyer.headline,
      `Location: ${lawyer.location}`,
      `Specialties: ${lawyer.specialties.join(', ')}`,
      `Experience: ${lawyer.experienceYears}+ years`,
      `Bar number: ${lawyer.barNumber}`,
      '',
      'Focus sectors:',
      ...profile.sectors.map((item) => `- ${item}`),
      '',
      'Differentiators:',
      ...profile.differentiators.map((item) => `- ${item}`),
      '',
      'Signature matters:',
      ...profile.signatureMatters.map((item) => `- ${item}`),
      '',
      'Availability:',
      lawyer.availability,
    ]

    if (profile.representativeClients?.length) {
      summaryLines.push('', 'Representative clients:', ...profile.representativeClients.map((item) => `- ${item}`))
    }

    if (profile.feeModels?.length) {
      summaryLines.push('', 'Engagement formats:', ...profile.feeModels.map((item) => `- ${item}`))
    }

    if (profile.recognitions?.length || profile.memberships?.length) {
      summaryLines.push('', 'Recognition & affiliations:')
      if (profile.recognitions) {
        summaryLines.push(...profile.recognitions.map((item) => `- ${item}`))
      }
      if (profile.memberships) {
        summaryLines.push(...profile.memberships.map((item) => `- ${item}`))
      }
    }

    const blob = new Blob([summaryLines.join('\n')], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${lawyer.id}-profile.txt`
    anchor.click()
    URL.revokeObjectURL(url)
    showMessage('Profile downloaded as text summary.')
  }

  const handleBookConsultation = () => {
    const conversationId = startConversation(lawyer.id)
    const [firstName] = lawyer.name.split(' ')
    sendMessage(conversationId, `Hi ${firstName}, could we schedule a consultation next week? Sharing brief details shortly.`)
    showMessage('Consultation request sent via Messages.')
    navigate('/messages')
  }

  const handleIntroCall = () => {
    if (introRequested) return
    const conversationId = startConversation(lawyer.id)
    sendMessage(conversationId, 'Requesting a quick introduction call to scope a potential mandate. Let me know suitable slots.')
    setIntroRequested(true)
    showMessage('Intro call requested. We will surface replies in Messages.')
    navigate('/messages')
  }

  return (
    <div className='min-h-screen bg-[var(--brand-sand)] pb-16'>
      <div className='relative h-56 w-full overflow-hidden bg-[var(--brand-blue)]/40 sm:h-64'>
        <img src={lawyer.cover} alt='' className='h-full w-full object-cover opacity-70' />
        <div className='absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60' aria-hidden />
      </div>
      <div className='mx-auto -mt-24 flex max-w-5xl flex-col gap-6 px-4 sm:px-6'>
        <section className='card flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-end sm:justify-between'>
          <div className='flex flex-col gap-4 sm:flex-row sm:items-end'>
            <img
              src={lawyer.avatar}
              alt={lawyer.name}
              className='h-28 w-28 rounded-3xl border-4 border-white object-cover shadow-[var(--shadow-lg)] sm:h-32 sm:w-32'
            />
            <div>
              <h1 className='text-3xl font-semibold text-[var(--brand-ink)]'>{lawyer.name}</h1>
              <p className='text-sm text-[var(--brand-muted)]'>{lawyer.headline}</p>
              <p className='text-xs text-[var(--brand-muted)]'>{lawyer.location}</p>
              <div className='mt-3 flex flex-wrap gap-2'>
                {lawyer.specialties.map((item) => (
                  <IconPill key={item}>{item}</IconPill>
                ))}
              </div>
              <div className='mt-4 grid grid-cols-2 gap-3 text-xs text-[var(--brand-muted)] sm:text-sm'>
                <div className='rounded-2xl bg-[var(--brand-sand)]/80 px-4 py-3'>
                  Bar ID - <strong>{lawyer.barNumber}</strong>
                </div>
                <div className='rounded-2xl bg-[var(--brand-sand)]/80 px-4 py-3'>
                  Experience - <strong>{lawyer.experienceYears}+ yrs</strong>
                </div>
                <div className='col-span-2 rounded-2xl bg-[var(--brand-sand)]/80 px-4 py-3'>
                  Languages - <strong>{lawyer.languages.join(', ')}</strong>
                </div>
              </div>
              {message && <p className='mt-3 text-xs font-semibold text-[var(--brand-blue)] sm:text-sm'>{message}</p>}
            </div>
          </div>
          <div className='flex gap-2'>
            <button type='button' onClick={handleDownloadProfile} className='btn-outline text-xs sm:text-sm'>
              Download profile
            </button>
            <button type='button' onClick={handleBookConsultation} className='btn-primary text-xs sm:text-sm'>
              Book consultation
            </button>
          </div>
        </section>

        <div className='grid gap-6 lg:grid-cols-[2fr_1fr]'>
          <section className='card space-y-6 px-6 py-6 text-sm text-[var(--brand-muted)]'>
            <h2 className='text-lg font-semibold text-[var(--brand-ink)]'>Practice snapshot</h2>
            <div className='space-y-4 leading-relaxed'>
              {profile.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className='grid gap-5 md:grid-cols-2'>
              <div className='space-y-3'>
                <h3 className='text-xs font-semibold uppercase tracking-wide text-[var(--brand-muted)]'>Core differentiators</h3>
                <ul className='space-y-2'>
                  {profile.differentiators.map((item) => (
                    <li key={item} className='flex items-start gap-2'>
                      <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-blue)]' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='space-y-3'>
                <h3 className='text-xs font-semibold uppercase tracking-wide text-[var(--brand-muted)]'>Key sectors</h3>
                <div className='flex flex-wrap gap-2'>
                  {profile.sectors.map((item) => (
                    <IconPill key={item} className='bg-[var(--brand-sand)]/80 text-[var(--brand-ink)]'>
                      {item}
                    </IconPill>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className='space-y-4'>
            <div className='card h-fit space-y-3 px-5 py-5 text-sm text-[var(--brand-muted)]'>
              <h3 className='text-sm font-semibold text-[var(--brand-ink)]'>Availability</h3>
              <p className='leading-relaxed'>{lawyer.availability}</p>
              <button
                type='button'
                onClick={handleIntroCall}
                className='btn-primary w-full text-xs'
                disabled={introRequested}
              >
                {introRequested ? 'Intro requested' : 'Request intro call'}
              </button>
            </div>

            {profile.representativeClients?.length ? (
              <div className='card h-fit space-y-3 px-5 py-5 text-sm text-[var(--brand-muted)]'>
                <h3 className='text-sm font-semibold text-[var(--brand-ink)]'>Representative clients</h3>
                <ul className='space-y-2 leading-relaxed'>
                  {profile.representativeClients.map((item) => (
                    <li key={item} className='flex items-start gap-2'>
                      <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-blue)]/80' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {profile.feeModels?.length ? (
              <div className='card h-fit space-y-3 px-5 py-5 text-sm text-[var(--brand-muted)]'>
                <h3 className='text-sm font-semibold text-[var(--brand-ink)]'>Engagement formats</h3>
                <ul className='space-y-2 leading-relaxed'>
                  {profile.feeModels.map((item) => (
                    <li key={item} className='flex items-start gap-2'>
                      <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-blue)]/80' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {(profile.recognitions?.length || profile.memberships?.length) && (
              <div className='card h-fit space-y-4 px-5 py-5 text-sm text-[var(--brand-muted)]'>
                <h3 className='text-sm font-semibold text-[var(--brand-ink)]'>Recognition & affiliations</h3>
                {profile.recognitions?.length ? (
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-wide text-[var(--brand-muted)]'>Recognition</p>
                    <ul className='mt-2 space-y-2'>
                      {profile.recognitions.map((item) => (
                        <li key={item} className='flex items-start gap-2'>
                          <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-blue)]/80' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {profile.memberships?.length ? (
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-wide text-[var(--brand-muted)]'>Memberships</p>
                    <ul className='mt-2 space-y-2'>
                      {profile.memberships.map((item) => (
                        <li key={item} className='flex items-start gap-2'>
                          <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-blue)]/80' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}

            <div className='card h-fit space-y-3 px-5 py-5 text-sm text-[var(--brand-muted)]'>
              <h3 className='text-sm font-semibold text-[var(--brand-ink)]'>Contact</h3>
              <p>
                Email - <a href={`mailto:${lawyer.email}`} className='text-[var(--brand-blue)]'>{lawyer.email}</a>
              </p>
              <p>
                LinkedIn -{' '}
                <a
                  href={`https://www.linkedin.com/in/${lawyer.id}`}
                  className='text-[var(--brand-blue)]'
                  target='_blank'
                  rel='noreferrer'
                >
                  {`linkedin.com/in/${lawyer.id}`}
                </a>
              </p>
              <p>Office - {lawyer.location}</p>
            </div>
          </aside>
        </div>

        <section className='card px-6 py-6 text-sm text-[var(--brand-muted)]'>
          <h2 className='text-lg font-semibold text-[var(--brand-ink)]'>Signature matters</h2>
          <div className='mt-3 space-y-3'>
            {profile.signatureMatters.map((item) => (
              <div key={item} className='rounded-2xl border border-[var(--brand-border)] px-4 py-3'>
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className='card px-6 py-6 text-sm text-[var(--brand-muted)]'>
          <h2 className='text-lg font-semibold text-[var(--brand-ink)]'>Experience</h2>
          <div className='mt-3 space-y-4'>
            {profile.experience.map((item) => (
              <div key={`${item.role}-${item.period}`} className='rounded-2xl bg-[var(--brand-sand)]/70 px-4 py-4'>
                <p className='text-sm font-semibold text-[var(--brand-ink)]'>{item.role}</p>
                <p className='text-xs uppercase tracking-wide text-[var(--brand-muted)]'>{item.period}</p>
                <p className='mt-2 leading-relaxed'>{item.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className='card px-6 py-6 text-sm text-[var(--brand-muted)]'>
          <h2 className='text-lg font-semibold text-[var(--brand-ink)]'>Education & certifications</h2>
          <ul className='mt-3 space-y-3'>
            {profile.education.map((item) => (
              <li key={`${item.title}-${item.institution}`} className='rounded-2xl border border-[var(--brand-border)] px-4 py-3'>
                <p className='font-semibold text-[var(--brand-ink)]'>{item.title}</p>
                <p className='text-xs uppercase tracking-wide text-[var(--brand-muted)]'>
                  {item.institution}
                  {item.year ? ` · ${item.year}` : ''}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {profile.publications?.length ? (
          <section className='card px-6 py-6 text-sm text-[var(--brand-muted)]'>
            <h2 className='text-lg font-semibold text-[var(--brand-ink)]'>Publications & speaking</h2>
            <ul className='mt-3 space-y-3'>
              {profile.publications.map((item) => (
                <li key={item.title} className='rounded-2xl border border-[var(--brand-border)] px-4 py-3'>
                  <p className='font-semibold text-[var(--brand-ink)]'>{item.title}</p>
                  {item.detail ? <p className='text-xs text-[var(--brand-muted)]'>{item.detail}</p> : null}
                  {item.url ? (
                    <a
                      href={item.url}
                      target='_blank'
                      rel='noreferrer'
                      className='mt-2 inline-block text-xs font-semibold text-[var(--brand-blue)]'
                    >
                      View resource
                    </a>
                  ) : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {profile.proBono?.length ? (
          <section className='card px-6 py-6 text-sm text-[var(--brand-muted)]'>
            <h2 className='text-lg font-semibold text-[var(--brand-ink)]'>Pro bono & community</h2>
            <ul className='mt-3 space-y-2'>
              {profile.proBono.map((item) => (
                <li key={item} className='flex items-start gap-2'>
                  <span className='mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--brand-blue)]' />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </div>
  )
}
