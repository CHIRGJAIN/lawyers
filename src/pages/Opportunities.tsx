import { useState } from 'react'
import { Shell } from '@/components/layout/Shell'
import { LeftPanel } from '@/components/sidebar/LeftPanel'
import { RightPanel } from '@/components/sidebar/RightPanel'
import { useTransientMessage } from '@/hooks/useTransientMessage'

const opportunities = [
  {
    id: 'opp-1',
    heading: 'Lead counsel for Series C fintech fundraise',
    budget: 'USD 75k mandate',
    due: 'Pitch deck due 28 Oct',
  },
  {
    id: 'opp-2',
    heading: 'Investigations retainer for listed IT services company',
    budget: 'Monthly retainer - undisclosed',
    due: 'Intro call on 1 Nov',
  },
]

export const OpportunitiesPage = () => {
  const [submittedIds, setSubmittedIds] = useState(() => new Set<string>())
  const { message, showMessage } = useTransientMessage()

  const handleSubmit = (opportunityId: string) => {
    showMessage('Capability statement recorded. Watch for follow-up in Messages.')
    setSubmittedIds((prev) => new Set(prev).add(opportunityId))
  }

  const handleShare = async (opportunityId: string) => {
    const target = opportunities.find((item) => item.id === opportunityId)
    if (!target) return

    const shareText = `Mandate: ${target.heading}\nBudget: ${target.budget}\nDue: ${target.due}`
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareText)
      }
      showMessage('Brief copied—share it with your partner.')
    } catch (error) {
      console.error('Unable to copy brief', error)
      showMessage('Copy failed. Try again or share manually.')
    }
  }

  return (
    <Shell left={<LeftPanel />} right={<RightPanel />}>
      <section className='space-y-4'>
        <header>
          <h1 className='text-xl font-semibold text-[var(--brand-ink)]'>Opportunities & mandates</h1>
          <p className='text-sm text-[var(--brand-muted)]'>Curated briefs from VCs, founders and general counsel.</p>
          {message && <p className='mt-2 text-xs font-semibold text-[var(--brand-blue)] sm:text-sm'>{message}</p>}
        </header>
        <div className='space-y-4'>
          {opportunities.map((item) => {
            const submitted = submittedIds.has(item.id)
            return (
              <article key={item.id} className='card flex flex-col gap-2 p-6 text-sm'>
                <h2 className='text-lg font-semibold text-[var(--brand-ink)]'>{item.heading}</h2>
                <p className='text-[var(--brand-muted)]'>{item.budget}</p>
                <p className='text-xs uppercase tracking-wide text-[var(--brand-muted)]'>{item.due}</p>
                <div className='mt-3 flex gap-2'>
                  <button
                    type='button'
                    onClick={() => handleSubmit(item.id)}
                    className='btn-primary text-xs sm:text-sm'
                    disabled={submitted}
                  >
                    {submitted ? 'Submitted' : 'Submit capability statement'}
                  </button>
                  <button
                    type='button'
                    onClick={() => handleShare(item.id)}
                    className='btn-outline text-xs sm:text-sm'
                  >
                    Share with partner
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </Shell>
  )
}
