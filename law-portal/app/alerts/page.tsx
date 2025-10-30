import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { PageShell } from '@/components/layout/PageShell'

const alertItems = [
  {
    id: 'alert-1',
    title: 'Consultation confirmed with Adv. Arjun Singh',
    detail: 'Brief discussion on EPC arbitration strategy • Tomorrow 11:00 IST',
  },
  {
    id: 'alert-2',
    title: 'New comment on your judgment analysis',
    detail: 'Adv. Meera Joshi shared additional case law for reference.',
  },
  {
    id: 'alert-3',
    title: 'LexLink security advisory',
    detail: 'Enable multi-factor authentication to protect client data.',
  },
]

export default function AlertsPage() {
  return (
    <PageShell left={<LeftSidebar />} right={<RightSidebar />}>
      <section className='space-y-4'>
        <header>
          <h1 className='text-xl font-semibold text-text'>Alerts & notifications</h1>
          <p className='text-sm text-text-muted'>Stay on top of consultations, referrals, and compliance reminders.</p>
        </header>

        <div className='card card-hoverable divide-y divide-border overflow-hidden'>
          {alertItems.map((alert) => (
            <div key={alert.id} className='p-4 hover:bg-background'>
              <h2 className='font-semibold text-text'>{alert.title}</h2>
              <p className='text-sm text-text-muted'>{alert.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

