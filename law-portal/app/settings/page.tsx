'use client'

import { useState } from 'react'
import { PageShell } from '@/components/layout/PageShell'
import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'

export default function Settings() {
  const [saved, setSaved] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <PageShell left={<LeftSidebar />} right={<RightSidebar />}>
      <section className='space-y-6'>
        <header>
          <h1 className='text-xl font-semibold text-text'>Account & preferences</h1>
          <p className='text-sm text-text-muted'>Manage profile visibility, notifications, and client collaboration settings.</p>
        </header>

        <form onSubmit={handleSubmit} className='card card-hoverable space-y-5 p-6'>
          <div>
            <h2 className='text-lg font-semibold text-text'>Profile basics</h2>
            <p className='text-sm text-text-muted'>Information displayed on your public LexLink profile.</p>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <label className='text-sm font-medium text-text'>
              Display name
              <input className='input mt-1' defaultValue='Adv. Priya Menon' required />
            </label>
            <label className='text-sm font-medium text-text'>
              Practice focus
              <input className='input mt-1' defaultValue='Corporate & Technology Law' required />
            </label>
            <label className='text-sm font-medium text-text'>
              Jurisdiction
              <input className='input mt-1' defaultValue='Supreme Court of India' />
            </label>
            <label className='text-sm font-medium text-text'>
              Fee range
              <input className='input mt-1' defaultValue='INR 8,000/hr' />
            </label>
          </div>
          <div className='grid gap-4 sm:grid-cols-2'>
            <label className='text-sm font-medium text-text'>
              Languages
              <input className='input mt-1' defaultValue='English, Hindi, Malayalam' />
            </label>
            <label className='text-sm font-medium text-text'>
              Availability note
              <input className='input mt-1' defaultValue='Accepting new consultations' />
            </label>
          </div>

          <div className='border-t border-border pt-4'>
            <h2 className='text-lg font-semibold text-text'>Notifications</h2>
            <div className='mt-3 grid gap-3 text-sm text-text-muted sm:grid-cols-2'>
              <label className='flex items-start gap-2'>
                <input type='checkbox' defaultChecked className='mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary' />
                Email me when someone books a consultation
              </label>
              <label className='flex items-start gap-2'>
                <input type='checkbox' defaultChecked className='mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary' />
                Notify me when colleagues mention me
              </label>
              <label className='flex items-start gap-2'>
                <input type='checkbox' className='mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary' />
                Weekly analytics digest
              </label>
              <label className='flex items-start gap-2'>
                <input type='checkbox' defaultChecked className='mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary' />
                Enable secure document download alerts
              </label>
            </div>
          </div>

          <div className='flex items-center justify-between gap-3 rounded-xl bg-background/80 p-4 text-sm text-text-muted'>
            <span>Need to deactivate your profile or export data? Reach out to support@lexlink.com.</span>
            <button type='submit' className='btn-primary'>Save changes</button>
          </div>
          {saved && <p className='text-sm font-medium text-success'>Settings saved.</p>}
        </form>
      </section>
    </PageShell>
  )
}
