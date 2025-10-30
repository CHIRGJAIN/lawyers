import { useState } from 'react'
import { Shell } from '@/components/layout/Shell'
import { LeftPanel } from '@/components/sidebar/LeftPanel'
import { RightPanel } from '@/components/sidebar/RightPanel'

export const SettingsPage = () => {
  const [status, setStatus] = useState<'idle' | 'saved'>('idle')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('saved')
    setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <Shell left={<LeftPanel />} right={<RightPanel />}>
      <form onSubmit={handleSubmit} className='card space-y-4 p-6'>
        <header>
          <h1 className='text-xl font-semibold text-[var(--brand-ink)]'>Workspace settings</h1>
          <p className='text-sm text-[var(--brand-muted)]'>Update profile presence, communication cadence, and branding.</p>
        </header>
        <div className='grid gap-4 md:grid-cols-2'>
          <label className='text-sm font-semibold text-[var(--brand-ink)]'>
            Display name
            <input
              defaultValue='Adv. Priya Menon'
              className='mt-1 h-11 w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
              required
            />
          </label>
          <label className='text-sm font-semibold text-[var(--brand-ink)]'>
            Practice focus
            <input
              defaultValue='Corporate governance · Technology law'
              className='mt-1 h-11 w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
            />
          </label>
          <label className='text-sm font-semibold text-[var(--brand-ink)]'>
            Jurisdiction headline
            <input
              defaultValue='Supreme Court of India and High Courts'
              className='mt-1 h-11 w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
            />
          </label>
          <label className='text-sm font-semibold text-[var(--brand-ink)]'>
            Fee range (visible on profile)
            <input
              defaultValue='Strategic mandates starting USD 1,500'
              className='mt-1 h-11 w-full rounded-2xl border border-[var(--brand-border)] bg-white px-4 text-sm focus:outline focus:outline-2 focus:outline-[var(--brand-blue)]'
            />
          </label>
        </div>
        <div className='rounded-2xl bg-[var(--brand-sand)]/70 px-5 py-4 text-sm text-[var(--brand-muted)]'>
          Enable two-factor authentication to secure client materials. We recommend rotating passcodes every 45 days.
        </div>
        <div className='flex items-center justify-between'>
          <div className='text-xs text-[var(--brand-muted)]'>Workspace ID: LEX-9284 · Data region: India</div>
          <button type='submit' className='btn-primary text-xs sm:text-sm'>Save preferences</button>
        </div>
        {status === 'saved' && <p className='text-sm font-semibold text-[var(--brand-blue)]'>Preferences saved.</p>}
      </form>
    </Shell>
  )
}

