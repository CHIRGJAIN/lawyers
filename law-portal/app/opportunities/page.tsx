import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { PageShell } from '@/components/layout/PageShell'
import { routes } from '@/lib/routes'
import Link from 'next/link'

const opportunities = [
  {
    id: 'opp-1',
    title: 'Joint counsel for cross-border fintech acquisition',
    location: 'Hybrid • Mumbai / Singapore',
    posted: 'Posted 2 days ago',
  },
  {
    id: 'opp-2',
    title: 'Arbitration briefing: EPC dispute in renewable energy project',
    location: 'On-site • Dubai International Arbitration Centre',
    posted: 'Posted 4 days ago',
  },
  {
    id: 'opp-3',
    title: 'Advisory board: employment compliance for Series C startup',
    location: 'Remote • PAN India',
    posted: 'Posted 1 week ago',
  },
]

export default function OpportunitiesPage() {
  return (
    <PageShell left={<LeftSidebar />} right={<RightSidebar />}>
      <section className='space-y-4'>
        <header className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-semibold text-text'>Opportunities & consultations</h1>
            <p className='text-sm text-text-muted'>Engagements curated for your expertise, fee preferences, and jurisdiction.</p>
          </div>
          <Link href={routes.compose()} className='btn-primary'>Publish availability</Link>
        </header>

        <div className='space-y-3'>
          {opportunities.map((opportunity) => (
            <article key={opportunity.id} className='card card-hoverable p-5'>
              <div className='flex flex-wrap items-center justify-between gap-3'>
                <div>
                  <h2 className='text-base font-semibold text-text'>{opportunity.title}</h2>
                  <p className='text-sm text-text-muted'>{opportunity.location}</p>
                </div>
                <span className='rounded-full bg-primary/10 px-3 py-1 text-xs text-primary'>{opportunity.posted}</span>
              </div>
              <div className='mt-3 flex flex-wrap gap-3 text-sm text-text-muted'>
                <span className='pill'>Conflict check required</span>
                <span className='pill'>Share fee quote</span>
                <span className='pill'>Joint counsel</span>
              </div>
              <div className='mt-4 flex gap-2'>
                <Link href={routes.messages(`new=brief&id=${opportunity.id}`)} className='btn-primary text-xs'>Express interest</Link>
                <Link href={routes.network()} className='btn-outline text-xs'>Refer colleague</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

