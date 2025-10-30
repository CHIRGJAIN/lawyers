import LeftSidebar from '@/components/LeftSidebar'
import RightSidebar from '@/components/RightSidebar'
import { PageShell } from '@/components/layout/PageShell'
import { suggestedConnections } from '@/lib/data'
import { routes } from '@/lib/routes'
import Link from 'next/link'

export default function NetworkPage() {
  return (
    <PageShell left={<LeftSidebar />} right={<RightSidebar />}>
      <section className='space-y-4'>
        <header className='flex items-center justify-between'>
          <div>
            <h1 className='text-xl font-semibold text-text'>Your legal network</h1>
            <p className='text-sm text-text-muted'>Discover co-counsel, referring partners, and experts across jurisdictions.</p>
          </div>
          <Link href={routes.compose()} className='btn-primary'>Invite to collaborate</Link>
        </header>

        <div className='grid gap-4 sm:grid-cols-2'>
          {suggestedConnections.map((lawyer) => (
            <article key={lawyer.id} className='card card-hoverable space-y-3 p-4'>
              <div className='flex items-center justify-between'>
                <h2 className='text-base font-semibold text-text'>{lawyer.name}</h2>
                <span className='rounded-full bg-primary/10 px-3 py-1 text-xs text-primary'>Open to briefs</span>
              </div>
              <p className='text-sm text-text-muted'>{lawyer.headline}</p>
              <div className='flex flex-wrap gap-2 text-xs text-text-muted'>
                {lawyer.practiceAreas.slice(0, 3).map((area) => (
                  <span key={area} className='pill'>
                    {area}
                  </span>
                ))}
              </div>
              <div className='flex gap-2'>
                <Link href={routes.profile(lawyer.id)} className='btn-outline text-xs'>View profile</Link>
                <Link href={routes.messages(`thread=${lawyer.id}`)} className='btn-ghost text-xs'>Message</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  )
}

