import { useState } from 'react'
import { Shell } from '@/components/layout/Shell'
import { LeftPanel } from '@/components/sidebar/LeftPanel'
import { RightPanel } from '@/components/sidebar/RightPanel'
import { useTransientMessage } from '@/hooks/useTransientMessage'

type Alert = (typeof alerts)[number]

const alerts: Alert[] = [
  {
    id: 'alert-1',
    title: 'Client follow-up: NovaPay diligence',
    detail: 'Add redline comments for privacy annex before Tuesday stand-up.',
    type: 'Matter',
  },
  {
    id: 'alert-2',
    title: 'LexLink security advisory',
    detail: 'Enable two-factor authentication to protect workspace documents.',
    type: 'Platform',
  },
  {
    id: 'alert-3',
    title: 'New comment on arbitration update',
    detail: 'Arjun Sengupta added evidence references to your shared deck.',
    type: 'Collaboration',
  },
]

export const AlertsPage = () => {
  const [activeAlerts, setActiveAlerts] = useState(alerts)
  const { message, showMessage } = useTransientMessage()

  const handleResolve = (alertId: string) => {
    setActiveAlerts((prev) => prev.filter((item) => item.id !== alertId))
    showMessage('Alert cleared. Logged in your activity timeline.')
  }

  return (
    <Shell left={<LeftPanel />} right={<RightPanel />}>
      <section className='space-y-4'>
        <header>
          <h1 className='text-xl font-semibold text-[var(--brand-ink)]'>Alerts center</h1>
          <p className='text-sm text-[var(--brand-muted)]'>Review action items, security updates and collaboration activity.</p>
          {message && <p className='mt-2 text-xs font-semibold text-[var(--brand-blue)] sm:text-sm'>{message}</p>}
        </header>
        <div className='space-y-3'>
          {activeAlerts.length === 0 && (
            <div className='card p-6 text-sm text-[var(--brand-muted)]'>All caught up. Nothing needs your attention right now.</div>
          )}
          {activeAlerts.map((alert) => (
            <article key={alert.id} className='card flex items-start justify-between gap-3 p-5 text-sm'>
              <div>
                <p className='text-xs uppercase tracking-wide text-[var(--brand-muted)]'>{alert.type}</p>
                <h2 className='text-base font-semibold text-[var(--brand-ink)]'>{alert.title}</h2>
                <p className='text-[var(--brand-muted)]'>{alert.detail}</p>
              </div>
              <button
                type='button'
                onClick={() => handleResolve(alert.id)}
                className='btn-outline text-xs sm:text-sm'
              >
                Mark done
              </button>
            </article>
          ))}
        </div>
      </section>
    </Shell>
  )
}
